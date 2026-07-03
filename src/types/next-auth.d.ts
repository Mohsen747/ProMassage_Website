import type { DefaultSession } from "next-auth";
import type { UserRole } from "@/shared/auth/types";

// Module augmentation so `role` (+ name parts + id) are first-class on the
// NextAuth session, user, and JWT — no `as` casts needed in the callbacks.

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      firstName: string;
      lastName: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
    firstName: string;
    lastName: string;
  }
}

// JWT is declared in @auth/core/jwt (next-auth/jwt only re-exports it), so the
// augmentation must target the declaring module to actually merge.
declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    firstName: string;
    lastName: string;
  }
}
