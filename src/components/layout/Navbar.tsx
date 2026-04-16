"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Brand } from "@/components/brand";
import { siteContent } from "@/data/siteContent";

/** Default booking CTA (inner pages + home scrolled). */
const navCtaDefaultClass =
  "rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 ease-out hover:scale-[1.03] hover:bg-brand-700 hover:shadow-lg active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2";

/** Home hero — teal CTA, rounded corners. */
const navCtaHomeClass =
  "rounded-xl bg-brand-spa px-8 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition-all duration-200 ease-out hover:scale-[1.03] hover:bg-brand-spaDark hover:shadow-lg active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2";

/** Tighter Book / Enroll for single-row transparent header (fits with all links). */
const navCtaHomeBarClass =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-brand-spa px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition-all duration-200 ease-out hover:scale-105 hover:bg-brand-spaDark hover:shadow-lg hover:ring-2 hover:ring-white/35 active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 sm:px-4 sm:text-[11px] sm:tracking-[0.18em]";

/** Leaf only — centered between Massage and Academy columns (desktop). */
const navLeafClass =
  "h-10 w-auto max-h-[2.75rem] shrink-0 object-contain sm:h-11 sm:max-h-[3rem] md:h-12 md:max-h-[3.25rem]";

export default function Navbar() {
  const pathname = usePathname();
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

  /** Desktop top row (home + inner pages): same compact caps as home hero. */
  const linkBarBase =
    "relative z-0 inline-flex min-h-[2rem] shrink-0 items-center justify-center whitespace-nowrap rounded-md px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-200 ease-out will-change-transform hover:z-10 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const linkBarInactive = overlayNav
    ? "text-white/80 hover:bg-white/20 hover:text-white hover:shadow-md focus-visible:ring-white/60 focus-visible:ring-offset-transparent"
    : "text-stone-600 hover:bg-brand-200/80 hover:text-brand-950 hover:shadow-md focus-visible:ring-brand-500 focus-visible:ring-offset-brand-100";

  const linkBarActive = overlayNav
    ? "text-white hover:bg-white/25 hover:shadow-md"
    : "text-brand-700 hover:bg-brand-200/80 hover:text-brand-950 hover:shadow-md";

  const navCtaClass = isHome ? navCtaHomeClass : navCtaDefaultClass;
  /** Top bar Enroll + Book — teal rounded, all routes (matches home). */
  const headerBarCtaClass = navCtaHomeBarClass;

  const { academy, clinic } = siteContent.nav;
  const academySectionActive =
    pathname === academy.sectionHref || pathname.startsWith(`${academy.sectionHref}/`);

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[60] w-full">
        <header
          className={`overflow-x-auto overflow-y-visible transition-[background-color,border-color,box-shadow] duration-300 ${
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
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
              </button>
              <div className="flex min-h-0 min-w-0 shrink-0 items-stretch gap-1.5 sm:gap-2">
                <Link
                  href={siteContent.ctas.bookingUrl}
                  className={`${headerBarCtaClass} shrink-0 whitespace-nowrap ${
                    overlayNav ? "focus-visible:ring-offset-transparent" : "focus-visible:ring-offset-brand-100"
                  }`}
                >
                  {siteContent.ctas.primary}
                </Link>
                <Link
                  href={siteContent.ctas.enrollUrl}
                  className={`${headerBarCtaClass} shrink-0 whitespace-nowrap ${
                    overlayNav ? "focus-visible:ring-offset-transparent" : "focus-visible:ring-offset-brand-100"
                  }`}
                >
                  {academy.enrollLabel}
                </Link>
              </div>
            </div>

            {/*
              Desktop: one grid so column 1 / 3 widths match the wordmark rule segments; each side’s
              links sit centered in that column.
            */}
            {/*
              `content-start` avoids stretching rows when the grid is taller than content (was
              forcing a huge gap between “ProMassage” and “Clinic & Academy”). Row 1 keeps a stable
              tap height via min-h on the three cells only.
            */}
            <div className="hidden w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] grid-rows-[auto_auto_auto] content-start items-center gap-x-0 gap-y-0 py-1 pb-1.5 md:grid [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0">
              <nav
                className="col-start-1 row-start-1 flex min-h-[2.75rem] w-full min-w-0 max-w-full flex-nowrap items-center justify-center gap-1.5 overflow-x-auto overflow-y-visible md:gap-2 lg:gap-2.5 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
                aria-label="Massage clinic"
              >
                <Link
                  href={siteContent.ctas.bookingUrl}
                  className={`${headerBarCtaClass} shrink-0 whitespace-nowrap ${
                    overlayNav ? "focus-visible:ring-offset-transparent" : "focus-visible:ring-offset-brand-100"
                  }`}
                >
                  {siteContent.ctas.primary}
                </Link>
                {clinic.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${linkBarBase} shrink-0 whitespace-nowrap ${
                      pathname === link.href ? linkBarActive : linkBarInactive
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Link
                href="/"
                className={`col-start-2 row-start-1 flex min-h-[2.75rem] shrink-0 items-center justify-self-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  overlayNav
                    ? "focus-visible:ring-white/70 focus-visible:ring-offset-transparent"
                    : "focus-visible:ring-brand-500 focus-visible:ring-offset-brand-100"
                }`}
                aria-label="ProMassage — home"
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
              <nav
                className="col-start-3 row-start-1 flex min-h-[2.75rem] w-full min-w-0 max-w-full flex-nowrap items-center justify-center gap-1.5 overflow-x-auto overflow-y-visible md:gap-2 lg:gap-2.5 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
                aria-label="Academy"
              >
                <Link
                  href={academy.sectionHref}
                  className={`${linkBarBase} shrink-0 whitespace-nowrap ${
                    academySectionActive ? linkBarActive : linkBarInactive
                  }`}
                >
                  {academy.sectionLabel}
                </Link>
                {academy.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${linkBarBase} shrink-0 whitespace-nowrap ${
                      pathname === link.href ? linkBarActive : linkBarInactive
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={siteContent.ctas.enrollUrl}
                  className={`${headerBarCtaClass} shrink-0 whitespace-nowrap ${
                    overlayNav ? "focus-visible:ring-offset-transparent" : "focus-visible:ring-offset-brand-100"
                  }`}
                >
                  {academy.enrollLabel}
                </Link>
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
                aria-label="ProMassage Clinic & Academy — home"
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

      {/* Mobile drawer: slides in from the left (below `md`). */}
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
        style={{ top: "5.25rem" }}
        role="dialog"
        aria-modal={menuOpen}
        aria-hidden={!menuOpen}
        aria-label="Site menu"
      >
        <nav className="flex max-h-[calc(100dvh-5.25rem)] flex-col gap-1.5 overflow-y-auto px-4 pb-6 pt-3">
          <p className="w-full px-2 pb-1 pt-1 text-center text-lg font-bold uppercase tracking-[0.14em] text-stone-800">
            Massages
          </p>
          <Link
            href={siteContent.ctas.bookingUrl}
            onClick={() => setMenuOpen(false)}
            className={`${navCtaClass} mx-2 mb-1 mt-1 block text-center focus-visible:ring-offset-transparent`}
          >
            {siteContent.ctas.primary}
          </Link>
          {clinic.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-xl px-2 py-2 transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-sm ${
                isHome
                  ? "text-[11px] font-semibold uppercase tracking-[0.14em]"
                  : "text-sm font-medium"
              } ${
                pathname === link.href
                  ? "bg-white/45 text-brand-900 hover:bg-white/55"
                  : "text-stone-800 hover:bg-white/35 hover:text-stone-950"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <p className="mt-3 w-full px-2 pb-1 pt-1 text-center text-lg font-bold uppercase tracking-[0.14em] text-stone-800">
            Academy
          </p>
          <Link
            href={academy.sectionHref}
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
            {academy.sectionLabel}
          </Link>
          {academy.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-xl px-2 py-2 transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-sm ${
                isHome
                  ? "text-[11px] font-semibold uppercase tracking-[0.14em]"
                  : "text-sm font-medium"
              } ${
                pathname === link.href
                  ? "bg-white/45 text-brand-900 hover:bg-white/55"
                  : "text-stone-800 hover:bg-white/35 hover:text-stone-950"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={siteContent.ctas.enrollUrl}
            onClick={() => setMenuOpen(false)}
            className={`${navCtaClass} mx-2 mb-1 mt-3 block text-center focus-visible:ring-offset-transparent`}
          >
            {academy.enrollLabel}
          </Link>
        </nav>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 md:hidden">
        <Link
          href={siteContent.ctas.bookingUrl}
          className={`pointer-events-auto mx-auto flex w-full max-w-lg items-center justify-center rounded-2xl border py-3.5 text-sm font-bold tracking-wide text-white shadow-lg transition-all duration-200 ease-out hover:brightness-110 active:scale-[0.99] active:brightness-95 ${
            isHome
              ? "border-white/20 bg-brand-spa hover:bg-brand-spaDark"
              : "border-brand-900/20 bg-brand-600 hover:bg-brand-700"
          }`}
        >
          {siteContent.ctas.mobile}
        </Link>
      </div>
    </>
  );
}
