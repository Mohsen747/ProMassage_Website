"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Brand } from "@/components/brand";
import { siteConfig } from "@/config/site";
import { navPaths } from "@/config/nav";
import SiteTopBar from "@/components/layout/SiteTopBar";
import Button from "@/components/ui/Button";

/** Leaf only — centered between Massage and Academy columns (desktop). */
const navLeafClass =
  "h-10 w-auto max-h-[2.75rem] shrink-0 object-contain sm:h-11 sm:max-h-[3rem] md:h-12 md:max-h-[3.25rem]";

export default function Navbar() {
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const tCta = useTranslations("ctas");
  const tCommon = useTranslations("common");
  const [menuOpen, setMenuOpen] = useState(false);
  const [navSolid, setNavSolid] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setNavSolid(false);
      return;
    }
    const update = () => {
      const threshold = Math.min(window.innerHeight * 0.5, 480);
      setNavSolid(window.scrollY > threshold);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const overlayNav = isHome && !navSolid;

  const linkBarBase =
    "relative z-0 inline-flex min-h-[2rem] shrink-0 items-center justify-center whitespace-nowrap rounded-md px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-150 ease-out will-change-transform hover:z-10 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  // Inactive: fast background flash on hover so it feels instant
  const linkBarInactive = overlayNav
    ? "text-white/80 hover:bg-white/25 hover:text-white hover:shadow-md focus-visible:ring-white/60 focus-visible:ring-offset-transparent"
    : "text-stone-600 hover:bg-brand-200 hover:text-brand-950 hover:shadow-sm focus-visible:ring-brand-500 focus-visible:ring-offset-brand-100";

  // Active: solid background + contrasting text + bottom bar indicator
  const linkBarActive = overlayNav
    ? "bg-white/25 text-white shadow-sm after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-white after:content-[''] hover:bg-white/35 hover:shadow-md"
    : "bg-brand-100 text-brand-800 shadow-sm after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-brand-leaf after:content-[''] hover:bg-brand-200 hover:text-brand-900 hover:shadow-md";

  const mobileDrawerCtaVariant = isHome ? "navPillSpa" : "navPill";
  const headerBarFocus = overlayNav ? "focus-visible:ring-offset-transparent" : "focus-visible:ring-offset-brand-100";

  const academySectionHref = navPaths.academy.sectionHref;
  const academySectionActive = pathname === academySectionHref;

  const bookingHref = siteConfig.ctas.bookingUrl;
  const enrollHref = siteConfig.ctas.enrollPath;

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[60] w-full">
        <SiteTopBar overlayNav={overlayNav} />
        <header
          className={`overflow-x-clip overflow-y-visible transition-[background-color,border-color,box-shadow] duration-300 sm:overflow-x-visible ${
            overlayNav
              ? "border-b border-transparent bg-transparent shadow-none"
              : "border-b border-brand-200/70 bg-brand-100/95 shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-brand-100/90"
          }`}
        >
          <div className="mx-auto w-full max-w-7xl px-3 sm:px-5 lg:px-8 xl:max-w-[90rem]">
            <div className="flex items-stretch justify-between gap-2 pt-2 pb-1.5 md:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className={`flex shrink-0 flex-col items-center justify-center gap-1.5 self-stretch rounded-xl border px-2 transition-all duration-200 ease-out hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  overlayNav
                    ? "border-white/45 text-white hover:border-white/70 hover:bg-white/15 hover:shadow-md focus-visible:ring-white/60 focus-visible:ring-offset-transparent"
                    : "border-stone-300 text-stone-600 hover:border-stone-400 hover:bg-white/70 hover:text-stone-900 hover:shadow-md focus-visible:ring-brand-500 focus-visible:ring-offset-brand-100"
                }`}
                aria-label={menuOpen ? tCommon("closeMenu") : tCommon("openMenu")}
                aria-expanded={menuOpen}
              >
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
              </button>
              <div className="flex min-h-0 min-w-0 shrink-0 items-stretch gap-1.5 sm:gap-2">
                <Button
                  href={bookingHref}
                  variant="navBarSpa"
                  className={`shrink-0 whitespace-nowrap ${headerBarFocus}`}
                >
                  {tCta("primary")}
                </Button>
                <Button
                  href={enrollHref}
                  variant="navBarSpa"
                  className={`shrink-0 whitespace-nowrap ${headerBarFocus}`}
                >
                  {tNav("academy.enrollLabel")}
                </Button>
              </div>
            </div>

            <div className="hidden w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] grid-rows-[auto_auto_auto] content-start items-center gap-x-0 gap-y-0 py-1 pb-1.5 md:grid [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0">
              <nav
                className="col-start-1 row-start-1 flex min-h-[2.75rem] w-full min-w-0 max-w-full flex-nowrap items-center justify-end gap-1 overflow-x-auto overflow-y-visible pr-1 md:gap-1.5 md:pr-2 lg:gap-2 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
                aria-label={tCommon("navMassageClinic")}
              >
                <Button
                  href={bookingHref}
                  variant="navBarSpa"
                  className={`shrink-0 whitespace-nowrap ${headerBarFocus}`}
                >
                  {tCta("primary")}
                </Button>
                {navPaths.clinic.links.map(({ href, labelKey }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`${linkBarBase} shrink-0 whitespace-nowrap ${
                      pathname === href ? linkBarActive : linkBarInactive
                    }`}
                  >
                    {tNav(`clinic.${labelKey}`)}
                  </Link>
                ))}
              </nav>
              <div className="relative z-20 col-start-2 row-start-1 flex min-h-[2.75rem] shrink-0 flex-col items-center justify-center gap-1 justify-self-center px-1 pb-1 sm:px-2">
                <Link
                  href="/"
                  className={`flex shrink-0 items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    overlayNav
                      ? "focus-visible:ring-white/70 focus-visible:ring-offset-transparent"
                      : "focus-visible:ring-brand-500 focus-visible:ring-offset-brand-100"
                  }`}
                  aria-label={tCommon("homeAria")}
                >
                  <Image
                    src="/Leaf-brand2.png"
                    alt=""
                    width={1052}
                    height={1008}
                    className={navLeafClass}
                    sizes="(max-width: 768px) 128px, 160px"
                    priority
                  />
                </Link>
              </div>
              <nav
                className="col-start-3 row-start-1 flex min-h-[2.75rem] w-full min-w-0 max-w-full flex-nowrap items-center justify-start gap-1 overflow-x-auto overflow-y-visible pl-1 md:gap-1.5 md:pl-2 lg:gap-2 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
                aria-label={tCommon("navAcademy")}
              >
                <Link
                  href={academySectionHref}
                  className={`${linkBarBase} shrink-0 whitespace-nowrap ${
                    academySectionActive ? linkBarActive : linkBarInactive
                  }`}
                >
                  {tNav("academy.sectionLabel")}
                </Link>
                {navPaths.academy.links.map(({ href, labelKey }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`${linkBarBase} shrink-0 whitespace-nowrap ${
                      pathname === href ? linkBarActive : linkBarInactive
                    }`}
                  >
                    {tNav(`academy.links.${labelKey}`)}
                  </Link>
                ))}
                <Button
                  href={enrollHref}
                  variant="navBarSpa"
                  className={`shrink-0 whitespace-nowrap ${headerBarFocus}`}
                >
                  {tNav("academy.enrollLabel")}
                </Button>
              </nav>
              <Brand
                tone={overlayNav ? "onDark" : "default"}
                variant="headerCenter"
                wideTitleRule
                navGridAlign
              />
            </div>

            <div className="pb-2 pt-1 md:hidden">
              <Link
                href="/"
                className={`block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  overlayNav
                    ? "focus-visible:ring-white/70 focus-visible:ring-offset-transparent"
                    : "focus-visible:ring-brand-500 focus-visible:ring-offset-brand-100"
                }`}
                aria-label={tCommon("homeAriaFull")}
              >
                <Brand
                  tone={overlayNav ? "onDark" : "default"}
                  variant="headerCenter"
                  wideTitleRule
                />
              </Link>
            </div>
          </div>
        </header>
      </div>

      <div
        className={`fixed inset-0 z-[54] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`fixed bottom-0 left-0 z-[55] flex w-[min(100vw,20rem)] max-w-[85vw] flex-col overflow-hidden rounded-r-3xl border-y border-r border-white/50 border-l-0 bg-white/25 shadow-2xl shadow-black/10 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/18 transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
        }`}
        style={{ top: "7.25rem" }}
        role="dialog"
        aria-modal={menuOpen}
        aria-hidden={!menuOpen}
        aria-label={tCommon("siteMenu")}
      >
        <nav className="flex max-h-[calc(100dvh-7.25rem)] flex-col gap-1.5 overflow-y-auto px-4 pb-6 pt-3">
          <p className="w-full px-2 pb-1 pt-1 text-center text-lg font-bold uppercase tracking-[0.14em] text-stone-800">
            {tCommon("massages")}
          </p>
          <Button
            href={bookingHref}
            variant={mobileDrawerCtaVariant}
            onClick={() => setMenuOpen(false)}
            className="mx-2 mb-1 mt-1 block text-center focus-visible:ring-offset-transparent"
          >
            {tCta("primary")}
          </Button>
          {navPaths.clinic.links.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-xl px-2 py-2 transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-sm ${
                isHome
                  ? "text-[11px] font-semibold uppercase tracking-[0.14em]"
                  : "text-sm font-medium"
              } ${
                pathname === href
                  ? "bg-white/45 text-brand-900 hover:bg-white/55"
                  : "text-stone-800 hover:bg-white/35 hover:text-stone-950"
              }`}
            >
              {tNav(`clinic.${labelKey}`)}
            </Link>
          ))}
          <p className="mt-3 w-full px-2 pb-1 pt-1 text-center text-lg font-bold uppercase tracking-[0.14em] text-stone-800">
            {tNav("academy.sectionLabel")}
          </p>
          <Link
            href={academySectionHref}
            onClick={() => setMenuOpen(false)}
            className={`rounded-xl px-2 py-2 transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-sm ${
              isHome
                ? "text-[11px] font-semibold uppercase tracking-[0.14em]"
                : "text-sm font-medium"
            } ${
              academySectionActive
                ? "bg-white/45 text-brand-900 hover:bg-white/55"
                : "text-stone-800 hover:bg-white/35 hover:text-stone-950"
            }`}
          >
            {tNav("academy.sectionLabel")}
          </Link>
          {navPaths.academy.links.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-xl px-2 py-2 transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-sm ${
                isHome
                  ? "text-[11px] font-semibold uppercase tracking-[0.14em]"
                  : "text-sm font-medium"
              } ${
                pathname === href
                  ? "bg-white/45 text-brand-900 hover:bg-white/55"
                  : "text-stone-800 hover:bg-white/35 hover:text-stone-950"
              }`}
            >
              {tNav(`academy.links.${labelKey}`)}
            </Link>
          ))}
          <Button
            href={enrollHref}
            variant={mobileDrawerCtaVariant}
            onClick={() => setMenuOpen(false)}
            className="mx-2 mb-1 mt-3 block text-center focus-visible:ring-offset-transparent"
          >
            {tNav("academy.enrollLabel")}
          </Button>
        </nav>
      </div>
    </>
  );
}
