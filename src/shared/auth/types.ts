// Shared auth types — used by BOTH /account (student) and /admin (admin).
// Single auth system, differentiated by `role` (CONTRIBUTING.md §15: shared layer).

export type UserRole = "student" | "admin";

export interface SessionUser {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

export interface AuthSession {
  user: SessionUser;
  expires: string;
}
