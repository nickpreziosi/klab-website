"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  saveScrollBeforeLocaleSwitch,
  setSkipAnimationsOnNextPageLoad,
} from "@/ui/shared/utils/scroll-preservation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import styles from "./mobile-locale-switcher.module.css";

const LOCALES = routing.locales;

const LOCALE_CODE: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  pt: "PT",
  ar: "AR",
};

export function MobileLocaleSwitcher() {
  const t = useTranslations("localeSwitcher");
  const tCommon = useTranslations("common");
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState<string | undefined>(undefined);

  const localeFullName: Record<Locale, string> = {
    en: t("localeEn"),
    es: t("localeEs"),
    pt: t("localePt"),
    ar: t("localeAr"),
  };

  const getLocaleLabel = (locale: Locale): string => {
    return `${LOCALE_CODE[locale]} – ${localeFullName[locale]}`;
  };

  const switchLocale = (locale: Locale) => {
    if (locale === currentLocale) return;
    saveScrollBeforeLocaleSwitch();
    setSkipAnimationsOnNextPageLoad();
    router.push(pathname, { locale, scroll: false });
  };

  return (
    <Accordion.Root
      type="single"
      collapsible
      value={open}
      onValueChange={(value) => setOpen(value)}
      className={styles.accordionRoot}
    >
      <Accordion.Item value="language" className={styles.accordionItem}>
        <Accordion.Header className={styles.accordionHeader}>
          <Accordion.Trigger aria-label={t("changeLanguage")} className={styles.accordionTrigger}>
            <div className={styles.accordionTriggerContainer}>
              <div className={styles.triggerContent}>
                <span className={styles.triggerLabel}>{t("label")}</span>
                <span className={styles.currentLocale}>
                  <span className={styles.currentLocaleCode}>{LOCALE_CODE[currentLocale as Locale]}</span>
                  <span className={styles.currentLocaleLabel}>
                    {localeFullName[currentLocale as Locale]}
                  </span>
                </span>
              </div>
              <span className={styles.edit}>{tCommon("edit")}</span>
              <svg
                className={styles.caretIcon}
                width="30"
                height="30"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path>
              </svg>
            </div>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className={styles.accordionContent} asChild forceMount>
          <motion.div
            initial={false}
            animate={
              open === "language" ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className={styles.localeOptions}>
              {LOCALES.map((locale) => (
                <button
                  key={locale}
                  onClick={() => switchLocale(locale)}
                  className={`${styles.localeOption} ${
                    currentLocale === locale ? styles.localeOptionActive : ""
                  }`}
                  aria-label={getLocaleLabel(locale)}
                >
                  <span className={styles.optionCode}>{LOCALE_CODE[locale]}</span>
                  <span className={styles.optionLabel}>{localeFullName[locale]}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
