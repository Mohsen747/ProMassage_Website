import type { Metadata } from "next";
import { siteContent } from "@/data/siteContent";
import Hero from "@/components/sections/Hero";
import ProblemSolution from "@/components/sections/ProblemSolution";
import ServicesPreview from "@/components/sections/ServicesPreview";
import WhyChoose from "@/components/sections/WhyChoose";
import Testimonials from "@/components/sections/Testimonials";
import AboutPreview from "@/components/sections/AboutPreview";
import FaqPreview from "@/components/sections/FaqPreview";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: siteContent.home.meta.title,
  description: siteContent.home.meta.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <ServicesPreview />
      <WhyChoose />
      <Testimonials />
      <AboutPreview />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
