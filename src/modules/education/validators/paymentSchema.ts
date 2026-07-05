import { z } from "zod";
import { idSchema } from "@/shared/validators/common";

// Payment creation / gateway callbacks. Amounts are integer cents — never floats.

export const paymentStatusSchema = z.enum(["pending", "paid", "failed", "refunded"]);
export const paymentProviderSchema = z.enum(["square", "manual"]);

/** Start checkout for an enrollment (student-initiated). */
export const startPaymentSchema = z.object({
  enrollmentId: idSchema,
});

/** Admin-recorded offline payment (e-transfer, in person). */
export const manualPaymentSchema = z.object({
  enrollmentId: idSchema,
  amountCents: z.number().int().positive(),
  currency: z.string().length(3).default("CAD"),
});

/** Normalized shape of a verified gateway webhook event. */
export const paymentWebhookSchema = z.object({
  providerRef: z.string().min(1),
  status: paymentStatusSchema,
  amountCents: z.number().int().nonnegative(),
});

export type StartPaymentInput = z.infer<typeof startPaymentSchema>;
export type ManualPaymentInput = z.infer<typeof manualPaymentSchema>;
export type PaymentWebhookInput = z.infer<typeof paymentWebhookSchema>;
