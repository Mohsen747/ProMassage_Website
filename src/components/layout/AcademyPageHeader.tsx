import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { navPaths } from "@/config/nav";

interface AcademyPageHeaderProps {
  title: string;
  subtitle: string;
  /** Page name shown after "Academy /" in the breadcrumb. Omit on the hub page. */
  breadcrumb?: string;
}

export default async function AcademyPageHeader({
  title,
  subtitle,
  breadcrumb,
}: AcademyPageHeaderProps) {
  const tNav = await getTranslations("nav");

  return (
    <div className="w-full" style={{ background: "#1e3d20" }}>
      <div className="mx-auto flex min-h-[280px] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-300">
          {breadcrumb ? (
            <>
              <Link
                href={navPaths.academy.sectionHref}
                className="transition-colors hover:text-white"
              >
                {tNav("academy.sectionLabel")}
              </Link>
              <span className="mx-1.5 text-brand-500">/</span>
              <span>{breadcrumb}</span>
            </>
          ) : (
            <span>{tNav("academy.sectionLabel")}</span>
          )}
        </p>

        <h1
          className="mb-4 font-serif text-4xl text-white md:text-5xl"
          style={{ animation: "fadeUp 0.5s ease-out both" }}
        >
          {title}
        </h1>

        <p
          className="max-w-xl text-lg leading-relaxed text-brand-200"
          style={{ animation: "fadeUp 0.55s ease-out 0.1s both" }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
