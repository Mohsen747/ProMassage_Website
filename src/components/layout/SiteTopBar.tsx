"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";

/** Official-style Facebook mark (blue “f” tile). */
function FacebookMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#1877F2"
        d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078V9.562h3.047V7.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V9.56h3.328l-.532 3.47h-2.796v8.386C19.612 23.027 24 18.062 24 12.074z"
      />
    </svg>
  );
}

/** Instagram camera with brand gradient (readable at small sizes). */
function InstagramMark({ className, gradientId }: { className?: string; gradientId: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFDC80" />
          <stop offset="0.45" stopColor="#F77737" />
          <stop offset="0.8" stopColor="#C13584" />
          <stop offset="1" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      />
    </svg>
  );
}

/** Bare icons in the top bar: touch target + focus ring only (no background box). */
function socialIconHitClass(overlayNav: boolean) {
  return overlayNav
    ? "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md p-0.5 text-white/90 transition hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    : "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md p-0.5 text-stone-600 transition hover:text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-100";
}

export default function SiteTopBar({ overlayNav }: { overlayNav: boolean }) {
  const t = useTranslations("common");
  const { facebook, instagram } = siteConfig.social;
  const igGradId = useId().replace(/:/g, "");

  const socialHit = socialIconHitClass(overlayNav);

  const inactiveSocialIconClass =
    "pointer-events-none cursor-not-allowed opacity-[0.5] saturate-[0.85]";

  const barClass = overlayNav
    ? "border-b border-white/25 bg-black/45 text-white/95 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md supports-[backdrop-filter]:bg-black/40"
    : "border-b border-brand-200/55 bg-brand-200/35 text-stone-600 backdrop-blur-sm supports-[backdrop-filter]:bg-brand-200/25";

  const iconClass = "h-[18px] w-[18px] sm:h-5 sm:w-5";

  return (
    <div className={`${barClass} transition-[background-color,border-color,color] duration-300`}>
      <div className="mx-auto flex min-h-9 items-center justify-end gap-1.5 px-3 py-1 sm:gap-2 sm:px-5 lg:px-8 xl:max-w-[90rem]">
        <nav className="flex min-w-0 items-center gap-1.5 sm:gap-2" aria-label={t("utilityNav")}>
          {facebook ? (
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={socialHit}
              aria-label={t("visitFacebook")}
            >
              <FacebookMark className={iconClass} />
            </a>
          ) : (
            <span
              className={`${socialHit} ${inactiveSocialIconClass}`}
              title={t("inactiveSocialTileHint")}
              aria-label={t("visitFacebook")}
              aria-disabled="true"
            >
              <FacebookMark className={iconClass} />
            </span>
          )}
          {instagram ? (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={socialHit}
              aria-label={t("visitInstagram")}
            >
              <InstagramMark className={iconClass} gradientId={`ig-grad-${igGradId}`} />
            </a>
          ) : (
            <span
              className={`${socialHit} ${inactiveSocialIconClass}`}
              title={t("inactiveSocialTileHint")}
              aria-label={t("visitInstagram")}
              aria-disabled="true"
            >
              <InstagramMark className={iconClass} gradientId={`ig-grad-${igGradId}`} />
            </span>
          )}
          <LocaleSwitcher overlayNav={overlayNav} size="compact" />
        </nav>
      </div>
    </div>
  );
}
