import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import AuthCard from "@/shared/auth/AuthCard";
import ForgotPasswordForm from "@/modules/education/components/ForgotPasswordForm";

// Static shell + a client form that posts to a server action. No per-request
// data is rendered here, so this page can be statically generated.
export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a link to reset it."
      footer={
        <>
          Remembered it?{" "}
          <Link
            href="/login"
            className="font-medium text-brand-forest underline underline-offset-4 hover:text-brand-700"
          >
            Back to log in
          </Link>
        </>
      }
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
