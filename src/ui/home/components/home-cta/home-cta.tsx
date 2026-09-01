"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import type { HomeKrailsTranslations } from "@/ui/home/types";
import Button from "@/ui/shared/components/button/button";
import styles from "./home-cta.module.css";

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: ENTRANCE_EASE },
  },
};

type HomeCtaProps = {
  translations: HomeKrailsTranslations;
  skipAnimation?: boolean;
};

export function HomeCta({ translations, skipAnimation = false }: HomeCtaProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);

  return (
    <section
      className={styles.section}
      dir={dir}
      aria-labelledby="home-cta-heading"
    >
      <motion.div
        className={styles.content}
        initial={skipAnimation ? false : "hidden"}
        whileInView={skipAnimation ? undefined : "visible"}
        animate={skipAnimation ? "visible" : undefined}
        viewport={skipAnimation ? undefined : { once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <h2 id="home-cta-heading" className={styles.title}>
          {translations.ctaTitle}
        </h2>
        <p className={styles.body}>{translations.ctaBody}</p>
        <Button
          href="/contact/sales"
          variant="accent-brand-outline"
          size="lg"
          className={styles.button}
        >
          {translations.ctaButton}
        </Button>
      </motion.div>
    </section>
  );
}
