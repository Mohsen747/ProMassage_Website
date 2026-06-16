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
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("pricingTitle"),
    description: t("pricingDescription"),
  };
}

export default async function PricingPage() {
  const t = await getTranslations("pricingPage");
  const tCta = await getTranslations("ctas");
  const tEyebrow = await getTranslations("eyebrow");
  const services = await getServicesList();

  return (
    <>
      <ClinicPageHeader
        eyebrow={tEyebrow("kirkland")}
        title={t("title")}
        subtitle={
          <>
            {t("intro")}{" "}
            <Button
              href="/services"
              variant="linkUnderlined"
              className="text-lg text-white decoration-white/50 hover:text-brand-100 hover:decoration-white"
            >
              {t("introLink")}
            </Button>
            {t("introSuffix")}
          </>
        }
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>
    </>
  );
}
