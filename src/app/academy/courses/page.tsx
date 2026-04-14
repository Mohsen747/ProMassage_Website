import type { Metadata } from "next";
import Link from "next/link";
import { siteContent } from "@/data/siteContent";

const { courses } = siteContent;

export const metadata: Metadata = {
  title: courses.meta.title,
  description: courses.meta.description,
};

export default function AcademyCoursesPage() {
  return (
    <>
      <section className="bg-brand-950 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-300">
            <Link href="/academy" className="transition-colors hover:text-white">
              Academy
            </Link>
            <span className="text-brand-500"> / </span>
            Courses
          </p>
          <h1 className="mb-5 font-serif text-4xl sm:text-5xl">{courses.hero.title}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-brand-100/90">{courses.hero.intro}</p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {courses.pillars.map((block) => (
              <div key={block.title}>
                <h2 className="mb-3 font-serif text-2xl text-stone-900 sm:text-3xl">{block.title}</h2>
                <p className="leading-relaxed text-stone-600">{block.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 border-l-4 border-brand-500 pl-5 text-sm leading-relaxed text-stone-600">
            {courses.note}
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={siteContent.ctas.enrollUrl}
              className="inline-flex items-center justify-center rounded-md bg-brand-spa px-8 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-brand-spaDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2"
            >
              {courses.ctaEnroll}
            </Link>
            <Link
              href="/academy/schedule"
              className="inline-flex items-center justify-center rounded-md border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              {courses.ctaSchedule}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              {courses.ctaContact}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
