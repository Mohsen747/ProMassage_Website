/** Internal routes for nav/footer (locale prefix added by next-intl `Link`). */
export const navPaths = {
  academy: {
    sectionHref: "/academy",
    links: [
      { href: "/academy/courses", labelKey: "courses" as const },
      { href: "/academy/schedule", labelKey: "schedule" as const },
      { href: "/academy/certification", labelKey: "certification" as const },
    ],
  },
  clinic: {
    links: [
      { href: "/services", labelKey: "services" as const },
      { href: "/pricing", labelKey: "pricing" as const },
      { href: "/about", labelKey: "about" as const },
      { href: "/contact", labelKey: "contact" as const },
    ],
  },
} as const;
