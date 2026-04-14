import { cookies, headers } from "next/headers";
import { routing, type Locale } from "./routing";

/** Middleware sets this on the request; see next-intl `HEADER_LOCALE_NAME`. */
const NEXT_INTL_LOCALE_HEADER = "x-next-intl-locale";

/**
 * Locale for `<html lang>` / `<html dir>` and the root `NextIntlClientProvider`.
 * The root layout runs before `[locale]/layout`, so `getLocale()` alone can miss
 * the active locale; we align with the middleware header and locale cookie.
 */
export async function resolveDocumentLocale(): Promise<Locale> {
  const headerList = await headers();
  const fromHeader = headerList.get(NEXT_INTL_LOCALE_HEADER)?.trim();
  if (fromHeader && routing.locales.includes(fromHeader as Locale)) {
    return fromHeader as Locale;
  }

  const cookieStore = await cookies();
  const cookieName: string =
    typeof routing.localeCookie === "object" && routing.localeCookie !== null && "name" in routing.localeCookie
      ? (routing.localeCookie.name ?? "NEXT_LOCALE")
      : "NEXT_LOCALE";
  const fromCookie = cookieStore.get(cookieName)?.value?.trim();
  if (fromCookie && routing.locales.includes(fromCookie as Locale)) {
    return fromCookie as Locale;
  }

  return routing.defaultLocale;
}
