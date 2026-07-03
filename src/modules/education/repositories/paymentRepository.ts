import type { Payment, PaymentProvider, PaymentStatus } from "@/modules/education/types/payment";

export interface CreatePaymentData {
  enrollmentId: string;
  studentId: string;
  amountCents: number;
  currency: string;
  provider: PaymentProvider;
  providerRef: string | null;
  status: PaymentStatus;
}

export async function createPayment(_data: CreatePaymentData): Promise<Payment> {
  throw new Error("paymentRepository.createPayment not implemented (scaffold)");
}

export async function updatePaymentByProviderRef(
  _providerRef: string,
  _status: PaymentStatus
): Promise<Payment> {
  throw new Error("paymentRepository.updatePaymentByProviderRef not implemented (scaffold)");
}

export async function findPaymentsByStudent(_studentId: string): Promise<Payment[]> {
  throw new Error("paymentRepository.findPaymentsByStudent not implemented (scaffold)");
}

export async function findAllPayments(): Promise<Payment[]> {
  throw new Error("paymentRepository.findAllPayments not implemented (scaffold)");
}
