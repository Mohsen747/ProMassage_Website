import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import AuthCard from "@/shared/auth/AuthCard";
import LoginForm from "@/shared/auth/LoginForm";

// Functional auth page. English-only for now — i18n copy can be added to the
// message bundles in a later pass. The route guard (middleware) redirects
// already-authenticated users away from here.
export const metadata: Metadata = { title: "Log in" };

interface PageProps {
  params: { locale: string };
  searchParams: { callbackUrl?: string };
}

export default function LoginPage({ searchParams }: PageProps) {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to access your courses and account."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-brand-forest underline underline-offset-4 hover:text-brand-700"
          >
            Sign up
          </Link>
        </>
      }
    >
      <LoginForm callbackUrl={searchParams.callbackUrl} />
    </AuthCard>
  );
}
