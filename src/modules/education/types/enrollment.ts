export type PricingTier = "group" | "semi_individual" | "individual";

export type EnrollmentStatus =
  | "pending_payment"
  | "active"
  | "completed"
  | "cancelled";

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  intakeId: string | null;
  pricingTier: PricingTier;
  status: EnrollmentStatus;
  amountDueCents: number;
  enrolledAt: Date;
  completedAt: Date | null;
}
