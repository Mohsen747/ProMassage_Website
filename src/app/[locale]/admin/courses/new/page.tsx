import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { requireRole } from "@/shared/auth/session";
import CourseForm from "@/modules/education/components/admin/CourseForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "New course · Admin" };

export default async function NewCoursePage() {
  await requireRole("admin");

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/courses"
          className="text-sm font-medium text-brand-forest hover:text-brand-700"
        >
          ← Back to courses
        </Link>
        <h1 className="mt-3 font-serif text-3xl text-stone-900 sm:text-4xl">New course</h1>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <CourseForm mode="create" />
      </div>
    </div>
  );
}
