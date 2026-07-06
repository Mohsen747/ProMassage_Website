import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { requireRole } from "@/shared/auth/session";
import * as studentService from "@/modules/education/services/studentService";
import * as enrollmentService from "@/modules/education/services/enrollmentService";
import * as paymentService from "@/modules/education/services/paymentService";
import * as certificateService from "@/modules/education/services/certificateService";
import * as attendanceService from "@/modules/education/services/attendanceService";
import { listAllCourses } from "@/modules/education/services/courseService";
import { NotFoundError } from "@/modules/education/constants/errors";
import StatusBadge from "@/modules/education/components/account/StatusBadge";
import {
  ENROLLMENT_STATUS_META,
  PAYMENT_STATUS_META,
  formatDate,
  formatMoney,
} from "@/modules/education/components/account/statusMeta";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Student · Admin" };

const PROVIDER_LABELS: Record<string, string> = { square: "Square", manual: "Manual" };

interface PageProps {
  params: { id: string };
}

export default async function AdminStudentDetailPage({ params: { id } }: PageProps) {
  await requireRole("admin");

  const profile = await studentService.getStudentProfile(id).catch((error) => {
    if (error instanceof NotFoundError) return null;
    throw error;
  });
  if (!profile) notFound();

  const [enrollments, payments, certificates, attendance, courses] = await Promise.all([
    enrollmentService.listStudentEnrollments(id),
    paymentService.listStudentPayments(id),
    certificateService.listStudentCertificates(id),
    attendanceService.getStudentAttendance(id),
    listAllCourses({ publishedOnly: false }),
  ]);

  const courseName = (courseId: string): string =>
    courses.find((course) => course.id === courseId)?.name ?? "Course";

  const stats = [
    { label: "Enrollments", value: String(profile.enrollmentCount) },
    { label: "Active", value: String(profile.activeEnrollmentCount) },
    { label: "Completed", value: String(profile.completedEnrollmentCount) },
    { label: "Total paid", value: formatMoney(profile.totalPaidCents) },
    { label: "Certificates", value: String(profile.certificateCount) },
  ];

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/students"
          className="text-sm font-medium text-brand-forest hover:text-brand-700"
        >
          ← Back to students
        </Link>
        <h1 className="mt-3 font-serif text-3xl text-stone-900 sm:text-4xl">
          {profile.firstName} {profile.lastName}
        </h1>
        <p className="mt-1 text-stone-600">
          {profile.email}
          {profile.phone ? ` · ${profile.phone}` : ""} · Joined {formatDate(profile.createdAt)}
        </p>
      </div>

      <section aria-label="Summary" className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <p className="font-serif text-2xl text-stone-900">{stat.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-stone-500">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <Section title="Enrollments">
        {enrollments.length === 0 ? (
          <Empty>No enrollments.</Empty>
        ) : (
          <Table head={["Course", "Tier", "Amount due", "Status", "Enrolled"]}>
            {enrollments.map((enrollment) => (
              <tr key={enrollment.id} className="text-stone-700">
                <td className="px-5 py-3">
                  <Link
                    href={`/admin/courses/${enrollment.courseId}`}
                    className="font-medium text-stone-900 hover:text-brand-forest"
                  >
                    {courseName(enrollment.courseId)}
                  </Link>
                </td>
                <td className="px-5 py-3">{enrollment.pricingTier}</td>
                <td className="px-5 py-3">{formatMoney(enrollment.amountDueCents)}</td>
                <td className="px-5 py-3">
                  <StatusBadge {...ENROLLMENT_STATUS_META[enrollment.status]} />
                </td>
                <td className="px-5 py-3 whitespace-nowrap">{formatDate(enrollment.enrolledAt)}</td>
              </tr>
            ))}
          </Table>
        )}
      </Section>

      <Section title="Payments">
        {payments.length === 0 ? (
          <Empty>No payments.</Empty>
        ) : (
          <Table head={["Date", "Amount", "Provider", "Status"]}>
            {payments.map((payment) => (
              <tr key={payment.id} className="text-stone-700">
                <td className="px-5 py-3 whitespace-nowrap">{formatDate(payment.createdAt)}</td>
                <td className="px-5 py-3 font-medium text-stone-900">
                  {formatMoney(payment.amountCents, payment.currency)}
                </td>
                <td className="px-5 py-3">{PROVIDER_LABELS[payment.provider] ?? payment.provider}</td>
                <td className="px-5 py-3">
                  <StatusBadge {...PAYMENT_STATUS_META[payment.status]} />
                </td>
              </tr>
            ))}
          </Table>
        )}
      </Section>

      <Section title="Certificates">
        {certificates.length === 0 ? (
          <Empty>No certificates issued.</Empty>
        ) : (
          <Table head={["Number", "Course", "Status", "Issued"]}>
            {certificates.map((certificate) => (
              <tr key={certificate.id} className="text-stone-700">
                <td className="px-5 py-3 font-mono text-xs">{certificate.certificateNumber}</td>
                <td className="px-5 py-3">{courseName(certificate.courseId)}</td>
                <td className="px-5 py-3">
                  {certificate.status === "issued" ? (
                    <StatusBadge label="Issued" className="bg-brand-100 text-brand-700" />
                  ) : (
                    <StatusBadge label="Revoked" className="bg-red-100 text-red-700" />
                  )}
                </td>
                <td className="px-5 py-3 whitespace-nowrap">{formatDate(certificate.issuedAt)}</td>
              </tr>
            ))}
          </Table>
        )}
      </Section>

      <Section title="Attendance">
        {attendance.length === 0 ? (
          <Empty>No attendance records.</Empty>
        ) : (
          <Table head={["Session", "Status", "Recorded"]}>
            {attendance.map((row) => (
              <tr key={row.id} className="text-stone-700">
                <td className="px-5 py-3 font-mono text-xs">{row.sessionId}</td>
                <td className="px-5 py-3 capitalize">{row.status}</td>
                <td className="px-5 py-3 whitespace-nowrap">{formatDate(row.recordedAt)}</td>
              </tr>
            ))}
          </Table>
        )}
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 font-serif text-xl text-stone-900">{title}</h2>
      {children}
    </section>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 text-sm text-stone-600">
      {children}
    </div>
  );
}

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-stone-100 text-left text-stone-500">
            {head.map((label) => (
              <th key={label} className="px-5 py-3 font-medium">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">{children}</tbody>
      </table>
    </div>
  );
}
