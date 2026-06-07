import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteUrl";
import { routing } from "@/i18n/routing";

const paths = [
  "/",
  "/about",
  "/contact",
  "/pricing",
  "/services",
  "/faq",
  "/enroll",
  "/academy",
  "/academy/programs",
  "/academy/schedule",
  "/academy/certification",
] as const;

function pathForLocale(path: (typeof paths)[number], locale: string): string {
  if (locale === routing.defaultLocale && routing.localePrefix === "as-needed") {
    return path;
  }
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of paths) {
      const locPath = pathForLocale(path, locale);
      const url = locPath === "/" || locPath === `/${locale}` ? `${base}${locPath}` : `${base}${locPath}`;
      entries.push({
        url,
        lastModified,
        changeFrequency: "monthly",
        priority: path === "/" ? 1 : 0.7,
      });
    }
  }

  return entries;
}
