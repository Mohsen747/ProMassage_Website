import type { Payment } from "@/modules/education/types/payment";
import type { ManualPaymentInput, StartPaymentInput } from "@/modules/education/validators/paymentSchema";
import * as paymentRepository from "@/modules/education/repositories/paymentRepository";
import * as enrollmentRepository from "@/modules/education/repositories/enrollmentRepository";
import { getPaymentGateway } from "@/modules/education/server/payments/squareGateway";
import type { WebhookVerification } from "@/modules/education/server/payments/paymentGateway";
import { DEFAULT_CURRENCY } from "@/modules/education/constants";
import { NotFoundError, PaymentError } from "@/modules/education/constants/errors";

// Payment business logic — the second CRITICAL flow (must be unit + integration
// tested). On successful payment the linked enrollment flips pending → active.

interface StartCheckoutArgs {
  input: StartPaymentInput;
  studentEmail: string;
  successUrl: string;
  cancelUrl: string;
}

export async function startCheckout({
  input,
  studentEmail,
  successUrl,
  cancelUrl,
}: StartCheckoutArgs): Promise<{ redirectUrl: string }> {
  const enrollment = await enrollmentRepository.findEnrollmentById(input.enrollmentId);
  if (!enrollment) throw new NotFoundError("Enrollment");
  if (enrollment.status !== "pending_payment") {
    throw new PaymentError("Enrollment is not awaiting payment");
  }

  const gateway = getPaymentGateway();
  const checkout = await gateway.createCheckout({
    enrollmentId: enrollment.id,
    amountCents: enrollment.amountDueCents,
    currency: DEFAULT_CURRENCY,
    customerEmail: studentEmail,
    successUrl,
    cancelUrl,
  });

  await paymentRepository.createPayment({
    enrollmentId: enrollment.id,
    studentId: enrollment.studentId,
    amountCents: enrollment.amountDueCents,
    currency: DEFAULT_CURRENCY,
    provider: "square",
    providerRef: checkout.providerRef,
    status: "pending",
  });

  return { redirectUrl: checkout.redirectUrl };
}

/** Called from the verified webhook route. Idempotent on providerRef. */
export async function reconcileWebhook(event: WebhookVerification): Promise<void> {
  const payment = await paymentRepository.updatePaymentByProviderRef(
    event.providerRef,
    event.status
  );
  if (event.status === "paid") {
    await enrollmentRepository.updateEnrollmentStatus(payment.enrollmentId, "active");
  }
}

export async function recordManualPayment(input: ManualPaymentInput): Promise<Payment> {
  const enrollment = await enrollmentRepository.findEnrollmentById(input.enrollmentId);
  if (!enrollment) throw new NotFoundError("Enrollment");

  const payment = await paymentRepository.createPayment({
    enrollmentId: input.enrollmentId,
    studentId: enrollment.studentId,
    amountCents: input.amountCents,
    currency: input.currency,
    provider: "manual",
    providerRef: null,
    status: "paid",
  });
  await enrollmentRepository.updateEnrollmentStatus(input.enrollmentId, "active");
  return payment;
}

export async function listStudentPayments(studentId: string): Promise<Payment[]> {
  return paymentRepository.findPaymentsByStudent(studentId);
}

export async function listAllPayments(): Promise<Payment[]> {
  return paymentRepository.findAllPayments();
}
