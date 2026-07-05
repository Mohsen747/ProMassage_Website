import { prisma } from "@/shared/db/prismaClient";
import type { Payment as PrismaPayment } from "@prisma/client";
import type { Payment, PaymentProvider, PaymentStatus } from "@/modules/education/types/payment";
import { NotFoundError } from "@/modules/education/constants/errors";

// Data access for Payment. ONLY this layer imports `prisma`; services depend on
// these functions, not the ORM (CONTRIBUTING.md §6).

export interface CreatePaymentData {
  enrollmentId: string;
  studentId: string;
  amountCents: number;
  currency: string;
  provider: PaymentProvider;
  providerRef: string | null;
  status: PaymentStatus;
}

/** Map a Prisma row → the ORM-independent domain `Payment`. */
function toDomain(row: PrismaPayment): Payment {
  return {
    id: row.id,
    enrollmentId: row.enrollmentId,
    studentId: row.studentId,
    amountCents: row.amountCents,
    currency: row.currency,
    status: row.status,
    provider: row.provider,
    providerRef: row.providerRef,
    createdAt: row.createdAt,
  };
}

export async function createPayment(data: CreatePaymentData): Promise<Payment> {
  const row = await prisma.payment.create({
    data: {
      enrollmentId: data.enrollmentId,
      studentId: data.studentId,
      amountCents: data.amountCents,
      currency: data.currency,
      provider: data.provider,
      providerRef: data.providerRef,
      status: data.status,
    },
  });
  return toDomain(row);
}

export async function findPaymentById(id: string): Promise<Payment | null> {
  const row = await prisma.payment.findUnique({ where: { id } });
  return row ? toDomain(row) : null;
}

export async function findPaymentsByEnrollment(enrollmentId: string): Promise<Payment[]> {
  const rows = await prisma.payment.findMany({
    where: { enrollmentId },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toDomain);
}

/**
 * Update a payment's status by its provider reference (Square order id). Called
 * from the verified webhook. `providerRef` is not a DB unique, so we resolve the
 * most recent matching row first; idempotent when the status is already set.
 */
export async function updatePaymentByProviderRef(
  providerRef: string,
  status: PaymentStatus
): Promise<Payment> {
  const existing = await prisma.payment.findFirst({
    where: { providerRef },
    orderBy: { createdAt: "desc" },
  });
  if (!existing) throw new NotFoundError("Payment");

  const row = await prisma.payment.update({
    where: { id: existing.id },
    data: { status },
  });
  return toDomain(row);
}

export async function findPaymentsByStudent(studentId: string): Promise<Payment[]> {
  const rows = await prisma.payment.findMany({
    where: { studentId },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toDomain);
}

export async function findAllPayments(): Promise<Payment[]> {
  const rows = await prisma.payment.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map(toDomain);
}
