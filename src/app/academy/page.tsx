import type { Metadata } from "next";
import Link from "next/link";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Academy | ProMassage",
  description:
    "ProMassage Academy — courses, schedule, certification, and enrollment for massage therapy training in Kirkland.",
};

export default function AcademyPage() {
  const { academy } = siteContent.nav;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <h1 className="mb-4 font-serif text-4xl text-stone-900 sm:text-5xl">Academy</h1>
      <p className="mb-10 text-lg leading-relaxed text-stone-600">
        Programs, schedule, and certification paths at ProMassage Clinic &amp; Academy.
      </p>
      <ul className="space-y-3 border-t border-stone-200 pt-8">
        {academy.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-brand-700 font-medium hover:text-brand-900 hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={siteContent.ctas.enrollUrl}
        className="mt-10 inline-flex items-center justify-center rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        {academy.enrollLabel}
      </Link>
    </section>
  );
}
