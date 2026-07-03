// Auth route constants. Dependency-free (no Prisma/bcrypt) so it can be imported
// anywhere, including edge contexts, without pulling in the full auth config.

export const authRoutes = {
  signIn: "/login",
  signUp: "/signup",
  studentHome: "/account",
  adminHome: "/admin",
} as const;
