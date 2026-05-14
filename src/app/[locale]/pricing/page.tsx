import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Button from "@/components/ui/Button";
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
        <Button href="/services" variant="linkUnderlined" className="text-lg">
          {t("introLink")}
        </Button>
        {t("introSuffix")}
      </p>
      <div className="mb-10 flex flex-wrap gap-4">
        <Button href={siteConfig.ctas.bookingUrl} variant="primaryBold">
          {tCta("primary")}
        </Button>
        <Button href="/services" variant="outlineStone">
          {t("massageServicesCta")}
        </Button>
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
