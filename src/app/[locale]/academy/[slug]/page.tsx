import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import AcademyPageHeader from "@/components/layout/AcademyPageHeader";
import AcademySubNav from "@/components/layout/AcademySubNav";
import ProgramDetailAccordion from "@/components/sections/ProgramDetailAccordion";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import {
  findPublicCourseBySlug,
  getPublishedSlugs,
} from "@/modules/education/services/courseService";

type PageProps = {
  params: { locale: string; slug: string };
};

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params: { locale, slug } }: PageProps): Promise<Metadata> {
  const program = await findPublicCourseBySlug(slug);
  if (!program) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "programDetail" });
  return {
    title: t("meta.title", { name: program.name }),
    description: program.description,
  };
}

export default async function ProgramDetailPage({ params: { slug } }: PageProps) {
  const program = await findPublicCourseBySlug(slug);
  if (!program) {
    notFound();
  }

  const t = await getTranslations("programDetail");
  const tPrograms = await getTranslations("programs");

  const scheduleRows = t.raw("schedule.rows") as Array<{
    date: string;
    language: string;
    days: string;
    hours: string;
  }>;

  const accordionSections = t.raw("accordion.sections") as Array<{
    title: string;
    items?: string[];
    content?: string;
  }>;

  const detailItems = [
    t("accordion.detailsPrerequisite", { value: program.prerequisites }),
    t("accordion.detailsHours", { hours: program.hours.total }),
  ];

  const accordionWithProgramData = accordionSections.map((section, index) =>
    index === 0 ? { ...section, items: detailItems } : section
  );

  return (
    <>
      <AcademyPageHeader
        title={program.name}
        subtitle={program.description}
        breadcrumb={program.name}
      />

      <AcademySubNav />

      <div className="bg-brand-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
          <p>
            <Link
              href="/academy/programs"
              className="text-sm font-medium text-brand-forest hover:text-brand-700"
            >
              ← {t("backToPrograms")}
            </Link>
          </p>

          {/* Summary strip */}
          <section className="rounded-lg border border-stone-200 bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-stone-600">
              <span className="inline-flex items-center rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                {program.tag}
              </span>
              <span className="font-semibold text-stone-900">{program.hours.total}h</span>
              <span className="text-stone-400">·</span>
              <span>
                {tPrograms("card.theoryLabel")} {program.hours.theory}h
              </span>
              <span className="text-stone-400">·</span>
              <span>
                {tPrograms("card.practicalLabel")} {program.hours.practical}h
              </span>
              <span className="text-stone-400">·</span>
              <span>
                {tPrograms("card.fromPrice")} ${program.fromPrice.toLocaleString()}{" "}
                {tPrograms("card.currency")}
              </span>
            </div>
          </section>

          {/* Highlights */}
          <section aria-labelledby="highlights-heading">
            <h2
              id="highlights-heading"
              className="mb-6 font-serif text-2xl text-stone-900 sm:text-3xl"
            >
              {t("highlightsHeading")}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {program.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-stone-200 bg-white p-4 text-sm text-stone-700"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Schedule table */}
          <section aria-labelledby="schedule-heading">
            <h2
              id="schedule-heading"
              className="mb-6 font-serif text-2xl text-stone-900 sm:text-3xl"
            >
              {t("schedule.title")}
            </h2>
            <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-brand-forest text-left text-white">
                    <th className="px-4 py-3 font-semibold">{t("schedule.columns.date")}</th>
                    <th className="px-4 py-3 font-semibold">{t("schedule.columns.language")}</th>
                    <th className="px-4 py-3 font-semibold">{t("schedule.columns.days")}</th>
                    <th className="px-4 py-3 font-semibold">{t("schedule.columns.hours")}</th>
                    <th className="px-4 py-3 font-semibold">{t("schedule.columns.register")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {scheduleRows.map((row) => (
                    <tr key={row.language} className="text-stone-600 even:bg-stone-50/80">
                      <td className="px-4 py-3">{row.date}</td>
                      <td className="px-4 py-3">{row.language}</td>
                      <td className="px-4 py-3">{row.days}</td>
                      <td className="px-4 py-3">{row.hours}</td>
                      <td className="px-4 py-3">
                        <Link
                          href="/academy/schedule#waitlist-heading"
                          className="inline-flex rounded border border-stone-300 bg-transparent px-3 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-50"
                        >
                          {t("schedule.registerButton")}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-stone-500">{t("schedule.note")}</p>
          </section>

          {/* Accordion (mock sections) */}
          <section aria-labelledby="details-heading">
            <h2
              id="details-heading"
              className="mb-6 font-serif text-2xl text-stone-900 sm:text-3xl"
            >
              {t("accordion.heading")}
            </h2>
            <ProgramDetailAccordion sections={accordionWithProgramData} />
          </section>

          {/* Instructor */}
          <section className="rounded-lg border border-brand-200 bg-brand-100 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">
              {tPrograms("card.instructorLabel")}
            </p>
            <p className="mt-2 font-medium text-stone-900">{program.instructor}</p>
          </section>
        </div>
      </div>

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
