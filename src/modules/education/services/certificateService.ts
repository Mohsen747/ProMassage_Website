import type { Certificate } from "@/modules/education/types/certificate";
import type { IssueCertificateInput, RevokeCertificateInput } from "@/modules/education/validators/certificateSchema";
import * as certificateRepository from "@/modules/education/repositories/certificateRepository";
import * as enrollmentRepository from "@/modules/education/repositories/enrollmentRepository";
import { InvalidStateError, NotFoundError } from "@/modules/education/constants/errors";

// Certificate issuance (admin). The human-readable certificateNumber is
// allocated in the repository (it needs a DB count + the unique constraint as a
// race guard). PDF generation is a FUTURE integration point — `generateCertificatePdf`
// is the placeholder hook the client will wire to a provider later.

export async function issueCertificate(
  input: IssueCertificateInput,
  adminId: string
): Promise<Certificate> {
  const enrollment = await enrollmentRepository.findEnrollmentById(input.enrollmentId);
  if (!enrollment) throw new NotFoundError("Enrollment");
  if (enrollment.status !== "completed") {
    throw new InvalidStateError("Certificate can only be issued for a completed enrollment");
  }

  // One certificate per enrollment (also enforced by a unique DB constraint).
  const existing = await certificateRepository.findCertificateByEnrollment(enrollment.id);
  if (existing) {
    throw new InvalidStateError("A certificate has already been issued for this enrollment");
  }

  const certificate = await certificateRepository.createCertificate({
    enrollmentId: enrollment.id,
    studentId: enrollment.studentId,
    courseId: enrollment.courseId,
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

/** Lookup by the public certificate number (used by the certificate view page). */
export async function getCertificateByNumber(certificateNumber: string): Promise<Certificate | null> {
  return certificateRepository.findCertificateByNumber(certificateNumber);
}

/** Certificates keyed by enrollmentId for a set of enrollments (admin lists). */
export async function listCertificatesForEnrollments(
  enrollmentIds: string[]
): Promise<Map<string, Certificate>> {
  const certificates = await certificateRepository.findCertificatesByEnrollments(enrollmentIds);
  return new Map(certificates.map((certificate) => [certificate.enrollmentId, certificate]));
}

export async function revokeCertificate(input: RevokeCertificateInput): Promise<Certificate> {
  return certificateRepository.revokeCertificate(input.certificateId);
}
