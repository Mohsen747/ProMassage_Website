// Provider-agnostic payment gateway boundary. Services depend on THIS interface,
// never on a concrete provider directly — so swapping providers (or stubbing in
// tests) is a one-line change. The active implementation is `squareGateway.ts`.

export interface CheckoutRequest {
  enrollmentId: string;
  amountCents: number;
  currency: string;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutResult {
  /** Provider-side reference (e.g. Square order id). */
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
