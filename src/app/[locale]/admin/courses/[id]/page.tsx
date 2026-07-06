import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { requireRole } from "@/shared/auth/session";
import * as courseService from "@/modules/education/services/courseService";
import { NotFoundError } from "@/modules/education/constants/errors";
import CourseForm, { type CourseFormValues } from "@/modules/education/components/admin/CourseForm";
import CoursePublishToggle from "@/modules/education/components/admin/CoursePublishToggle";
import StatusBadge from "@/modules/education/components/account/StatusBadge";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Edit course · Admin" };

interface PageProps {
  params: { id: string };
}

export default async function EditCoursePage({ params: { id } }: PageProps) {
  await requireRole("admin");

  const course = await courseService.getCourse(id).catch((error) => {
    if (error instanceof NotFoundError) return null;
    throw error;
  });
  if (!course) notFound();

  const defaults: CourseFormValues = {
    slug: course.slug,
    name: course.name,
    category: course.category,
    theoryHours: course.hours.theory,
    practicalHours: course.hours.practical,
    priceGroup: course.pricing.group,
    priceSemiIndividual: course.pricing.semiIndividual,
    priceIndividual: course.pricing.individual,
    prerequisites: course.prerequisites,
    description: course.description,
    highlights: course.highlights,
    tag: course.tag,
    instructor: course.instructor,
    published: course.published,
  };

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/courses"
          className="text-sm font-medium text-brand-forest hover:text-brand-700"
        >
          ← Back to courses
        </Link>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl">{course.name}</h1>
            {course.published ? (
              <StatusBadge label="Published" className="bg-brand-100 text-brand-700" />
            ) : (
              <StatusBadge label="Unpublished" className="bg-stone-200 text-stone-600" />
            )}
          </div>
          <CoursePublishToggle courseId={course.id} published={course.published} />
        </div>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <CourseForm mode="edit" courseId={course.id} defaults={defaults} />
      </div>
    </div>
  );
}
