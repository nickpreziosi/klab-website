"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import type { HomeKrailsTranslations } from "@/ui/home/types";
import { withBrandLtr } from "@/ui/home/utils/with-brand-ltr";
import { useEffectiveThemeSync } from "@/ui/shared/hooks/use-theme";
import { BLUR_PLACEHOLDER } from "@/ui/shared/constants/blur-placeholder";
import styles from "./what-is-krails.module.css";

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

export function WhatIsKrails({
  translations,
  skipAnimation = false,
}: WhatIsKrailsProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);
  const effectiveTheme = useEffectiveThemeSync();
  const logoSrc = effectiveTheme === "dark" ? LOGO_LIGHT : LOGO_DARK;

  return (
    <motion.section
      className={styles.section}
      dir={dir}
      initial={skipAnimation ? false : "hidden"}
      whileInView={skipAnimation ? undefined : "visible"}
      animate={skipAnimation ? "visible" : undefined}
      viewport={skipAnimation ? undefined : { once: true, amount: 0.25 }}
      variants={fadeUp}
    >
      <div className={styles.layout}>
        <div className={styles.card}>
          <h2 className={styles.heading}>
            <span className={styles.prefix}>{translations.whatIsPrefix}</span>
            <span className={styles.logoRow}>
              <Image
                src={logoSrc}
                alt="K Rails"
                width={245}
                height={57}
                className={styles.logo}
                dir="ltr"
              />
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
        <Image
          src="/images/krails-what-is-dashboard.webp"
          alt={translations.whatIsImageAlt}
          width={1920}
          height={1080}
          className={styles.mediaImage}
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          sizes="(max-width: 768px) 100vw, 55vw"
        />
      </div>
    </motion.section>
  );
}
