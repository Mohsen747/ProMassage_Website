import { auth } from "@/shared/auth";
import type { AuthSession, SessionUser, UserRole } from "@/shared/auth/types";

// Authorization guards used by server components, server actions, and route
// handlers under /account and /admin. These are the ONLY sanctioned way to read
// the current user — never trust a client-supplied role.

export class UnauthorizedError extends Error {
  constructor(message = "Not authenticated") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Insufficient permissions") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export async function getServerSession(): Promise<AuthSession | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  return {
    user: {
      id: session.user.id,
      email: session.user.email ?? "",
      role: session.user.role,
      firstName: session.user.firstName,
      lastName: session.user.lastName,
    },
    expires: session.expires,
  };
}

/** Throws UnauthorizedError if not logged in; returns the session user otherwise. */
export async function requireUser(): Promise<SessionUser> {
  const session = await getServerSession();
  if (!session) throw new UnauthorizedError();
  return session.user;
}

/** Throws unless the logged-in user has one of the allowed roles. */
export async function requireRole(...roles: UserRole[]): Promise<SessionUser> {
  const user = await requireUser();
  if (!roles.includes(user.role)) throw new ForbiddenError();
  return user;
}
