import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteContent } from "@/data/siteContent";

/** `courses` is served by `app/academy/courses/page.tsx`. */
const SLUGS = ["schedule", "certification"] as const;
type Slug = (typeof SLUGS)[number];

const pages: Record<
  Slug,
  { title: string; description: string; heading: string; body: string }
> = {
  schedule: {
    title: "Schedule | ProMassage Academy",
    description: "Academy class and program schedule at ProMassage.",
    heading: "Schedule",
    body: "Program dates and class times will be published here. Contact us for the current term schedule.",
  },
  certification: {
    title: "Certification | ProMassage Academy",
    description: "Certification pathways at ProMassage Academy in Kirkland.",
    heading: "Certification",
    body: "Certification requirements and pathways will be outlined here. Reach out through Contact for advising.",
  },
};

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const slug = params.slug as Slug;
  if (!SLUGS.includes(slug)) {
    return { title: "Academy" };
  }
  const p = pages[slug];
  return { title: p.title, description: p.description };
}

export default function AcademySubPage({ params }: Props) {
  const slug = params.slug as Slug;
  if (!SLUGS.includes(slug)) {
    notFound();
  }
  const p = pages[slug];

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-600">
        <Link href="/academy" className="hover:underline">
          Academy
        </Link>
      </p>
      <h1 className="mb-6 font-serif text-4xl text-stone-900 sm:text-5xl">{p.heading}</h1>
      <p className="leading-relaxed text-stone-600">{p.body}</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href={siteContent.ctas.enrollUrl}
          className="inline-flex items-center justify-center rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          {siteContent.nav.academy.enrollLabel}
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800 transition-colors hover:bg-stone-50"
        >
          Contact
        </Link>
      </div>
    </section>
  );
}
