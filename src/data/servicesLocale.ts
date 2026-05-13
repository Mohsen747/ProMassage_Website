import { getMessages } from "next-intl/server";
import {
  SERVICE_SLUGS,
  serviceBookingMeta,
  type ServiceSlug,
} from "@/data/serviceBase";
import type { Service } from "@/data/services";

type ServiceMessages = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  listingDescription?: string;
  recommendedFor: readonly string[] | string[];
  benefits: readonly string[] | string[];
  cta: string;
};

export async function getServicesList(): Promise<Service[]> {
  const messages = (await getMessages()) as unknown as {
    durations: Record<string, string>;
    servicesCatalog: Record<ServiceSlug, ServiceMessages>;
  };

  return SERVICE_SLUGS.map((slug) => {
    const meta = serviceBookingMeta[slug];
    const row = messages.servicesCatalog[slug];
    return {
      slug,
      title: row.title,
      listingDescription: row.listingDescription,
      shortDescription: row.shortDescription,
      fullDescription: row.fullDescription,
      duration: messages.durations[meta.durationKey],
      price: meta.price,
      recommendedFor: [...row.recommendedFor],
      benefits: [...row.benefits],
      cta: row.cta,
    };
  });
}
