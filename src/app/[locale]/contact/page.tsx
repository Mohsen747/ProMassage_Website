import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Button from "@/components/ui/Button";
import ClinicPageHeader from "@/components/layout/ClinicPageHeader";
import { siteConfig } from "@/config/site";
import ContactForm from "@/components/sections/ContactForm";
import LtrText from "@/components/ui/LtrText";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const tCta = await getTranslations("ctas");
  const tCommon = await getTranslations("common");
  const tEyebrow = await getTranslations("eyebrow");
  const tTrust = await getTranslations("contactTrust");
  const tRoot = await getTranslations();

  const trustItems = [
    tTrust("easyBooking"),
    tTrust("professionalCare"),
    tTrust("personalized"),
    tTrust("calmEnv"),
    tTrust("focusedComfort"),
  ];

  return (
    <>
      <ClinicPageHeader
        eyebrow={tEyebrow("kirkland")}
        title={t("hero.title")}
        subtitle={t("hero.intro")}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-14 lg:gap-20">
            <div>
              <h2 className="font-serif text-2xl text-stone-900 mb-6">{t("info.title")}</h2>
              <address className="not-italic space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-brand-500 text-sm select-none font-medium w-24 shrink-0 md:w-28">
                    {tCommon("location")}
                  </span>
                  <LtrText className="text-stone-700 text-sm">{t("info.location")}</LtrText>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-brand-500 text-sm select-none font-medium w-24 shrink-0 md:w-28">
                    {tCommon("booking")}
                  </span>
                  <span className="text-stone-700 text-sm">{tRoot("bookingVia")}</span>
                </div>
              </address>

              <Button href={siteConfig.ctas.bookingUrl} variant="primary" className="mb-10">
                {tCta("primary")}
              </Button>

              <div className="border-t border-stone-100 pt-10">
                <p className="text-stone-500 text-sm leading-relaxed mb-6">{t("formIntro")}</p>
                <ContactForm />
              </div>
            </div>

            <div className="md:pt-10">
              <div className="bg-brand-50 border border-brand-200 rounded-sm p-8 mb-6">
                <h2 className="font-serif text-xl text-stone-900 mb-3">{t("location.title")}</h2>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">{t("location.text")}</p>
                <Button
                  href="https://maps.google.com/?q=30+Canvin+St,+Kirkland,+QC+H9H+4S4"
                  variant="linkLead"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                >
                  {tCommon("getDirections")}
                  <span aria-hidden="true">&rarr;</span>
                </Button>
              </div>

              <div className="bg-brand-50 border border-brand-100 rounded-sm p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
                  {tCommon("whatToExpect")}
                </p>
                <ul className="space-y-2.5">
                  {trustItems.map((badge) => (
                    <li key={badge} className="flex items-start gap-2 text-sm text-stone-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      {badge}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
