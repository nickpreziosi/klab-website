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
} from "@/ui/shared/components/tooltip/tooltip";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { saveScrollBeforeLocaleSwitch } from "@/ui/shared/utils/scroll-preservation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import themeToggleStyles from "../theme-toggle/theme-toggle.module.css";
import styles from "./locale-switcher.module.css";

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

function getLocaleTooltipLabel(locale: Locale): string {
  return `${LOCALE_CODE[locale]} – ${LOCALE_FULL_NAME[locale]}`;
}

const LOCALES = routing.locales;

export function LocaleSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleValueChange = (value: string) => {
    const newLocale = value as Locale;
    if (newLocale === currentLocale) return;
    saveScrollBeforeLocaleSwitch();
    router.push(pathname, { locale: newLocale, scroll: false });
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
                <SelectValue>{LOCALE_CODE[currentLocale as Locale]}</SelectValue>
              </SelectTrigger>
            </TooltipTrigger>
            <SelectContent
              className={`${themeToggleStyles.selectContent} ${styles.selectContentLocale}`}
              position="popper"
              sideOffset={-20}
              align="center"
            >
              <SelectViewport className={themeToggleStyles.selectViewport}>
                {LOCALES.map((locale) => (
                  <SelectItem key={locale} value={locale} className={themeToggleStyles.selectItem}>
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
            Language: {LOCALE_FULL_NAME[currentLocale as Locale]}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
