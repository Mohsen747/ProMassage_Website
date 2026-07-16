import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import AcademyPageHeader from "@/components/layout/AcademyPageHeader";
import EnrollForm from "@/modules/education/components/EnrollForm";
import { getServerSession } from "@/shared/auth/session";
import { findPublicCourseBySlug } from "@/modules/education/services/courseService";

// Public enrollment page. Enrolling requires an account (the enrollment is tied
// to a student record for attendance/certificates), so this page gates on the
// session and hands unauthenticated visitors to /login with a callback back here.
// English-only for now, matching the auth pages — i18n copy is a later pass.
type PageProps = {
  params: { locale: string; slug: string };
};

export async function generateMetadata({ params: { slug } }: PageProps): Promise<Metadata> {
  const course = await findPublicCourseBySlug(slug);
  if (!course) return {};
  return { title: `Enroll — ${course.name}` };
}

export default async function EnrollPage({ params: { slug } }: PageProps) {
  const course = await findPublicCourseBySlug(slug);
  if (!course) notFound();

  const session = await getServerSession();
  const priceLabel = `$${course.fromPrice.toLocaleString()} CAD`;

  return (
    <>
      <AcademyPageHeader
        title={`Enroll in ${course.name}`}
        subtitle="Reserve your seat and pay securely to confirm your enrollment."
        breadcrumb="Enroll"
      />

      <div className="bg-brand-50 py-16 md:py-24">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8">
            <Link
              href={`/academy/${slug}`}
              className="text-sm font-medium text-brand-forest hover:text-brand-700"
            >
              ← Back to {course.name}
            </Link>
          </p>

          <div className="rounded-xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-spa">
                ProMassage Academy
              </p>
              <h2 className="mt-3 font-serif text-2xl text-stone-900 sm:text-3xl">{course.name}</h2>
              <p className="mt-2 text-sm text-stone-500">
                {course.hours.total}h program · Tuition from {priceLabel}
              </p>
            </div>

            {session && session.user.role === "student" ? (
              <EnrollForm
                courseSlug={slug}
                priceLabel={priceLabel}
                defaults={{
                  firstName: session.user.firstName,
                  lastName: session.user.lastName,
                  email: session.user.email,
                }}
              />
            ) : session ? (
              <div className="rounded-sm border border-brand-200 bg-brand-50 px-4 py-4 text-sm text-stone-700">
                You&apos;re signed in as an administrator. Please use a student account to enroll in
                a program.
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-stone-600">
                  You&apos;ll need a student account to enroll. Log in or create one — it takes less
                  than a minute — and you&apos;ll come right back here.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={{ pathname: "/login", query: { callbackUrl: `/academy/enroll/${slug}` } }}
                    className="inline-flex flex-1 items-center justify-center rounded-sm bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
                  >
                    Log in
                  </Link>
                  <Link
                    href={{ pathname: "/signup", query: { callbackUrl: `/academy/enroll/${slug}` } }}
                    className="inline-flex flex-1 items-center justify-center rounded-sm border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
                  >
                    Create account
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
