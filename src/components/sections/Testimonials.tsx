import Link from "next/link";
import { siteContent } from "@/data/siteContent";
import { testimonials } from "@/data/testimonials";

const { testimonials: copy } = siteContent.home;

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-brand-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl text-white mb-14 text-center">
          {copy.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="flex flex-col bg-brand-900/50 border border-brand-800 rounded-sm p-7"
            >
              <span className="text-brand-400 text-3xl leading-none mb-4 select-none">
                &ldquo;
              </span>
              <p className="text-brand-100/85 text-sm leading-relaxed flex-1 mb-6">
                {t.quote}
              </p>
              <footer className="text-xs text-brand-300/90 font-medium uppercase tracking-widest">
                &mdash; {t.name}
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={siteContent.ctas.bookingUrl}
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 text-white font-medium rounded-sm hover:bg-brand-700 transition-colors duration-200"
          >
            {siteContent.ctas.primary}
          </Link>
        </div>
      </div>
    </section>
  );
}
