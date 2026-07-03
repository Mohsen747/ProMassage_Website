import { z } from "zod";
import { idSchema } from "@/shared/validators/common";

// Admin issues a certificate for a completed enrollment. PDF generation is a
// FUTURE integration — this only records the issuance intent.

export const issueCertificateSchema = z.object({
  enrollmentId: idSchema,
});

export const revokeCertificateSchema = z.object({
  certificateId: idSchema,
  reason: z.string().trim().min(3).max(500),
});

export type IssueCertificateInput = z.infer<typeof issueCertificateSchema>;
export type RevokeCertificateInput = z.infer<typeof revokeCertificateSchema>;
