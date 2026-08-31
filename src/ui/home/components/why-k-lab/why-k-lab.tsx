"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import type { HomeKrailsTranslations } from "@/ui/home/types";
import { withBrandLtr } from "@/ui/home/utils/with-brand-ltr";
import styles from "./why-k-lab.module.css";

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: ENTRANCE_EASE },
  },
};

type WhyKLabProps = {
  translations: HomeKrailsTranslations;
  skipAnimation?: boolean;
};

export function WhyKLab({ translations, skipAnimation = false }: WhyKLabProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);

  return (
    <motion.section
      className={styles.section}
      dir={dir}
      aria-labelledby="why-k-lab-heading"
      initial={skipAnimation ? false : "hidden"}
      whileInView={skipAnimation ? undefined : "visible"}
      animate={skipAnimation ? "visible" : undefined}
      viewport={skipAnimation ? undefined : { once: true, amount: 0.2 }}
      variants={fadeUp}
    >
      <p className={styles.eyebrow}>{withBrandLtr(translations.whyEyebrow, styles.brandLtr)}</p>
      <h2 id="why-k-lab-heading" className={styles.headline}>
        {translations.whyHeadline}
      </h2>
      <p className={styles.intro}>{translations.whyIntro}</p>

      <div className={styles.table} role="table" aria-label={translations.whyEyebrow}>
        <div className={styles.colHeads} role="row">
          <div className={styles.colHeadWho} role="columnheader">
            {translations.whyColWho}
          </div>
          <div className={styles.colHeadDo} role="columnheader">
            {translations.whyColDo}
          </div>
          <div className={styles.colHeadDont} role="columnheader">
            {translations.whyColDont}
          </div>
        </div>

        {translations.whyRows.map((row) => (
          <div key={row.who} className={styles.row} role="row">
            <div className={styles.cell} role="cell">
              <span className={styles.cellLabel}>{translations.whyColWho}</span>
              <span className={styles.cellText}>{row.who}</span>
            </div>
            <div className={styles.cell} role="cell">
              <span className={styles.cellLabel}>{translations.whyColDo}</span>
              <span className={styles.cellText}>{row.do}</span>
            </div>
            <div className={styles.cell} role="cell">
              <span className={styles.cellLabel}>{translations.whyColDont}</span>
              <span className={styles.cellText}>{row.dont}</span>
            </div>
          </div>
        ))}

        <div className={styles.klabRow} role="row">
          <div className={styles.klabCell} role="cell">
            <span className={styles.cellLabel}>{translations.whyColWho}</span>
            <span className={styles.klabText}>
              {withBrandLtr(translations.whyKlabWho, styles.brandLtr)}
            </span>
          </div>
          <div className={styles.klabCell} role="cell">
            <span className={styles.cellLabel}>{translations.whyColDo}</span>
            <span className={styles.klabText}>
              {withBrandLtr(translations.whyKlabDo, styles.brandLtr)}
            </span>
          </div>
          <div className={styles.klabCell} role="cell">
            <span className={styles.cellLabel}>{translations.whyColDont}</span>
            <span className={styles.klabText}>
              {withBrandLtr(translations.whyKlabDont, styles.brandLtr)}
            </span>
          </div>
        </div>
      </div>

      <p className={styles.outro}>
        {withBrandLtr(translations.whyOutro, styles.brandLtr)}
      </p>
    </motion.section>
  );
}
