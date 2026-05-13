export interface Service {
  slug: string;
  title: string;
  listingDescription?: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  price: string;
  recommendedFor: string[];
  benefits: string[];
  cta: string;
}

export { getServicesList } from "./servicesLocale";
