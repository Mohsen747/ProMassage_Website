// Provider-agnostic payment gateway boundary. Services depend on THIS interface,
// never on Stripe directly — so swapping providers (or stubbing in tests) is a
// one-line change. Concrete implementations live beside this file.

export interface CheckoutRequest {
  enrollmentId: string;
  amountCents: number;
  currency: string;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutResult {
  /** Provider-side reference (e.g. Stripe Checkout Session id). */
  providerRef: string;
  /** URL to redirect the student to in order to pay. */
  redirectUrl: string;
}

export interface WebhookVerification {
  providerRef: string;
  status: "paid" | "failed" | "refunded" | "pending";
  amountCents: number;
}

export interface PaymentGateway {
  createCheckout(request: CheckoutRequest): Promise<CheckoutResult>;
  /** Verify + parse a raw webhook payload into a normalized event. */
  verifyWebhook(rawBody: string, signature: string): Promise<WebhookVerification>;
}
