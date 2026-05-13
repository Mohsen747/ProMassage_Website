import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import HeroBackgroundVideo from "@/components/sections/HeroBackgroundVideo";

const HERO_BOTTOM_FEATHER =
  "linear-gradient(to bottom,\
 transparent 0%,\
 transparent 42%,\
 rgba(250, 252, 251, 0.28) 68%,\
 rgba(250, 252, 251, 0.88) 86%,\
 #FAFCFB 100%)";

export default async function Hero() {
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const clips = siteConfig.homeHeroVideoClips;

  return (
    <section
      className="relative isolate -mt-[5.25rem] flex min-h-svh w-full flex-col overflow-hidden bg-brand-950 pt-[5.25rem] md:-mt-[6rem] md:pt-[6rem]"
      aria-labelledby="hero-heading"
    >
      <HeroBackgroundVideo clips={clips} />

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_78%_at_50%_42%,transparent_18%,rgba(0,0,0,0.26)_72%,rgba(0,0,0,0.48)_100%)] lg:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 max-lg:bg-black/[0.48] lg:bg-black/[0.22]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{ background: HERO_BOTTOM_FEATHER }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col max-md:justify-between md:justify-end">
        <div className="min-h-[25vh] shrink-0 max-md:block md:hidden" aria-hidden />
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-16 text-center max-md:pb-20 sm:px-6 md:pb-28 lg:px-8">
          {t("hero.locationLine") ? (
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80">
              {t("hero.locationLine")}
            </p>
          ) : null}
          <h1
            id="hero-heading"
            className="mb-8 max-w-[20ch] font-serif text-[28px] font-normal leading-[1.15] text-white sm:max-w-[22ch] sm:text-4xl sm:leading-[1.12] md:max-w-[24ch] md:text-5xl md:leading-[1.1] lg:text-6xl lg:[text-shadow:0_2px_28px_rgba(0,0,0,0.5)]"
          >
            {t("hero.title")}
          </h1>

          <div className="mb-8 flex w-full max-w-lg flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href={siteConfig.ctas.bookingUrl}
              className="inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-md border border-transparent bg-brand-spa px-10 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-brand-spaDark sm:w-auto sm:min-w-[14rem]"
            >
              {t("hero.primaryCta")}
            </a>
            <Link
              href="/services"
              className="inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-md border border-white bg-transparent px-10 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-white/10 sm:w-auto sm:min-w-[14rem]"
            >
              {t("hero.secondaryCta")}
            </Link>
          </div>

          <p className="hidden max-w-md pb-2 font-sans text-sm leading-relaxed text-white/70 sm:max-w-xl md:block">
            {t("hero.trustLine")}
          </p>
        </div>
      </div>

      <a
        href="#discover"
        className="absolute bottom-6 left-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 items-center justify-center text-white/80 transition-colors hover:text-white motion-safe:animate-bounce md:bottom-8 md:flex"
        aria-label={tCommon("scrollToContent")}
      >
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
