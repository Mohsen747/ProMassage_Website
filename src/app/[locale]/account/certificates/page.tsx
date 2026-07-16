import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { requireUser } from "@/shared/auth/session";
import * as certificateService from "@/modules/education/services/certificateService";
import { listAllCourses } from "@/modules/education/services/courseService";
import { formatDate } from "@/modules/education/components/account/statusMeta";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "My Certificates" };

export default async function AccountCertificatesPage() {
  const user = await requireUser();

  const [certificates, courses] = await Promise.all([
    certificateService.listStudentCertificates(user.id),
    // publishedOnly:false — a certificate may reference a course later unpublished.
    listAllCourses({ publishedOnly: false }),
  ]);

  const courseName = (courseId: string): string =>
    courses.find((course) => course.id === courseId)?.name ?? "Course";

  // Revoked certificates are no longer valid records — only surface issued ones.
  const issued = certificates.filter((certificate) => certificate.status === "issued");

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl">My certificates</h1>
        <p className="mt-2 text-stone-600">
          Certificates you&apos;ve earned. Open one to view or print it.
        </p>
      </header>

      {issued.length === 0 ? (
        <div className="rounded-xl border border-stone-200 bg-white p-6 text-sm text-stone-600">
          You don&apos;t have any certificates yet. They appear here once your course is completed and
          your certificate is issued.
        </div>
      ) : (
        <ul className="space-y-3">
          {issued.map((certificate) => (
            <li key={certificate.id}>
              <Link
                href={`/certificates/${certificate.certificateNumber}`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-colors hover:border-brand-200"
              >
                <div>
                  <p className="font-medium text-stone-900">{courseName(certificate.courseId)}</p>
                  <p className="mt-1 text-xs text-stone-500">
                    Issued {formatDate(certificate.issuedAt)} ·{" "}
                    <span className="font-mono">{certificate.certificateNumber}</span>
                  </p>
                </div>
                <span aria-hidden className="text-stone-400">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
