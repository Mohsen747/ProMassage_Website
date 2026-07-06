import { prisma } from "@/shared/db/prismaClient";
import type { Certificate as PrismaCertificate } from "@prisma/client";
import type { Certificate } from "@/modules/education/types/certificate";

export interface CreateCertificateData {
  enrollmentId: string;
  studentId: string;
  courseId: string;
  certificateNumber: string;
  issuedById: string;
}

/** Map a Prisma row → the ORM-independent domain `Certificate`. */
function toDomain(row: PrismaCertificate): Certificate {
  return {
    id: row.id,
    enrollmentId: row.enrollmentId,
    studentId: row.studentId,
    courseId: row.courseId,
    certificateNumber: row.certificateNumber,
    status: row.status,
    pdfUrl: row.pdfUrl,
    issuedById: row.issuedById,
    issuedAt: row.issuedAt,
  };
}

export async function createCertificate(_data: CreateCertificateData): Promise<Certificate> {
  throw new Error("certificateRepository.createCertificate not implemented (scaffold)");
}

export async function findCertificatesByStudent(studentId: string): Promise<Certificate[]> {
  const rows = await prisma.certificate.findMany({
    where: { studentId },
    orderBy: { issuedAt: "desc" },
  });
  return rows.map(toDomain);
}

/** Count of issued (non-revoked) certificates (admin dashboard). */
export async function countIssued(): Promise<number> {
  return prisma.certificate.count({ where: { status: "issued" } });
}

export async function setCertificatePdfUrl(_id: string, _pdfUrl: string): Promise<Certificate> {
  throw new Error("certificateRepository.setCertificatePdfUrl not implemented (scaffold)");
}

export async function revokeCertificate(_id: string): Promise<Certificate> {
  throw new Error("certificateRepository.revokeCertificate not implemented (scaffold)");
}
