import { getMessages } from "next-intl/server";

export interface FAQ {
  question: string;
  answer: string;
}

export async function getFaqs(): Promise<FAQ[]> {
  const messages = (await getMessages()) as unknown as { faqs: FAQ[] };
  return messages.faqs.map((item) => ({ ...item }));
}
