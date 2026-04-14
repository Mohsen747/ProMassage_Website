import Link from "next/link";
import { siteContent } from "@/data/siteContent";

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-stone-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-serif text-lg text-white mb-3">
              {siteContent.brand}
            </p>
            <p className="text-sm leading-relaxed text-stone-400">
              {siteContent.footer.text}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-4">
              Navigation
            </p>
            <nav className="flex flex-col gap-2">
              <Link
                href={siteContent.nav.academy.sectionHref}
                className="text-sm text-stone-400 hover:text-white transition-colors duration-150"
              >
                {siteContent.nav.academy.sectionLabel}
              </Link>
              {siteContent.nav.academy.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-stone-400 hover:text-white transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={siteContent.ctas.enrollUrl}
                className="text-sm text-brand-300 hover:text-brand-200 transition-colors duration-150"
              >
                {siteContent.nav.academy.enrollLabel}
              </Link>
              {siteContent.nav.clinic.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-stone-400 hover:text-white transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={siteContent.ctas.bookingUrl}
                className="text-sm text-brand-300 hover:text-brand-200 transition-colors duration-150"
              >
                {siteContent.ctas.primary}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-4">
              Contact
            </p>
            <address className="not-italic flex flex-col gap-2 text-sm text-stone-400">
              <span>{siteContent.footer.contact.location}</span>
              <span>{siteContent.footer.contact.booking}</span>
              <Link
                href={siteContent.ctas.bookingUrl}
                className="mt-2 inline-flex items-center justify-center px-5 py-2.5 bg-brand-600 text-white text-sm font-medium rounded-md hover:bg-brand-700 transition-colors duration-200 w-fit"
              >
                Book Now
              </Link>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-800 text-center text-xs text-stone-600">
          &copy; {new Date().getFullYear()} {siteContent.brand}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
