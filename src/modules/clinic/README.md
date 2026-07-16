# Clinic module (boundary marker)

The **Clinic** (massage services / booking) side is complete and self-contained.
It connects directly to the external service **JaneApp**
(`gubenchiropractic.janeapp.com`) and has **no database presence** in this project.

Its current source lives under the existing app/content structure:
- Pages: `src/app/[locale]/{services,pricing,about,contact,faq}`
- Data: `src/data/{serviceBase,services,servicesLocale}.ts`
- Booking URL: `siteConfig.ctas.bookingUrl`

## Boundary rules (CONTRIBUTING.md §15)

- `modules/education/**` must **never** import from clinic code, and vice versa.
- Anything genuinely shared (layout shell, auth, brand, i18n) lives in
  `src/shared/**` or the pre-existing shared `src/components`, `src/i18n`.

> This folder exists to make the boundary explicit. Clinic logic was left in
> place and **not moved** — the task was scoped to building the Education module.
> Relocating clinic files fully under `src/modules/clinic/` is a separate,
> optional refactor (see `docs/education-architecture.md` → Open Decisions).
