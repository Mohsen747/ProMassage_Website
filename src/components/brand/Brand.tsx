"use client";

import Image from "next/image";

type BrandProps = {
  className?: string;
  /** `onDark` — light wordmark for transparent headers over imagery. */
  tone?: "default" | "onDark";
  /** `hero` — larger mark for centered hero; `compact` — nav / tight spaces. */
  size?: "compact" | "hero";
};

/**
 * Leaf mark (`/Leaf-brand2.png`, transparent) stacked above ProMassage + CL&AC, centered.
 */
export default function Brand({
  className,
  tone = "default",
  size = "compact",
}: BrandProps) {
  const onDark = tone === "onDark";
  const hero = size === "hero";

  const leafClass = hero
    ? "h-24 w-auto object-contain sm:h-28 md:h-32"
    : "h-7 w-auto object-contain object-bottom sm:h-8";

  const nameClass = onDark
    ? hero
      ? "text-xl font-bold uppercase tracking-[0.14em] text-white sm:text-2xl md:text-[1.65rem]"
      : "text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:text-[11px]"
    : hero
      ? "bg-gradient-to-r from-brand-700 to-[#99E650] bg-clip-text text-xl font-bold uppercase tracking-[0.12em] text-transparent sm:text-2xl md:text-[1.65rem]"
      : "bg-gradient-to-r from-brand-700 to-[#99E650] bg-clip-text text-[10px] font-bold uppercase tracking-[0.1em] text-transparent sm:text-[11px]";

  const subClass = onDark
    ? hero
      ? "text-xs font-semibold uppercase tracking-[0.22em] text-white/88 sm:text-sm"
      : "text-[8px] font-semibold uppercase tracking-[0.18em] text-white/85 sm:text-[9px]"
    : hero
      ? "text-xs font-semibold uppercase tracking-[0.2em] text-brand-700 sm:text-sm"
      : "text-[8px] font-semibold uppercase tracking-[0.16em] text-brand-700 sm:text-[9px]";

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
      <Image
        src="/Leaf-brand2.png"
        alt=""
        width={1052}
        height={1008}
        className={leafClass}
        sizes={
          hero
            ? "(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
            : "(max-width: 640px) 112px, 128px"
        }
        priority
      />
      <div className={hero ? "flex flex-col items-center gap-1" : "flex flex-col items-center gap-px"}>
        <span className={nameClass}>ProMassage</span>
        <span className={subClass}>CL&amp;AC</span>
      </div>
    </div>
  );
}
