import type { Metadata } from "next";
import Link from "next/link";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Pricing | ProMassage",
  description:
    "Massage therapy pricing and session options at ProMassage in Kirkland, Quebec.",
};

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <h1 className="mb-4 font-serif text-4xl text-stone-900 sm:text-5xl">Pricing</h1>
      <p className="mb-8 text-lg leading-relaxed text-stone-600">
        Rates and packages for therapeutic massage will be listed here. Book online for current availability and
        pricing at checkout.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          href={siteContent.ctas.bookingUrl}
          className="inline-flex items-center justify-center rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          {siteContent.ctas.primary}
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center justify-center rounded-md border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800 transition-colors hover:bg-stone-50"
        >
          Massage Services
        </Link>
      </div>
    </section>
  );
}
