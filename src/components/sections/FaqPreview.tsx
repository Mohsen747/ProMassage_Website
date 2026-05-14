import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";

export default async function FaqPreview() {
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const questions = t.raw("faqPreview.questions") as string[];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mb-4">
              {t("faqPreview.title")}
            </h2>
            <p className="text-stone-600 leading-relaxed mb-8">{t("faqPreview.text")}</p>
            <Button href="/faq" variant="outlineBrand">
              {t("faqPreview.cta")}
            </Button>
          </div>

          <ul className="space-y-3">
            {questions.map((q) => (
              <li key={q}>
                <Link
                  href="/faq"
                  className="flex items-start gap-3 group py-3 border-b border-brand-100 hover:border-brand-200 transition-colors duration-150"
                >
                  <span className="mt-0.5 text-brand-500 text-sm select-none">
                    {tCommon("faqQuestionPrefix")}
                  </span>
                  <span className="text-stone-700 group-hover:text-stone-900 text-sm leading-relaxed transition-colors duration-150">
                    {q}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
