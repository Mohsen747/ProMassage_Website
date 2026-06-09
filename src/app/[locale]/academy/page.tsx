import type { Metadata } from "next";
import { getFormatter, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import AcademyPageHeader from "@/components/layout/AcademyPageHeader";
import AcademySubNav from "@/components/layout/AcademySubNav";
import { siteConfig } from "@/config/site";
import { getProgramStats } from "@/data/programs";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("academyTitle"),
    description: t("academyDescription"),
  };
}

export default async function AcademyPage() {
  const t = await getTranslations("academyHub");
  const format = await getFormatter();
  const programCount = format.number(getProgramStats().count);

  const featureCards = [
    {
      number: t("featureCards.programs.number"),
      title: t("featureCards.programs.title"),
      body: t("featureCards.programs.body", { count: programCount }),
      href: "/academy/programs",
    },
    {
      number: t("featureCards.schedule.number"),
      title: t("featureCards.schedule.title"),
      body: t("featureCards.schedule.body"),
      href: "/academy/schedule",
    },
    {
      number: t("featureCards.certification.number"),
      title: t("featureCards.certification.title"),
      body: t("featureCards.certification.body"),
      href: "/academy/certification",
    },
  ];

  return (
    <>
      <AcademyPageHeader title={t("title")} subtitle={t("subtitle")} />

      <AcademySubNav />

      <div className="bg-brand-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
          {/* Feature cards */}
          <section aria-labelledby="academy-sections-heading">
            <h2 id="academy-sections-heading" className="sr-only">
              {t("title")}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {featureCards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group flex flex-col rounded-xl border border-brand-200 bg-white p-8 transition-all duration-200 hover:border-brand-leaf hover:shadow-md"
                >
                  <span className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-leaf">
                    {card.number}
                  </span>
                  <h3 className="mb-2 font-serif text-2xl text-stone-900 group-hover:text-brand-forest">
                    {card.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-stone-600">{card.body}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-brand-leaf">
                    {t("featureCards.arrowLabel")} →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Instructor strip */}
          <section aria-labelledby="instructor-heading">
            <div className="rounded-xl bg-brand-100 p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
                  style={{ background: "#06B13D" }}
                  aria-hidden="true"
                >
                  MR
                </div>
                <div>
                  <p
                    id="instructor-heading"
                    className="font-semibold text-stone-900"
                  >
                    {t("instructor.name")}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-stone-600">
                    {t("instructor.bio")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Accreditation banner */}
          <section>
            <div className="rounded-r-lg border-l-4 border-brand-leaf bg-white p-5">
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
