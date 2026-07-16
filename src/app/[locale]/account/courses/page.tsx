import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { requireUser } from "@/shared/auth/session";
import * as enrollmentService from "@/modules/education/services/enrollmentService";
import { listPublicCourses } from "@/modules/education/services/courseService";
import StatusBadge from "@/modules/education/components/account/StatusBadge";
import { ENROLLMENT_STATUS_META, formatDate } from "@/modules/education/components/account/statusMeta";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "My Courses" };

export default async function AccountCoursesPage() {
  const user = await requireUser();
  const enrollments = await enrollmentService.listStudentEnrollments(user.id);

  const courses = await listPublicCourses();
  const courseName = (courseId: string): string =>
    courses.find((course) => course.id === courseId)?.name ?? "Course";

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl">My courses</h1>
        <p className="mt-2 text-stone-600">Every program you&apos;ve enrolled in.</p>
      </header>

      {enrollments.length === 0 ? (
        <div className="rounded-xl border border-stone-200 bg-white p-6 text-sm text-stone-600">
          You haven&apos;t enrolled in any programs yet.{" "}
          <Link href="/academy/programs" className="font-medium text-brand-forest hover:text-brand-700">
            Browse programs →
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {enrollments.map((enrollment) => (
            <li key={enrollment.id}>
              <Link
                href={`/account/courses/${enrollment.id}`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-colors hover:border-brand-200"
              >
                <div>
                  <p className="font-medium text-stone-900">{courseName(enrollment.courseId)}</p>
                  <p className="mt-1 text-xs text-stone-500">
                    Enrolled {formatDate(enrollment.enrolledAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge {...ENROLLMENT_STATUS_META[enrollment.status]} />
                  <span aria-hidden className="text-stone-400">
                    →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
