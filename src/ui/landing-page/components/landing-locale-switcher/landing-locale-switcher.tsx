"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectViewport,
  SelectItemIndicator,
} from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  saveScrollBeforeLocaleSwitch,
  setSkipAnimationsOnNextPageLoad,
} from "@/ui/shared/utils/scroll-preservation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ClientOnly } from "@/ui/shared/components/client-only/client-only";
import styles from "./landing-locale-switcher.module.css";

const LOCALE_CODE: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  pt: "PT",
};

const LOCALE_FULL_NAME: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
};

const LOCALES = routing.locales;

export function LandingLocaleSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("landing");
  const tCommon = useTranslations("common");

  const handleValueChange = (value: string) => {
    const newLocale = value as Locale;
    if (newLocale === currentLocale) return;
    saveScrollBeforeLocaleSwitch();
    setSkipAnimationsOnNextPageLoad();
    router.push(pathname, { locale: newLocale, scroll: false });
  };

  const triggerPlaceholder = (
    <div className={styles.wrapper}>
      <div className={styles.trigger} aria-hidden>
        <span className={styles.labelGroup}>
          <span className={styles.label}>{t("languageLabel")}</span>
          <span className={styles.value}>{LOCALE_CODE[currentLocale as Locale]}</span>
        </span>
        <ChevronDown className={styles.caret} aria-hidden />
      </div>
    </div>
  );

  return (
    <ClientOnly placeholder={triggerPlaceholder}>
      <div className={styles.wrapper}>
        <Select value={currentLocale} onValueChange={handleValueChange}>
          <SelectTrigger aria-label={tCommon("changeLanguage")} className={styles.trigger}>
            <span className={styles.labelGroup}>
              <span className={styles.label}>{t("languageLabel")}</span>
              <span className={styles.value}>{LOCALE_CODE[currentLocale as Locale]}</span>
            </span>
            <ChevronDown className={styles.caret} aria-hidden />
          </SelectTrigger>
          <SelectContent
            className={styles.content}
            position="popper"
            side="bottom"
            sideOffset={8}
            align="end"
          >
            <SelectViewport className={styles.viewport}>
              {LOCALES.map((locale) => (
                <SelectItem key={locale} value={locale} className={styles.item}>
                  <span className={styles.itemText}>
                    {LOCALE_CODE[locale]} – {LOCALE_FULL_NAME[locale]}
                  </span>
                  <SelectItemIndicator className={styles.indicator}>
                    <Check size={14} />
                  </SelectItemIndicator>
                </SelectItem>
              ))}
            </SelectViewport>
          </SelectContent>
        </Select>
      </div>
    </ClientOnly>
  );
}
