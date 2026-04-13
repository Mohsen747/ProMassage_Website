import Link from "next/link";
import { siteContent } from "@/data/siteContent";
import { services } from "@/data/services";
import ServiceCard from "@/components/ui/ServiceCard";

const { servicesPreview } = siteContent.home;

export default function ServicesPreview() {
  return (
    <section className="py-20 md:py-28 bg-brand-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mb-4">
            {servicesPreview.title}
          </h2>
          <p className="text-stone-600 leading-relaxed">
            {servicesPreview.subtitle}
          </p>
        </div>

        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} variant="preview" />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-6 py-3 border border-brand-600 text-brand-700 font-medium rounded-sm hover:bg-brand-50 transition-colors duration-200"
          >
            {servicesPreview.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
