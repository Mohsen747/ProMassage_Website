import { getMessages } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { getGooglePlaceReviews } from "@/lib/googlePlace";

export interface Testimonial {
  name: string;
  quote: string;
  /** Google reviewer profile image when loaded from Places API. */
  photoUrl?: string | null;
  /** 1–5 when from Google. */
  rating?: number | null;
  /** True when rows came from Google Place Details (not static copy). */
  fromGoogle?: boolean;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const placeId = siteConfig.googlePlaceId;
  if (placeId) {
    const fromGoogle = await getGooglePlaceReviews(placeId, 3);
    if (fromGoogle?.length) {
      return fromGoogle.map((r) => ({
        name: r.name,
        quote: r.quote,
        photoUrl: r.photoUrl,
        rating: r.rating,
        fromGoogle: true,
      }));
    }
  }

  const messages = (await getMessages()) as unknown as { testimonials: Testimonial[] };
  return messages.testimonials.map((item) => ({ ...item, fromGoogle: false }));
}
