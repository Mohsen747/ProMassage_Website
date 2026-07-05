import type { ReactNode } from "react";

// Shared presentational shell for the auth pages so /login and /signup are
// visual siblings: soft green wellness backdrop, centered white card, serif
// heading with an academy eyebrow, and a secondary-link footer.
interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export default function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-100/70 via-brand-50 to-brand-50"
      />

      <div className="w-full max-w-md">
        <div className="rounded-xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-spa">
              ProMassage Academy
            </p>
            <h1 className="mt-3 font-serif text-3xl text-stone-900 sm:text-4xl">{title}</h1>
            <p className="mt-2 text-sm text-stone-500">{subtitle}</p>
          </div>

          {children}
        </div>

        <p className="mt-6 text-center text-sm text-stone-600">{footer}</p>
      </div>
    </section>
  );
}
