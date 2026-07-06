"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "@/i18n/navigation";
import { resetPasswordAction } from "@/modules/education/server/actions/authActions";
import { authRoutes } from "@/shared/auth/routes";
import FormAlert from "@/shared/auth/FormAlert";
import Button from "@/components/ui/Button";

interface ResetPasswordFormProps {
  /** The raw reset token from the URL — validated server-side on submit. */
  token: string;
}

// Input/label styling mirrors SignupForm for a consistent look.
const inputClass =
  "w-full rounded-sm border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500";
const labelClass = "mb-1.5 block text-sm font-medium text-stone-700";
const fieldErrorClass = "mt-1.5 block text-xs text-red-600";

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setFieldErrors({});
    setFormError(null);

    const data = new FormData(event.currentTarget);
    const payload = {
      token,
      password: String(data.get("password") ?? ""),
      confirmPassword: String(data.get("confirmPassword") ?? ""),
    };

    startTransition(async () => {
      const result = await resetPasswordAction(payload);
      if (!result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        // Field-level issues render inline; anything else (e.g. an expired
        // token) shows as a top-level alert.
        setFormError(result.fieldErrors ? null : result.error);
        return;
      }
      // Password changed — send them to log in with a success notice.
      router.push(`${authRoutes.signIn}?reset=success`);
      router.refresh();
    });
  }

  const firstFieldError = (name: string): string | null => fieldErrors[name]?.[0] ?? null;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {formError ? <FormAlert tone="error">{formError}</FormAlert> : null}

      <div>
        <label htmlFor="password" className={labelClass}>
          New password
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
          Confirm new password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          autoComplete="new-password"
          placeholder="Re-enter your new password"
          className={inputClass}
        />
        {firstFieldError("confirmPassword") ? (
          <span className={fieldErrorClass}>{firstFieldError("confirmPassword")}</span>
        ) : null}
      </div>

      <Button type="submit" variant="primary" size="block" disabled={pending}>
        {pending ? "Saving…" : "Reset password"}
      </Button>
    </form>
  );
}
