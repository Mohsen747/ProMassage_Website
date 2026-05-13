import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import ProblemSolution from "@/components/sections/ProblemSolution";
import WhyChoose from "@/components/sections/WhyChoose";
import Testimonials from "@/components/sections/Testimonials";
import AboutPreview from "@/components/sections/AboutPreview";
import FaqPreview from "@/components/sections/FaqPreview";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <WhyChoose />
      <Testimonials />
      <AboutPreview />
      <FaqPreview />
    </>
  );
}
