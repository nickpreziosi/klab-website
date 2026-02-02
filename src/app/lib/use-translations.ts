"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale } from "@/app/components/ui/locale-context/locale-context";
import { DEFAULT_LOCALE, type Locale } from "./i18n";

type Translations = Record<string, unknown>;

const cache = new Map<Locale, Translations>();

function getNested(obj: unknown, path: string): string | undefined {
  const value = path.split(".").reduce((current: unknown, key) => {
    if (current != null && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
  return typeof value === "string" ? value : undefined;
}

export function useTranslations() {
  const { locale } = useLocale();
  const [translations, setTranslations] = useState<Translations>(() =>
    cache.get(locale),
  );
  const [isLoading, setIsLoading] = useState(() => !cache.has(locale));

  useEffect(() => {
    if (cache.has(locale)) {
      setTranslations(cache.get(locale)!);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    fetch(`/locales/${locale}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${locale}.json`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          cache.set(locale, data);
          setTranslations(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          // Fallback to default locale
          if (locale !== DEFAULT_LOCALE && cache.has(DEFAULT_LOCALE)) {
            setTranslations(cache.get(DEFAULT_LOCALE)!);
          } else {
            setTranslations({});
          }
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const t = useCallback(
    (key: string): string => {
      if (isLoading || !translations) return key;
      const value = getNested(translations, key);
      if (value !== undefined) return value;
      // Fallback to default locale if current is missing the key
      if (locale !== DEFAULT_LOCALE && cache.has(DEFAULT_LOCALE)) {
        const fallback = getNested(cache.get(DEFAULT_LOCALE)!, key);
        if (fallback !== undefined) return fallback;
      }
      return key;
    },
    [locale, translations, isLoading],
  );

  return { t, isLoading };
}
