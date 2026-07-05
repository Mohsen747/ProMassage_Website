"use client";

import { useState, useTransition, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";
import { signupAction } from "@/modules/education/server/actions/authActions";
import { authRoutes } from "@/shared/auth/routes";
import Button from "@/components/ui/Button";

interface SignupFormProps {
  className?: string;
}

// Input/label styling mirrors the site's ContactForm for a consistent look.
const inputClass =
  "w-full rounded-sm border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500";
const labelClass = "mb-1.5 block text-sm font-medium text-stone-700";
const fieldErrorClass = "mt-1.5 block text-xs text-red-600";

// New accounts are always students (admins are provisioned separately), so a
// successful signup auto-signs-in and lands on /account.
export default function SignupForm({ className }: SignupFormProps) {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setFieldErrors({});
    setFormError(null);

    const data = new FormData(event.currentTarget);
    const phone = String(data.get("phone") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const payload = {
      firstName: String(data.get("firstName") ?? "").trim(),
      lastName: String(data.get("lastName") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      // Omit phone entirely when blank — the schema treats it as optional.
      ...(phone ? { phone } : {}),
      password,
      confirmPassword: String(data.get("confirmPassword") ?? ""),
    };

    startTransition(async () => {
      const result = await signupAction(payload);
      if (!result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setFormError(result.error);
        return;
      }

      // Auto-login the new student, then go to their dashboard.
      const signInResult = await signIn("credentials", {
        email: payload.email,
        password,
        redirect: false,
      });
      if (!signInResult || signInResult.error) {
        router.push(authRoutes.signIn);
        return;
      }
      router.push(authRoutes.studentHome);
      router.refresh();
    });
  }

  const firstFieldError = (name: string): string | null => fieldErrors[name]?.[0] ?? null;

  return (
    <form onSubmit={handleSubmit} noValidate className={`space-y-5 ${className ?? ""}`}>
      {formError ? (
        <p
          role="alert"
          className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {formError}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className={inputClass}
          />
          {firstFieldError("firstName") ? (
            <span className={fieldErrorClass}>{firstFieldError("firstName")}</span>
          ) : null}
        </div>

        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            className={inputClass}
          />
          {firstFieldError("lastName") ? (
            <span className={fieldErrorClass}>{firstFieldError("lastName")}</span>
          ) : null}
        </div>
      </div>

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
        {firstFieldError("email") ? (
          <span className={fieldErrorClass}>{firstFieldError("email")}</span>
        ) : null}
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone <span className="font-normal text-stone-400">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="613-555-0100"
          className={inputClass}
        />
        {firstFieldError("phone") ? (
          <span className={fieldErrorClass}>{firstFieldError("phone")}</span>
        ) : null}
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="new-password"
          placeholder="At least 8 characters"
          className={inputClass}
        />
        {firstFieldError("password") ? (
          <span className={fieldErrorClass}>{firstFieldError("password")}</span>
        ) : null}
      </div>

      <div>
        <label htmlFor="confirmPassword" className={labelClass}>
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          autoComplete="new-password"
          placeholder="Re-enter your password"
          className={inputClass}
        />
        {firstFieldError("confirmPassword") ? (
          <span className={fieldErrorClass}>{firstFieldError("confirmPassword")}</span>
        ) : null}
      </div>

      <Button type="submit" variant="primary" size="block" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
