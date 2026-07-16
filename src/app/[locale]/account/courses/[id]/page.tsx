import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { requireUser } from "@/shared/auth/session";
import * as enrollmentService from "@/modules/education/services/enrollmentService";
import * as paymentService from "@/modules/education/services/paymentService";
import { listPublicCourses } from "@/modules/education/services/courseService";
import StatusBadge from "@/modules/education/components/account/StatusBadge";
import ResumeCheckoutButton from "@/modules/education/components/account/ResumeCheckoutButton";
import {
  ENROLLMENT_STATUS_META,
  PAYMENT_STATUS_META,
  formatDate,
  formatMoney,
} from "@/modules/education/components/account/statusMeta";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Enrollment details" };

type PageProps = { params: { id: string } };

export default async function EnrollmentDetailPage({ params: { id } }: PageProps) {
  const user = await requireUser();

  // Scope to the student's own enrollments — this is the ownership guard.
  const enrollments = await enrollmentService.listStudentEnrollments(user.id);
  const enrollment = enrollments.find((e) => e.id === id);
  if (!enrollment) notFound();

  const courses = await listPublicCourses();
  const course = courses.find((c) => c.id === enrollment.courseId) ?? null;

  const payments = (await paymentService.listStudentPayments(user.id)).filter(
    (p) => p.enrollmentId === enrollment.id
  );
  const latestPayment = payments[0] ?? null;

  return (
    <div className="space-y-8">
      <p>
        <Link
          href="/account/courses"
          className="text-sm font-medium text-brand-forest hover:text-brand-700"
        >
          ← Back to my courses
        </Link>
      </p>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl">
            {course?.name ?? "Course"}
          </h1>
          <p className="mt-2 text-xs text-stone-500">Enrolled {formatDate(enrollment.enrolledAt)}</p>
        </div>
        <StatusBadge {...ENROLLMENT_STATUS_META[enrollment.status]} />
      </header>

      {course ? (
        <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm leading-relaxed text-stone-600">{course.description}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600">
            <span>
              <span className="font-semibold text-stone-900">{course.hours.total}h</span> total
            </span>
            <span>Instructor: {course.instructor}</span>
          </div>
          <div className="mt-5">
            <Link
              href={`/academy/${course.slug}`}
              className="text-sm font-medium text-brand-forest hover:text-brand-700"
            >
              View full program details →
            </Link>
          </div>
        </section>
      ) : null}

      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-serif text-xl text-stone-900">Payment</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">
              Amount due
            </dt>
            <dd className="mt-1 font-semibold text-stone-900">
              {formatMoney(enrollment.amountDueCents)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">
              Payment status
            </dt>
            <dd className="mt-1">
              {latestPayment ? (
                <StatusBadge {...PAYMENT_STATUS_META[latestPayment.status]} />
              ) : (
                <span className="text-sm text-stone-500">No payment started</span>
              )}
            </dd>
          </div>
        </dl>

        {enrollment.status === "pending_payment" ? (
          <div className="mt-6 border-t border-stone-100 pt-6">
            <p className="mb-3 text-sm text-stone-600">
              Your seat isn&apos;t confirmed until payment is complete.
            </p>
            <ResumeCheckoutButton enrollmentId={enrollment.id} />
          </div>
        ) : null}
      </section>
    </div>
  );
}
