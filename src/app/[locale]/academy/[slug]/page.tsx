import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { navPaths } from "@/config/nav";

const SLUGS = ["schedule", "certification"] as const;
type Slug = (typeof SLUGS)[number];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

type Props = { params: { locale: string; slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug as Slug;
  if (!SLUGS.includes(slug)) {
    return { title: "Academy" };
  }
  const t = await getTranslations({ locale: params.locale, namespace: "academySub" });
  return {
    title: t(`${slug}.title`),
    description: t(`${slug}.description`),
  };
}

export default async function AcademySubPage({ params }: Props) {
  const slug = params.slug as Slug;
  if (!SLUGS.includes(slug)) {
    notFound();
  }
  const t = await getTranslations("academySub");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-600">
        <Link href={navPaths.academy.sectionHref} className="hover:underline">
          {t("breadcrumbAcademy")}
        </Link>
      </p>
      <h1 className="mb-6 font-serif text-4xl text-stone-900 sm:text-5xl">{t(`${slug}.heading`)}</h1>
      <p className="leading-relaxed text-stone-600">{t(`${slug}.body`)}</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button href={siteConfig.ctas.enrollPath} variant="primaryBold">
          {tNav("academy.enrollLabel")}
        </Button>
        <Button href="/contact" variant="outlineStone">
          {tCommon("contactCta")}
        </Button>
      </div>
    </section>
  );
}
