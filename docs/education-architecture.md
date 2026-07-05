# ProMassage Academy — Education Module Architecture

Status: **Scaffold delivered (no packages installed, no DB migrated).** Everything
below is written and reviewable; activation steps are listed at the end.

Defaults chosen (override any of these — see **Open Decisions**):
**Prisma + PostgreSQL** · **Auth.js / NextAuth v5** · **Square (behind a `PaymentGateway` interface)**.

---

## 1. Conceptual Data Model

### Entities & cardinality

```
User (role: student | admin)          Course ──1:N── CourseIntake ──1:N── CourseSession
  │  1:N                                 │                 │                   │
  ├── Enrollment ──N:1── Course          │                 │ 1:N               │ 1:N
  │        │  N:1 (optional)             │                 ▼                   ▼
  │        └────────────── CourseIntake  └── Enrollment    Enrollment ──1:N── Attendance
  │        │  1:N                                                              ▲
  │        ├── Payment                                        recordedBy (admin)
  │        └── Certificate (1:1, optional)
  │  1:N (as student)         1:N (as admin, audit)
  └── Payment / Attendance / Certificate      CreatedBy(Course), IssuedBy(Certificate), RecordedBy(Attendance)
```

| Relationship | Cardinality | FK (on child) | On delete |
|---|---|---|---|
| User → Enrollment | 1 : N | `Enrollment.studentId` | Cascade |
| Course → Enrollment | 1 : N | `Enrollment.courseId` | Restrict (protect history) |
| Course → CourseIntake | 1 : N | `CourseIntake.courseId` | Cascade |
| CourseIntake → CourseSession | 1 : N | `CourseSession.intakeId` | Cascade |
| CourseIntake → Enrollment | 1 : N (optional) | `Enrollment.intakeId` | SetNull |
| Enrollment → Payment | 1 : N (installments) | `Payment.enrollmentId` | Cascade |
| Enrollment → Certificate | 1 : 1 (optional) | `Certificate.enrollmentId` (unique) | Cascade |
| CourseSession → Attendance | 1 : N | `Attendance.sessionId` | Cascade |
| Enrollment → Attendance | 1 : N | `Attendance.enrollmentId` | Cascade |
| User(admin) → Attendance | 1 : N (audit) | `Attendance.recordedById` | SetNull |
| User(admin) → Certificate | 1 : N (audit) | `Certificate.issuedById` | SetNull |
| User(admin) → Course | 1 : N (audit) | `Course.createdById` | SetNull |

**Key design notes**
- **One `User` table, `role` field** — `/account` and `/admin` share it (no separate Admin table; "Admin" = `User` with `role='admin'`).
- **`Admin` entity from the brief is modeled as `User{ role: admin }`**, plus audit FKs (`createdBy`, `issuedBy`, `recordedBy`).
- **Money is integer cents** everywhere (`amountDueCents`, `amountCents`) — never floats.
- **Price snapshot on Enrollment** (`amountDueCents`) so later Course price edits don't rewrite history.
- **Three-tier pricing** stored on Course; **only `priceGroup` is ever exposed publicly** (CLAUDE.md rule). `PublicCourse` strips the other two.
- **Unique guards**: `Enrollment(studentId, courseId, intakeId)`, `Attendance(sessionId, enrollmentId)`, `Certificate.enrollmentId`, `Certificate.certificateNumber`.
- **`CourseIntake`/`CourseSession`** were added to satisfy `/academy/schedule` (Fall/Winter/Spring intakes) and `/admin/attendance` (attendance is *per session*).

Full schema: [`prisma/schema.prisma`](../prisma/schema.prisma).

---

## 2. Folder Structure

```
prisma/
  schema.prisma            # all models (education only; clinic is external/JaneApp)
  seed.ts                  # migrates the 15 records from src/data/programs.ts → Course

src/
  shared/                  # ONLY sanctioned bridge between modules (CONTRIBUTING §15)
    auth/                  # authConfig, session guards (requireUser/requireRole), types
    db/prismaClient.ts     # singleton Prisma client (only repositories import it)
    validators/common.ts   # shared Zod primitives (id, email, pagination, phone)

  modules/
    clinic/README.md       # boundary marker (clinic code left in place)
    education/
      types/               # domain types, ORM-independent (course, enrollment, …)
      validators/          # Zod schemas for every external input
      repositories/        # data access — the ONLY code that touches prisma
      services/            # business logic (capacity, pricing, state transitions)
      server/
        actions/           # "use server" actions = the API surface per page
        payments/          # PaymentGateway interface + SquareGateway
      hooks/               # client state (useCourseFilters, useEnrollmentForm)
      constants/           # labels, multipliers, typed domain errors
      __tests__/           # Vitest unit tests (enrollment, payment)

  app/
    api/education/payments/webhook/route.ts   # Square webhook → paymentService

e2e/enrollment.spec.ts     # Playwright — full enrollment flow
```

**Layering (dependencies point downward only):**
`page / action → service → repository → prisma`. UI never calls a repository or
Prisma directly (CONTRIBUTING §6). Services never import Prisma.

---

## 3. Route → API/Action Map

### Public Academy (`/academy/*`) — no login
| Route | Data in | Backend |
|---|---|---|
| `/academy` | — | `courseService.listPublicCourses` (featured) |
| `/academy/programs` | filter by level | `courseService.listPublicCourses` + `useCourseFilters` |
| `/academy/[slug]` | slug | `courseService.getPublicCourseBySlug` |
| `/academy/schedule` | — | `scheduleService.getUpcomingIntakes` |
| `/academy/certification` | — | static content |
| `/academy/faq` | — | existing next-intl FAQ data |
| `/academy/enroll/[slug]` | form | **`submitEnrollmentAction`** (Zod: `enrollmentFormSchema`) |

### Student `/account/*` — role: student
| Route | Backend |
|---|---|
| `/login`, `/signup` | Auth.js credentials · **`signupAction`** (`signupSchema`) |
| `/account` | `enrollmentService.listStudentEnrollments` |
| `/account/courses` / `[id]` | `listStudentEnrollments` · `getEnrollmentAttendance` |
| `/account/payments` | `paymentService.listStudentPayments` · **`startCheckoutAction`** |
| `/account/certificates` | `certificateService.listStudentCertificates` (PDF download) |
| `/account/profile` | **`updateProfileAction`** (`profileUpdateSchema`) |

### Admin `/admin/*` — role: admin
| Route | Backend |
|---|---|
| `/admin` | `adminStatsService.getDashboardStats` |
| `/admin/courses` `/new` `/[id]` | `listAllCourses` · **`createCourseAction`** / **`updateCourseAction`** / **`deleteCourseAction`** |
| `/admin/students` / `[id]` | `studentService.listStudents` · `getStudentProfile` |
| `/admin/enrollments` | `listEnrollments` (`enrollmentFilterSchema`) · **`completeEnrollmentAction`** |
| `/admin/payments` | `paymentService.listAllPayments` · **`recordManualPaymentAction`** |
| `/admin/attendance` | `getSessionAttendance` · **`markAttendanceAction`** (`markAttendanceSchema`) |
| `/admin/certificates` | **`issueCertificateAction`** / **`revokeCertificateAction`** (PDF = future) |
| `POST /api/education/payments/webhook` | `paymentService.reconcileWebhook` |

Every action returns `ActionResult<T>` and runs through `runAction()` — one
try/catch, Zod re-validation, no internal error leakage (CONTRIBUTING §11, §12).

---

## 4. Module Boundary

- `modules/education/**` and `modules/clinic/**` never import each other.
- All cross-cutting code lives in `src/shared/**` (auth, db, validators) or the
  pre-existing shared infra (`src/i18n`, `src/components`, `src/config`, `src/lib`).
- Clinic code was **left in place** (task scoped to Education); `src/modules/clinic/README.md`
  marks the boundary. Optionally relocate clinic files later — see below.

---

## 5. What Was Created

- `prisma/schema.prisma`, `prisma/seed.ts`
- `src/shared/{auth,db,validators}/*` (+ README)
- `src/modules/education/{types,validators,repositories,services,server,hooks,constants,__tests__}/*`
- `src/app/api/education/payments/webhook/route.ts`
- `e2e/enrollment.spec.ts`
- `src/modules/clinic/README.md`
- Updated `.eslintrc.json` (enforce `no-explicit-any`, allow `_`-prefixed unused params)
- Updated `.env.example` (DATABASE_URL, AUTH_*, SQUARE_*)

**Not created** (deliberately — need your decisions / installs first): the
`/account/*` and `/admin/*` **page components**, the Auth.js route handler, and
the concrete repository/service bodies (they `throw "not implemented (scaffold)"`).
The public `/academy/*` pages already exist and keep working off `programs.ts`
until the DB seed runs.

---

## 6. Open Decisions (need you)

| # | Decision | Default assumed | Why it matters |
|---|---|---|---|
| 1 | **ORM + DB** | Prisma + PostgreSQL | Schema syntax; `String[]` highlights need Postgres. |
| 2 | **Auth** | Auth.js (NextAuth v5) + Prisma adapter | `session.ts` guards + password hashing bind to this. |
| 3 | **Payments** | Square, behind `PaymentGateway` | Implemented in `squareGateway.ts` (confirmed 2026-07-05). |
| 4 | **Certificate PDF** | Deferred; `generateCertificatePdf` is a no-op hook | Pick provider (React-PDF / Puppeteer / DocRaptor) later. |
| 5 | **Approve installs** | Not done (CLAUDE.md: no installs without OK) | Nothing compiles until deps are added. |
| 6 | **`/account` & `/admin` localization** | Suggest **outside `[locale]`** (not translated) | Changes `middleware.ts` matcher + route placement. |
| 7 | **Relocate clinic into `modules/clinic/`** | Left in place | Full symmetry vs. risk of touching working code. |
| 8 | **Installment payments** | Schema allows N payments/enrollment | Confirm if only single upfront payment is wanted. |

---

## 7. Activation (once decisions are confirmed)

```bash
# 1. Deps (needs your OK — none installed yet)
npm i @prisma/client zod next-auth@beta @auth/prisma-adapter square
npm i -D prisma vitest @playwright/test @vitejs/plugin-react

# 2. Database
#   set DATABASE_URL in .env
npx prisma migrate dev --name init_education
npx prisma db seed        # migrates programs.ts → Course

# 3. Fill in repository/service bodies (replace the scaffold throws)
# 4. Wire Auth.js handler + inject hashPassword into authActions/studentService
# 5. Implement SquareGateway + Sandbox keys
```

Add to `package.json` scripts: `"test": "vitest"`, `"test:e2e": "playwright test"`,
`"db:seed": "tsx prisma/seed.ts"`, and a `prisma.seed` entry.
