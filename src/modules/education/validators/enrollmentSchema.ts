import { z } from "zod";
import { emailSchema, idSchema, phoneSchema } from "@/shared/validators/common";

// Public enrollment form (/academy/enroll/[slug]). Collects applicant details;
// account creation + Enrollment row happen server-side after validation.

export const pricingTierSchema = z.enum(["group", "semi_individual", "individual"]);

export const enrollmentFormSchema = z.object({
  courseSlug: z.string().trim().min(1),
  intakeId: idSchema.optional(),
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  email: emailSchema,
  phone: phoneSchema,
  // Public form only ever submits the group tier (non-group is arranged privately).
  pricingTier: pricingTierSchema.default("group"),
  notes: z.string().trim().max(1000).optional(),
  acceptTerms: z.literal(true, {
    error: () => "You must accept the terms to enroll",
  }),
});

export const enrollmentStatusSchema = z.enum([
  "pending_payment",
  "active",
  "completed",
  "cancelled",
]);

// Admin filter for /admin/enrollments.
export const enrollmentFilterSchema = z.object({
  status: enrollmentStatusSchema.optional(),
  courseId: idSchema.optional(),
  studentId: idSchema.optional(),
});

export type EnrollmentFormInput = z.infer<typeof enrollmentFormSchema>;
export type EnrollmentFilter = z.infer<typeof enrollmentFilterSchema>;
