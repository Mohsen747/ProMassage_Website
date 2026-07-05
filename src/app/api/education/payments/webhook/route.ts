import { NextResponse } from "next/server";
import { getPaymentGateway } from "@/modules/education/server/payments/squareGateway";
import * as paymentService from "@/modules/education/services/paymentService";

// Payment provider webhook (Square) → reconciles Payment + Enrollment status.
// Must read the RAW body for signature verification, so this route stays outside
// the module (Next.js route handler) but delegates all logic to the service.

export async function POST(request: Request): Promise<NextResponse> {
  const signature = request.headers.get("x-square-hmacsha256-signature") ?? "";
  const rawBody = await request.text();

  try {
    const event = await getPaymentGateway().verifyWebhook(rawBody, signature);
    await paymentService.reconcileWebhook(event);
    return NextResponse.json({ received: true });
  } catch {
    // Signature/verification failures must return 400 so the provider retries.
    return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 });
  }
}
