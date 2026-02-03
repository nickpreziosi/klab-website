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
import { SUPPORTED_LOCALES, type Locale } from "@/ui/shared/utils/i18n";
import { useLocale } from "@/ui/shared/providers/locale-context/locale-context";
import { useTranslations } from "@/ui/shared/hooks/use-translations";
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

export function LandingLocaleSwitcher() {
  const { locale: currentLocale, setLocale } = useLocale();
  const { t } = useTranslations();

  const handleValueChange = (value: string) => {
    setLocale(value as Locale);
  };

  return (
    <div className={styles.wrapper}>
      <Select value={currentLocale} onValueChange={handleValueChange}>
        <SelectTrigger aria-label="Change language" className={styles.trigger}>
          <span className={styles.labelGroup}>
            <span className={styles.label}>{t("landing.languageLabel")}</span>
            <span className={styles.value}>{LOCALE_CODE[currentLocale]}</span>
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
            {SUPPORTED_LOCALES.map((locale) => (
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
