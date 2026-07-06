import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { requireRole } from "@/shared/auth/session";
import * as enrollmentService from "@/modules/education/services/enrollmentService";
import * as studentService from "@/modules/education/services/studentService";
import { listAllCourses } from "@/modules/education/services/courseService";
import type { EnrollmentStatus } from "@/modules/education/types/enrollment";
import type { EnrollmentFilter } from "@/modules/education/validators/enrollmentSchema";
import StatusBadge from "@/modules/education/components/account/StatusBadge";
import {
  ENROLLMENT_STATUS_META,
  formatDate,
  formatMoney,
} from "@/modules/education/components/account/statusMeta";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Enrollments · Admin" };

const STATUSES: EnrollmentStatus[] = ["pending_payment", "active", "completed", "cancelled"];

const selectClass =
  "rounded-sm border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500";

interface PageProps {
  searchParams: { status?: string; courseId?: string };
}

export default async function AdminEnrollmentsPage({ searchParams }: PageProps) {
  await requireRole("admin");

  const status = STATUSES.includes(searchParams.status as EnrollmentStatus)
    ? (searchParams.status as EnrollmentStatus)
    : undefined;
  const courseId = searchParams.courseId || undefined;

  const filter: EnrollmentFilter = {
    ...(status ? { status } : {}),
    ...(courseId ? { courseId } : {}),
  };

  const [enrollments, courses, students] = await Promise.all([
    enrollmentService.listEnrollments(filter),
    listAllCourses({ publishedOnly: false }),
    studentService.listStudents(),
  ]);

  const courseName = (id: string): string =>
    courses.find((course) => course.id === id)?.name ?? "Course";
  const studentName = (id: string): string => {
    const student = students.find((s) => s.id === id);
    return student ? `${student.firstName} ${student.lastName}` : "Student";
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl">Enrollments</h1>
        <p className="mt-2 text-stone-600">{enrollments.length} matching enrollments.</p>
      </header>

      <form method="get" className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs font-medium text-stone-500">
          Status
          <select name="status" defaultValue={status ?? ""} className={selectClass}>
            <option value="">All statuses</option>
            {STATUSES.map((value) => (
              <option key={value} value={value}>
                {ENROLLMENT_STATUS_META[value].label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-stone-500">
          Course
          <select name="courseId" defaultValue={courseId ?? ""} className={selectClass}>
            <option value="">All courses</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
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
        {status || courseId ? (
          <Link href="/admin/enrollments" className="px-2 py-2 text-sm text-stone-500 hover:text-stone-800">
            Clear
          </Link>
        ) : null}
      </form>

      {enrollments.length === 0 ? (
        <div className="rounded-xl border border-stone-200 bg-white p-6 text-sm text-stone-600">
          No enrollments match this filter.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-left text-stone-500">
                <th className="px-5 py-3 font-medium">Student</th>
                <th className="px-5 py-3 font-medium">Course</th>
                <th className="px-5 py-3 font-medium">Tier</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Enrolled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id} className="text-stone-700 transition-colors hover:bg-stone-50">
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/students/${enrollment.studentId}`}
                      className="font-medium text-stone-900 hover:text-brand-forest"
                    >
                      {studentName(enrollment.studentId)}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/courses/${enrollment.courseId}`}
                      className="hover:text-brand-forest"
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
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
