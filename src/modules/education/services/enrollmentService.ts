import type { Enrollment } from "@/modules/education/types/enrollment";
import type { EnrollmentFormInput, EnrollmentFilter } from "@/modules/education/validators/enrollmentSchema";
import * as enrollmentRepository from "@/modules/education/repositories/enrollmentRepository";
import * as courseRepository from "@/modules/education/repositories/courseRepository";
import * as scheduleRepository from "@/modules/education/repositories/scheduleRepository";
import {
  CapacityFullError,
  DuplicateEnrollmentError,
  NotFoundError,
} from "@/modules/education/constants/errors";
import { PRICING_TIER_MULTIPLIER } from "@/modules/education/constants";

// Enrollment business rules — one of the two CRITICAL flows (must be unit-tested,
// CONTRIBUTING.md §16). Capacity + duplicate checks happen HERE, not in the UI.

interface EnrollArgs {
  form: EnrollmentFormInput;
  studentId: string;
}

/** Compute the amount owed (cents) for a course + tier from the group base price. */
export function computeAmountDueCents(groupPrice: number, tier: Enrollment["pricingTier"]): number {
  const dollars = Math.round(groupPrice * PRICING_TIER_MULTIPLIER[tier]);
  return dollars * 100;
}

export async function createEnrollment({ form, studentId }: EnrollArgs): Promise<Enrollment> {
  const course = await courseRepository.findCourseBySlug(form.courseSlug);
  if (!course) throw new NotFoundError("Course");

  const intakeId = form.intakeId ?? null;
  if (intakeId) {
    const intake = await scheduleRepository.findIntakeById(intakeId);
    if (!intake) throw new NotFoundError("Course intake");
    const enrolled = await enrollmentRepository.countActiveEnrollmentsForIntake(intakeId);
    if (enrolled >= intake.capacity) throw new CapacityFullError();
  }

  // The unique (student, course, intake) constraint is the final race guard;
  // this pre-check gives a friendlier error on the common path.
  const existing = await enrollmentRepository.findEnrollmentsByStudent(studentId);
  if (existing.some((e) => e.courseId === course.id && e.intakeId === intakeId)) {
    throw new DuplicateEnrollmentError();
  }

  return enrollmentRepository.createEnrollment({
    studentId,
    courseId: course.id,
    intakeId,
    pricingTier: form.pricingTier,
    amountDueCents: computeAmountDueCents(course.pricing.group, form.pricingTier),
  });
}

export async function listStudentEnrollments(studentId: string): Promise<Enrollment[]> {
  return enrollmentRepository.findEnrollmentsByStudent(studentId);
}

export async function listEnrollments(filter: EnrollmentFilter): Promise<Enrollment[]> {
  return enrollmentRepository.findEnrollments(filter);
}

export async function markCompleted(enrollmentId: string): Promise<Enrollment> {
  return enrollmentRepository.updateEnrollmentStatus(enrollmentId, "completed");
}
