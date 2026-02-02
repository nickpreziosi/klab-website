"use client";

import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { SUPPORTED_LOCALES, type Locale } from "@/app/lib/i18n";
import { useLocale } from "@/app/components/ui/locale-context/locale-context";
import styles from "./locale-switcher.module.css";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  es: "ES",
};

export function LocaleSwitcher() {
  const { locale: currentLocale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;
    setLocale(newLocale);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        open &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <Globe className={styles.globeIcon} size={16} aria-hidden />
        <span className={styles.current}>{LOCALE_LABELS[currentLocale]}</span>
        <svg
          className={`${styles.caret} ${open ? styles.caretOpen : ""}`}
          width="12"
          height="12"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M4 6H11L7.5 10.5L4 6Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && (
        <ul
          className={styles.dropdown}
          role="listbox"
          aria-label="Language options"
        >
          {SUPPORTED_LOCALES.map((locale) => (
            <li key={locale} role="option" aria-selected={locale === currentLocale}>
              <button
                type="button"
                className={`${styles.option} ${locale === currentLocale ? styles.optionActive : ""}`}
                onClick={() => switchLocale(locale)}
              >
                {LOCALE_LABELS[locale]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
