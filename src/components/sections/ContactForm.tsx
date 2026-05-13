"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contactForm");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-brand-50 border border-brand-200 rounded-sm p-8 text-center">
        <p className="text-brand-800 font-medium text-lg mb-2">{t("submittedTitle")}</p>
        <p className="text-stone-600 text-sm">{t("submittedBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1.5">
          {t("nameLabel")} <span className="text-brand-600">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full px-4 py-3 bg-white border border-stone-300 rounded-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          placeholder={t("namePlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
          {t("emailLabel")} <span className="text-brand-600">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full px-4 py-3 bg-white border border-stone-300 rounded-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          placeholder={t("emailPlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1.5">
          {t("phoneLabel")}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="w-full px-4 py-3 bg-white border border-stone-300 rounded-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          placeholder={t("phonePlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1.5">
          {t("messageLabel")} <span className="text-brand-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 bg-white border border-stone-300 rounded-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition resize-none"
          placeholder={t("messagePlaceholder")}
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 bg-brand-600 text-white font-medium rounded-md hover:bg-brand-700 transition-colors duration-200"
      >
        {t("submit")}
      </button>
    </form>
  );
}
