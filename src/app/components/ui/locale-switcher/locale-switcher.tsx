"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  SelectItemIndicator,
} from "@radix-ui/react-select";
import { Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/app/components/ui/tooltip/tooltip";
import { SUPPORTED_LOCALES, type Locale } from "@/app/lib/i18n";
import { useLocale } from "@/app/components/ui/locale-context/locale-context";
import themeToggleStyles from "../theme-toggle/theme-toggle.module.css";
import styles from "./locale-switcher.module.css";

const LOCALE_CODE: Record<Locale, string> = {
  en: "EN",
  es: "ES",
};

const LOCALE_FULL_NAME: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

function getLocaleTooltipLabel(locale: Locale): string {
  return `${LOCALE_CODE[locale]} – ${LOCALE_FULL_NAME[locale]}`;
}

export function LocaleSwitcher() {
  const { locale: currentLocale, setLocale } = useLocale();

  const handleValueChange = (value: string) => {
    setLocale(value as Locale);
  };

  return (
    <div className={themeToggleStyles.toggleContainer}>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <Select value={currentLocale} onValueChange={handleValueChange}>
            <TooltipTrigger asChild>
              <SelectTrigger
                aria-label="Change language"
                className={`${themeToggleStyles.selectTrigger} ${styles.selectTriggerLocale}`}
              >
                <SelectValue>{LOCALE_CODE[currentLocale]}</SelectValue>
              </SelectTrigger>
            </TooltipTrigger>
            <SelectContent className={themeToggleStyles.selectContent} position="popper" sideOffset={-20} align="center">
              <SelectViewport className={themeToggleStyles.selectViewport}>
                {SUPPORTED_LOCALES.map((locale) => (
                  <SelectItem
                    key={locale}
                    value={locale}
                    className={themeToggleStyles.selectItem}
                  >
                    <span className={styles.selectItemText}>
                      {LOCALE_CODE[locale]} {LOCALE_FULL_NAME[locale]}
                    </span>
                    <SelectItemIndicator className={themeToggleStyles.selectItemIndicator}>
                      <Check size={14} />
                    </SelectItemIndicator>
                  </SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </Select>

          <TooltipContent sideOffset={12} side="bottom">
            Language: {LOCALE_FULL_NAME[currentLocale]}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
