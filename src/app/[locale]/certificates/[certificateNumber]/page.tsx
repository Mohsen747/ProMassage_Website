import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import { getServerSession } from "@/shared/auth/session";
import { authRoutes } from "@/shared/auth/routes";
import * as certificateService from "@/modules/education/services/certificateService";
import * as studentService from "@/modules/education/services/studentService";
import { getCourse } from "@/modules/education/services/courseService";
import { NotFoundError } from "@/modules/education/constants/errors";
import CertificateFrame from "@/modules/education/components/certificate/CertificateFrame";
import { buildCertificateHtml } from "@/modules/education/components/certificate/certificateMarkup";

// A certificate is a permanent record: viewable/printable any time by the
// student who owns it OR an admin. This route lives OUTSIDE /account and /admin
// (both of which are single-role gated by middleware) precisely so both roles
// can reach it — access is therefore enforced HERE, per request.
export const dynamic = "force-dynamic";

interface PageProps {
  params: { locale: string; certificateNumber: string };
}

export const metadata: Metadata = {
  title: "Certificate · ProMassage Academy",
  // Private document — never index.
  robots: { index: false, follow: false },
};

function formatIssueDate(issuedAt: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(issuedAt);
}

export default async function CertificatePage({ params }: PageProps) {
  const certificateNumber = decodeURIComponent(params.certificateNumber);

  // Must be authenticated. Unlike /account and /admin, middleware doesn't gate
  // this path, so bounce anonymous visitors to login with a return URL.
  const session = await getServerSession();
  if (!session) {
    return redirect({
      href: { pathname: authRoutes.signIn, query: { callbackUrl: `/certificates/${certificateNumber}` } },
      locale: params.locale,
    });
  }

  const certificate = await certificateService.getCertificateByNumber(certificateNumber);
  if (!certificate) notFound();

  // Authorization: the owning student or any admin — otherwise 404 (don't reveal
  // that the certificate exists).
  const isOwner = certificate.studentId === session.user.id;
  const isAdmin = session.user.role === "admin";
  if (!isOwner && !isAdmin) notFound();

  const [student, course] = await Promise.all([
    studentService.getStudent(certificate.studentId).catch((error) => {
      if (error instanceof NotFoundError) return null;
      throw error;
    }),
    getCourse(certificate.courseId).catch((error) => {
      if (error instanceof NotFoundError) return null;
      throw error;
    }),
  ]);
  if (!student || !course) notFound();

  const html = buildCertificateHtml({
    name: `${student.firstName} ${student.lastName}`.trim(),
    course: `${course.name} (${course.hours.total} Hours)`,
    date: formatIssueDate(certificate.issuedAt),
    id: certificate.certificateNumber,
  });

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-brand-50 py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <CertificateFrame html={html} />
      </div>
    </div>
  );
}
