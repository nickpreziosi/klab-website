import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "pt", "ar"],
  defaultLocale: "en",
  localeCookie: {
    name: "locale-preference",
    sameSite: "lax" as const,
  },
});

export type Locale = (typeof routing.locales)[number];

/** Document text direction for the active locale (next-intl is source of truth). */
export function getTextDirection(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}
