import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/shared/db/prismaClient";
import { verifyPassword } from "@/shared/auth/password";
import { loginSchema } from "@/modules/education/validators/studentSchema";
import { baseAuthConfig } from "@/shared/auth/authConfig.base";

// Full (Node runtime) Auth.js config for the SHARED student/admin system.
// Spreads the edge-safe base and adds the Prisma adapter + Credentials provider.
// Used by the NextAuth instance that backs the route handler and server-side
// auth() (server components / actions). Credentials requires JWT sessions
// (already set on the base); User.role rides the JWT via the base callbacks.

export const authConfig: NextAuthConfig = {
  ...baseAuthConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (raw) => {
        const parsed = loginSchema.safeParse(raw);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const passwordValid = await verifyPassword(password, user.passwordHash);
        if (!passwordValid) return null;

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          name: `${user.firstName} ${user.lastName}`,
        };
      },
    }),
  ],
};
