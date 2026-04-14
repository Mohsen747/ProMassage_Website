import type { Metadata } from "next";
import Link from "next/link";
import { siteContent } from "@/data/siteContent";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: siteContent.contact.meta.title,
  description: siteContent.contact.meta.description,
};

const { hero, info, formIntro, location } = siteContent.contact;

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-950 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-300 text-xs font-semibold uppercase tracking-widest mb-4">
            ProMassage &mdash; Kirkland, Quebec
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-white mb-5">
            {hero.title}
          </h1>
          <p className="text-brand-100/90 text-lg leading-relaxed max-w-2xl">
            {hero.intro}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-14 lg:gap-20">
            {/* Contact info + form */}
            <div>
              <h2 className="font-serif text-2xl text-stone-900 mb-6">
                {info.title}
              </h2>
              <address className="not-italic space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-brand-500 text-sm select-none font-medium w-20 shrink-0">
                    Location
                  </span>
                  <span className="text-stone-700 text-sm">{info.location}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-brand-500 text-sm select-none font-medium w-20 shrink-0">
                    Booking
                  </span>
                  <span className="text-stone-700 text-sm">{info.booking}</span>
                </div>
              </address>

              <Link
                href={siteContent.ctas.bookingUrl}
                className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 text-white font-medium rounded-md hover:bg-brand-700 transition-colors duration-200 mb-10"
              >
                {siteContent.ctas.primary}
              </Link>

              <div className="border-t border-stone-100 pt-10">
                <p className="text-stone-500 text-sm leading-relaxed mb-6">
                  {formIntro}
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Location info */}
            <div className="md:pt-10">
              <div className="bg-brand-50 border border-brand-200 rounded-sm p-8 mb-6">
                <h2 className="font-serif text-xl text-stone-900 mb-3">
                  {location.title}
                </h2>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  {location.text}
                </p>
                <a
                  href="https://maps.google.com/?q=Kirkland,+Quebec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-700 text-sm font-medium hover:text-brand-900 transition-colors duration-150"
                >
                  Get Directions
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>

              {/* Trust badges */}
              <div className="bg-brand-50 border border-brand-100 rounded-sm p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
                  What to expect
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Easy online booking",
                    "Professional therapeutic care",
                    "Personalized sessions",
                    "Calm and welcoming environment",
                    "Focused on your comfort and recovery",
                  ].map((badge) => (
                    <li
                      key={badge}
                      className="flex items-start gap-2 text-sm text-stone-700"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      {badge}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
