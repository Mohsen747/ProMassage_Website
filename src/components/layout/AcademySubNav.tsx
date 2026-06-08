"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navPaths } from "@/config/nav";
import { siteConfig } from "@/config/site";

export default function AcademySubNav() {
  const pathname = usePathname();
  const tNav = useTranslations("nav");

  const tabs = [
    {
      href: navPaths.academy.sectionHref,
      label: tNav("academy.sectionLabel"),
      exact: true,
    },
    {
      href: "/academy/programs",
      label: tNav("academy.links.programs"),
      exact: false,
    },
    {
      href: "/academy/schedule",
      label: tNav("academy.links.schedule"),
      exact: false,
    },
    {
      href: "/academy/certification",
      label: tNav("academy.links.certification"),
      exact: false,
    },
    {
      href: siteConfig.ctas.enrollPath,
      label: tNav("academy.enrollLabel"),
      exact: false,
    },
  ];

  return (
    <nav
      className="sticky z-20 border-b border-stone-200 bg-white shadow-sm"
      style={{ top: "7.25rem" }}
      aria-label="Academy navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="no-scrollbar flex items-center gap-1 overflow-x-auto py-2">
          {tabs.map(({ href, label, exact }) => {
            const isActive = exact
              ? pathname === href
              : pathname === href || pathname.startsWith(href + "/");

            return (
              <li key={href} className="shrink-0">
                <Link
                  href={href}
                  className={
                    isActive
                      ? "inline-flex items-center rounded-full bg-brand-leaf px-4 py-1.5 text-sm font-semibold text-white transition-all"
                      : "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-stone-600 transition-colors hover:text-brand-leaf"
                  }
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
