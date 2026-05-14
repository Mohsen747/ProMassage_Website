import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { navPaths } from "@/config/nav";

export default async function Footer() {
  const tNav = await getTranslations("nav");
  const tFooter = await getTranslations("footer");
  const tCta = await getTranslations("ctas");

  return (
    <footer className="bg-brand-950 text-stone-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="text-lg font-bold uppercase tracking-widest text-stone-500 mb-4">
              {tFooter("massageHeading")}
            </p>
            <nav className="flex flex-col gap-2">
              {navPaths.clinic.links.map(({ href, labelKey }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-stone-400 hover:text-white transition-colors duration-150"
                >
                  {tNav(`clinic.${labelKey}`)}
                </Link>
              ))}
              <a
                href={siteConfig.ctas.bookingUrl}
                className="text-sm text-brand-300 hover:text-brand-200 transition-colors duration-150"
              >
                {tCta("primary")}
              </a>
            </nav>
          </div>

          <div>
            <p className="text-lg font-bold uppercase tracking-widest text-stone-500 mb-4">
              {tNav("academy.sectionLabel")}
            </p>
            <nav className="flex flex-col gap-2">
              <Link
                href={navPaths.academy.sectionHref}
                className="text-sm text-stone-400 hover:text-white transition-colors duration-150"
              >
                {tNav("academy.sectionLabel")}
              </Link>
              {navPaths.academy.links.map(({ href, labelKey }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-stone-400 hover:text-white transition-colors duration-150"
                >
                  {tNav(`academy.links.${labelKey}`)}
                </Link>
              ))}
              <Link
                href={siteConfig.ctas.enrollPath}
                className="text-sm text-brand-300 hover:text-brand-200 transition-colors duration-150"
              >
                {tNav("academy.enrollLabel")}
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-lg font-bold uppercase tracking-widest text-stone-500 mb-4">
              {tFooter("contactHeading")}
            </p>
            <address className="not-italic flex flex-col gap-2 text-sm text-stone-400">
              <span>{tFooter("location")}</span>
              <span>{tFooter("bookingLine")}</span>
              <Button
                href={siteConfig.ctas.bookingUrl}
                variant="primary"
                size="compact"
                className="mt-2 w-fit"
              >
                {tFooter("bookNow")}
              </Button>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-800 text-center text-xs text-stone-600">
          &copy; {new Date().getFullYear()} · {tFooter("attributionLeadIn")}{" "}
          <a
            href="https://mohsen-pajoohesh.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 hover:text-stone-400 underline-offset-2 hover:underline transition-colors"
          >
            {tFooter("attributionLabel")}
          </a>
        </div>
      </div>
    </footer>
  );
}
