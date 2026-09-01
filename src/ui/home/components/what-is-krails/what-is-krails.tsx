"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import type { HomeKrailsTranslations } from "@/ui/home/types";
import { withBrandLtr } from "@/ui/home/utils/with-brand-ltr";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./what-is-krails.module.css";

const DASHBOARD_GIF = "/images/krails-what-is-dashboard.gif";

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;
const LOGO_LIGHT = "/logos/krails-logo-light.svg";
const LOGO_DARK = "/logos/krails-logo-dark.svg";

const fadeUp = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: ENTRANCE_EASE },
  },
};

type WhatIsKrailsProps = {
  translations: HomeKrailsTranslations;
  skipAnimation?: boolean;
};

export function WhatIsKrails({ translations, skipAnimation = false }: WhatIsKrailsProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);

  return (
    <section className={styles.section} dir={dir}>
      <motion.div
        className={styles.inner}
        initial={skipAnimation ? false : "hidden"}
        whileInView={skipAnimation ? undefined : "visible"}
        animate={skipAnimation ? "visible" : undefined}
        viewport={skipAnimation ? undefined : { once: true, amount: 0.25 }}
        variants={fadeUp}
      >
        <div className={styles.frame}>
        <div className={styles.layout}>
          <div className={styles.card}>
            <h2 className={styles.heading}>
              <span className={styles.prefix}>{translations.whatIsPrefix}</span>
              <span className={styles.logoRow}>
                <span className={styles.logoWrap} dir="ltr">
                  <img
                    src={LOGO_DARK}
                    alt="K Rails"
                    width={245}
                    height={57}
                    className={cn(styles.logo, styles.logoLight)}
                    decoding="async"
                  />
                  <img
                    src={LOGO_LIGHT}
                    alt=""
                    width={245}
                    height={57}
                    className={cn(styles.logo, styles.logoDark)}
                    decoding="async"
                    aria-hidden
                  />
                </span>
                <span className={styles.mark} aria-hidden>
                  {translations.whatIsQuestionMark}
                </span>
              </span>
            </h2>
            <div className={styles.body}>
              <p>{withBrandLtr(translations.whatIsBody1, styles.brandLtr)}</p>
              <p>{withBrandLtr(translations.whatIsBody2, styles.brandLtr)}</p>
            </div>
          </div>

          <img
            src={DASHBOARD_GIF}
            alt={translations.whatIsImageAlt}
            className={styles.mediaImage}
            decoding="async"
          />
        </div>
        </div>
      </motion.div>
    </section>
  );
}
