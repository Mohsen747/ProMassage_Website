import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { requireRole } from "@/shared/auth/session";
import * as paymentService from "@/modules/education/services/paymentService";
import * as enrollmentService from "@/modules/education/services/enrollmentService";
import * as studentService from "@/modules/education/services/studentService";
import { listAllCourses } from "@/modules/education/services/courseService";
import type { PaymentStatus } from "@/modules/education/types/payment";
import StatusBadge from "@/modules/education/components/account/StatusBadge";
import {
  PAYMENT_STATUS_META,
  formatDate,
  formatMoney,
} from "@/modules/education/components/account/statusMeta";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Payments · Admin" };

const STATUSES: PaymentStatus[] = ["pending", "paid", "failed", "refunded"];
const PROVIDER_LABELS: Record<string, string> = { square: "Square", manual: "Manual" };

const selectClass =
  "rounded-sm border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500";

interface PageProps {
  searchParams: { status?: string };
}

export default async function AdminPaymentsPage({ searchParams }: PageProps) {
  await requireRole("admin");

  const status = STATUSES.includes(searchParams.status as PaymentStatus)
    ? (searchParams.status as PaymentStatus)
    : undefined;

  const [allPayments, enrollments, courses, students] = await Promise.all([
    paymentService.listAllPayments(),
    enrollmentService.listEnrollments({}),
    listAllCourses({ publishedOnly: false }),
    studentService.listStudents(),
  ]);

  const payments = status ? allPayments.filter((p) => p.status === status) : allPayments;

  const courseIdForEnrollment = (enrollmentId: string): string | undefined =>
    enrollments.find((e) => e.id === enrollmentId)?.courseId;
  const courseName = (courseId?: string): string =>
    courses.find((course) => course.id === courseId)?.name ?? "—";
  const studentName = (id: string): string => {
    const student = students.find((s) => s.id === id);
    return student ? `${student.firstName} ${student.lastName}` : "Student";
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl">Payments</h1>
        <p className="mt-2 text-stone-600">{payments.length} matching transactions.</p>
      </header>

      <form method="get" className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs font-medium text-stone-500">
          Status
          <select name="status" defaultValue={status ?? ""} className={selectClass}>
            <option value="">All statuses</option>
            {STATUSES.map((value) => (
              <option key={value} value={value}>
                {PAYMENT_STATUS_META[value].label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="rounded-md bg-brand-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          Filter
        </button>
        {status ? (
          <Link href="/admin/payments" className="px-2 py-2 text-sm text-stone-500 hover:text-stone-800">
            Clear
          </Link>
        ) : null}
      </form>

      {payments.length === 0 ? (
        <div className="rounded-xl border border-stone-200 bg-white p-6 text-sm text-stone-600">
          No payments match this filter.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-left text-stone-500">
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Student</th>
                <th className="px-5 py-3 font-medium">Course</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Provider</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {payments.map((payment) => (
                <tr key={payment.id} className="text-stone-700 transition-colors hover:bg-stone-50">
                  <td className="px-5 py-3 whitespace-nowrap">{formatDate(payment.createdAt)}</td>
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/students/${payment.studentId}`}
                      className="font-medium text-stone-900 hover:text-brand-forest"
                    >
                      {studentName(payment.studentId)}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    {courseName(courseIdForEnrollment(payment.enrollmentId))}
                  </td>
                  <td className="px-5 py-3 font-medium text-stone-900">
                    {formatMoney(payment.amountCents, payment.currency)}
                  </td>
                  <td className="px-5 py-3">
                    {PROVIDER_LABELS[payment.provider] ?? payment.provider}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge {...PAYMENT_STATUS_META[payment.status]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
