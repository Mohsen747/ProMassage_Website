"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** Shown in the selector (not translated with UI locale). Short labels for en/fr; fa stays in native script. */
const LOCALE_OPTION_LABEL: Record<(typeof routing.locales)[number], string> = {
  en: "En",
  fr: "Fr",
  fa: "پارسی",
};

const selectBaseDefault =
  "h-8 w-max min-w-0 shrink-0 cursor-pointer rounded-md border px-1.5 py-1 text-left text-[11px] font-semibold leading-tight shadow-sm backdrop-blur-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 [field-sizing:content] sm:h-9 sm:px-2 sm:text-xs";

const selectBaseCompact =
  "h-[1.625rem] w-max min-w-0 shrink-0 cursor-pointer rounded border px-0.5 py-0 text-left text-sm font-semibold leading-tight shadow-sm backdrop-blur-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 [field-sizing:content] sm:h-[1.625rem] sm:px-1";

export default function LocaleSwitcher({
  overlayNav = false,
  size = "default",
}: {
  overlayNav?: boolean;
  size?: "default" | "compact";
}) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("LocaleSwitcher");

  const selectBase = size === "compact" ? selectBaseCompact : selectBaseDefault;

  const selectClass = overlayNav
    ? `${selectBase} border-white/40 bg-white/10 text-white focus-visible:ring-offset-transparent [&>option]:bg-brand-950 [&>option]:text-stone-100`
    : `${selectBase} border-stone-300/80 bg-white/90 text-stone-800 focus-visible:ring-offset-brand-100 [&>option]:bg-white [&>option]:text-stone-900`;

  return (
    <label className="inline-flex shrink-0 items-center gap-1.5">
      <span className="sr-only">{t("label")}</span>
      <select
        value={locale}
        dir="ltr"
        aria-label={t("label")}
        className={selectClass}
        onChange={(e) => {
          const next = e.target.value as (typeof routing.locales)[number];
          router.replace(pathname, { locale: next });
          e.target.blur();
        }}
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {LOCALE_OPTION_LABEL[loc]}
          </option>
        ))}
      </select>
    </label>
  );
}
