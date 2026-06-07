import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import CourseCard from "@/components/ui/CourseCard";
import { siteConfig } from "@/config/site";
import { navPaths } from "@/config/nav";
import {
  introductoryPrograms,
  diplomaPrograms,
  continuingEducationPrograms,
} from "@/data/programs";

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
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  return (
    <>
      <section className="bg-brand-950 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-300">
            <Link
              href={navPaths.academy.sectionHref}
              className="transition-colors hover:text-white"
            >
              {tNav("academy.sectionLabel")}
            </Link>
            <span className="text-brand-500"> / </span>
            {tCommon("programsBreadcrumb")}
          </p>
          <h1 className="mb-5 font-serif text-4xl sm:text-5xl">{t("hero.title")}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-brand-100/90">
            {t("hero.intro")}
          </p>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <dl className="grid divide-y divide-stone-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { label: t("stats.totalLabel"), value: t("stats.totalValue") },
              { label: t("stats.hoursLabel"), value: t("stats.hoursValue") },
              { label: t("stats.formatsLabel"), value: t("stats.formatsValue") },
            ].map(({ label, value }) => (
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

      <div className="bg-stone-50 py-16 md:py-24" style={{ background: "#f7f3ea" }}>
        <div className="mx-auto max-w-6xl space-y-20 px-4 sm:px-6 lg:px-8">
          <section aria-labelledby="section-introductory">
            <h2
              id="section-introductory"
              className="mb-8 font-serif text-2xl text-stone-900 sm:text-3xl"
            >
              {t("sections.introductory")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {introductoryPrograms.map((course) => (
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {diplomaPrograms.map((course) => (
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
            <div className="grid gap-6 sm:grid-cols-2">
              {continuingEducationPrograms.map((course) => (
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
