import type { Certificate } from "@/modules/education/types/certificate";
import type { IssueCertificateInput, RevokeCertificateInput } from "@/modules/education/validators/certificateSchema";
import * as certificateRepository from "@/modules/education/repositories/certificateRepository";
import * as enrollmentRepository from "@/modules/education/repositories/enrollmentRepository";
import { InvalidStateError, NotFoundError } from "@/modules/education/constants/errors";

// Certificate issuance (/admin/certificates). PDF generation is a FUTURE
// integration point — `generateCertificatePdf` is the placeholder hook the
// client will wire to a provider later. Issuance records the certificate now;
// the PDF URL is filled in asynchronously.

function buildCertificateNumber(courseId: string, issuedAt: Date): string {
  const year = issuedAt.getFullYear();
  const shortCourse = courseId.slice(-4).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `PM-${year}-${shortCourse}-${rand}`;
}

export async function issueCertificate(
  input: IssueCertificateInput,
  adminId: string
): Promise<Certificate> {
  const enrollment = await enrollmentRepository.findEnrollmentById(input.enrollmentId);
  if (!enrollment) throw new NotFoundError("Enrollment");
  if (enrollment.status !== "completed") {
    throw new InvalidStateError("Certificate can only be issued for a completed enrollment");
  }

  const certificate = await certificateRepository.createCertificate({
    enrollmentId: enrollment.id,
    studentId: enrollment.studentId,
    courseId: enrollment.courseId,
    certificateNumber: buildCertificateNumber(enrollment.courseId, new Date()),
    issuedById: adminId,
  });

  // Fire-and-forget PDF generation (best-effort; failure must not block issuance).
  void generateCertificatePdf(certificate.id);
  return certificate;
}

/**
 * FUTURE: generate the certificate PDF and persist its URL.
 * Provider undecided (see decisions doc). No-op placeholder for now.
 */
export async function generateCertificatePdf(_certificateId: string): Promise<void> {
  // const url = await pdfProvider.render(...);
  // await certificateRepository.setCertificatePdfUrl(certificateId, url);
  return;
}

export async function listStudentCertificates(studentId: string): Promise<Certificate[]> {
  return certificateRepository.findCertificatesByStudent(studentId);
}

export async function revokeCertificate(input: RevokeCertificateInput): Promise<Certificate> {
  return certificateRepository.revokeCertificate(input.certificateId);
}
