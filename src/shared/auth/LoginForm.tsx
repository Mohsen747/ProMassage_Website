"use client";

import { useState, type FormEvent } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";
import { authRoutes } from "@/shared/auth/routes";
import { Link } from "@/i18n/navigation";
import FormAlert from "@/shared/auth/FormAlert";
import Button from "@/components/ui/Button";

interface LoginFormProps {
  /** Optional deep-link to return to after login (set by the route guard). */
  callbackUrl?: string;
  /** Optional one-off success notice (e.g. after a password reset). */
  notice?: string;
}

// Input/label styling mirrors the site's ContactForm for a consistent look.
const inputClass =
  "w-full rounded-sm border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500";
const labelClass = "mb-1.5 block text-sm font-medium text-stone-700";

export default function LoginForm({ callbackUrl, notice }: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError(null);
    setPending(true);

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");

    const result = await signIn("credentials", { email, password, redirect: false });
    if (!result || result.error) {
      setError("Invalid email or password.");
      setPending(false);
      return;
    }

    // Role-based redirect: students -> /account, admins -> /admin.
    const session = await getSession();
    const roleHome =
      session?.user?.role === "admin" ? authRoutes.adminHome : authRoutes.studentHome;
    router.push(callbackUrl ?? roleHome);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {notice ? <FormAlert tone="success">{notice}</FormAlert> : null}
      {error ? <FormAlert tone="error">{error}</FormAlert> : null}

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-baseline justify-between">
          <label htmlFor="password" className="text-sm font-medium text-stone-700">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-brand-forest underline underline-offset-4 hover:text-brand-700"
          >
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className={inputClass}
        />
      </div>

      <Button type="submit" variant="primary" size="block" disabled={pending}>
        {pending ? "Signing in…" : "Log in"}
      </Button>
    </form>
  );
}
