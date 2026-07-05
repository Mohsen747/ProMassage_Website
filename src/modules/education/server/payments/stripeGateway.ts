import type {
  CheckoutRequest,
  CheckoutResult,
  PaymentGateway,
  WebhookVerification,
} from "@/modules/education/server/payments/paymentGateway";
import { PaymentError } from "@/modules/education/constants/errors";

// ⚠️ DEPRECATED / REFERENCE-ONLY — NOT WIRED IN.
// The active payment provider is Square (see `squareGateway.ts`). This Stripe
// scaffold is kept only as a reference for what a second provider would look like
// behind the PaymentGateway interface. Nothing imports `getPaymentGateway` from
// this file. To revive Stripe: `npm i stripe`, add STRIPE_SECRET_KEY /
// STRIPE_WEBHOOK_SECRET, implement the methods, and switch the import in
// paymentService.ts + the webhook route back to this module.

export class StripeGateway implements PaymentGateway {
  async createCheckout(_request: CheckoutRequest): Promise<CheckoutResult> {
    // const session = await stripe.checkout.sessions.create({ ... });
    // return { providerRef: session.id, redirectUrl: session.url };
    throw new PaymentError("StripeGateway.createCheckout not implemented (scaffold)");
  }

  async verifyWebhook(_rawBody: string, _signature: string): Promise<WebhookVerification> {
    // const event = stripe.webhooks.constructEvent(rawBody, signature, secret);
    throw new PaymentError("StripeGateway.verifyWebhook not implemented (scaffold)");
  }
}

/** Single place to resolve the active gateway (swap for tests/other providers). */
export function getPaymentGateway(): PaymentGateway {
  return new StripeGateway();
}
