import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Button from "@/components/ui/Button";
import AcademyPageHeader from "@/components/layout/AcademyPageHeader";
import AcademySubNav from "@/components/layout/AcademySubNav";
import WaitlistForm from "@/components/sections/WaitlistForm";
import { siteConfig } from "@/config/site";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "academySchedule" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function SchedulePage() {
  const t = await getTranslations("academySchedule");

  const seasons = [
    { key: "fall", title: t("seasons.fall") },
    { key: "winter", title: t("seasons.winter") },
    { key: "spring", title: t("seasons.spring") },
  ];

  const steps = t.raw("howItWorks.steps") as Array<{
    title: string;
    description: string;
  }>;

  const courseOptions = t.raw("waitlist.courseOptions") as string[];

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
          {/* Season intake cards */}
          <section aria-labelledby="intakes-heading">
            <div className="grid gap-6 md:grid-cols-3">
              {seasons.map(({ key, title }) => (
                <div
                  key={key}
                  className="flex flex-col items-center rounded-xl border border-brand-200 bg-white p-8 text-center transition-all duration-200 hover:border-brand-leaf hover:shadow-md"
                >
                  <h2 className="mb-2 font-serif text-xl text-stone-900">{title}</h2>
                  <p className="mb-6 text-sm text-stone-500">{t("seasons.datesTba")}</p>
                  <Button href="/contact" variant="outlineStone">
                    {t("seasons.joinWaitlist")}
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section aria-labelledby="how-it-works-heading">
            <h2
              id="how-it-works-heading"
              className="mb-10 font-serif text-2xl text-stone-900 sm:text-3xl"
            >
              {t("howItWorks.heading")}
            </h2>

            {/* Desktop: horizontal timeline; Mobile: vertical */}
            <div className="relative">
              {/* Connecting line (desktop only) */}
              <div
                className="absolute start-0 end-0 top-6 hidden border-t-2 border-dashed border-brand-200 md:block"
                aria-hidden="true"
              />

              <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
                {steps.map((step, i) => (
                  <li key={i} className="flex flex-col items-start gap-3 md:items-center md:text-center">
                    {/* Step number circle */}
                    <div
                      className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ background: "#06B13D" }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-900">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-stone-500">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Waitlist form */}
          <section aria-labelledby="waitlist-heading">
            <div className="rounded-xl bg-brand-100 p-8">
              <h2
                id="waitlist-heading"
                className="mb-6 font-serif text-2xl text-stone-900 sm:text-3xl"
              >
                {t("waitlist.heading")}
              </h2>
              <WaitlistForm courseOptions={courseOptions} />
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
