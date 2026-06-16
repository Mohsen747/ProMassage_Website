import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Button from "@/components/ui/Button";
import ClinicPageHeader from "@/components/layout/ClinicPageHeader";
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
      <ClinicPageHeader
        eyebrow={tEyebrow("kirkland")}
        title={t("hero.title")}
        subtitle={t("hero.intro")}
      />

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
            <Button href={siteConfig.ctas.bookingUrl} variant="linkUnderlined" className="text-sm">
              {tSvcPage("seeAvailability")}
            </Button>
            .
          </p>
        </div>
      </section>

      <section className="bg-brand-500 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-5">{t("closingCta.title")}</h2>
          <p className="text-brand-100 text-lg leading-relaxed mb-10">{t("closingCta.text")}</p>
          <Button href={siteConfig.ctas.bookingUrl} variant="inverse">
            {t("closingCta.cta")}
          </Button>
        </div>
      </section>
    </>
  );
}
