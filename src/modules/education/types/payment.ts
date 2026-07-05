export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type PaymentProvider = "square" | "manual";

export interface Payment {
  id: string;
  enrollmentId: string;
  studentId: string;
  amountCents: number;
  currency: string;
  status: PaymentStatus;
  provider: PaymentProvider;
  providerRef: string | null;
  createdAt: Date;
}
