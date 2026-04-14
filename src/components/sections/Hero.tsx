import Link from "next/link";
import { siteContent } from "@/data/siteContent";

const { hero } = siteContent.home;

/** Tighter crop + focal bias toward hands / oil; tune % if art moves. */
const HERO_IMAGE_BG = {
  backgroundImage: `url(${hero.backgroundImage})`,
  backgroundSize: "138%",
  backgroundPosition: "30% 44%",
  backgroundRepeat: "no-repeat" as const,
  filter: "brightness(0.84) sepia(0.14) saturate(1.06)",
};

/** Bottom fade into page background; top stays clear so the dark scrim carries readability. */
const HERO_BOTTOM_FEATHER =
  "linear-gradient(to bottom,\
 transparent 0%,\
 transparent 42%,\
 rgba(250, 252, 251, 0.28) 68%,\
 rgba(250, 252, 251, 0.88) 86%,\
 #FAFCFB 100%)";

export default function Hero() {
  return (
    <section
      className="relative isolate -mt-[5.25rem] flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-brand-50 pt-[5.25rem] md:-mt-[6rem] md:pt-[6rem]"
      aria-labelledby="hero-heading"
    >
      {/* Photo: zoomed crop on action, dimmed + warm, light blur for softer background */}
      <div
        className="absolute inset-0 blur-[1px]"
        style={HERO_IMAGE_BG}
        aria-hidden
      />
      {/* Edge vignette — pulls attention to center / hands, quiets corners */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_78%_at_30%_44%,transparent_18%,rgba(0,0,0,0.22)_72%,rgba(0,0,0,0.42)_100%)]"
        aria-hidden
      />
      {/* 50% black scrim — same effect as linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)) over the image */}
      <div
        className="pointer-events-none absolute inset-0 bg-black/[0.52]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: HERO_BOTTOM_FEATHER }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-32 pt-28 text-center sm:px-6 md:pb-40 md:pt-32 lg:px-8">
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75">
          Kirkland, Quebec
        </p>
        <h1
          id="hero-heading"
          className="mb-10 max-w-[20ch] font-serif text-[28px] font-normal leading-[1.15] text-white sm:max-w-[22ch] sm:text-4xl sm:leading-[1.12] md:max-w-[24ch] md:text-5xl md:leading-[1.1] lg:text-6xl"
        >
          {hero.title}
        </h1>

        <div className="mb-12 flex w-full max-w-lg flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <Link
            href={siteContent.ctas.bookingUrl}
            className="inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-md border border-transparent bg-brand-spa px-10 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-brand-spaDark sm:w-auto sm:min-w-[14rem]"
          >
            {hero.primaryCta}
          </Link>
          <Link
            href="/services"
            className="inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-md border border-white bg-transparent px-10 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-white/10 sm:w-auto sm:min-w-[14rem]"
          >
            {hero.secondaryCta}
          </Link>
        </div>

        <p className="max-w-md font-sans text-sm leading-relaxed text-white/60 sm:max-w-xl">
          {hero.trustLine}
        </p>
      </div>

      <a
        href="#discover"
        className="absolute bottom-20 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center text-white/80 transition-colors hover:text-white md:bottom-10"
        aria-label="Scroll to main content"
      >
        <svg
          className="h-6 w-6 animate-bounce"
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
