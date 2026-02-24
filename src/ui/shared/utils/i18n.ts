/**
 * Locale config for routing. Use these when building locale-prefixed paths.
 */
export const SUPPORTED_LOCALES = ["en", "es", "pt", "ar"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isSupportedLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

/** Cookie name for persisting locale preference (used by middleware to redirect / to preferred locale) */
export const LOCALE_COOKIE_NAME = "locale-preference";
