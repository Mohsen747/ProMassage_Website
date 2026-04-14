import type { Metadata } from "next";
import Link from "next/link";
import { siteContent } from "@/data/siteContent";
import { faqs } from "@/data/faqs";
import FaqAccordion from "@/components/sections/FaqAccordion";

export const metadata: Metadata = {
  title: siteContent.faq.meta.title,
  description: siteContent.faq.meta.description,
};

export default function FaqPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-950 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-300 text-xs font-semibold uppercase tracking-widest mb-4">
            ProMassage &mdash; Kirkland, Quebec
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-white mb-5">
            Frequently Asked Questions
          </h1>
          <p className="text-brand-100/90 text-lg leading-relaxed max-w-2xl">
            Here are answers to common questions to help you feel comfortable
            before booking your session.
          </p>
        </div>
      </section>

      {/* FAQ content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-500 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-5">
            Ready to book your session?
          </h2>
          <p className="text-brand-100 text-lg leading-relaxed mb-10">
            Online booking is simple and available any time through JaneApp.
          </p>
          <Link
            href={siteContent.ctas.bookingUrl}
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-brand-800 font-medium rounded-md hover:bg-brand-50 transition-colors duration-200 text-base"
          >
            {siteContent.ctas.primary}
          </Link>
        </div>
      </section>
    </>
  );
}
