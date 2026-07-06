import type { ReactNode } from "react";
import { requireRole } from "@/shared/auth/session";
import AdminNav from "@/modules/education/components/admin/AdminNav";

// The whole /admin subtree is admin-only and session-derived. `requireRole`
// here is defense-in-depth alongside the middleware guard; force-dynamic keeps
// every route uncached (never prerendered with an empty session).
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireRole("admin");

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-brand-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <aside className="md:w-60 md:shrink-0">
            <AdminNav />
          </aside>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
