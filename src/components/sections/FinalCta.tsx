import Link from "next/link";
import { siteContent } from "@/data/siteContent";

const { finalCta } = siteContent.home;

export default function FinalCta() {
  return (
    <section className="py-20 md:py-28 bg-brand-500 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl text-white mb-5 leading-snug">
          {finalCta.title}
        </h2>
        <p className="text-brand-100 text-lg leading-relaxed mb-10">
          {finalCta.text}
        </p>
        <Link
          href={siteContent.ctas.bookingUrl}
          className="inline-flex items-center justify-center px-10 py-4 bg-white text-brand-800 font-medium rounded-md hover:bg-brand-50 transition-colors duration-200 text-base mb-4"
        >
          {finalCta.cta}
        </Link>
        <p className="text-brand-200 text-sm mt-4">{finalCta.note}</p>
      </div>
    </section>
  );
}
