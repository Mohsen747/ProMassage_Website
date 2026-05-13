import { getMessages } from "next-intl/server";

export interface Testimonial {
  name: string;
  quote: string;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const messages = (await getMessages()) as unknown as { testimonials: Testimonial[] };
  return messages.testimonials.map((item) => ({ ...item }));
}
