import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { getServicesList } from "@/data/services";
import ServiceCard from "@/components/ui/ServiceCard";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ServicesPage() {
  const t = await getTranslations("services");
  const tEyebrow = await getTranslations("eyebrow");
  const tCommon = await getTranslations("common");
  const tSvcPage = await getTranslations("servicesPage");
  const services = await getServicesList();

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

      <section className="border-b border-brand-200 bg-brand-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 py-4">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="text-sm text-stone-600 transition-colors duration-150 hover:text-brand-700"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="bg-stone-100/80">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-sans text-xl font-bold uppercase tracking-wide text-stone-900">
            {tCommon("massotherapy")}
          </h2>
          <div className="flex flex-col gap-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} variant="full" />
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-stone-600">
            {tSvcPage("cantFindTime")}{" "}
            <a
              href={siteConfig.ctas.bookingUrl}
              className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
            >
              {tSvcPage("seeAvailability")}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bg-brand-500 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-5">{t("closingCta.title")}</h2>
          <p className="text-brand-100 text-lg leading-relaxed mb-10">{t("closingCta.text")}</p>
          <a
            href={siteConfig.ctas.bookingUrl}
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-brand-800 font-medium rounded-md hover:bg-brand-50 transition-colors duration-200 text-base"
          >
            {t("closingCta.cta")}
          </a>
        </div>
      </section>
    </>
  );
}
