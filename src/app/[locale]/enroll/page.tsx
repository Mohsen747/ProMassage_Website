import type { Metadata } from "next";
import { getFormatter, getTranslations } from "next-intl/server";
import Button from "@/components/ui/Button";
import LtrText from "@/components/ui/LtrText";
import AcademyPageHeader from "@/components/layout/AcademyPageHeader";
import AcademySubNav from "@/components/layout/AcademySubNav";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { siteConfig } from "@/config/site";
import { getProgramStats } from "@/data/programs";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "enroll" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function EnrollPage() {
  const t = await getTranslations("enroll");
  const format = await getFormatter();
  const programCount = format.number(getProgramStats().count);

  const steps = (t.raw("steps") as Array<{
    number: string;
    title: string;
    description: string;
  }>).map((step, index) =>
    index === 0
      ? {
          ...step,
          description: t("stepsBrowseDescription", { count: programCount }),
        }
      : step
  );

  const faqItems = t.raw("faq.items") as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <>
      <AcademyPageHeader
        title={t("hero.title")}
        subtitle={t("hero.intro")}
        breadcrumb={t("breadcrumb")}
      />

      <AcademySubNav />

      <div className="bg-brand-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
          {/* Enrollment CTA strip */}
          <section>
            <div className="flex flex-col gap-4 rounded-xl border border-brand-200 bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed text-stone-700 sm:max-w-lg">
                {t("hero.intro")}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:shrink-0">
                <Button
                  href={siteConfig.ctas.bookingUrl}
                  variant="spa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("ctaOnline")}
                </Button>
                <Button href="/academy" variant="outlineStone">
                  {t("ctaAcademy")}
                </Button>
              </div>
            </div>
          </section>

          {/* Two-column: steps + contact card */}
          <section>
            <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
              {/* Steps */}
              <div>
                <ol className="space-y-8">
                  {steps.map((step, i) => (
                    <li key={i} className="flex gap-5">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                        style={{ background: "#06B13D" }}
                        aria-hidden="true"
                      >
                        {step.number}
                      </div>
                      <div className="pt-1">
                        <h3 className="font-semibold text-stone-900">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-stone-600">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-8">
                  <Button href="/academy/programs" variant="spa">
                    {t("ctaAcademy")}
                  </Button>
                </div>
              </div>

              {/* Contact card */}
              <aside>
                <div className="rounded-xl bg-brand-100 p-6">
                  <h3 className="mb-4 font-semibold text-stone-900">
                    {t("contact.heading")}
                  </h3>
                  <div className="mb-5 flex items-center gap-2 text-sm text-stone-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                      className="shrink-0 text-brand-leaf"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <LtrText>{t("contact.location")}</LtrText>
                  </div>
                  <Button href="/contact" variant="spa" fullWidth>
                    {t("contact.consultation")}
                  </Button>
                </div>
              </aside>
            </div>
          </section>

          {/* FAQ */}
          <section aria-labelledby="enroll-faq-heading">
            <h2
              id="enroll-faq-heading"
              className="mb-8 font-serif text-2xl text-stone-900 sm:text-3xl"
            >
              {t("faq.heading")}
            </h2>
            <div className="rounded-xl border border-brand-200 bg-white px-6">
              <FaqAccordion faqs={faqItems} />
            </div>
          </section>
        </div>
      </div>

      {/* CTA banner */}
      <section className="py-16 text-white md:py-20" style={{ background: "#1e3d20" }}>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-3 font-serif text-3xl sm:text-4xl">
            {t("hero.title")}
          </h2>
          <p className="mb-8 text-lg text-white/80">{t("hero.intro")}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href={siteConfig.ctas.bookingUrl}
              variant="spaHero"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("ctaOnline")}
            </Button>
            <Button href="/contact" variant="spaOutlineHero">
              {t("contact.consultation")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
