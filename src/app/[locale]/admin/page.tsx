import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { requireRole } from "@/shared/auth/session";
import * as adminStatsService from "@/modules/education/services/adminStatsService";
import { formatMoney } from "@/modules/education/components/account/statusMeta";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin dashboard" };

export default async function AdminDashboardPage() {
  const admin = await requireRole("admin");
  const stats = await adminStatsService.getDashboardStats();

  const cards = [
    { label: "Students", value: String(stats.totalStudents) },
    { label: "Active enrollments", value: String(stats.activeEnrollments) },
    { label: "Pending payment", value: String(stats.pendingPaymentEnrollments) },
    { label: "Published courses", value: String(stats.publishedCourses) },
    { label: "Revenue (paid)", value: formatMoney(stats.revenuePaidCents) },
    { label: "Certificates issued", value: String(stats.certificatesIssued) },
  ];

  const links = [
    { href: "/admin/courses", title: "Courses", body: "Create, edit, publish programs." },
    { href: "/admin/students", title: "Students", body: "Browse student accounts." },
    { href: "/admin/enrollments", title: "Enrollments", body: "All enrollments across students." },
    { href: "/admin/payments", title: "Payments", body: "All payment transactions." },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl">
          Welcome, {admin.firstName}
        </h1>
        <p className="mt-2 text-stone-600">Academy overview at a glance.</p>
      </header>

      <section aria-label="Summary" className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <p className="font-serif text-3xl text-stone-900">{card.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-stone-500">
              {card.label}
            </p>
          </div>
        ))}
      </section>

      <section aria-labelledby="manage-heading">
        <h2 id="manage-heading" className="mb-4 font-serif text-xl text-stone-900">
          Manage
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {links.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-colors hover:border-brand-200"
            >
              <p className="font-medium text-stone-900">{card.title}</p>
              <p className="mt-1 text-sm text-stone-500">{card.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
