import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { PublicCourse } from "@/modules/education/types/course";

type CourseCardProps = {
  course: PublicCourse;
  accentBorder?: boolean;
};

export default async function CourseCard({ course, accentBorder = false }: CourseCardProps) {
  const t = await getTranslations("programs");

  const borderStyle = accentBorder
    ? { borderColor: "#6b8c3e", borderWidth: "2px" }
    : {};

  return (
    <article
      className="flex flex-col gap-4 rounded-lg border border-stone-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-5"
      style={borderStyle}
    >
      <div className="min-w-0 flex-1 space-y-1.5">
        <span className="inline-flex w-fit items-center rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
          {course.tag}
        </span>

        <h3 className="font-serif text-lg text-stone-900 sm:text-xl">
          {course.name} {course.hours.total}h
        </h3>

        <p className="text-sm text-stone-500">
          <span className="text-stone-400">·</span> {t("card.theoryLabel")}{" "}
          {course.hours.theory}h
          <span className="text-stone-400"> · </span>
          {t("card.practicalLabel")} {course.hours.practical}h
        </p>

        <p className="text-sm text-stone-600">
          <span className="font-medium text-stone-700">
            {t("card.prerequisitesLabel")}:{" "}
          </span>
          {course.prerequisites}
        </p>
      </div>

      <div className="flex shrink-0 flex-row items-center justify-between gap-4 border-t border-stone-100 pt-4 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
        <p className="text-sm font-semibold text-stone-800 sm:text-end">
          {t("card.fromPrice")}{" "}
          <span className="text-base">${course.fromPrice.toLocaleString()}</span>{" "}
          <span className="font-normal text-stone-500">{t("card.currency")}</span>
        </p>

        <Link
          href={`/academy/${course.slug}`}
          className="inline-flex items-center justify-center rounded-md bg-brand-spa px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-spaDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2"
        >
          {t("card.enrollButton")}
        </Link>
      </div>
    </article>
  );
}
