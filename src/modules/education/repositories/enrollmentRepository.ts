import type { Enrollment, EnrollmentStatus } from "@/modules/education/types/enrollment";
import type { EnrollmentFilter } from "@/modules/education/validators/enrollmentSchema";

export interface CreateEnrollmentData {
  studentId: string;
  courseId: string;
  intakeId: string | null;
  pricingTier: Enrollment["pricingTier"];
  amountDueCents: number;
}

export async function createEnrollment(_data: CreateEnrollmentData): Promise<Enrollment> {
  throw new Error("enrollmentRepository.createEnrollment not implemented (scaffold)");
}

export async function findEnrollmentById(_id: string): Promise<Enrollment | null> {
  throw new Error("enrollmentRepository.findEnrollmentById not implemented (scaffold)");
}

export async function findEnrollmentsByStudent(_studentId: string): Promise<Enrollment[]> {
  throw new Error("enrollmentRepository.findEnrollmentsByStudent not implemented (scaffold)");
}

export async function findEnrollments(_filter: EnrollmentFilter): Promise<Enrollment[]> {
  throw new Error("enrollmentRepository.findEnrollments not implemented (scaffold)");
}

export async function countActiveEnrollmentsForIntake(_intakeId: string): Promise<number> {
  throw new Error("enrollmentRepository.countActiveEnrollmentsForIntake not implemented (scaffold)");
}

export async function updateEnrollmentStatus(
  _id: string,
  _status: EnrollmentStatus
): Promise<Enrollment> {
  throw new Error("enrollmentRepository.updateEnrollmentStatus not implemented (scaffold)");
}
