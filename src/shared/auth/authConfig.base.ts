import type { NextAuthConfig } from "next-auth";
import { authRoutes } from "@/shared/auth/routes";

// EDGE-SAFE base Auth.js config: session strategy, pages, and the jwt/session
// callbacks — NO Prisma, bcrypt, or adapter imports. The middleware builds a
// NextAuth instance from THIS so it can decode the JWT session on the edge.
// The full Node config (authConfig.ts) spreads this and adds the adapter +
// Credentials provider (which need the database).

export const baseAuthConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  trustHost: true,
  pages: {
    signIn: authRoutes.signIn,
    newUser: authRoutes.signUp,
  },
  // Concrete providers live in the full (Node) config; middleware only reads JWTs.
  providers: [],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },
};
