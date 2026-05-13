import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link as LocalizedLink } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { getServicesList } from "@/data/services";
import ServiceCard from "@/components/ui/ServiceCard";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("pricingTitle"),
    description: t("pricingDescription"),
  };
}

export default async function PricingPage() {
  const t = await getTranslations("pricingPage");
  const tCta = await getTranslations("ctas");
  const services = await getServicesList();

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <h1 className="mb-4 font-serif text-4xl text-stone-900 sm:text-5xl">{t("title")}</h1>
      <p className="mb-4 text-lg leading-relaxed text-stone-600">
        {t("intro")}{" "}
        <LocalizedLink
          href="/services"
          className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
        >
          {t("introLink")}
        </LocalizedLink>
        {t("introSuffix")}
      </p>
      <div className="mb-10 flex flex-wrap gap-4">
        <a
          href={siteConfig.ctas.bookingUrl}
          className="inline-flex items-center justify-center rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          {tCta("primary")}
        </a>
        <LocalizedLink
          href="/services"
          className="inline-flex items-center justify-center rounded-md border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800 transition-colors hover:bg-stone-50"
        >
          {t("massageServicesCta")}
        </LocalizedLink>
      </div>

      <h2 className="mb-6 font-sans text-sm font-bold uppercase tracking-wide text-stone-900">
        {t("currentRates")}
      </h2>
      <div className="flex flex-col gap-4">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} variant="preview" showPrice />
        ))}
      </div>
    </section>
  );
}
