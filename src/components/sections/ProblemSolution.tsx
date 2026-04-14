import Link from "next/link";
import { siteContent } from "@/data/siteContent";

const { problemSolution } = siteContent.home;

export default function ProblemSolution() {
  return (
    <section id="discover" className="scroll-mt-28 py-20 md:py-28 bg-brand-50 md:scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: text */}
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mb-6 leading-snug">
              {problemSolution.title}
            </h2>
            <p className="text-stone-600 leading-relaxed mb-5">
              {problemSolution.text1}
            </p>
            <p className="text-stone-600 leading-relaxed mb-8">
              {problemSolution.text2}
            </p>
            <Link
              href={siteContent.ctas.bookingUrl}
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 text-white font-medium rounded-md hover:bg-brand-700 transition-colors duration-200"
            >
              {problemSolution.cta}
            </Link>
          </div>

          {/* Right: bullets */}
          <div className="bg-brand-50 border border-brand-200 rounded-sm p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-5">
              Common areas we address
            </p>
            <ul className="space-y-3">
              {problemSolution.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span className="text-stone-700">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
