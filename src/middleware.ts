import createMiddleware from "next-intl/middleware";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { baseAuthConfig } from "@/shared/auth/authConfig.base";
import { authRoutes } from "@/shared/auth/routes";

// Composed middleware:
//  1. Auth gate for /account/* (student-only) and /admin/* (admin-only).
//  2. next-intl locale handling for everything else.
// Uses the EDGE-SAFE base auth config (JWT decode only — no Prisma on the edge).

const intlMiddleware = createMiddleware(routing);
const { auth } = NextAuth(baseAuthConfig);

/** Strip a leading /{locale} segment so guards work regardless of locale prefix. */
function stripLocale(pathname: string): string {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  if (maybeLocale && (routing.locales as readonly string[]).includes(maybeLocale)) {
    const rest = "/" + segments.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "");
  }
  return pathname;
}

export default auth((req) => {
  const { nextUrl } = req;
  const path = stripLocale(nextUrl.pathname);
  const isAdminArea = path === "/admin" || path.startsWith("/admin/");
  const isAccountArea = path === "/account" || path.startsWith("/account/");
  const isAuthPage = path === authRoutes.signIn || path === authRoutes.signUp;
  const session = req.auth;

  // Already signed in? Keep them out of /login and /signup — send to their home.
  if (isAuthPage && session?.user) {
    const home = session.user.role === "admin" ? authRoutes.adminHome : authRoutes.studentHome;
    return NextResponse.redirect(new URL(home, nextUrl.origin));
  }

  if (isAdminArea || isAccountArea) {
    if (!session?.user) {
      const loginUrl = new URL(authRoutes.signIn, nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    const role = session.user.role;
    if (isAdminArea && role !== "admin") {
      return NextResponse.redirect(new URL(authRoutes.studentHome, nextUrl.origin));
    }
    if (isAccountArea && role !== "student") {
      return NextResponse.redirect(new URL(authRoutes.adminHome, nextUrl.origin));
    }
  }

  // Public or authorized → hand off to next-intl for locale handling.
  return intlMiddleware(req);
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
