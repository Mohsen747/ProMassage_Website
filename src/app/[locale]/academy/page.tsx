import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { navPaths } from "@/config/nav";

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
  const tNav = await getTranslations("nav");

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <h1 className="mb-4 font-serif text-4xl text-stone-900 sm:text-5xl">{t("title")}</h1>
      <p className="mb-10 text-lg leading-relaxed text-stone-600">{t("intro")}</p>
      <ul className="space-y-3 border-t border-stone-200 pt-8">
        {navPaths.academy.links.map(({ href, labelKey }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-brand-700 font-medium hover:text-brand-900 hover:underline"
            >
              {tNav(`academy.links.${labelKey}`)}
            </Link>
          </li>
        ))}
      </ul>
      <Button href={siteConfig.ctas.enrollPath} variant="primaryBold" className="mt-10">
        {tNav("academy.enrollLabel")}
      </Button>
    </section>
  );
}
