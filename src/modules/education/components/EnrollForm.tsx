"use client";

import { useState, useTransition, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { submitEnrollmentAction } from "@/modules/education/server/actions/enrollmentActions";
import { startCheckoutAction } from "@/modules/education/server/actions/paymentActions";

interface EnrollFormProps {
  courseSlug: string;
  priceLabel: string;
  defaults: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

// Input/label styling mirrors the site's ContactForm + auth forms for consistency.
const inputClass =
  "w-full rounded-sm border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500";
const labelClass = "mb-1.5 block text-sm font-medium text-stone-700";
const fieldErrorClass = "mt-1.5 block text-xs text-red-600";

// Two-step submit: create the pending_payment enrollment, then start Square
// checkout and hand the browser off to the hosted payment page. The applicant is
// already authenticated (the page gates on it), so identity comes from the session
// server-side — these fields are the applicant's contact details for the record.
export default function EnrollForm({ courseSlug, priceLabel, defaults }: EnrollFormProps) {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setFieldErrors({});
    setFormError(null);

    const data = new FormData(event.currentTarget);
    const notes = String(data.get("notes") ?? "").trim();
    const payload = {
      courseSlug,
      firstName: String(data.get("firstName") ?? "").trim(),
      lastName: String(data.get("lastName") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      pricingTier: "group" as const,
      ...(notes ? { notes } : {}),
      acceptTerms: data.get("acceptTerms") === "on",
    };

    startTransition(async () => {
      const enrollResult = await submitEnrollmentAction(payload);
      if (!enrollResult.ok) {
        setFieldErrors(enrollResult.fieldErrors ?? {});
        setFormError(enrollResult.error);
        return;
      }

      const checkoutResult = await startCheckoutAction({ enrollmentId: enrollResult.data.id });
      if (!checkoutResult.ok) {
        setFormError(checkoutResult.error);
        return;
      }

      // Full-page navigation to Square's hosted checkout (external URL).
      window.location.assign(checkoutResult.data.redirectUrl);
    });
  }

  const firstFieldError = (name: string): string | null => fieldErrors[name]?.[0] ?? null;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
            defaultValue={defaults.firstName}
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
            defaultValue={defaults.lastName}
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
          readOnly
          defaultValue={defaults.email}
          autoComplete="email"
          className={`${inputClass} bg-stone-50 text-stone-600`}
        />
        <span className="mt-1.5 block text-xs text-stone-400">
          Tied to your account. Contact us if this needs to change.
        </span>
        {firstFieldError("email") ? (
          <span className={fieldErrorClass}>{firstFieldError("email")}</span>
        ) : null}
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="613-555-0100"
          className={inputClass}
        />
        {firstFieldError("phone") ? (
          <span className={fieldErrorClass}>{firstFieldError("phone")}</span>
        ) : null}
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>
          Notes <span className="font-normal text-stone-400">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Anything you'd like us to know before your program starts."
          className={inputClass}
        />
        {firstFieldError("notes") ? (
          <span className={fieldErrorClass}>{firstFieldError("notes")}</span>
        ) : null}
      </div>

      <div className="rounded-sm border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-stone-700">
        Tuition due today: <span className="font-semibold text-stone-900">{priceLabel}</span>
      </div>

      <div>
        <label htmlFor="acceptTerms" className="flex items-start gap-3 text-sm text-stone-700">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-300 text-brand-600 focus:ring-brand-500"
          />
          <span>
            I understand tuition is due to secure my seat and I accept the enrollment terms.
          </span>
        </label>
        {firstFieldError("acceptTerms") ? (
          <span className={fieldErrorClass}>{firstFieldError("acceptTerms")}</span>
        ) : null}
      </div>

      <Button type="submit" variant="primary" size="block" disabled={pending}>
        {pending ? "Redirecting to secure checkout…" : "Enroll & pay"}
      </Button>
    </form>
  );
}
