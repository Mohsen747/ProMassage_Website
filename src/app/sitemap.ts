import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const paths = [
    "/",
    "/about",
    "/contact",
    "/pricing",
    "/services",
    "/faq",
    "/enroll",
    "/academy",
    "/academy/courses",
    "/academy/schedule",
    "/academy/certification",
  ] as const;

  return paths.map((path) => ({
    url: path === "/" ? `${base}/` : `${base}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
