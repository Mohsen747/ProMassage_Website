import type { IntlConfig } from "use-intl/core";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

import en from "../messages/en";
import fr from "../messages/fr";
import fa from "../messages/fa";

const messages = { en, fr, fa } as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    // `as const` message modules are deeply readonly; IntlConfig expects a wider mutable shape.
    messages: messages[locale as keyof typeof messages] as unknown as NonNullable<
      IntlConfig["messages"]
    >,
  };
});
