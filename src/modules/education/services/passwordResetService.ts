import { randomBytes, createHash } from "node:crypto";
import * as studentRepository from "@/modules/education/repositories/studentRepository";
import * as passwordResetRepository from "@/modules/education/repositories/passwordResetRepository";
import { hashPassword } from "@/shared/auth/password";
import { sendPasswordResetEmail, type SendEmailResult } from "@/shared/email/resend";
import { EducationError } from "@/modules/education/constants/errors";
import type { ResetPasswordInput } from "@/modules/education/validators/studentSchema";

// Password reset flow (credentials login). Tokens are single-use and expire.
// Only the SHA-256 hash is persisted; the raw token travels solely in the email
// link. `requestReset` never reveals whether an email is registered — the caller
// (server action) always returns the same generic message either way.

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

function generateRawToken(): string {
  // 32 random bytes → URL-safe string used verbatim in the reset link.
  return randomBytes(32).toString("base64url");
}

function hashToken(rawToken: string): string {
  return createHash("sha256").update(rawToken).digest("hex");
}

/** Base URL for links in emails. Prefers AUTH_URL (the running app origin). */
function getAuthBaseUrl(): string {
  const base =
    process.env.AUTH_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
  return base.replace(/\/$/, "");
}

export interface RequestResetResult {
  /** Whether the email matched a real user (for internal logging/tests only). */
  userExists: boolean;
  /** Present only when an email was actually dispatched. */
  delivery?: SendEmailResult;
}

/**
 * Issue a reset token for `email` and email the link. If no user matches, this
 * quietly does nothing (no leak). Any previous unused token for the user is
 * invalidated so only the newest link works.
 */
export async function requestReset(email: string): Promise<RequestResetResult> {
  const user = await studentRepository.findStudentByEmail(email);
  if (!user) return { userExists: false };

  await passwordResetRepository.deleteUnusedForUser(user.id);

  const rawToken = generateRawToken();
  await passwordResetRepository.createToken({
    userId: user.id,
    tokenHash: hashToken(rawToken),
    expiresAt: new Date(Date.now() + TOKEN_TTL_MS),
  });

  const resetUrl = `${getAuthBaseUrl()}/reset-password/${rawToken}`;
  const delivery = await sendPasswordResetEmail({
    to: user.email,
    firstName: user.firstName,
    resetUrl,
  });

  return { userExists: true, delivery };
}

/** True when the raw token exists, is unused, and hasn't expired. */
export async function isValidToken(rawToken: string): Promise<boolean> {
  const record = await passwordResetRepository.findByTokenHash(hashToken(rawToken));
  if (!record) return false;
  if (record.usedAt) return false;
  return record.expiresAt.getTime() > Date.now();
}

/** Set a new password from a valid reset token, then spend the token. */
export async function resetPassword(input: ResetPasswordInput): Promise<void> {
  const record = await passwordResetRepository.findByTokenHash(hashToken(input.token));
  const isValid = record && !record.usedAt && record.expiresAt.getTime() > Date.now();
  if (!record || !isValid) {
    throw new EducationError(
      "This reset link is invalid or has expired.",
      "INVALID_RESET_TOKEN"
    );
  }

  const passwordHash = await hashPassword(input.password);
  await passwordResetRepository.consumeAndResetPassword({
    tokenId: record.id,
    userId: record.userId,
    passwordHash,
  });
}
