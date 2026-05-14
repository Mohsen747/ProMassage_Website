import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { googleMapsPlaceUrl } from "@/lib/googlePlace";
import { getTestimonials } from "@/data/testimonials";

function StarRow({ rating }: { rating: number }) {
  const n = Math.round(Math.min(5, Math.max(1, rating)));
  return (
    <span className="text-[11px] leading-none" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="text-brand-400">
          ★
        </span>
      ))}
      {Array.from({ length: 5 - n }, (_, i) => (
        <span key={`e-${i}`} className="text-brand-800">
          ★
        </span>
      ))}
    </span>
  );
}

export default async function Testimonials() {
  const t = await getTranslations("home");
  const tCta = await getTranslations("ctas");
  const testimonials = await getTestimonials();
  const showGoogleLine = testimonials.some((x) => x.fromGoogle);
  const mapsHref =
    siteConfig.googlePlaceId.trim() !== ""
      ? googleMapsPlaceUrl(siteConfig.googlePlaceId)
      : "https://www.google.com/maps";

  return (
    <section className="py-20 md:py-28 bg-brand-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl text-white mb-14 text-center">
          {t("testimonials.title")}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <blockquote
              key={i}
              className="flex flex-col bg-brand-900/50 border border-brand-800 rounded-sm p-7"
            >
              <div className="mb-4 flex items-start gap-3">
                {item.photoUrl ? (
                  <Image
                    src={item.photoUrl}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-brand-700/50"
                    sizes="48px"
                  />
                ) : (
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-800 text-sm font-semibold text-brand-200"
                    aria-hidden
                  >
                    {item.name.slice(0, 1).toUpperCase()}
                  </span>
                )}
                <div className="min-w-0 pt-0.5">
                  <p className="text-sm font-semibold leading-snug text-white">{item.name}</p>
                  {typeof item.rating === "number" ? (
                    <p className="mt-0.5">
                      <StarRow rating={item.rating} />
                    </p>
                  ) : null}
                </div>
              </div>
              <span className="text-brand-400 text-2xl leading-none mb-2 select-none">&ldquo;</span>
              <p className="text-brand-100/85 text-sm leading-relaxed flex-1 mb-4">{item.quote}</p>
              {item.fromGoogle ? (
                <footer className="mt-auto text-[10px] text-brand-500/90">
                  {t("testimonials.viaGoogle")}
                </footer>
              ) : null}
            </blockquote>
          ))}
        </div>

        {showGoogleLine ? (
          <p className="mx-auto mt-8 max-w-2xl text-center text-[11px] leading-relaxed text-brand-400/90">
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-brand-600 underline-offset-2 hover:text-brand-300"
            >
              {t("testimonials.googleAttribution")}
            </a>
          </p>
        ) : null}

        <div className="mt-12 text-center">
          <Button href={siteConfig.ctas.bookingUrl} variant="primary" size="md">
            {tCta("primary")}
          </Button>
        </div>
      </div>
    </section>
  );
}
