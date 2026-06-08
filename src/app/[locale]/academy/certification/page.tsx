import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Button from "@/components/ui/Button";
import AcademyPageHeader from "@/components/layout/AcademyPageHeader";
import AcademySubNav from "@/components/layout/AcademySubNav";
import { siteConfig } from "@/config/site";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "academyCertification" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function CertificationPage() {
  const t = await getTranslations("academyCertification");

  const pathwayKeys = ["certificate", "diploma", "recognition"] as const;
  const whatYouReceiveItems = t.raw("whatYouReceive.items") as string[];

  return (
    <>
      <AcademyPageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumb={t("breadcrumb")}
      />

      <AcademySubNav />

      <div className="bg-brand-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
          {/* Pathway cards */}
          <section aria-labelledby="pathways-heading">
            <h2
              id="pathways-heading"
              className="sr-only"
            >
              {t("title")}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {pathwayKeys.map((key) => {
                const isDiploma = key === "diploma";
                return (
                  <div
                    key={key}
                    className={`flex flex-col rounded-xl bg-white p-8 transition-all duration-200 hover:shadow-md ${
                      isDiploma
                        ? "border-2 border-brand-leaf"
                        : "border border-brand-200 hover:border-brand-leaf"
                    }`}
                  >
                    {isDiploma && (
                      <span className="mb-3 inline-flex w-fit items-center rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-forest">
                        Featured
                      </span>
                    )}
                    <h3 className="mb-3 font-serif text-xl text-stone-900">
                      {t(`pathways.${key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-stone-600">
                      {t(`pathways.${key}.body`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* What you receive */}
          <section aria-labelledby="receive-heading">
            <div className="rounded-xl bg-white p-8 border border-brand-200">
              <h2
                id="receive-heading"
                className="mb-6 font-serif text-2xl text-stone-900 sm:text-3xl"
              >
                {t("whatYouReceive.heading")}
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {whatYouReceiveItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white text-xs"
                      style={{ background: "#06B13D" }}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span className="text-sm leading-relaxed text-stone-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Accreditation status banner */}
          <section>
            <div className="rounded-r-xl border-l-4 border-brand-leaf bg-white p-5">
              <p className="text-sm leading-relaxed text-stone-700">
                {t("accreditation")}
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* CTA banner */}
      <section className="py-16 text-white md:py-20" style={{ background: "#1e3d20" }}>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-3 font-serif text-3xl sm:text-4xl">{t("cta.heading")}</h2>
          <p className="mb-8 text-lg text-white/80">{t("cta.body")}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={siteConfig.ctas.enrollPath} variant="spaHero">
              {t("cta.enrollButton")}
            </Button>
            <Button href="/contact" variant="spaOutlineHero">
              {t("cta.contactButton")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
