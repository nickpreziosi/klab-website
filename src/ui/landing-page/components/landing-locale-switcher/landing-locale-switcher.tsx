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
import { saveScrollBeforeLocaleSwitch } from "@/ui/shared/utils/scroll-preservation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { useTranslations } from "next-intl";
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

  const handleValueChange = (value: string) => {
    const newLocale = value as Locale;
    if (newLocale === currentLocale) return;
    saveScrollBeforeLocaleSwitch();
    router.push(pathname, { locale: newLocale, scroll: false });
  };

  return (
    <div className={styles.wrapper}>
      <Select value={currentLocale} onValueChange={handleValueChange}>
        <SelectTrigger aria-label="Change language" className={styles.trigger}>
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
  );
}
