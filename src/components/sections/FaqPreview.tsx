import Link from "next/link";
import { siteContent } from "@/data/siteContent";

const { faqPreview } = siteContent.home;

export default function FaqPreview() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mb-4">
              {faqPreview.title}
            </h2>
            <p className="text-stone-600 leading-relaxed mb-8">
              {faqPreview.text}
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center px-6 py-3 border border-brand-600 text-brand-700 font-medium rounded-md hover:bg-brand-50 transition-colors duration-200"
            >
              {faqPreview.cta}
            </Link>
          </div>

          <ul className="space-y-3">
            {faqPreview.questions.map((q) => (
              <li key={q}>
                <Link
                  href="/faq"
                  className="flex items-start gap-3 group py-3 border-b border-brand-100 hover:border-brand-200 transition-colors duration-150"
                >
                  <span className="mt-0.5 text-brand-500 text-sm select-none">
                    Q
                  </span>
                  <span className="text-stone-700 group-hover:text-stone-900 text-sm leading-relaxed transition-colors duration-150">
                    {q}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
