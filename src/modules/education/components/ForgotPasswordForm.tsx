"use client";

import { useState, useTransition, type FormEvent } from "react";
import { requestPasswordResetAction } from "@/modules/education/server/actions/authActions";
import FormAlert from "@/shared/auth/FormAlert";
import Button from "@/components/ui/Button";

// Input/label styling mirrors ContactForm/LoginForm for a consistent look.
const inputClass =
  "w-full rounded-sm border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500";
const labelClass = "mb-1.5 block text-sm font-medium text-stone-700";

export default function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setFieldError(null);

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();

    startTransition(async () => {
      const result = await requestPasswordResetAction({ email });
      if (!result.ok) {
        // Only a malformed email surfaces here — existence is never revealed.
        setFieldError(result.fieldErrors?.email?.[0] ?? result.error);
        return;
      }
      setSubmitted(true);
    });
  }

  // Generic confirmation shown regardless of whether the email is registered.
  if (submitted) {
    return (
      <FormAlert tone="success">
        If an account exists for that email, we&apos;ve sent a link to reset your password.
        Check your inbox (and spam folder). The link expires in 1 hour.
      </FormAlert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {fieldError ? <FormAlert tone="error">{fieldError}</FormAlert> : null}

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

      <Button type="submit" variant="primary" size="block" disabled={pending}>
        {pending ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
}
