import type { UserRole } from "@/shared/auth/types";

// Auth.js (NextAuth v5) configuration — SKELETON.
//
// Wiring this up requires: `npm i next-auth@beta @auth/prisma-adapter`.
// Credentials provider validates email/password against the User table; the
// `role` field is attached to the JWT/session in the callbacks below so both
// /account and /admin can authorize from a single session.
//
// Kept provider-thin here so the concrete import stays out of the scaffold until
// the dependency is installed.

export interface AuthConfigShape {
  session: { strategy: "jwt" };
  pages: { signIn: string; newUser: string };
  callbacks: {
    // Attach role to the token on sign-in.
    jwt: (args: { token: Record<string, unknown>; user?: { id: string; role: UserRole } }) => Promise<Record<string, unknown>>;
    // Expose role + id on the session object.
    session: (args: { session: Record<string, unknown>; token: Record<string, unknown> }) => Promise<Record<string, unknown>>;
  };
}

export const authRoutes = {
  signIn: "/login",
  signUp: "/signup",
  studentHome: "/account",
  adminHome: "/admin",
} as const;

// TODO(auth): export the real NextAuth handlers once `next-auth` is installed:
//   export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
