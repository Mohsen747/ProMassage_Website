import type { Metadata } from "next";
import Link from "next/link";
import { siteContent } from "@/data/siteContent";

const { enroll } = siteContent;

export const metadata: Metadata = {
  title: enroll.meta.title,
  description: enroll.meta.description,
};

export default function EnrollPage() {
  return (
    <>
      <section className="bg-brand-950 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-300">
            ProMassage Clinic &amp; Academy
          </p>
          <h1 className="mb-5 font-serif text-4xl sm:text-5xl">{enroll.hero.title}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-brand-100/90">{enroll.hero.intro}</p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ul className="space-y-5 text-stone-700">
            {enroll.points.map((text) => (
              <li key={text} className="flex gap-3 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
                {text}
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={siteContent.ctas.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-brand-spa px-8 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-brand-spaDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2"
            >
              {enroll.ctaOnline}
            </Link>
            <Link
              href={siteContent.nav.academy.sectionHref}
              className="inline-flex items-center justify-center rounded-md border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              {enroll.ctaAcademy}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
