import Link from "next/link";
import { siteContent } from "@/data/siteContent";

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-stone-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Massage (clinic) */}
          <div>
            <p className="text-lg font-bold uppercase tracking-widest text-stone-500 mb-4">
              Massage
            </p>
            <nav className="flex flex-col gap-2">
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

          {/* Academy */}
          <div>
            <p className="text-lg font-bold uppercase tracking-widest text-stone-500 mb-4">
              {siteContent.nav.academy.sectionLabel}
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
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-lg font-bold uppercase tracking-widest text-stone-500 mb-4">
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
          &copy; {new Date().getFullYear()} · {siteContent.footer.attribution.creditLeadIn}{" "}
          <a
            href={siteContent.footer.attribution.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 hover:text-stone-400 underline-offset-2 hover:underline transition-colors"
          >
            {siteContent.footer.attribution.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
