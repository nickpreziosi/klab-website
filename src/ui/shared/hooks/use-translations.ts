"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale } from "@/ui/shared/providers/locale-context/locale-context";
import { DEFAULT_LOCALE, type Locale } from "@/ui/shared/utils/i18n";

type Translations = Record<string, unknown>;

const cache = new Map<Locale, Translations>();

function getNested(obj: unknown, path: string): string | undefined {
  if (obj == null || typeof obj !== "object") return undefined;
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    if (!(key in (current as Record<string, unknown>))) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : undefined;
}

function getAnyCachedTranslations(preferLocale: Locale): Translations {
  if (cache.has(preferLocale)) return cache.get(preferLocale)!;
  const first = cache.values().next().value;
  return first ?? {};
}

export function useTranslations() {
  const { locale } = useLocale();
  const [translations, setTranslations] = useState<Translations>(
    () => cache.get(locale) ?? getAnyCachedTranslations(locale)
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
          if (locale !== DEFAULT_LOCALE && cache.has(DEFAULT_LOCALE)) {
            const fallback = cache.get(DEFAULT_LOCALE)!;
            setTranslations(fallback);
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
      const fromCurrent = getNested(translations, key);
      if (fromCurrent !== undefined) return fromCurrent;
      for (const cachedLocale of cache.keys()) {
        const value = getNested(cache.get(cachedLocale)!, key);
        if (value !== undefined) return value;
      }
      return "";
    },
    [translations]
  );

  return { t, isLoading };
}
