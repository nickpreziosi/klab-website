import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "pt"],
  defaultLocale: "en",
  localeCookie: {
    name: "locale-preference",
    sameSite: "lax" as const,
  },
});

export type Locale = (typeof routing.locales)[number];
