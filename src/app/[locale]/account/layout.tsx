import type { ReactNode } from "react";
import AccountNav from "@/modules/education/components/account/AccountNav";

// The whole /account subtree is per-user (session-derived), so force dynamic
// rendering at the segment root. Setting it here (in addition to each page)
// overrides the static generation the parent `[locale]` layout would otherwise
// enable via generateStaticParams + setRequestLocale, so every /account/* route
// is classified dynamic (ƒ) and never prerendered with an empty session.
export const dynamic = "force-dynamic";

// Shared shell for the student account panel: a sidebar nav (with sign-out) plus
// the page content. Access is enforced by middleware (student role) and each page
// re-derives identity from the session. Pages set `dynamic = "force-dynamic"`.
export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-brand-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <aside className="md:w-60 md:shrink-0">
            <AccountNav />
          </aside>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
