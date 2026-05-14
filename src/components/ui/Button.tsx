"use client";

import { Link } from "@/i18n/navigation";

export type ButtonVariant =
  | "primary"
  | "primaryBold"
  | "inverse"
  | "outlineBrand"
  | "outlineStone"
  | "spa"
  | "spaHero"
  | "spaOutlineHero"
  | "navPill"
  | "navPillSpa"
  | "navBarSpa"
  | "ghost"
  | "linkLead"
  | "linkUnderlined";

export type ButtonSize = "sm" | "md" | "hero" | "block" | "compact";

export type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  /** Padding / width; applies to `primary` (default `sm`). */
  size?: ButtonSize;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  disabled?: boolean;
  fullWidth?: boolean;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
};

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/i.test(href) || href.startsWith("//");
}

function cn(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";

const VARIANT: Record<ButtonVariant, string> = {
  primary: cn(
    "inline-flex items-center justify-center rounded-md bg-brand-600 font-medium text-white transition-colors duration-200 hover:bg-brand-700 disabled:pointer-events-none disabled:opacity-50",
    focusRing,
  ),
  primaryBold: cn(
    "inline-flex items-center justify-center rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:pointer-events-none disabled:opacity-50",
    focusRing,
  ),
  inverse: cn(
    "inline-flex items-center justify-center rounded-md bg-white px-10 py-4 text-base font-medium text-brand-800 transition-colors duration-200 hover:bg-brand-50 disabled:pointer-events-none disabled:opacity-50",
    focusRing,
  ),
  outlineBrand: cn(
    "inline-flex items-center justify-center rounded-md border border-brand-600 font-medium text-brand-700 transition-colors duration-200 hover:bg-brand-50 disabled:pointer-events-none disabled:opacity-50",
    focusRing,
  ),
  outlineStone: cn(
    "inline-flex items-center justify-center rounded-md border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-50 disabled:pointer-events-none disabled:opacity-50",
    focusRing,
  ),
  spa: cn(
    "inline-flex items-center justify-center rounded-md bg-brand-spa px-8 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-brand-spaDark disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2",
  ),
  spaHero: cn(
    "inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-md border border-transparent bg-brand-spa px-10 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-brand-spaDark sm:w-auto sm:min-w-[14rem]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950",
  ),
  spaOutlineHero: cn(
    "inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-md border border-white bg-transparent px-10 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-white/10 sm:w-auto sm:min-w-[14rem]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950",
  ),
  navPill: cn(
    "rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 ease-out hover:scale-[1.03] hover:bg-brand-700 hover:shadow-lg active:scale-[0.99]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2",
  ),
  navPillSpa: cn(
    "rounded-xl bg-brand-spa px-8 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition-all duration-200 ease-out hover:scale-[1.03] hover:bg-brand-spaDark hover:shadow-lg active:scale-[0.99]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2",
  ),
  navBarSpa: cn(
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-brand-spa px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition-all duration-200 ease-out hover:scale-105 hover:bg-brand-spaDark hover:shadow-lg hover:ring-2 hover:ring-white/35 active:scale-100 sm:px-3 sm:text-[11px] sm:tracking-[0.18em]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2",
  ),
  ghost: cn(
    "inline-flex items-center justify-center rounded-md bg-transparent font-medium tracking-wide text-brand-700 underline-offset-4 transition-all duration-200 hover:underline",
    focusRing,
  ),
  linkLead: cn(
    "inline-flex items-center gap-2 rounded-sm font-medium text-brand-700 transition-colors duration-150 hover:text-brand-900",
    focusRing,
  ),
  linkUnderlined: cn(
    "rounded-sm font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 transition-colors hover:text-brand-800",
    focusRing,
  ),
};

const PRIMARY_SIZE: Record<ButtonSize, string> = {
  sm: "px-6 py-3",
  md: "px-8 py-4",
  hero: "px-10 py-4 text-base",
  block: "w-full py-3.5",
  compact: "px-5 py-2.5 text-sm",
};

const OUTLINE_BRAND_SIZE: Record<"sm" | "md", string> = {
  sm: "px-6 py-3",
  md: "px-8 py-4",
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "sm",
  className = "",
  type = "button",
  onClick,
  disabled,
  fullWidth,
  target,
  rel,
}: ButtonProps) {
  let variantClasses = VARIANT[variant];

  if (variant === "primary") {
    variantClasses = cn(variantClasses, PRIMARY_SIZE[size], fullWidth && "w-full");
  }
  if (variant === "outlineBrand") {
    const s = size === "md" || size === "hero" ? "md" : "sm";
    variantClasses = cn(variantClasses, OUTLINE_BRAND_SIZE[s]);
  }

  const classes = cn(
    variantClasses,
    fullWidth && variant !== "primary" && variant !== "inverse" && "w-full",
    className,
  );

  if (href) {
    const external = isExternalHref(href);
    const anchorRel =
      rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          target={target}
          rel={anchorRel}
          aria-disabled={disabled || undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        target={target}
        rel={rel}
        aria-disabled={disabled || undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
