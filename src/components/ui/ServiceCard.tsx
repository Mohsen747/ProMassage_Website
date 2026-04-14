import Link from "next/link";
import { Service } from "@/data/services";
import { siteContent } from "@/data/siteContent";

interface ServiceCardProps {
  service: Service;
  variant?: "preview" | "full";
}

function ListingCard({ service }: { service: Service }) {
  return (
    <Link
      href={siteContent.ctas.bookingUrl}
      className="group flex gap-4 rounded-lg border border-stone-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:border-stone-300 hover:shadow-md"
    >
      <span
        className="mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 border-stone-300 bg-white group-hover:border-brand-500"
        aria-hidden
      />
      <div className="min-w-0 flex-1 text-left">
        <h3 className="font-sans text-base font-bold leading-snug text-stone-900">
          {service.title}
        </h3>
        {service.listingDescription ? (
          <p className="mt-2 text-sm leading-relaxed text-stone-500">
            {service.listingDescription}
          </p>
        ) : (
          <p className="mt-2 text-sm leading-relaxed text-stone-500">
            {service.shortDescription}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-semibold text-stone-900">
            {service.duration}
          </span>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-semibold text-stone-900">
            {service.price}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ServiceCard({
  service,
  variant = "preview",
}: ServiceCardProps) {
  if (variant === "full") {
    return (
      <article
        id={service.slug}
        className="scroll-mt-28 border-b border-stone-200 py-10 last:border-b-0 md:scroll-mt-24"
      >
        <ListingCard service={service} />

        <div className="mt-8 max-w-3xl pl-9 md:pl-9">
          <p className="mb-8 text-lg leading-relaxed text-stone-600">
            {service.fullDescription}
          </p>

          <div className="mb-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-600">
                Best for
              </h3>
              <ul className="space-y-1.5">
                {service.recommendedFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-stone-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-600">
                Benefits
              </h3>
              <ul className="space-y-1.5">
                {service.benefits.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-stone-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href={siteContent.ctas.bookingUrl}
            className="inline-flex items-center justify-center rounded-md bg-brand-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-brand-700"
          >
            {service.cta}
          </Link>
        </div>
      </article>
    );
  }

  return <ListingCard service={service} />;
}
