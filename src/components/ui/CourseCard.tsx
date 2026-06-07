"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import type { Program } from "@/data/programs";

type CourseCardProps = {
  course: Program;
  accentBorder?: boolean;
};

export default function CourseCard({ course, accentBorder = false }: CourseCardProps) {
  const [highlightsOpen, setHighlightsOpen] = useState(false);
  const t = useTranslations("programs");

  const borderStyle = accentBorder
    ? { borderColor: "#6b8c3e", borderWidth: "2px" }
    : {};

  return (
    <article
      className="flex flex-col rounded-lg border border-stone-200 bg-white p-6 shadow-sm"
      style={borderStyle}
    >
      {/* Category tag */}
      <span className="mb-3 inline-flex w-fit items-center rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
        {course.tag}
      </span>

      {/* Course name */}
      <h3 className="mb-2 font-serif text-xl text-stone-900">{course.name}</h3>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-stone-600">{course.description}</p>

      {/* Hours */}
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <span className="font-semibold text-stone-800">{course.hours.total}h</span>
        <span className="text-stone-400">·</span>
        <span className="text-stone-500">
          {t("card.theoryLabel")} {course.hours.theory}h
        </span>
        <span className="text-stone-400">·</span>
        <span className="text-stone-500">
          {t("card.practicalLabel")} {course.hours.practical}h
        </span>
      </div>

      {/* Prerequisites */}
      <p className="mb-4 text-xs italic text-stone-400">
        <span className="not-italic font-medium text-stone-500">
          {t("card.prerequisitesLabel")}:{" "}
        </span>
        {course.prerequisites}
      </p>

      {/* Highlights toggle */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setHighlightsOpen((v) => !v)}
          className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-600 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-1"
          aria-expanded={highlightsOpen}
        >
          <span
            className="inline-block transition-transform duration-200"
            style={{ transform: highlightsOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            aria-hidden
          >
            ›
          </span>
          {highlightsOpen ? t("card.hideHighlights") : t("card.showHighlights")}
        </button>

        {highlightsOpen && (
          <ul className="mt-3 space-y-1.5 ps-1">
            {course.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Spacer to push price + button to bottom */}
      <div className="mt-auto pt-2 border-t border-stone-100">
        {/* Price */}
        <p className="mb-3 text-sm font-semibold text-stone-800">
          {t("card.fromPrice")}{" "}
          <span className="text-base">${course.pricing.group.toLocaleString()}</span>{" "}
          <span className="font-normal text-stone-500">{t("card.currency")}</span>
        </p>

        {/* Enroll button */}
        <Link
          href={siteConfig.ctas.enrollPath}
          className="mb-4 inline-flex items-center justify-center rounded-md bg-brand-spa px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-spaDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2"
        >
          {t("card.enrollButton")}
        </Link>
      </div>

      {/* Instructor */}
      <p className="mt-3 text-xs text-stone-400">
        {course.instructor}
      </p>
    </article>
  );
}
