"use server";

import { manualPaymentSchema, startPaymentSchema } from "@/modules/education/validators/paymentSchema";
import * as paymentService from "@/modules/education/services/paymentService";
import type { Payment } from "@/modules/education/types/payment";
import { runAction, type ActionResult } from "@/modules/education/server/actions/actionResult";
import { requireRole, requireUser } from "@/shared/auth/session";
import { getSiteUrl } from "@/lib/siteUrl";

// Student starts checkout for a pending enrollment.
export async function startCheckoutAction(input: unknown): Promise<ActionResult<{ redirectUrl: string }>> {
  const user = await requireUser();
  const base = getSiteUrl();
  return runAction({
    schema: startPaymentSchema,
    input,
    handler: (data) =>
      paymentService.startCheckout({
        input: data,
        studentEmail: user.email,
        successUrl: `${base}/account/payments?status=success`,
        cancelUrl: `${base}/account/payments?status=cancelled`,
      }),
  });
}

// Admin records an offline/manual payment.
export async function recordManualPaymentAction(input: unknown): Promise<ActionResult<Payment>> {
  await requireRole("admin");
  return runAction({
    schema: manualPaymentSchema,
    input,
    handler: (data) => paymentService.recordManualPayment(data),
  });
}
