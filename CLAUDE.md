# ProMassage Website — CLAUDE.md

## Project Overview

**ProMassage Clinic & Academy** — a single Next.js website with two distinct audiences:

| Side | Audience | Purpose |
|------|----------|---------|
| **Clinic** | Massage clients | Book sessions, view services/pricing/about/FAQ/contact |
| **Academy** | Massage students | Explore PROGRAMS, schedule, certification, enroll |

Both sides share the same Navbar, Footer, layout, and brand system. The Navbar is split left (Clinic) / center leaf logo / right (Academy) on desktop.

---

## Stack

| Technology | Version |
|-----------|---------|
| Next.js | 14.2.35 (App Router) |
| next-intl | ^3.26.5 |
| React | ^18 |
| TypeScript | ^5 (`strict: true`, `allowJs: true`) |
| Tailwind CSS | ^3.4.1 |
| Fonts | Inter (sans), Playfair Display (serif), Vazirmatn (Arabic/Persian) |

Runtime: Node.js. Deployment target: Vercel (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GOOGLE_PLACE_ID`, `GOOGLE_MAPS_API_KEY` env vars).

---

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (minimal, no locale logic)
│   ├── globals.css
│   ├── robots.ts / sitemap.ts
│   └── [locale]/               # All pages live here (locale-aware)
│       ├── layout.tsx          # Locale layout: sets lang/dir, loads fonts, wraps with Navbar+Footer
│       ├── page.tsx            # Homepage — Hero, ProblemSolution, WhyChoose, Testimonials, AboutPreview, FaqPreview
│       ├── about/page.tsx
│       ├── services/page.tsx
│       ├── pricing/page.tsx
│       ├── contact/page.tsx
│       ├── faq/page.tsx
│       ├── enroll/page.tsx
│       └── academy/
│           ├── page.tsx        # Academy hub (links to PROGRAMS/schedule/certification)
│           └── PROGRAMS/
│               └── page.tsx    # All 13 PROGRAMS with cards
│               (schedule/ and certification/ pages NOT YET BUILT)
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx          # Multi-variant button/link component
│   │   ├── ServiceCard.tsx     # Async server component for clinic service cards
│   │   └── CourseCard.tsx      # Client component for academy course cards (highlights toggle)
│   ├── layout/
│   │   ├── Navbar.tsx          # Client component — split nav, scroll-aware, mobile drawer
│   │   ├── Footer.tsx          # Server component — 3-column: Massage | Academy | Contact
│   │   ├── SiteTopBar.tsx      # Client component — social icons + LocaleSwitcher above Navbar
│   │   └── LocaleSwitcher.tsx  # Client component — dropdown select for en/fr/fa
│   ├── sections/               # Async server components used on specific pages
│   │   ├── Hero.tsx            # Homepage full-screen video hero
│   │   ├── HeroBackgroundVideo.tsx
│   │   ├── ProblemSolution.tsx
│   │   ├── WhyChoose.tsx
│   │   ├── Testimonials.tsx    # Pulls from Google Places API or static fallback
│   │   ├── AboutPreview.tsx
│   │   ├── FaqPreview.tsx
│   │   ├── FaqAccordion.tsx    # Client component — collapsible FAQ items
│   │   └── ContactForm.tsx     # Client component — contact form
│   └── brand/
│       ├── Brand.tsx           # ProMassage wordmark + leaf logo + rule variants
│       └── index.ts
│
├── config/
│   ├── site.ts                 # siteConfig: bookingUrl, enrollPath, social URLs, hero videos
│   └── nav.ts                  # navPaths: clinic links and academy links (used by Navbar + Footer)
│
├── i18n/
│   ├── routing.ts              # defineRouting: locales [en, fr, fa], localePrefix "as-needed"
│   ├── navigation.ts           # createNavigation exports: Link, redirect, usePathname, useRouter
│   └── request.ts              # getRequestConfig — loads message bundles per locale
│
├── lib/
│   ├── siteUrl.ts              # getSiteUrl() — reads NEXT_PUBLIC_SITE_URL or falls back to promassages.ca
│   └── googlePlace.ts          # Google Places API helpers: reviews, rating, maps URL
│
├── data/
│   ├── serviceBase.ts          # SERVICE_SLUGS array + serviceBookingMeta (price, duration) — non-translatable
│   ├── services.ts             # Service interface + re-exports getServicesList from servicesLocale
│   ├── servicesLocale.ts       # getServicesList() — merges serviceBase with i18n messages
│   ├── faqs.ts                 # getFaqs() — pulls from next-intl messages
│   ├── testimonials.ts         # getTestimonials() — Google Places API first, then static fallback
│   └── PROGRAMS.js              # All 13 academy PROGRAMS (static, not locale-specific)
│
└── messages/
    ├── en/ fr/ fa/             # One folder per locale, each with:
    │   ├── core.ts             # metadata, ctas, nav, footer, brand, eyebrow, common, durations, etc.
    │   ├── home.ts             # Homepage section copy
    │   ├── pages.ts            # Page-specific copy: enroll, PROGRAMS, services, about, contact, faqMeta, contactForm
    │   ├── servicesData.ts     # Clinic service descriptions (title, descriptions, recommendedFor, benefits, cta)
    │   ├── faqTestimonials.ts  # faqs[] and testimonials[] arrays
    │   └── index.ts            # Merges all into one export
```

---

## Routing Conventions

next-intl uses `localePrefix: "as-needed"`:
- **English** (default): no prefix — `/services`, `/academy/PROGRAMS`
- **French**: `/fr/services`, `/fr/academy/PROGRAMS`
- **Persian**: `/fa/services`, `/fa/academy/PROGRAMS`

**Always use `Link` from `@/i18n/navigation`** (not `next/link`) — it auto-applies the locale prefix.

**Never hard-code locale in hrefs.** Pass bare paths like `/services` and let next-intl handle the prefix.

### Clinic routes
| Route | Page |
|-------|------|
| `/` | Homepage |
| `/services` | Massage services list |
| `/pricing` | Clinic pricing |
| `/about` | About page |
| `/contact` | Contact form + info |
| `/faq` | FAQ accordion |

### Academy routes
| Route | Status |
|-------|--------|
| `/academy` | Hub — links to sub-pages |
| `/academy/PROGRAMS` | 13 PROGRAMS with cards |
| `/academy/schedule` | NOT YET BUILT |
| `/academy/certification` | NOT YET BUILT |
| `/enroll` | Enrollment page (redirects to JaneApp + academy links) |

---

## Components

### `src/components/ui/Button.tsx`
Client component. Accepts `href` (renders as `<Link>` or `<a>` for external) or no `href` (renders `<button>`).

**Variants to know:**
| Variant | Use case |
|---------|---------|
| `primary` | Default green button |
| `primaryBold` | Slightly heavier green button |
| `inverse` | White button on dark/green backgrounds |
| `outlineStone` | Outlined secondary action |
| `outlineBrand` | Outlined brand-colored |
| `spa` | Spa-style muted teal, uppercase tracking |
| `spaHero` | Full-width spa button for hero CTAs |
| `spaOutlineHero` | Outlined spa variant for hero secondary CTA |
| `navBarSpa` | Compact spa button for the navbar |
| `ghost` | Text-only underline on hover |
| `linkLead` | Arrow-style text link |
| `linkUnderlined` | Underlined inline text link |

### `src/components/ui/ServiceCard.tsx`
Async server component. Two variants: `"preview"` (compact listing) and `"full"` (expanded with benefits list). Used on `/services` and `/pricing`.

### `src/components/ui/CourseCard.tsx`
Client component (`"use client"`). Used on `/academy/PROGRAMS`. Has collapsible highlights toggle via `useState`. Accepts `course` object and `accentBorder` prop (for Professional Diploma card — uses `#6b8c3e` border).

### `src/components/layout/Navbar.tsx`
Client component. Split 3-column desktop layout (Clinic links | leaf logo | Academy links). Scroll-aware on homepage (transparent overlay vs solid). Mobile: hamburger + slide-in drawer. Active state detection via `usePathname`.

### `src/components/sections/`
All are async server components except `FaqAccordion` and `ContactForm` (client). Each imports its own translations internally.

### `src/components/brand/Brand.tsx`
Client component. Renders the ProMassage wordmark in multiple variants (hero size, nav compact, with/without leaf, with interrupted horizontal rule). Used in Navbar and potentially standalone on pages.

---

## i18n Rules

### Setup
- `src/i18n/routing.ts` — defines the 3 locales and `localePrefix: "as-needed"`
- `src/i18n/request.ts` — loads the correct message bundle per request
- `src/i18n/navigation.ts` — locale-aware navigation primitives

### Server components
```ts
import { getTranslations } from "next-intl/server";
const t = await getTranslations("namespaceName");
// or
const t = await getTranslations({ locale, namespace: "namespaceName" });
```

### Client components
```ts
"use client";
import { useTranslations } from "next-intl";
const t = useTranslations("namespaceName");
```

### Key namespaces (what's inside each)
| Namespace | Location | Contains |
|-----------|----------|---------|
| `metadata` | `core.ts` | SEO titles/descriptions |
| `ctas` | `core.ts` | primary / secondary / final CTA labels |
| `nav` | `core.ts` | academy and clinic nav labels |
| `footer` | `core.ts` | footer headings and labels |
| `brand` | `core.ts` | subtitle ("Clinic & Academy") |
| `eyebrow` | `core.ts` | above-hero eyebrow lines |
| `common` | `core.ts` | miscellaneous UI strings |
| `durations` | `core.ts` | "30 minutes", "60 minutes", "90 minutes" |
| `ServiceCard` | `core.ts` | "Best for", "Benefits" |
| `contactTrust` | `core.ts` | trust badge list items |
| `servicesPage` | `core.ts` | services page misc |
| `pricingPage` | `core.ts` | pricing page misc |
| `faqPage` | `core.ts` | FAQ page headings |
| `academyHub` | `core.ts` | Academy hub title/intro |
| `academySub` | `core.ts` | schedule/certification stubs |
| `bookingVia` | `core.ts` | "Online through JaneApp" |
| `LocaleSwitcher` | `core.ts` | "Language" label |
| `home` | `home.ts` | Homepage section copy |
| `enroll` | `pages.ts` | Enroll page |
| `PROGRAMS` | `pages.ts` | Academy PROGRAMS page |
| `services` | `pages.ts` | Clinic services page |
| `about` | `pages.ts` | About page |
| `contact` | `pages.ts` | Contact page |
| `faqMeta` | `pages.ts` | FAQ page metadata |
| `contactForm` | `pages.ts` | Contact form labels |
| `servicesCatalog` | `servicesData.ts` | Per-service copy (keyed by slug) |
| `faqs` | `faqTestimonials.ts` | FAQ items array |
| `testimonials` | `faqTestimonials.ts` | Testimonials array |

### CRITICAL — Always update all 3 locales
When adding any new i18n string, add it to **all three** locale files:
- `src/messages/en/` (English)
- `src/messages/fr/` (French)
- `src/messages/fa/` (Persian — RTL)

The fa locale uses the Vazirmatn font. The layout automatically sets `dir="rtl"` when `locale === "fa"`.

### Using raw arrays
For arrays in messages (used with `t.raw()`):
```ts
const pillars = t.raw("pillars") as Array<{ title: string; text: string }>;
```

---

## Brand

### Colors (Tailwind tokens)
| Token | Hex | Use |
|-------|-----|-----|
| `brand-50` / `brand-surface` | `#FAFCFB` | Page/body background |
| `brand-100` | `#EEF4EB` | Light green tint, nav background |
| `brand-200` | `#D8EED2` | Subtle borders, nav borders |
| `brand-500` | `#06B13D` | Bullet points, decorative accents, CTA section background |
| `brand-600` / `brand-forest` | `#4E6F5C` | Primary action buttons |
| `brand-700` | `#3f5f4e` | Hover state for brand-600 links |
| `brand-950` | `#1a221c` | Dark hero sections, footer background |
| `brand-spa` | `#50766d` | Academy/spa-style CTAs (Enroll Now buttons) |
| `brand-spaDark` | `#446056` | Hover for spa buttons |

**Non-token brand colors used with inline styles:**
- `#6b8c3e` — Professional Diploma card accent border
- `#1e3d20` — Academy CTA banner background (dark green)
- `#f7f3ea` — Cream background for course sections

### Typography
- **Headings**: `font-serif` (Playfair Display) — `text-4xl sm:text-5xl` for page h1, `text-2xl sm:text-3xl` for h2
- **Body**: `font-sans` (Inter) — default
- **Eyebrow labels**: `text-xs font-semibold uppercase tracking-widest text-brand-300`
- **Card descriptions**: `text-sm leading-relaxed text-stone-600`
- **Persian text**: Vazirmatn loaded via `--font-fa` variable (currently applied automatically via `lang="fa"` direction)

### Standard page section patterns

**Dark hero header** (all inner pages):
```tsx
<section className="bg-brand-950 py-16 text-white md:py-24">
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-300">
      {eyebrow}
    </p>
    <h1 className="mb-5 font-serif text-4xl sm:text-5xl">{title}</h1>
    <p className="max-w-2xl text-lg leading-relaxed text-brand-100/90">{intro}</p>
  </div>
</section>
```

**White content section** (max-w-3xl for reading, max-w-6xl for grids):
```tsx
<section className="bg-white py-16 md:py-24">
  <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
    {/* content */}
  </div>
</section>
```

**Clinic CTA section** (green):
```tsx
<section className="bg-brand-500 text-white py-20">
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="font-serif text-3xl sm:text-4xl text-white mb-10">{heading}</h2>
    <Button href={bookingUrl} variant="inverse">{cta}</Button>
  </div>
</section>
```

**Academy CTA section** (dark green, inline style):
```tsx
<section className="py-16 text-white md:py-20" style={{ background: "#1e3d20" }}>
  <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
    <h2 className="mb-3 font-serif text-3xl sm:text-4xl">{heading}</h2>
    <p className="mb-8 text-lg text-white/80">{body}</p>
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Button href={enrollPath} variant="spaHero">{enrollLabel}</Button>
      <Button href="/contact" variant="spaOutlineHero">{contactLabel}</Button>
    </div>
  </div>
</section>
```

---

## Data Rules

### `src/data/serviceBase.ts`
Static non-translatable data: `SERVICE_SLUGS` array and `serviceBookingMeta` (price string, durationKey). **This is the source of truth for clinic prices.**

### `src/data/servicesLocale.ts`
`getServicesList()` — async, merges serviceBase with current locale messages. Use this wherever services are listed.

### `src/data/faqs.ts`
`getFaqs()` — async, pulls from next-intl messages. FAQs are fully translated.

### `src/data/testimonials.ts`
`getTestimonials()` — async, tries Google Places API first (needs `NEXT_PUBLIC_GOOGLE_PLACE_ID` + `GOOGLE_MAPS_API_KEY`), falls back to static messages.

### `src/data/PROGRAMS.js`
Static JavaScript (not TypeScript, not locale-specific). Exports `PROGRAMS` array and pre-filtered groups: `introductoryPROGRAMS`, `diplomaPROGRAMS`, `continuingEducationPROGRAMS`. Also exports `CATEGORIES` constants. Course descriptions are in English only — no i18n for course body copy.

---

## Pricing Rules — CRITICAL

### Clinic side (public)
All clinic prices are public and shown on `/pricing` and implicitly on `/services`. Prices come from `src/data/serviceBase.ts`:
- Swedish Relaxation: $110 / 60min
- Hot Stone Therapy: $125 / 60min
- Deep Tissue: $115 / 60min
- Sport Massage: $60 / 30min
- 90-Minute Massage: $150 / 90min
- Foot Reflexology: $65 / 30min
- Chair Massage: $55 / 30min
- Wood Therapy Full Body: $120 / 60min
- Wood Therapy Half Body: $60 / 30min
- Professional Facial Massage: $60 / 30min

### Academy side — GROUP PRICE ONLY
**Never display individual ($X) or semi-individual ($X) prices publicly on the website.**

Academy course cards show: `From $X CAD` — the **group price only**.

Full pricing (individual / semi-individual) is discussed privately at enrollment. This is a business decision about privacy around pricing tiers.

---

## General Rules

1. **Do not install new packages** without confirmation from the user.
2. **Match existing page style exactly** before building any new page — read at least one existing similar page first.
3. **Always reuse existing components** — Button, ServiceCard, CourseCard, etc. — before creating new ones.
4. **RTL support**: The `fa` locale automatically gets `dir="rtl"` via the layout. Use `ps-` / `pe-` (padding-start/end) instead of `pl-`/`pr-` for any spacing that must flip in RTL. The Tailwind base already handles most RTL layout.
5. **Server vs client components**: Pages are async server components using `getTranslations`. Only add `"use client"` when you need browser state (`useState`, `useEffect`, event handlers). Client components use `useTranslations`.
6. **Always import `Link` from `@/i18n/navigation`** — never from `next/link`.
7. **Use `@/` path alias** for all internal imports (maps to `src/`).
8. **Booking URL** lives in `siteConfig.ctas.bookingUrl` — never hard-code the JaneApp URL.
9. **Enroll path** lives in `siteConfig.ctas.enrollPath` — currently `/enroll`.
10. **Nav paths** for clinic and academy links live in `src/config/nav.ts`.
11. **Metadata**: Every page needs `generateMetadata` using `getTranslations`. Keys live in the appropriate namespace in all 3 locale files.
12. **`generateStaticParams`**: The locale layout already handles this via `routing.locales`. Individual pages do not need it unless they have dynamic segments.
13. **Main padding**: `<main>` has `pt-[7.25rem] md:pt-[8rem]` to account for the fixed Navbar+TopBar height. Full-bleed sections on inner pages (like the dark hero) are contained within this — do NOT use negative margin tricks on inner pages (only the homepage Hero does that).
