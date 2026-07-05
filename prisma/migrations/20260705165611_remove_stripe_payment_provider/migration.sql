-- Narrow PaymentProvider enum: drop the unused `stripe` value (Square is the
-- confirmed provider). Verified 0 Payment rows reference 'stripe' before this ran.
BEGIN;
CREATE TYPE "PaymentProvider_new" AS ENUM ('square', 'manual');
ALTER TABLE "Payment" ALTER COLUMN "provider" DROP DEFAULT;
ALTER TABLE "Payment" ALTER COLUMN "provider" TYPE "PaymentProvider_new" USING ("provider"::text::"PaymentProvider_new");
ALTER TYPE "PaymentProvider" RENAME TO "PaymentProvider_old";
ALTER TYPE "PaymentProvider_new" RENAME TO "PaymentProvider";
DROP TYPE "PaymentProvider_old";
ALTER TABLE "Payment" ALTER COLUMN "provider" SET DEFAULT 'square';
COMMIT;
