import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { getFaqs } from "@/data/faqs";
import FaqAccordion from "@/components/sections/FaqAccordion";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "faqMeta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function FaqPage() {
  const t = await getTranslations("faqPage");
  const tCta = await getTranslations("ctas");
  const tEyebrow = await getTranslations("eyebrow");
  const faqs = await getFaqs();

  return (
    <>
      <section className="bg-brand-950 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-300 text-xs font-semibold uppercase tracking-widest mb-4">
            {tEyebrow("kirkland")}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-white mb-5">{t("title")}</h1>
          <p className="text-brand-100/90 text-lg leading-relaxed max-w-2xl">{t("intro")}</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <section className="bg-brand-500 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-5">{t("readyTitle")}</h2>
          <p className="text-brand-100 text-lg leading-relaxed mb-10">{t("readyBody")}</p>
          <Button href={siteConfig.ctas.bookingUrl} variant="inverse">
            {tCta("primary")}
          </Button>
        </div>
      </section>
    </>
  );
}
