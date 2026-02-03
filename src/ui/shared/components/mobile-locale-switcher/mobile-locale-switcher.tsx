"use client";

import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { SUPPORTED_LOCALES, type Locale } from "@/ui/shared/utils/i18n";
import { useLocale } from "@/ui/shared/providers/locale-context/locale-context";
import styles from "./mobile-locale-switcher.module.css";

const LOCALE_CODE: Record<Locale, string> = {
  en: "EN",
  es: "ES",
};

const LOCALE_FULL_NAME: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

function getLocaleLabel(locale: Locale): string {
  return `${LOCALE_CODE[locale]} – ${LOCALE_FULL_NAME[locale]}`;
}

export function MobileLocaleSwitcher() {
  const { locale: currentLocale, setLocale } = useLocale();
  const [open, setOpen] = useState<string | undefined>(undefined);

  const switchLocale = (locale: Locale) => {
    setLocale(locale);
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
          <Accordion.Trigger aria-label="Change language" className={styles.accordionTrigger}>
            <div className={styles.accordionTriggerContainer}>
              <div className={styles.triggerContent}>
                <span className={styles.triggerLabel}>Language</span>
                <span className={styles.currentLocale}>
                  <span className={styles.currentLocaleCode}>{LOCALE_CODE[currentLocale]}</span>
                  <span className={styles.currentLocaleLabel}>
                    {LOCALE_FULL_NAME[currentLocale]}
                  </span>
                </span>
              </div>
              <span className={styles.edit}>EDIT</span>
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
              {SUPPORTED_LOCALES.map((locale) => (
                <button
                  key={locale}
                  onClick={() => switchLocale(locale)}
                  className={`${styles.localeOption} ${
                    currentLocale === locale ? styles.localeOptionActive : ""
                  }`}
                  aria-label={getLocaleLabel(locale)}
                >
                  <span className={styles.optionCode}>{LOCALE_CODE[locale]}</span>
                  <span className={styles.optionLabel}>{LOCALE_FULL_NAME[locale]}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
