/** Non-translatable booking metadata keyed by service slug. */
export const SERVICE_SLUGS = [
  "swedish-relaxation",
  "hot-stone-therapy",
  "foot-reflexology",
  "chair-massage",
  "wood-therapy-full-body",
  "wood-therapy-half-body",
  "professional-facial-massage",
  "deep-tissue",
  "sport-massage",
  "ninety-minute-massage",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const serviceBookingMeta: Record<
  ServiceSlug,
  { price: string; durationKey: string }
> = {
  "swedish-relaxation": { price: "$110.00", durationKey: "60min" },
  "hot-stone-therapy": { price: "$125.00", durationKey: "60min" },
  "foot-reflexology": { price: "$65.00", durationKey: "30min" },
  "chair-massage": { price: "$55.00", durationKey: "30min" },
  "wood-therapy-full-body": { price: "$120.00", durationKey: "60min" },
  "wood-therapy-half-body": { price: "$60.00", durationKey: "30min" },
  "professional-facial-massage": { price: "$60.00", durationKey: "30min" },
  "deep-tissue": { price: "$115.00", durationKey: "60min" },
  "sport-massage": { price: "$60.00", durationKey: "30min" },
  "ninety-minute-massage": { price: "$150.00", durationKey: "90min" },
};
