export type CertificateStatus = "issued" | "revoked";

export interface Certificate {
  id: string;
  enrollmentId: string;
  studentId: string;
  courseId: string;
  certificateNumber: string;
  status: CertificateStatus;
  /** Null until the (future) PDF pipeline generates the document. */
  pdfUrl: string | null;
  issuedById: string | null;
  issuedAt: Date;
}
