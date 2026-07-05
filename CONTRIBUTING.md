# Contributing Guidelines — ProMassage Academy

This document defines the development rules for this project. Goal: consistent,
maintainable code that can scale over the long term.

These rules are mandatory for all new code. Existing code that doesn't follow
them should be refactored at the next opportunity — not copied as a pattern.

---

## 1. File length

- Components: max ~300 lines
- Service / logic files: max ~400–500 lines
- Pure data files (before migration to the database) are exempt.

When a file approaches this limit, split it by responsibility
(e.g. a large component → `index.tsx` + sub-components in the same folder).

---

## 2. Naming conventions

| Type | Convention | Example |
|---|---|---|
| Variable, function | camelCase | `getUserById`, `enrollmentStatus` |
| Component (file and name) | PascalCase | `CourseCard.tsx`, `StudentDashboard.tsx` |
| Non-component file (util, service, hook) | camelCase | `courseRepository.ts`, `useEnrollment.ts` |
| Type / Interface | PascalCase | `Course`, `EnrollmentStatus` |
| Constant | UPPER_SNAKE_CASE | `MAX_CAPACITY`, `CATEGORIES` |
| Folders | kebab-case | `course-management/` |

File and variable names must be descriptive and meaningful — no ambiguous abbreviations.

---

## 3. TypeScript only

- Only `.ts` and `.tsx` files — no new `.js`/`.jsx` files added to the project.
- ESLint must reject any new `.js`/`.jsx` file.
- `tsconfig.json` must remain in `strict` mode.

---

## 4. One file, one responsibility

Each file does exactly one thing: one component, one service, one related group
of types. A file that renders UI, makes API calls, and does complex calculations
all at once must be split apart.

---

## 5. Import paths

- Always use the absolute alias `@/...`.
- Long relative paths (`../../../../data/programs`) are not allowed.

---

## 6. Separate business logic from UI

- Components only render UI.
- Business logic lives in `services/`; state/effect logic lives in `hooks/`.
- Components must not query data directly or run complex calculations.

---

## 7. No `any`

- Use of `any` is not allowed; replace it with a precise type.
- ESLint rule `@typescript-eslint/no-explicit-any` must be enabled.

---

## 8. Explicit prop types

Every component must have an explicit `interface Props {}` — not a type inferred
from usage.

---

## 9. Automated formatting

- Prettier + ESLint are mandatory.
- A pre-commit hook (Husky) automatically formats and lints before every commit.

---

## 10. No commented-out code

Unused code is deleted, not left commented out. Git history is sufficient for
recovering it later.

---

## 11. Error handling

Every API or database call must have try/catch or equivalent error handling.
This is non-negotiable for payment and enrollment flows in particular.

---

## 12. Input validation

Every form (enrollment, course creation in the admin panel, ...) and every API
route must validate input with a standard library (**Zod**) before it reaches
the database — not rely solely on the HTML input `type`.

---

## 13. Commit convention

Use **Conventional Commits**:

```
feat: add course enrollment form
fix: correct capacity check race condition
refactor: extract certificate service
```

---

## 14. Environment variables

- `.env` is never committed.
- `.env.example` must always stay in sync with real variables;
  every new variable is added to it immediately.

---

## 15. Module boundaries

- Code inside `modules/education/` never imports directly from `modules/clinic/`
  (and vice versa).
- Shared data or logic between modules must come from `shared/`.

---

## 16. Mandatory testing and no direct pushes to production

**Testing:**
- Every sensitive business-logic service (enrollment, capacity, payment,
  attendance, certificate issuance) must have at least a unit test.
- Forms and API routes must have integration tests (at minimum: the happy path
  plus the main error paths).
- Tooling: **Vitest** for unit/integration tests, **Playwright** for e2e tests
  on sensitive flows (e.g. the full enrollment process).

**Production:**
- No direct commits to the main/production branch — everything goes through a
  Pull Request.
- No PR can be merged without passing full CI (`lint → type-check → test → build`).
- Changes are deployed to **staging** first; minimal manual testing (especially
  payments in Square Sandbox mode) is required before going to production.

---

## Rules summary

| # | Rule |
|---|---|
| 1 | Max file length: ~300 lines (components) / ~400-500 lines (services) |
| 2 | Strict naming convention by file type |
| 3 | `.ts`/`.tsx` only |
| 4 | One file = one responsibility |
| 5 | Absolute imports with `@/` |
| 6 | Business logic separated from UI |
| 7 | No `any` |
| 8 | Explicit prop types |
| 9 | Prettier + ESLint + Husky |
| 10 | No commented-out code |
| 11 | Mandatory error handling |
| 12 | Validation with Zod |
| 13 | Conventional Commits |
| 14 | `.env` never committed |
| 15 | Strict module boundaries |
| 16 | Mandatory testing + no direct pushes to production |
