import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import AuthCard from "@/shared/auth/AuthCard";
import SignupForm from "@/modules/education/components/SignupForm";

export const metadata: Metadata = { title: "Sign up" };

interface PageProps {
  params: { locale: string };
}

export default function SignupPage(_props: PageProps) {
  return (
    <AuthCard
      title="Create your account"
      subtitle="Join ProMassage Academy to enroll and track your courses."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-brand-forest underline underline-offset-4 hover:text-brand-700"
          >
            Log in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthCard>
  );
}
