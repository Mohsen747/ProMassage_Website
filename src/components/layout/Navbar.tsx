"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Brand } from "@/components/brand";
import { siteContent } from "@/data/siteContent";

function telHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 ? `tel:${phone.replace(/[^\d+]/g, "") || digits}` : "#";
}

function mailHref(email: string) {
  return email.includes("@") ? `mailto:${email}` : "#";
}

/** Default booking CTA (inner pages + home scrolled). */
const navCtaDefaultClass =
  "rounded-sm bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors duration-200 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2";

/** Home hero overlay — Scandinave-style: square, muted teal, all-caps. */
const navCtaHomeClass =
  "rounded-none bg-brand-spa px-8 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-brand-spaDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2";

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

  const linkBase = [
    "transition-colors duration-150 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    isHome
      ? "text-[11px] font-semibold uppercase tracking-[0.16em]"
      : "text-sm font-medium",
  ].join(" ");

  const linkInactive = overlayNav
    ? "text-white/80 hover:text-white focus-visible:ring-white/60 focus-visible:ring-offset-transparent"
    : "text-stone-600 hover:text-stone-900 focus-visible:ring-brand-500 focus-visible:ring-offset-brand-50";

  const linkActive = overlayNav
    ? "text-white"
    : "text-brand-700";

  const navCtaClass = isHome ? navCtaHomeClass : navCtaDefaultClass;

  return (
    <>
      <div
        className={`left-0 right-0 z-50 w-full ${
          isHome ? "absolute top-0" : "sticky top-0"
        }`}
      >
        {isHome && (
          <div
            className={`border-b transition-colors duration-300 ${
              overlayNav
                ? "border-white/10 bg-black/20 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md"
                : "border-brand-200 bg-brand-50/95 py-2 text-xs font-medium text-stone-600"
            }`}
          >
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-1 px-4 sm:justify-end sm:px-6 lg:px-8">
              <a
                href={telHref(siteContent.contact.info.phone)}
                className={overlayNav ? "hover:text-white" : "hover:text-stone-900"}
              >
                {siteContent.contact.info.phone}
              </a>
              <a
                href={mailHref(siteContent.contact.info.email)}
                className={overlayNav ? "hover:text-white" : "hover:text-stone-900"}
              >
                {siteContent.contact.info.email}
              </a>
            </div>
          </div>
        )}

        <header
          className={`transition-[background-color,border-color,box-shadow] duration-300 ${
            overlayNav
              ? "border-b border-transparent bg-transparent"
              : "border-b border-brand-200 bg-brand-50/95 shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-brand-50/90"
          }`}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className={`flex items-center justify-between ${isHome ? "h-[4.25rem]" : "h-16"}`}>
              <Link
                href="/"
                className={`flex shrink-0 items-center rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  overlayNav
                    ? "focus-visible:ring-white/70 focus-visible:ring-offset-transparent"
                    : "focus-visible:ring-brand-500 focus-visible:ring-offset-brand-50"
                }`}
                aria-label="ProMassage CL&AC — home"
              >
                <Brand
                  tone={isHome && overlayNav ? "onDark" : "default"}
                  className="max-h-[3.25rem] w-auto max-w-[6.5rem] shrink-0 sm:max-h-[3.5rem] sm:max-w-[7rem] md:max-h-16 md:max-w-[7.5rem]"
                />
              </Link>

              <nav className={`hidden items-center md:flex ${isHome ? "gap-10" : "gap-8"}`}>
                {siteContent.nav.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${linkBase} ${
                      pathname === link.href ? linkActive : linkInactive
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={siteContent.ctas.bookingUrl}
                  className={`${navCtaClass} ${
                    overlayNav
                      ? "focus-visible:ring-offset-transparent"
                      : "focus-visible:ring-offset-brand-50"
                  }`}
                >
                  {siteContent.ctas.primary}
                </Link>
              </nav>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`rounded-sm p-2 transition-colors md:hidden ${
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
            </div>
          </div>

          {menuOpen && (
            <div className="border-t border-brand-200 bg-brand-50 px-4 pb-4 pt-2 md:hidden">
              <nav className="flex flex-col gap-1">
                {siteContent.nav.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded px-2 py-2 transition-colors ${
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
                <Link
                  href={siteContent.ctas.bookingUrl}
                  onClick={() => setMenuOpen(false)}
                  className={`${navCtaClass} mt-2 block text-center focus-visible:ring-offset-brand-50`}
                >
                  {siteContent.ctas.primary}
                </Link>
              </nav>
            </div>
          )}
        </header>
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 z-50 border-t md:hidden ${
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
