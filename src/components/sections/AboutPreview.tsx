import Link from "next/link";
import { siteContent } from "@/data/siteContent";

const { aboutPreview } = siteContent.home;

export default function AboutPreview() {
  return (
    <section className="py-20 md:py-28 bg-brand-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mb-6">
            {aboutPreview.title}
          </h2>
          <p className="text-stone-600 leading-relaxed mb-8">
            {aboutPreview.text}
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-brand-700 font-medium hover:text-brand-900 transition-colors duration-150"
          >
            {aboutPreview.cta}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
