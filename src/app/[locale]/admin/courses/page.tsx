import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { requireRole } from "@/shared/auth/session";
import { listAllCourses } from "@/modules/education/services/courseService";
import { COURSE_CATEGORY_LABELS } from "@/modules/education/constants";
import StatusBadge from "@/modules/education/components/account/StatusBadge";
import Button from "@/components/ui/Button";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Courses · Admin" };

const dollars = (value: number): string =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(value);

export default async function AdminCoursesPage() {
  await requireRole("admin");
  // publishedOnly=false → include unpublished courses (admin sees everything).
  const courses = await listAllCourses({ publishedOnly: false });

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl">Courses</h1>
          <p className="mt-2 text-stone-600">{courses.length} total programs.</p>
        </div>
        <Button href="/admin/courses/new" variant="primary">
          New course
        </Button>
      </header>

      <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 text-left text-stone-500">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Pricing (G / S / I)</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {courses.map((course) => (
              <tr key={course.id} className="text-stone-700 transition-colors hover:bg-stone-50">
                <td className="px-5 py-3">
                  <Link
                    href={`/admin/courses/${course.id}`}
                    className="font-medium text-stone-900 hover:text-brand-forest"
                  >
                    {course.name}
                  </Link>
                  <span className="mt-0.5 block text-xs text-stone-400">/{course.slug}</span>
                </td>
                <td className="px-5 py-3">{COURSE_CATEGORY_LABELS[course.category]}</td>
                <td className="px-5 py-3 whitespace-nowrap">
                  {dollars(course.pricing.group)} / {dollars(course.pricing.semiIndividual)} /{" "}
                  {dollars(course.pricing.individual)}
                </td>
                <td className="px-5 py-3">
                  {course.published ? (
                    <StatusBadge label="Published" className="bg-brand-100 text-brand-700" />
                  ) : (
                    <StatusBadge label="Unpublished" className="bg-stone-200 text-stone-600" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
