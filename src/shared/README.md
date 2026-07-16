# Shared layer

The **only** sanctioned bridge between `modules/education` and `modules/clinic`
(CONTRIBUTING.md §15). Neither module imports the other; cross-cutting concerns
live here.

| Folder | Purpose |
|--------|---------|
| `auth/` | Single auth system for `/account` (student) and `/admin` (admin). Role-based guards. |
| `db/` | `prismaClient.ts` — the singleton Prisma client. Only repositories import it. |
| `validators/` | Zod primitives reused across modules (id, email, pagination, phone). |

Existing shared infrastructure that predates this layer and remains shared:
`src/i18n`, `src/components/{layout,ui,brand}`, `src/config`, `src/lib`.
