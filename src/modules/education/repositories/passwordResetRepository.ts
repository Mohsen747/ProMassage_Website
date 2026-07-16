import { prisma } from "@/shared/db/prismaClient";

// Persistence for one-time password reset tokens. Only the SHA-256 hash of a
// token is ever stored; lookups are by hash. All Prisma access for this feature
// lives here (repository layer). Consuming a token and updating the user's
// password happen in a single transaction so a token can never be spent without
// the password actually changing (and vice-versa).

export interface PasswordResetTokenRecord {
  id: string;
  userId: string;
  expiresAt: Date;
  usedAt: Date | null;
}

interface CreateTokenData {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}

export async function createToken(data: CreateTokenData): Promise<void> {
  await prisma.passwordResetToken.create({
    data: {
      userId: data.userId,
      tokenHash: data.tokenHash,
      expiresAt: data.expiresAt,
    },
  });
}

export async function findByTokenHash(
  tokenHash: string
): Promise<PasswordResetTokenRecord | null> {
  const row = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });
  if (!row) return null;
  return { id: row.id, userId: row.userId, expiresAt: row.expiresAt, usedAt: row.usedAt };
}

/** Drop any outstanding (unused) tokens for a user — one active link at a time. */
export async function deleteUnusedForUser(userId: string): Promise<void> {
  await prisma.passwordResetToken.deleteMany({ where: { userId, usedAt: null } });
}

interface ConsumeData {
  tokenId: string;
  userId: string;
  passwordHash: string;
}

/**
 * Atomically: stamp the token as used, set the user's new password hash, and
 * clear any other outstanding tokens for that user.
 */
export async function consumeAndResetPassword(data: ConsumeData): Promise<void> {
  await prisma.$transaction([
    prisma.passwordResetToken.update({
      where: { id: data.tokenId },
      data: { usedAt: new Date() },
    }),
    prisma.user.update({
      where: { id: data.userId },
      data: { passwordHash: data.passwordHash },
    }),
    prisma.passwordResetToken.deleteMany({
      where: { userId: data.userId, usedAt: null },
    }),
  ]);
}
