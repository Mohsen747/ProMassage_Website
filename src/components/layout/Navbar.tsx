"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Brand } from "@/components/brand";
import { siteContent } from "@/data/siteContent";

/** Default booking CTA (inner pages + home scrolled). */
const navCtaDefaultClass =
  "rounded-md bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors duration-200 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2";

/** Home hero — teal CTA, rounded corners. */
const navCtaHomeClass =
  "rounded-md bg-brand-spa px-8 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-brand-spaDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2";

/** Tighter Book / Enroll for single-row transparent header (fits with all links). */
const navCtaHomeBarClass =
  "rounded-md bg-brand-spa px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:bg-brand-spaDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 sm:px-4 sm:text-[11px] sm:tracking-[0.18em]";

/** Leaf only — centered between Academy and Massage columns (desktop). */
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

  const overlayNav = isHome && !navSolid;

  /** Desktop top row (home + inner pages): same compact caps as home hero. */
  const linkBarBase =
    "text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-150 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const linkBarInactive = overlayNav
    ? "text-white/80 hover:text-white focus-visible:ring-white/60 focus-visible:ring-offset-transparent"
    : "text-stone-600 hover:text-stone-900 focus-visible:ring-brand-500 focus-visible:ring-offset-brand-50";

  const linkBarActive = overlayNav ? "text-white" : "text-brand-700";

  const navCtaClass = isHome ? navCtaHomeClass : navCtaDefaultClass;
  /** Top bar Enroll + Book — teal rounded, all routes (matches home). */
  const headerBarCtaClass = navCtaHomeBarClass;

  const { academy, clinic } = siteContent.nav;
  const academySectionActive =
    pathname === academy.sectionHref || pathname.startsWith(`${academy.sectionHref}/`);

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 w-full">
        <header
          className={`overflow-x-auto overflow-y-visible transition-[background-color,border-color,box-shadow] duration-300 ${
            overlayNav
              ? "border-b border-transparent bg-transparent shadow-none"
              : "border-b border-brand-200 bg-brand-50/95 shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-brand-50/90"
          }`}
        >
          <div className="mx-auto w-full max-w-7xl px-3 sm:px-5 lg:px-8 xl:max-w-[90rem]">
            <div className="flex items-center justify-between gap-2 py-1 md:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className={`shrink-0 rounded-md p-2 transition-colors ${
                  overlayNav
                    ? "text-white hover:bg-white/10"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <span className="mb-1.5 block h-px w-5 bg-current" />
                <span className="mb-1.5 block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
              </button>
              <div className="flex min-w-0 shrink-0 gap-1.5 sm:gap-2">
                <Link
                  href={siteContent.ctas.enrollUrl}
                  className={`${headerBarCtaClass} shrink-0 whitespace-nowrap ${
                    overlayNav ? "focus-visible:ring-offset-transparent" : "focus-visible:ring-offset-brand-50"
                  }`}
                >
                  {academy.enrollLabel}
                </Link>
                <Link
                  href={siteContent.ctas.bookingUrl}
                  className={`${headerBarCtaClass} shrink-0 whitespace-nowrap ${
                    overlayNav ? "focus-visible:ring-offset-transparent" : "focus-visible:ring-offset-brand-50"
                  }`}
                >
                  {siteContent.ctas.primary}
                </Link>
              </div>
            </div>

            {/*
              Desktop: one grid so column 1 / 3 widths match the wordmark rule segments; left nav
              ends at the inner edge of the left line, right nav starts at the inner edge of the right line.
            */}
            {/*
              `content-start` avoids stretching rows when the grid is taller than content (was
              forcing a huge gap between “ProMassage” and “Clinic & Academy”). Row 1 keeps a stable
              tap height via min-h on the three cells only.
            */}
            <div className="hidden w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] grid-rows-[auto_auto_auto] content-start items-center gap-x-0 gap-y-0 py-1 pb-1.5 md:grid [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0">
              <nav
                className="col-start-1 row-start-1 flex min-h-[2.75rem] min-w-0 flex-nowrap items-center justify-end gap-1.5 overflow-x-auto overflow-y-visible md:gap-2 lg:gap-2.5 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
                aria-label="Academy"
              >
                <Link
                  href={siteContent.ctas.enrollUrl}
                  className={`${headerBarCtaClass} shrink-0 whitespace-nowrap ${
                    overlayNav ? "focus-visible:ring-offset-transparent" : "focus-visible:ring-offset-brand-50"
                  }`}
                >
                  {academy.enrollLabel}
                </Link>
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
              </nav>
              <Link
                href="/"
                className={`col-start-2 row-start-1 flex min-h-[2.75rem] shrink-0 items-center justify-self-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  overlayNav
                    ? "focus-visible:ring-white/70 focus-visible:ring-offset-transparent"
                    : "focus-visible:ring-brand-500 focus-visible:ring-offset-brand-50"
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
                className="col-start-3 row-start-1 flex min-h-[2.75rem] min-w-0 flex-nowrap items-center justify-start gap-1.5 overflow-x-auto overflow-y-visible md:gap-2 lg:gap-2.5 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
                aria-label="Massage clinic"
              >
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
                <Link
                  href={siteContent.ctas.bookingUrl}
                  className={`${headerBarCtaClass} shrink-0 whitespace-nowrap ${
                    overlayNav ? "focus-visible:ring-offset-transparent" : "focus-visible:ring-offset-brand-50"
                  }`}
                >
                  {siteContent.ctas.primary}
                </Link>
              </nav>
              <Brand
                tone={overlayNav ? "onDark" : "default"}
                variant="headerCenter"
                wideTitleRule
                navGridAlign
              />
            </div>

            <div className="pb-1 pt-0 md:hidden">
              <Link
                href="/"
                className={`block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  overlayNav
                    ? "focus-visible:ring-white/70 focus-visible:ring-offset-transparent"
                    : "focus-visible:ring-brand-500 focus-visible:ring-offset-brand-50"
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

          {menuOpen && (
            <div className="border-t border-brand-200 bg-brand-50 px-4 pb-4 pt-2 md:hidden">
              <nav className="flex flex-col gap-1">
                <p className="px-2 pt-1 text-[10px] font-semibold uppercase tracking-widest text-stone-500">
                  Academy
                </p>
                <Link
                  href={siteContent.ctas.enrollUrl}
                  onClick={() => setMenuOpen(false)}
                  className={`${navCtaClass} mx-2 mb-1 mt-1 block text-center focus-visible:ring-offset-brand-50`}
                >
                  {academy.enrollLabel}
                </Link>
                <Link
                  href={academy.sectionHref}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-md px-2 py-2 transition-colors ${
                    isHome
                      ? "text-[11px] font-semibold uppercase tracking-[0.14em]"
                      : "text-sm font-medium"
                  } ${
                    academySectionActive
                      ? "bg-brand-100 text-brand-800"
                      : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  {academy.sectionLabel}
                </Link>
                {academy.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-md px-2 py-2 transition-colors ${
                      isHome
                        ? "text-[11px] font-semibold uppercase tracking-[0.14em]"
                        : "text-sm font-medium"
                    } ${
                      pathname === link.href
                        ? "bg-brand-100 text-brand-800"
                        : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <p className="mt-3 px-2 text-[10px] font-semibold uppercase tracking-widest text-stone-500">
                  Massage
                </p>
                {clinic.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-md px-2 py-2 transition-colors ${
                      isHome
                        ? "text-[11px] font-semibold uppercase tracking-[0.14em]"
                        : "text-sm font-medium"
                    } ${
                      pathname === link.href
                        ? "bg-brand-100 text-brand-800"
                        : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-3 flex flex-col gap-2">
                  <Link
                    href={siteContent.ctas.bookingUrl}
                    onClick={() => setMenuOpen(false)}
                    className={`${navCtaClass} block text-center focus-visible:ring-offset-brand-50`}
                  >
                    {siteContent.ctas.primary}
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </header>
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 z-50 overflow-hidden rounded-t-md border-t md:hidden ${
          isHome
            ? "border-white/15 bg-brand-spa"
            : "border-brand-800/20 bg-brand-600"
        }`}
      >
        <Link
          href={siteContent.ctas.bookingUrl}
          className="flex w-full items-center justify-center py-3.5 text-sm font-bold tracking-wide text-white"
        >
          {siteContent.ctas.mobile}
        </Link>
      </div>
    </>
  );
}
