import { Link } from "@/i18n/navigation";
import type { Certificate } from "@/modules/education/types/certificate";
import type { EnrollmentStatus } from "@/modules/education/types/enrollment";
import IssueCertificateButton from "./IssueCertificateButton";

interface CertificateCellProps {
  enrollmentId: string;
  status: EnrollmentStatus;
  certificate?: Certificate;
}

// Per-enrollment certificate control shared by /admin/students/[id] and
// /admin/enrollments: a link once issued, an "Issue" button for completed
// enrollments without one, and a dash for everything else (only completed
// enrollments are eligible).
export default function CertificateCell({ enrollmentId, status, certificate }: CertificateCellProps) {
  if (certificate) {
    return (
      <Link
        href={`/certificates/${certificate.certificateNumber}`}
        target="_blank"
        className="text-sm font-medium text-brand-forest hover:text-brand-700"
      >
        View certificate ↗
      </Link>
    );
  }
  if (status === "completed") {
    return <IssueCertificateButton enrollmentId={enrollmentId} />;
  }
  return <span className="text-stone-400">—</span>;
}
