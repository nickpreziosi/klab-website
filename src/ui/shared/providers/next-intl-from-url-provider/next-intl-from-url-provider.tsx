"use client";

import { usePathname } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { isSupportedLocale, DEFAULT_LOCALE, type Locale } from "@/ui/shared/utils/i18n";

import en from "@/messages/en.json";
import es from "@/messages/es.json";
import pt from "@/messages/pt.json";

const messagesMap: Record<Locale, typeof en> = {
  en,
  es,
  pt,
};

function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment && isSupportedLocale(segment) ? segment : DEFAULT_LOCALE;
}

/**
 * Provides next-intl with locale and messages derived from the current URL.
 *
 * This diverges from next-intl’s default (root layout with <NextIntlClientProvider>
 * and config from getRequestConfig) so that client-side locale switching works:
 * with the default approach, locale/messages are fixed at first request, so
 * switching locale via router.push() doesn’t update translations. Here we read
 * locale from pathname and pass the matching messages so translations update
 * when the URL changes. See: https://next-intl.dev/docs/getting-started/app-router
 */
export function NextIntlFromUrlProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const messages = messagesMap[locale] ?? messagesMap[DEFAULT_LOCALE];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
