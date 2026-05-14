import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const tEyebrow = await getTranslations("eyebrow");
  const sections = t.raw("sections") as Array<{
    title: string;
    text?: string;
    bullets?: string[];
  }>;

  return (
    <>
      <section className="bg-brand-950 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-300 text-xs font-semibold uppercase tracking-widest mb-4">
            {tEyebrow("kirkland")}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-white mb-5">{t("hero.title")}</h1>
          <p className="text-brand-100/90 text-lg leading-relaxed max-w-2xl">{t("hero.intro")}</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-stone-100">
            {sections.map((section, i) => (
              <div key={i} className="py-12 first:pt-0">
                <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 mb-5">{section.title}</h2>
                {section.text ? (
                  <p className="text-stone-600 leading-relaxed">{section.text}</p>
                ) : null}
                {section.bullets ? (
                  <ul className="space-y-3 mt-4">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-stone-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-500 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-10">{t("cta.title")}</h2>
          <Button href={siteConfig.ctas.bookingUrl} variant="inverse">
            {t("cta.cta")}
          </Button>
        </div>
      </section>
    </>
  );
}
