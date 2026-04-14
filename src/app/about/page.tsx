import type { Metadata } from "next";
import Link from "next/link";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: siteContent.about.meta.title,
  description: siteContent.about.meta.description,
};

const { hero, sections, cta } = siteContent.about;

export default function AboutPage() {
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

      {/* Content sections */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-stone-100">
            {sections.map((section, i) => (
              <div key={i} className="py-12 first:pt-0">
                <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 mb-5">
                  {section.title}
                </h2>
                {"text" in section && section.text && (
                  <p className="text-stone-600 leading-relaxed">{section.text}</p>
                )}
                {"bullets" in section && section.bullets && (
                  <ul className="space-y-3 mt-4">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-stone-700"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-500 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-10">
            {cta.title}
          </h2>
          <Link
            href={siteContent.ctas.bookingUrl}
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-brand-800 font-medium rounded-md hover:bg-brand-50 transition-colors duration-200 text-base"
          >
            {cta.cta}
          </Link>
        </div>
      </section>
    </>
  );
}
