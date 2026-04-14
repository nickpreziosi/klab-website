"use client";

import { useLayoutEffect } from "react";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";

/**
 * Keeps `document.documentElement.lang` and `dir` aligned with the active locale.
 * The root layout sets initial values on the server; Next.js often does not re-run
 * the root layout on client navigations, so the DOM must be updated here when the
 * locale changes (e.g. locale switcher).
 */
export function DocumentHtmlLangDirSync() {
  const locale = useLocale() as Locale;

  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getTextDirection(locale);
  }, [locale]);

  return null;
}
