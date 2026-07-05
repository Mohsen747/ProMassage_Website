import { prisma } from "@/shared/db/prismaClient";
import type { Enrollment as PrismaEnrollment } from "@prisma/client";
import type { Enrollment, EnrollmentStatus } from "@/modules/education/types/enrollment";
import type { EnrollmentFilter } from "@/modules/education/validators/enrollmentSchema";

// Data access for Enrollment. ONLY this layer imports `prisma`; services depend
// on these functions, not the ORM (CONTRIBUTING.md §6). Capacity/duplicate rules
// live in enrollmentService — this file just reads and writes rows.

export interface CreateEnrollmentData {
  studentId: string;
  courseId: string;
  intakeId: string | null;
  pricingTier: Enrollment["pricingTier"];
  amountDueCents: number;
}

// A seat is considered taken by any non-cancelled enrollment — including
// pending_payment, so we don't oversell an intake during the checkout window.
const SEAT_HOLDING_STATUSES: EnrollmentStatus[] = ["pending_payment", "active", "completed"];

/** Map a Prisma row → the ORM-independent domain `Enrollment`. */
function toDomain(row: PrismaEnrollment): Enrollment {
  return {
    id: row.id,
    studentId: row.studentId,
    courseId: row.courseId,
    intakeId: row.intakeId,
    pricingTier: row.pricingTier,
    status: row.status,
    amountDueCents: row.amountDueCents,
    enrolledAt: row.enrolledAt,
    completedAt: row.completedAt,
  };
}

export async function createEnrollment(data: CreateEnrollmentData): Promise<Enrollment> {
  const row = await prisma.enrollment.create({
    data: {
      studentId: data.studentId,
      courseId: data.courseId,
      intakeId: data.intakeId,
      pricingTier: data.pricingTier,
      amountDueCents: data.amountDueCents,
      // status defaults to pending_payment in the schema.
    },
  });
  return toDomain(row);
}

export async function findEnrollmentById(id: string): Promise<Enrollment | null> {
  const row = await prisma.enrollment.findUnique({ where: { id } });
  return row ? toDomain(row) : null;
}

export async function findEnrollmentsByStudent(studentId: string): Promise<Enrollment[]> {
  const rows = await prisma.enrollment.findMany({
    where: { studentId },
    orderBy: { enrolledAt: "desc" },
  });
  return rows.map(toDomain);
}

export async function findEnrollments(filter: EnrollmentFilter): Promise<Enrollment[]> {
  const rows = await prisma.enrollment.findMany({
    where: {
      ...(filter.status ? { status: filter.status } : {}),
      ...(filter.courseId ? { courseId: filter.courseId } : {}),
      ...(filter.studentId ? { studentId: filter.studentId } : {}),
    },
    orderBy: { enrolledAt: "desc" },
  });
  return rows.map(toDomain);
}

export async function countActiveEnrollmentsForIntake(intakeId: string): Promise<number> {
  return prisma.enrollment.count({
    where: { intakeId, status: { in: SEAT_HOLDING_STATUSES } },
  });
}

export async function updateEnrollmentStatus(
  id: string,
  status: EnrollmentStatus
): Promise<Enrollment> {
  const row = await prisma.enrollment.update({
    where: { id },
    data: {
      status,
      // Stamp completion time only when transitioning into `completed`.
      ...(status === "completed" ? { completedAt: new Date() } : {}),
    },
  });
  return toDomain(row);
}
