import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import AuthCard from "@/shared/auth/AuthCard";
import FormAlert from "@/shared/auth/FormAlert";
import ResetPasswordForm from "@/modules/education/components/ResetPasswordForm";
import * as passwordResetService from "@/modules/education/services/passwordResetService";

// Validates a per-request reset token from the URL, so this route must never be
// statically cached.
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Reset password" };

interface PageProps {
  params: { locale: string; token: string };
}

export default async function ResetPasswordPage({ params: { token } }: PageProps) {
  const valid = await passwordResetService.isValidToken(token);

  if (!valid) {
    return (
      <AuthCard
        title="Link expired"
        subtitle="This password reset link is invalid or has already been used."
        footer={
          <>
            Need a new link?{" "}
            <Link
              href="/forgot-password"
              className="font-medium text-brand-forest underline underline-offset-4 hover:text-brand-700"
            >
              Request another
            </Link>
          </>
        }
      >
        <FormAlert tone="error">
          Reset links are valid for 1 hour and can only be used once. Please request a new
          one to continue.
        </FormAlert>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Set a new password"
      subtitle="Choose a strong password you haven't used before."
      footer={
        <>
          Changed your mind?{" "}
          <Link
            href="/login"
            className="font-medium text-brand-forest underline underline-offset-4 hover:text-brand-700"
          >
            Back to log in
          </Link>
        </>
      }
    >
      <ResetPasswordForm token={token} />
    </AuthCard>
  );
}
