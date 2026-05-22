"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectPortal,
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
import { ClientOnly } from "@/ui/shared/components/client-only/client-only";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  saveScrollBeforeLocaleSwitch,
  setSkipAnimationsOnNextPageLoad,
  setSkipAnimationForPath,
} from "@/ui/shared/utils/scroll-preservation";
import { useSetSkipAnimationForPath } from "@/ui/shared/providers/skip-animation-for-path-provider/skip-animation-for-path-provider";
import { getTextDirection, routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import themeToggleStyles from "../theme-toggle/theme-toggle.module.css";
import styles from "./locale-switcher.module.css";

const LOCALE_CODE: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  pt: "PT",
  ar: "AR",
};

const LOCALE_NAME_KEYS: Record<Locale, "localeEn" | "localeEs" | "localePt" | "localeAr"> = {
  en: "localeEn",
  es: "localeEs",
  pt: "localePt",
  ar: "localeAr",
};

const LOCALES = routing.locales;

export function LocaleSwitcher() {
  const t = useTranslations("localeSwitcher");
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const setPathToSkip = useSetSkipAnimationForPath();
  const isRtl = getTextDirection(currentLocale as Locale) === "rtl";

  const handleValueChange = (value: string) => {
    const newLocale = value as Locale;
    if (newLocale === currentLocale) return;
    saveScrollBeforeLocaleSwitch();
    setSkipAnimationsOnNextPageLoad();
    const targetFullPath = pathname === "/" ? `/${newLocale}` : `/${newLocale}${pathname}`;
    setPathToSkip(targetFullPath);
    setSkipAnimationForPath(targetFullPath);
    router.push(pathname, { locale: newLocale, scroll: false });
  };

  const localePlaceholder = (
    <button
      type="button"
      className={`${themeToggleStyles.selectTrigger} ${styles.selectTriggerLocale}`}
      aria-label={t("changeLanguage")}
    >
      {LOCALE_CODE[currentLocale as Locale]}
    </button>
  );

  return (
    <div className={themeToggleStyles.toggleContainer}>
      <ClientOnly placeholder={localePlaceholder}>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <Select value={currentLocale} onValueChange={handleValueChange}>
              <TooltipTrigger asChild>
                <SelectTrigger
                  aria-label={t("changeLanguage")}
                  className={`${themeToggleStyles.selectTrigger} ${styles.selectTriggerLocale}`}
                >
                  <SelectValue>{LOCALE_CODE[currentLocale as Locale]}</SelectValue>
                </SelectTrigger>
              </TooltipTrigger>
              <SelectPortal>
                <SelectContent
                  dir={isRtl ? "rtl" : "ltr"}
                  className={`${themeToggleStyles.selectContent} ${styles.selectContentLocale}`}
                  position="popper"
                  sideOffset={-20}
                  align="center"
                >
                  <div
                    className={styles.glassLayer}
                    aria-hidden
                    style={{
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      transform: "translateZ(0)",
                    }}
                  />
                  <SelectViewport
                    className={`${themeToggleStyles.selectViewport} ${styles.selectViewportLocale}`}
                  >
                    {LOCALES.map((locale) => (
                      <SelectItem
                        key={locale}
                        value={locale}
                        className={`${themeToggleStyles.selectItem} ${styles.selectItemLocale}`}
                      >
                        <span className={styles.selectItemText}>
                          <span className={styles.selectItemCode}>{LOCALE_CODE[locale]}</span>{" "}
                          {t(LOCALE_NAME_KEYS[locale])}
                        </span>
                        <SelectItemIndicator
                          className={`${themeToggleStyles.selectItemIndicator} ${styles.selectItemIndicatorLocale}`}
                        >
                          <Check size={14} />
                        </SelectItemIndicator>
                      </SelectItem>
                    ))}
                  </SelectViewport>
                </SelectContent>
              </SelectPortal>
            </Select>

            <TooltipContent sideOffset={12} side="bottom">
              {t("tooltipPrefix")} {t(LOCALE_NAME_KEYS[currentLocale as Locale])}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ClientOnly>
    </div>
  );
}
