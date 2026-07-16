"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import { updateProfileAction } from "@/modules/education/server/actions/authActions";

interface ProfileFormProps {
  defaults: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
}

// Input/label styling mirrors the site's ContactForm + auth forms for consistency.
const inputClass =
  "w-full rounded-sm border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500";
const labelClass = "mb-1.5 block text-sm font-medium text-stone-700";
const fieldErrorClass = "mt-1.5 block text-xs text-red-600";

export default function ProfileForm({ defaults }: ProfileFormProps) {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setFieldErrors({});
    setFormError(null);
    setSaved(false);

    const data = new FormData(event.currentTarget);
    const phone = String(data.get("phone") ?? "").trim();
    const payload = {
      firstName: String(data.get("firstName") ?? "").trim(),
      lastName: String(data.get("lastName") ?? "").trim(),
      // phone is optional — omit when blank so the schema treats it as cleared.
      ...(phone ? { phone } : {}),
    };

    startTransition(async () => {
      const result = await updateProfileAction(payload);
      if (!result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setFormError(result.error);
        return;
      }
      setSaved(true);
      // Re-fetch server data so the session-derived UI reflects the new name.
      router.refresh();
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
      {saved ? (
        <p
          role="status"
          className="rounded-sm border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800"
        >
          Profile updated.
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
          readOnly
          defaultValue={defaults.email}
          className={`${inputClass} bg-stone-50 text-stone-600`}
        />
        <span className="mt-1.5 block text-xs text-stone-400">
          Your login email can&apos;t be changed here — contact us if it needs updating.
        </span>
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone <span className="font-normal text-stone-400">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={defaults.phone}
          autoComplete="tel"
          placeholder="613-555-0100"
          className={inputClass}
        />
        {firstFieldError("phone") ? (
          <span className={fieldErrorClass}>{firstFieldError("phone")}</span>
        ) : null}
      </div>

      <Button type="submit" variant="primary" size="block" disabled={pending}>
        {pending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
