"use client";

import Image from "next/image";
import Link from "next/link";

type BrandProps = {
  className?: string;
  /** `onDark` — light wordmark for transparent headers over imagery. */
  tone?: "default" | "onDark";
  /** `hero` — larger mark for centered hero; `compact` — nav / tight spaces. */
  size?: "compact" | "hero";
  /** Slightly larger stack for centered transparent nav (home overlay). */
  variant?: "default" | "headerCenter";
  /** When false, leaf is omitted (e.g. leaf rendered separately in navbar). Default true. */
  showLeaf?: boolean;
  /**
   * Nav header (leaf is separate in navbar): interrupted horizontal rule — line runs toward
   * both edges with a clear gap where “ProMassage” sits; “Clinic & Academy” below (Scandinave-style).
   */
  wideTitleRule?: boolean;
  /**
   * When used inside the navbar’s 3-column desktop grid, children use explicit grid placement so
   * the rule segments line up with the Academy / Massage columns (same as `minmax(0,1fr)_auto_minmax(0,1fr)`).
   */
  navGridAlign?: boolean;
};

const nameGradientClass =
  "inline-block bg-gradient-to-r from-brand-leaf via-brand-lime to-brand-accent bg-clip-text uppercase text-transparent";

/**
 * Leaf mark (`/Leaf-brand2.png`, transparent) stacked above ProMassage + Clinic & Academy, centered.
 */
export default function Brand({
  className,
  tone = "default",
  size = "compact",
  variant = "default",
  showLeaf = true,
  wideTitleRule = false,
  navGridAlign = false,
}: BrandProps) {
  const onDark = tone === "onDark";
  const hero = size === "hero";
  const headerCenter = variant === "headerCenter";

  const leafClass = hero
    ? "h-24 w-auto object-contain sm:h-28 md:h-32"
    : headerCenter
      ? "h-9 w-auto object-contain object-bottom sm:h-10 md:h-11"
      : "h-7 w-auto object-contain object-bottom sm:h-8";

  const nameClass = [
    "font-bold tracking-[0.14em]",
    nameGradientClass,
    hero
      ? "text-xl sm:text-2xl md:text-[1.65rem]"
      : headerCenter
        ? "text-[11px] sm:text-xs md:text-[13px]"
        : "text-[10px] sm:text-[11px] tracking-[0.12em]",
  ].join(" ");

  const subClass = onDark
    ? hero
      ? "text-xs font-medium tracking-[0.12em] text-white/90 sm:text-sm"
      : headerCenter
        ? "text-[9px] font-medium tracking-[0.08em] text-white/88 sm:text-[10px] md:text-[11px]"
        : "text-[8px] font-medium tracking-[0.08em] text-white/85 sm:text-[9px]"
    : hero
      ? "text-xs font-medium tracking-[0.1em] text-brand-700 sm:text-sm"
      : headerCenter
        ? "text-[9px] font-medium tracking-[0.08em] text-brand-700 sm:text-[10px]"
        : "text-[8px] font-medium tracking-[0.08em] text-brand-700 sm:text-[9px]";

  const lineClass = onDark ? "bg-white/50" : "bg-stone-400/85";

  /** Slightly larger title in the rule gap (matches luxury spa headers). */
  const wideNameClass = [
    "whitespace-nowrap px-4 text-xs font-bold tracking-[0.18em] sm:px-6 sm:text-sm md:text-[0.8125rem]",
    nameGradientClass,
    onDark ? "drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const wideSubClass = onDark
    ? "text-center text-[9px] font-semibold uppercase tracking-[0.22em] text-white/85 sm:text-[10px]"
    : "text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-brand-700 sm:text-[10px]";

  /** Tight stack under the rule + “ProMassage” (nav grid + mobile wide rule). */
  const wideSubTightClass = `${wideSubClass} leading-tight`;

  const homeWordmarkLinkFocus = onDark
    ? "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    : "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-50";

  if (wideTitleRule && navGridAlign) {
    const gridExtraClass = className?.trim() ?? "";
    return (
      <>
        <div
          className={`col-start-1 row-start-2 h-px min-h-px w-full self-center ${lineClass}`}
          aria-hidden
        />
        <Link
          href="/"
          className={`col-start-2 row-start-2 justify-self-center leading-none ${homeWordmarkLinkFocus}`}
          aria-label="ProMassage — home"
        >
          <span className={`${wideNameClass} leading-none`}>ProMassage</span>
        </Link>
        <div
          className={`col-start-3 row-start-2 h-px min-h-px w-full self-center ${lineClass}`}
          aria-hidden
        />
        <Link
          href="/"
          className={[
            `col-span-3 row-start-3 mt-0.5 block w-full text-center leading-none ${homeWordmarkLinkFocus}`,
            gridExtraClass,
          ]
            .filter(Boolean)
            .join(" ")}
          aria-label="ProMassage Clinic & Academy — home"
        >
          <span className={wideSubTightClass}>Clinic &amp; Academy</span>
        </Link>
      </>
    );
  }

  if (wideTitleRule) {
    return (
      <div
        className={[
          "flex w-full flex-col items-center justify-center gap-0.5 leading-tight",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="flex w-full max-w-none items-center">
          <div className={`h-px min-h-px flex-1 ${lineClass}`} aria-hidden />
          <span className={`${wideNameClass} leading-none`}>ProMassage</span>
          <div className={`h-px min-h-px flex-1 ${lineClass}`} aria-hidden />
        </div>
        <span className={wideSubTightClass}>Clinic &amp; Academy</span>
      </div>
    );
  }

  return (
    <div
      className={[
        "flex flex-col items-center justify-center text-center leading-tight",
        hero ? "gap-3 sm:gap-4" : "gap-1",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showLeaf ? (
        <Image
          src="/Leaf-brand2.png"
          alt=""
          width={1052}
          height={1008}
          className={leafClass}
          sizes={
            hero
              ? "(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
              : headerCenter
                ? "(max-width: 768px) 128px, 160px"
                : "(max-width: 640px) 112px, 128px"
          }
          priority
        />
      ) : null}
      <div className={hero ? "flex flex-col items-center gap-1" : "flex flex-col items-center gap-0.5"}>
        <span className={nameClass}>ProMassage</span>
        <span className={subClass}>Clinic &amp; Academy</span>
      </div>
    </div>
  );
}
