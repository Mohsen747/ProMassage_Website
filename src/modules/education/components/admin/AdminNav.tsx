"use client";

import { Link, usePathname } from "@/i18n/navigation";
import SignOutButton from "@/shared/auth/SignOutButton";

// Shared sidebar navigation for every /admin/* page — mirrors AccountNav.
// next-intl's usePathname returns the locale-stripped path, so it compares
// cleanly against the bare hrefs.
const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/courses", label: "Courses" },
  { href: "/admin/students", label: "Students" },
  { href: "/admin/enrollments", label: "Enrollments" },
  { href: "/admin/payments", label: "Payments" },
] as const;

export default function AdminNav() {
  const pathname = usePathname();

  const isActive = (href: string): boolean =>
    href === "/admin"
      ? pathname === "/admin"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <p className="px-2 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-spa">
        Admin
      </p>
      <ul className="space-y-1">
        {LINKS.map((link) => {
          const active = isActive(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-100 text-brand-700"
                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 border-t border-stone-100 pt-4">
        <SignOutButton className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-900" />
      </div>
    </nav>
  );
}
