import type { EnrollmentStatus } from "@/modules/education/types/enrollment";
import type { PaymentStatus } from "@/modules/education/types/payment";

// Presentation-only maps for the student account panel: status → human label +
// Tailwind pill tone. No business logic — just how a status is displayed.

interface StatusMeta {
  label: string;
  className: string;
}

export const ENROLLMENT_STATUS_META: Record<EnrollmentStatus, StatusMeta> = {
  pending_payment: { label: "Pending payment", className: "bg-amber-100 text-amber-800" },
  active: { label: "Active", className: "bg-brand-100 text-brand-700" },
  completed: { label: "Completed", className: "bg-stone-200 text-stone-700" },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-700" },
};

export const PAYMENT_STATUS_META: Record<PaymentStatus, StatusMeta> = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-800" },
  paid: { label: "Paid", className: "bg-brand-100 text-brand-700" },
  failed: { label: "Failed", className: "bg-red-100 text-red-700" },
  refunded: { label: "Refunded", className: "bg-stone-200 text-stone-700" },
};

export function formatMoney(cents: number, currency = "CAD"): string {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency }).format(cents / 100);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "short", day: "numeric" }).format(
    date
  );
}
