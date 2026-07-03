import bcrypt from "bcryptjs";

// Password hashing for the shared auth system. bcryptjs (pure JS) is chosen over
// argon2/native bcrypt so it runs in any runtime (local, Vercel serverless, CI)
// without native build steps. Cost factor 12 is the current sane default.

const SALT_ROUNDS = 12;

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
