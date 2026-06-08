"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface WaitlistFormProps {
  courseOptions: string[];
}

export default function WaitlistForm({ courseOptions }: WaitlistFormProps) {
  const t = useTranslations("academySchedule");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="rounded-lg bg-brand-100 px-6 py-4 text-sm font-medium text-brand-forest">
        {t("waitlist.success")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-stone-700">
            {t("waitlist.name")}
          </label>
          <input
            type="text"
            required
            className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-sm text-stone-900 outline-none transition-colors focus:border-brand-leaf focus:ring-1 focus:ring-brand-leaf"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-stone-700">
            {t("waitlist.email")}
          </label>
          <input
            type="email"
            required
            className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-sm text-stone-900 outline-none transition-colors focus:border-brand-leaf focus:ring-1 focus:ring-brand-leaf"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-stone-700">
          {t("waitlist.course")}
        </label>
        <select
          required
          className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-sm text-stone-900 outline-none transition-colors focus:border-brand-leaf focus:ring-1 focus:ring-brand-leaf"
          defaultValue=""
        >
          <option value="" disabled>
            {t("waitlist.coursePlaceholder")}
          </option>
          {courseOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-brand-spa px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-brand-spaDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2"
      >
        {t("waitlist.submit")}
      </button>
    </form>
  );
}
