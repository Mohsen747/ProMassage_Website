import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { getTestimonials } from "@/data/testimonials";

export default async function Testimonials() {
  const t = await getTranslations("home");
  const tCta = await getTranslations("ctas");
  const testimonials = await getTestimonials();

  return (
    <section className="py-20 md:py-28 bg-brand-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl text-white mb-14 text-center">
          {t("testimonials.title")}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <blockquote
              key={i}
              className="flex flex-col bg-brand-900/50 border border-brand-800 rounded-sm p-7"
            >
              <span className="text-brand-400 text-3xl leading-none mb-4 select-none">&ldquo;</span>
              <p className="text-brand-100/85 text-sm leading-relaxed flex-1 mb-6">{item.quote}</p>
              <footer className="text-xs text-brand-300/90 font-medium uppercase tracking-widest">
                &mdash; {item.name}
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={siteConfig.ctas.bookingUrl}
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 text-white font-medium rounded-md hover:bg-brand-700 transition-colors duration-200"
          >
            {tCta("primary")}
          </a>
        </div>
      </div>
    </section>
  );
}
