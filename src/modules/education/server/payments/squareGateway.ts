import { randomUUID } from "node:crypto";
import { SquareClient, SquareEnvironment, WebhooksHelper, type Currency } from "square";
import { z } from "zod";
import type {
  CheckoutRequest,
  CheckoutResult,
  PaymentGateway,
  WebhookVerification,
} from "@/modules/education/server/payments/paymentGateway";
import { PaymentError } from "@/modules/education/constants/errors";

// Square implementation of the provider-agnostic PaymentGateway. Nothing outside
// this file imports the Square SDK — swapping providers stays a one-line change
// in paymentService. Checkout uses Square's Quick Pay payment links; webhooks are
// verified with Square's HMAC-SHA256 signature and normalized to our contract.
//
// Required env (see .env.example):
//   SQUARE_ACCESS_TOKEN, SQUARE_LOCATION_ID, SQUARE_ENVIRONMENT  → checkout
//   SQUARE_WEBHOOK_SIGNATURE_KEY, SQUARE_WEBHOOK_URL             → webhook verify

function resolveEnvironment(): SquareEnvironment {
  return (process.env.SQUARE_ENVIRONMENT ?? "sandbox").toLowerCase() === "production"
    ? SquareEnvironment.Production
    : SquareEnvironment.Sandbox;
}

/** Build a client lazily so importing this module never throws at build time. */
function createClient(): { client: SquareClient; locationId: string } {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  if (!token) throw new PaymentError("Missing SQUARE_ACCESS_TOKEN");
  if (!locationId) throw new PaymentError("Missing SQUARE_LOCATION_ID");
  return { client: new SquareClient({ token, environment: resolveEnvironment() }), locationId };
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

// Square webhook envelope (raw snake_case JSON). Payment and refund events share
// the same object shape for the fields we care about, so one schema covers both.
const squareEventObjectSchema = z.object({
  order_id: z.string().nullish(),
  status: z.string().nullish(),
  amount_money: z
    .object({
      amount: z.union([z.number(), z.bigint()]).nullish(),
      currency: z.string().nullish(),
    })
    .nullish(),
});

const squareWebhookSchema = z.object({
  type: z.string(),
  data: z.object({
    object: z.object({
      payment: squareEventObjectSchema.nullish(),
      refund: squareEventObjectSchema.nullish(),
    }),
  }),
});

function mapWebhookStatus(
  eventType: string,
  squareStatus: string | null | undefined
): WebhookVerification["status"] {
  if (eventType.startsWith("refund.")) {
    return squareStatus === "COMPLETED" ? "refunded" : "pending";
  }
  switch (squareStatus) {
    case "COMPLETED":
    case "APPROVED":
      return "paid";
    case "FAILED":
    case "CANCELED":
      return "failed";
    default:
      return "pending";
  }
}

export class SquareGateway implements PaymentGateway {
  async createCheckout(request: CheckoutRequest): Promise<CheckoutResult> {
    const { client, locationId } = createClient();
    try {
      const response = await client.checkout.paymentLinks.create({
        idempotencyKey: randomUUID(),
        description: `ProMassage Academy enrollment ${request.enrollmentId}`,
        quickPay: {
          name: "ProMassage Academy Enrollment",
          priceMoney: {
            amount: BigInt(request.amountCents),
            currency: request.currency as Currency,
          },
          locationId,
        },
        checkoutOptions: { redirectUrl: request.successUrl },
        prePopulatedData: { buyerEmail: request.customerEmail },
      });

      const link = response.paymentLink;
      // We reconcile webhooks by order id (the `payment.updated` event carries the
      // order id, not the payment-link id), so that is our provider reference.
      if (!link?.url || !link.orderId) {
        throw new PaymentError("Square did not return a payment link URL and order id");
      }
      return { providerRef: link.orderId, redirectUrl: link.url };
    } catch (error) {
      if (error instanceof PaymentError) throw error;
      throw new PaymentError(`Square checkout creation failed: ${errorMessage(error)}`);
    }
  }

  async verifyWebhook(rawBody: string, signature: string): Promise<WebhookVerification> {
    const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
    const notificationUrl = process.env.SQUARE_WEBHOOK_URL;
    if (!signatureKey || !notificationUrl) {
      throw new PaymentError(
        "Square webhook is not configured (SQUARE_WEBHOOK_SIGNATURE_KEY / SQUARE_WEBHOOK_URL)"
      );
    }

    const isValid = await WebhooksHelper.verifySignature({
      requestBody: rawBody,
      signatureHeader: signature,
      signatureKey,
      notificationUrl,
    });
    if (!isValid) throw new PaymentError("Invalid Square webhook signature");

    const event = squareWebhookSchema.parse(JSON.parse(rawBody));
    const object = event.type.startsWith("refund.")
      ? event.data.object.refund
      : event.data.object.payment;
    if (!object?.order_id) {
      throw new PaymentError("Square webhook payload missing order id");
    }

    return {
      providerRef: object.order_id,
      status: mapWebhookStatus(event.type, object.status),
      amountCents: Number(object.amount_money?.amount ?? 0),
    };
  }
}

/** Single place to resolve the active gateway (swap for tests/other providers). */
export function getPaymentGateway(): PaymentGateway {
  return new SquareGateway();
}
