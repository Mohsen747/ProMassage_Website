import type { ReactNode } from "react";

interface ClinicPageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: ReactNode;
}

export default function ClinicPageHeader({
  eyebrow,
  title,
  subtitle,
}: ClinicPageHeaderProps) {
  return (
    <section className="bg-brand-950 py-16 text-white md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-300">
          {eyebrow}
        </p>
        <h1
          className="mb-5 font-serif text-4xl text-white sm:text-5xl"
          style={{ animation: "fadeUp 0.5s ease-out both" }}
        >
          {title}
        </h1>
        <p
          className="max-w-2xl text-lg leading-relaxed text-brand-100/90"
          style={{ animation: "fadeUp 0.55s ease-out 0.1s both" }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
