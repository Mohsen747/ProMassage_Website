# ProMassage Website — Project Skill

Use this skill when working on any page, component, or content for the ProMassage Clinic & Academy website. It contains site-specific content data, page completion status, and implementation patterns that are not in the code.

---

## Site Sides at a Glance

```
CLINIC SIDE                          ACADEMY SIDE
/                  Homepage          /academy          Hub page
/services          Services          /academy/PROGRAMS  Course cards ✓
/pricing           Pricing           /academy/schedule NOT BUILT
/about             About             /academy/cert...  NOT BUILT
/contact           Contact form      /enroll           Enrollment
/faq               FAQ accordion
```

---

## Clinic Side — Page Status

### `/` — Homepage
**Status: Complete.** Sections: Hero (video bg), ProblemSolution, WhyChoose, Testimonials, AboutPreview, FaqPreview.

### `/services` — Clinic Services
**Status: Complete.** Shows all 10 clinic services using `ServiceCard variant="full"`. Data from `getServicesList()` + locale messages.

**10 clinic services (from `src/data/serviceBase.ts`):**
| Slug | Title | Price | Duration |
|------|-------|-------|---------|
| `swedish-relaxation` | Swedish Massage or Relaxation Therapy | $110 | 60min |
| `hot-stone-therapy` | Hot Stone Therapy | $125 | 60min |
| `foot-reflexology` | Foot Massage & Reflexology | $65 | 30min |
| `chair-massage` | Chair Massage Therapy | $55 | 30min |
| `wood-therapy-full-body` | Wood Therapy (Anti-cellulite) Full Body | $120 | 60min |
| `wood-therapy-half-body` | Wood Therapy (Anti-cellulite) Half Body | $60 | 30min |
| `professional-facial-massage` | Professional Facial Massage | $60 | 30min |
| `deep-tissue` | Deep Tissue Massage | $115 | 60min |
| `sport-massage` | Sport Massage | $60 | 30min |
| `ninety-minute-massage` | 90-Minute Massage | $150 | 90min |

### `/pricing` — Pricing
**Status: Complete.** Lists all services with price shown (`ServiceCard variant="preview" showPrice`).

### `/about` — About ProMassage
**Status: Complete.** Dark hero + content sections + green CTA. Could be expanded with instructor bio for academy tie-in.

### `/faq` — FAQ
**Status: Complete.** Dark hero + FaqAccordion + green CTA.

### `/contact` — Contact
**Status: Complete.** Dark hero + two-column layout: left (contact info + ContactForm), right (location card + trust badges).

---

## Academy Side — Page Status

### `/academy` — Hub
**Status: Minimal (placeholder).** Shows title, intro, and links to sub-pages. Needs expansion with more content about the academy philosophy, instructor intro, and visual design.

### `/academy/PROGRAMS` — Course Catalog
**Status: Complete.** Full 13-course catalog with stats row, category sections, CourseCard components, and CTA banner.

### `/academy/schedule` — Class Schedule
**Status: NOT BUILT.** Page does not exist. The `academySub.schedule` i18n key exists as a stub. Needs a real page at `src/app/[locale]/academy/schedule/page.tsx`.

Content to include:
- Intake dates (term start/end dates)
- Weekly class schedule (days + times)
- Session format details (in-person, hybrid, online)
- Contact CTA for current availability

### `/academy/certification` — Certification Pathways
**Status: NOT BUILT.** Page does not exist. The `academySub.certification` i18n key exists as a stub. Needs a real page at `src/app/[locale]/academy/certification/page.tsx`.

Content to include:
- Accreditation status: **In progress with Collectif Santé (RMQ/AMQ)**
- What certification means for graduates
- Requirements to complete the diploma
- Pathways after certification (practice, continuing education)

### `/enroll` — Enrollment
**Status: Minimal.** Shows instructions + links to JaneApp. Could be expanded with a proper enrollment form or multi-step flow.

---

## All 13 Academy PROGRAMS

Data lives in `src/data/PROGRAMS.js`. Import via:
```js
import { PROGRAMS, introductoryPROGRAMS, diplomaPROGRAMS, continuingEducationPROGRAMS } from "@/data/PROGRAMS";
```

### Category: Introductory (1 course)

**1. Introduction to Massage Therapy**
- Slug: `intro-massage-therapy`
- Hours: 20h total (10h theory / 10h practical)
- Prerequisites: None — open to all
- Group price: $300 CAD
- Description: A foundational overview of massage therapy covering anatomy basics, safe touch principles, and hands-on technique. Ideal for those exploring the field before committing to a full program.
- Highlights:
  - Body mechanics and safe practice from day one
  - Introduction to anatomy relevant to massage
  - Basic Swedish strokes in a supervised setting
  - Professional and ethical expectations in clinic

---

### Category: Professional Diploma (1 course)
**Displayed with accent border `#6b8c3e`. Pass `accentBorder` prop to `CourseCard`.**

**2. Professional Massage Therapy Diploma**
- Slug: `professional-diploma`
- Hours: 400h total (160h theory / 240h practical)
- Prerequisites: Introduction to Massage Therapy or equivalent background
- Group price: $5,000 CAD
- Description: A comprehensive diploma program covering the full scope of therapeutic massage practice. Graduates are prepared for client-facing clinical work with skills in assessment, treatment planning, and professional documentation.
- Highlights:
  - Full anatomy, physiology, and pathology curriculum
  - Supervised clinic hours with real client interactions
  - Professional ethics, boundaries, and documentation
  - Assessment and individualized treatment planning

---

### Category: Continuing Education (11 PROGRAMS)
**Displayed in a responsive 2-column grid (`sm:grid-cols-2`).**

**3. Deep Tissue Massage Techniques**
- Slug: `deep-tissue-techniques`
- Hours: 24h total (8h theory / 16h practical)
- Prerequisites: Active RMT licence or diploma in massage therapy
- Group price: $420 CAD
- Description: Focused instruction on deeper pressure techniques for chronic muscle tension, postural issues, and myofascial restrictions.
- Highlights: Slow intentional strokes / Identifying holding patterns / Pressure calibration / Contraindication screening

**4. Advanced Swedish Massage**
- Slug: `advanced-swedish-massage`
- Hours: 20h total (6h theory / 14h practical)
- Prerequisites: Active RMT licence or diploma in massage therapy
- Group price: $360 CAD
- Description: Refine and deepen Swedish technique with advanced sequencing, client-centered pacing, and improved pressure modulation.
- Highlights: Advanced effleurage/petrissage / Pacing for nervous system regulation / Full-body integration flows / Real-time client feedback

**5. Sports Massage & Athletic Recovery**
- Slug: `sports-massage-recovery`
- Hours: 30h total (10h theory / 20h practical)
- Prerequisites: Active RMT licence or diploma in massage therapy
- Group price: $500 CAD
- Description: Pre-event preparation, acute event support, and post-event recovery. Athletic anatomy, common injuries, and protocols for active clients.
- Highlights: Pre/post-event protocols / Common musculoskeletal injuries / Compression, tapotement, facilitated stretching / Adapting to different athletic demands

**6. Prenatal & Postnatal Massage**
- Slug: `prenatal-postnatal-massage`
- Hours: 24h total (10h theory / 14h practical)
- Prerequisites: Active RMT licence or diploma in massage therapy
- Group price: $420 CAD
- Description: Safe and effective massage for clients during and after pregnancy. Trimester-specific positioning, contraindications, and therapeutic goals.
- Highlights: Trimester-by-trimester adaptations / Safe bolstering and draping / Postpartum recovery priorities / Red flags and contraindications

**7. Myofascial Release Therapy**
- Slug: `myofascial-release`
- Hours: 30h total (12h theory / 18h practical)
- Prerequisites: Active RMT licence or diploma in massage therapy
- Group price: $500 CAD
- Description: Fascial anatomy and sustained myofascial release. Effective for chronic pain, restricted movement, and postural tension.
- Highlights: Fascial anatomy and tensegrity model / Sustained barrier-melting techniques / Full-body fascial assessment / Integration with Swedish and deep tissue

**8. Trigger Point Therapy**
- Slug: `trigger-point-therapy`
- Hours: 24h total (8h theory / 16h practical)
- Prerequisites: Active RMT licence or diploma in massage therapy
- Group price: $420 CAD
- Description: Identify and release active and latent trigger points. Palpation skill-building with targeted compression and release protocols.
- Highlights: Trigger point identification and referral maps / Ischemic compression and muscle energy / Common patterns: neck, shoulder, back / Client communication during release

**9. Manual Lymphatic Drainage**
- Slug: `lymphatic-drainage`
- Hours: 30h total (12h theory / 18h practical)
- Prerequisites: Active RMT licence or diploma in massage therapy
- Group price: $500 CAD
- Description: Light rhythmic techniques to stimulate the lymphatic system. Used post-surgically and in oncology support care.
- Highlights: Lymphatic anatomy and node drainage / Stationary circles, pump, scoop / Protocols for edema and post-surgical care / Contraindications and MLD scope

**10. Hot Stone Therapy**
- Slug: `hot-stone-therapy`
- Hours: 20h total (6h theory / 14h practical)
- Prerequisites: Active RMT licence or diploma in massage therapy
- Group price: $360 CAD
- Description: Heated basalt stones for extended therapeutic reach. Stone selection, heating protocols, temperature management, integration with manual techniques.
- Highlights: Stone selection, temperature safety, hygiene / Placement sequences for deep heat / Combining stone work with Swedish strokes / Contraindications for heat therapy

**11. Craniosacral Therapy Fundamentals**
- Slug: `craniosacral-fundamentals`
- Hours: 30h total (14h theory / 16h practical)
- Prerequisites: Active RMT licence or diploma in massage therapy
- Group price: $500 CAD
- Description: Craniosacral rhythm and gentle techniques for meningeal restrictions. Effective for headaches, TMJ, and nervous system tension.
- Highlights: Craniosacral rhythm palpation / Diaphragm releases and dural tube techniques / Still point induction / Clinical scope and safe client selection

**12. Aromatherapy & Massage Integration**
- Slug: `aromatherapy-massage`
- Hours: 24h total (10h theory / 14h practical)
- Prerequisites: Active RMT licence or diploma in massage therapy
- Group price: $420 CAD
- Description: Essential oils to support therapeutic massage outcomes. Safe dilution, blending for client goals, and allergy considerations.
- Highlights: Essential oil chemistry and safety / Carrier oils, dilution, blending / Allergy and sensitivity intake / Oils matched to therapeutic goals

**13. Chair & Corporate Massage**
- Slug: `chair-corporate-massage`
- Hours: 20h total (6h theory / 14h practical)
- Prerequisites: Active RMT licence or diploma in massage therapy
- Group price: $360 CAD
- Description: Seated massage for corporate, event, and community wellness. 10–20 minute protocols for neck, shoulders, back, and arms — no oils or draping.
- Highlights: Ergonomic chair setup and body mechanics / Quick-session protocols for upper body / Client intake in non-clinical settings / Portable setup and professional presentation

---

## Instructor

All academy pages, course cards, schedule, and certification pages must include:

**Maryam Roostaei, RMT · M.Sc. Exercise Physiology**

This line appears at the bottom of each course card and should appear in the instructor bio section of academy pages. She is the founder and lead instructor of ProMassage Academy.

---

## Accreditation

**Current status: Accreditation in progress with Collectif Santé (RMQ/AMQ).**

Mention this on:
- `/academy/certification` page
- Any "about the academy" section
- Enrollment page if relevant

Phrasing suggestion: "ProMassage Academy is pursuing accreditation with Collectif Santé (RMQ/AMQ). Contact us for the latest status."

Do NOT claim full accreditation until confirmed.

---

## CTA Patterns

### Clinic CTAs
| Action | Button variant | Destination |
|--------|---------------|-------------|
| Book a session | `spaHero` / `spa` / `inverse` | `siteConfig.ctas.bookingUrl` (JaneApp) |
| View services | `spaOutlineHero` / `outlineStone` | `/services` |
| Get directions | `linkLead` | Google Maps URL |

### Academy CTAs
| Action | Button variant | Destination |
|--------|---------------|-------------|
| Enroll Now | `spaHero` / `spa` | `siteConfig.ctas.enrollPath` → `/enroll` |
| Ask a Question | `spaOutlineHero` / `outlineStone` | `/contact` |
| Browse Academy | `outlineStone` | `/academy` |
| View Schedule | `outlineStone` | `/academy/schedule` |

### Bottom CTA banner pattern for academy pages
```tsx
<section className="py-16 text-white md:py-20" style={{ background: "#1e3d20" }}>
  <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
    <h2 className="mb-3 font-serif text-3xl sm:text-4xl">{heading}</h2>
    <p className="mb-8 text-lg text-white/80">{body}</p>
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Button href={siteConfig.ctas.enrollPath} variant="spaHero">Enroll Now</Button>
      <Button href="/contact" variant="spaOutlineHero">Ask a Question</Button>
    </div>
  </div>
</section>
```

---

## Building New Academy Pages

When building `/academy/schedule` or `/academy/certification`, follow this pattern exactly:

```tsx
// src/app/[locale]/academy/schedule/page.tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { navPaths } from "@/config/nav";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "academySub" });
  return { title: t("schedule.title"), description: t("schedule.description") };
}

export default async function SchedulePage() {
  const t = await getTranslations("academySub");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  return (
    <>
      {/* Dark hero (breadcrumb: Academy / Schedule) */}
      {/* Content section */}
      {/* Academy CTA banner */}
    </>
  );
}
```

The breadcrumb pattern for academy sub-pages:
```tsx
<p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-300">
  <Link href={navPaths.academy.sectionHref} className="transition-colors hover:text-white">
    {tNav("academy.sectionLabel")}
  </Link>
  <span className="text-brand-500"> / </span>
  {pageTitle}
</p>
```

---

## i18n Keys Added for PROGRAMS Page

These keys were added to `PROGRAMS` namespace in all 3 locales (`en/fr/fa pages.ts`):

```ts
PROGRAMS.stats.totalLabel       // "Programs offered"
PROGRAMS.stats.hoursLabel       // "Hours range"
PROGRAMS.stats.formatsLabel     // "Format options"
PROGRAMS.stats.totalValue       // "13"
PROGRAMS.stats.hoursValue       // "20–400h"
PROGRAMS.stats.formatsValue     // "Individual · Semi-Individual · Group"
PROGRAMS.sections.introductory
PROGRAMS.sections.professionalDiploma
PROGRAMS.sections.continuingEducation
PROGRAMS.card.theoryLabel
PROGRAMS.card.practicalLabel
PROGRAMS.card.prerequisitesLabel
PROGRAMS.card.highlightsLabel
PROGRAMS.card.showHighlights
PROGRAMS.card.hideHighlights
PROGRAMS.card.fromPrice         // "From"
PROGRAMS.card.currency          // "CAD"
PROGRAMS.card.instructorLabel
PROGRAMS.card.enrollButton      // "Enroll Now"
PROGRAMS.cta.heading            // "Ready to enroll?"
PROGRAMS.cta.body               // "Contact us to discuss scheduling and pricing."
PROGRAMS.cta.enrollButton
PROGRAMS.cta.contactButton
```
