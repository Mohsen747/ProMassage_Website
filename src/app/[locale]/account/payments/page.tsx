import type { Metadata } from "next";
import { requireUser } from "@/shared/auth/session";
import * as paymentService from "@/modules/education/services/paymentService";
import StatusBadge from "@/modules/education/components/account/StatusBadge";
import { PAYMENT_STATUS_META, formatDate, formatMoney } from "@/modules/education/components/account/statusMeta";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Payments" };

const PROVIDER_LABELS: Record<string, string> = { square: "Square", manual: "Manual" };

export default async function AccountPaymentsPage() {
  const user = await requireUser();
  const payments = await paymentService.listStudentPayments(user.id);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl">Payments</h1>
        <p className="mt-2 text-stone-600">Your payment history.</p>
      </header>

      {payments.length === 0 ? (
        <div className="rounded-xl border border-stone-200 bg-white p-6 text-sm text-stone-600">
          No payments yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-left text-stone-500">
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Provider</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {payments.map((payment) => (
                <tr key={payment.id} className="text-stone-700">
                  <td className="px-5 py-3">{formatDate(payment.createdAt)}</td>
                  <td className="px-5 py-3 font-medium text-stone-900">
                    {formatMoney(payment.amountCents, payment.currency)}
                  </td>
                  <td className="px-5 py-3">{PROVIDER_LABELS[payment.provider] ?? payment.provider}</td>
                  <td className="px-5 py-3">
                    <StatusBadge {...PAYMENT_STATUS_META[payment.status]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
