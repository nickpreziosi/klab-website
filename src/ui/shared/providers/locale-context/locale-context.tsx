"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  isSupportedLocale,
  LOCALE_COOKIE_NAME,
  type Locale,
} from "@/ui/shared/utils/i18n";
import { saveScrollBeforeLocaleSwitch } from "@/ui/shared/utils/scroll-preservation";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Build a path with the current locale (e.g. localePath('/company') => '/en/company') */
  localePath: (path: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment && isSupportedLocale(segment) ? segment : DEFAULT_LOCALE;
}

function pathWithLocale(pathname: string, locale: Locale): string {
  const pathWithoutLocale = pathname.replace(/^\/[^/]+/, "") || "/";
  return `/${locale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
}

function setLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(() => getLocaleFromPathname(pathname));

  // Sync context locale when URL changes (e.g. user navigated via link)
  useEffect(() => {
    setLocaleState(getLocaleFromPathname(pathname));
  }, [pathname]);

  const setLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return;
      setLocaleCookie(newLocale);
      setLocaleState(newLocale);
      saveScrollBeforeLocaleSwitch();
      const newPath = pathWithLocale(pathname, newLocale);
      router.push(newPath, { scroll: false });
    },
    [locale, pathname, router]
  );

  const localePath = useCallback(
    (path: string) => {
      const clean = path.startsWith("/") ? path : `/${path}`;
      if (clean === "/") return `/${locale}`;
      return `/${locale}${clean}`;
    },
    [locale]
  );

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, localePath }),
    [locale, setLocale, localePath]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}

/** Use only when you know the provider is optional (e.g. in a shared component). Returns null if outside provider. */
export function useLocaleOptional(): LocaleContextValue | null {
  return useContext(LocaleContext);
}
