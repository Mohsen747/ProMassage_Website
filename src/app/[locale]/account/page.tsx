import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { requireUser } from "@/shared/auth/session";
import * as enrollmentService from "@/modules/education/services/enrollmentService";
import { listPublicCourses } from "@/modules/education/services/courseService";
import StatusBadge from "@/modules/education/components/account/StatusBadge";
import { ENROLLMENT_STATUS_META } from "@/modules/education/components/account/statusMeta";

// Per-user data via the session → must render dynamically (never prerender).
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "My Account" };

export default async function AccountDashboardPage() {
  const user = await requireUser();
  const enrollments = await enrollmentService.listStudentEnrollments(user.id);

  const courses = await listPublicCourses();
  const courseName = (courseId: string): string =>
    courses.find((course) => course.id === courseId)?.name ?? "Course";

  const active = enrollments.filter((e) => e.status === "active");
  const pending = enrollments.filter((e) => e.status === "pending_payment");
  const completed = enrollments.filter((e) => e.status === "completed");

  const stats = [
    { label: "Active", value: active.length },
    { label: "Pending payment", value: pending.length },
    { label: "Completed", value: completed.length },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl">
          Welcome back, {user.firstName}
        </h1>
        <p className="mt-2 text-stone-600">
          Here&apos;s a snapshot of your programs and account.
        </p>
      </header>

      <section aria-label="Summary" className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-stone-200 bg-white p-5 text-center shadow-sm"
          >
            <p className="font-serif text-3xl text-stone-900">{stat.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-stone-500">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <section aria-labelledby="active-heading">
        <h2 id="active-heading" className="mb-4 font-serif text-xl text-stone-900">
          Active enrollments
        </h2>
        {active.length === 0 ? (
          <div className="rounded-xl border border-stone-200 bg-white p-6 text-sm text-stone-600">
            You have no active programs yet.{" "}
            <Link href="/academy/programs" className="font-medium text-brand-forest hover:text-brand-700">
              Browse programs →
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {active.map((enrollment) => (
              <li key={enrollment.id}>
                <Link
                  href={`/account/courses/${enrollment.id}`}
                  className="flex items-center justify-between gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-colors hover:border-brand-200"
                >
                  <span className="font-medium text-stone-900">{courseName(enrollment.courseId)}</span>
                  <StatusBadge {...ENROLLMENT_STATUS_META[enrollment.status]} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="links-heading">
        <h2 id="links-heading" className="mb-4 font-serif text-xl text-stone-900">
          Quick links
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { href: "/account/courses", title: "My courses", body: "View all your enrollments." },
            { href: "/account/payments", title: "Payments", body: "See your payment history." },
            { href: "/account/profile", title: "Profile", body: "Update your details." },
          ].map((card) => (
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
