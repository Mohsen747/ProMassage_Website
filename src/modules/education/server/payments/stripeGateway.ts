import type {
  CheckoutRequest,
  CheckoutResult,
  PaymentGateway,
  WebhookVerification,
} from "@/modules/education/server/payments/paymentGateway";
import { PaymentError } from "@/modules/education/constants/errors";

// Stripe implementation — STUB. Activating requires `npm i stripe` plus
// STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET in .env.
//
// Kept behind the PaymentGateway interface so nothing else in the module imports
// Stripe. Replace the throws with Stripe Checkout Session + webhook verification.

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
