import type { Metadata } from "next";
import { getFormatter, getTranslations } from "next-intl/server";
import Button from "@/components/ui/Button";
import CourseCard from "@/components/ui/CourseCard";
import AcademyPageHeader from "@/components/layout/AcademyPageHeader";
import AcademySubNav from "@/components/layout/AcademySubNav";
import { siteConfig } from "@/config/site";
import {
  listPublicCourses,
  getPublicCourseStats,
  partitionByCategory,
} from "@/modules/education/services/courseService";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "programs" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function AcademyProgramsPage() {
  const t = await getTranslations("programs");
  const tCommon = await getTranslations("common");
  const format = await getFormatter();

  const courses = await listPublicCourses();
  const stats = getPublicCourseStats(courses);
  const { introductory, diploma, continuingEducation } = partitionByCategory(courses);

  const statItems = [
    {
      label: t("stats.totalLabel"),
      value: format.number(stats.count),
    },
    {
      label: t("stats.hoursLabel"),
      value: t("stats.hoursValue", {
        min: format.number(stats.minHours),
        max: format.number(stats.maxHours),
      }),
    },
    {
      label: t("stats.formatsLabel"),
      value: t("stats.formatsValue"),
    },
  ];

  return (
    <>
      <AcademyPageHeader
        title={t("header.title")}
        subtitle={t("header.subtitle", { count: format.number(stats.count) })}
        breadcrumb={tCommon("programsBreadcrumb")}
      />

      <AcademySubNav />

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid divide-y divide-stone-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {statItems.map(({ label, value }) => (
              <div key={label} className="px-6 py-8 text-center sm:px-8">
                <dt className="mb-1 text-xs font-semibold uppercase tracking-widest text-stone-400">
                  {label}
                </dt>
                <dd className="text-lg font-semibold text-stone-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="py-16 md:py-24" style={{ background: "#f7f3ea" }}>
        <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
          <section aria-labelledby="section-introductory">
            <h2
              id="section-introductory"
              className="mb-8 font-serif text-2xl text-stone-900 sm:text-3xl"
            >
              {t("sections.introductory")}
            </h2>
            <div className="flex flex-col gap-4">
              {introductory.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>

          <section aria-labelledby="section-diploma">
            <h2
              id="section-diploma"
              className="mb-8 font-serif text-2xl text-stone-900 sm:text-3xl"
            >
              {t("sections.professionalDiploma")}
            </h2>
            <div className="flex flex-col gap-4">
              {diploma.map((course) => (
                <CourseCard key={course.id} course={course} accentBorder />
              ))}
            </div>
          </section>

          <section aria-labelledby="section-ce">
            <h2
              id="section-ce"
              className="mb-8 font-serif text-2xl text-stone-900 sm:text-3xl"
            >
              {t("sections.continuingEducation")}
            </h2>
            <div className="flex flex-col gap-4">
              {continuingEducation.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
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
