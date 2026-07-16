import { Prisma } from "@prisma/client";
import { prisma } from "@/shared/db/prismaClient";
import type { Certificate as PrismaCertificate } from "@prisma/client";
import type { Certificate } from "@/modules/education/types/certificate";

export interface CreateCertificateData {
  enrollmentId: string;
  studentId: string;
  courseId: string;
  issuedById: string;
}

// Human-readable certificate ID, e.g. PMA-2026-0042. The numeric part is a
// per-year sequence derived from the count of certificates already issued that
// year; the DB `certificateNumber @unique` constraint is the final guard, so we
// retry on the (rare) concurrent collision by bumping the sequence.
const MAX_NUMBER_ATTEMPTS = 8;

function formatCertificateNumber(year: number, sequence: number): string {
  return `PMA-${year}-${String(sequence).padStart(4, "0")}`;
}

/** True only when the unique violation is on `certificateNumber` (not enrollmentId). */
function isCertificateNumberCollision(error: unknown): boolean {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== "P2002") {
    return false;
  }
  const target = error.meta?.target;
  return Array.isArray(target) && target.includes("certificateNumber");
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

export async function createCertificate(data: CreateCertificateData): Promise<Certificate> {
  const now = new Date();
  const year = now.getFullYear();
  const yearStart = new Date(year, 0, 1);
  const issuedThisYear = await prisma.certificate.count({
    where: { issuedAt: { gte: yearStart } },
  });

  let sequence = issuedThisYear + 1;
  for (let attempt = 0; attempt < MAX_NUMBER_ATTEMPTS; attempt++) {
    try {
      const row = await prisma.certificate.create({
        data: {
          enrollmentId: data.enrollmentId,
          studentId: data.studentId,
          courseId: data.courseId,
          certificateNumber: formatCertificateNumber(year, sequence),
          issuedById: data.issuedById,
        },
      });
      return toDomain(row);
    } catch (error) {
      // Only a certificateNumber clash is retryable; an enrollmentId clash means
      // a certificate already exists for this enrollment — let that surface.
      if (isCertificateNumberCollision(error) && attempt < MAX_NUMBER_ATTEMPTS - 1) {
        sequence += 1;
        continue;
      }
      throw error;
    }
  }
  throw new Error("Could not allocate a unique certificate number");
}

export async function findCertificateByNumber(certificateNumber: string): Promise<Certificate | null> {
  const row = await prisma.certificate.findUnique({ where: { certificateNumber } });
  return row ? toDomain(row) : null;
}

export async function findCertificateByEnrollment(enrollmentId: string): Promise<Certificate | null> {
  const row = await prisma.certificate.findUnique({ where: { enrollmentId } });
  return row ? toDomain(row) : null;
}

export async function findCertificatesByStudent(studentId: string): Promise<Certificate[]> {
  const rows = await prisma.certificate.findMany({
    where: { studentId },
    orderBy: { issuedAt: "desc" },
  });
  return rows.map(toDomain);
}

/** Certificates for a set of enrollments (admin lists — map by enrollmentId). */
export async function findCertificatesByEnrollments(enrollmentIds: string[]): Promise<Certificate[]> {
  if (enrollmentIds.length === 0) return [];
  const rows = await prisma.certificate.findMany({
    where: { enrollmentId: { in: enrollmentIds } },
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
