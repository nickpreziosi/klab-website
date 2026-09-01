"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import type { HomeKrailsTranslations } from "@/ui/home/types";
import { withBrandLtr } from "@/ui/home/utils/with-brand-ltr";
import styles from "./replace-systems.module.css";

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

type ReplaceSystemsProps = {
  translations: HomeKrailsTranslations;
  skipAnimation?: boolean;
};

export function ReplaceSystems({
  translations,
  skipAnimation = false,
}: ReplaceSystemsProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);

  return (
    <motion.section
      className={styles.section}
      dir={dir}
      initial={skipAnimation ? false : { opacity: 0 }}
      whileInView={skipAnimation ? undefined : { opacity: 1 }}
      animate={skipAnimation ? { opacity: 1 } : undefined}
      viewport={skipAnimation ? undefined : { once: true, amount: 0.25 }}
      transition={
        skipAnimation ? { duration: 0 } : { duration: 0.7, ease: ENTRANCE_EASE }
      }
    >
      <div className={styles.inner}>
        <div className={styles.card}>
        <div className={styles.pills}>
          <h2 className={styles.question}>{translations.replaceQuestion}</h2>
          <p className={styles.answer}>{translations.replaceAnswer}</p>
        </div>
        <div className={styles.body}>
          <p>{withBrandLtr(translations.replaceBody1, styles.brandLtr)}</p>
          <p>{withBrandLtr(translations.replaceBody2, styles.brandLtr)}</p>
        </div>
      </div>
      </div>
    </motion.section>
  );
}
