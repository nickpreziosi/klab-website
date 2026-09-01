"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import type { HomeKrailsTranslations } from "@/ui/home/types";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./simple-secure-frictionless.module.css";

const CHECK_CIRCLE = "/images/simple-secure/check-circle.svg";
const CHECK = "/images/simple-secure/check.svg";
const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: ENTRANCE_EASE },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

type SimpleSecureFrictionlessProps = {
  translations: HomeKrailsTranslations;
  skipAnimation?: boolean;
};

export function SimpleSecureFrictionless({
  translations,
  skipAnimation = false,
}: SimpleSecureFrictionlessProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);

  const cards = [
    {
      title: translations.trustEncryptTitle,
      body: translations.trustEncryptBody,
      accent: "navy" as const,
    },
    {
      title: translations.trustFailureTitle,
      body: translations.trustFailureBody,
      accent: "cyan" as const,
    },
    {
      title: translations.trustPrivacyTitle,
      body: translations.trustPrivacyBody,
      accent: "navy" as const,
    },
    {
      title: translations.trustAuditTitle,
      body: translations.trustAuditBody,
      accent: "cyan" as const,
    },
  ];

  const pills = [
    translations.trustPillConfigurable,
    translations.trustPillEssential,
    translations.trustPillAuditable,
  ];

  return (
    <section className={styles.section} dir={dir}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{translations.trustTitle}</h2>
        <p className={styles.tagline}>{translations.trustTagline}</p>
        <p className={styles.body}>
          {translations.trustBody}{" "}
          <span className={styles.emphasis}>{translations.trustEmphasis}</span>
        </p>

        <motion.ul
          className={styles.cards}
          variants={stagger}
          initial={skipAnimation ? false : "hidden"}
          whileInView={skipAnimation ? undefined : "visible"}
          animate={skipAnimation ? "visible" : undefined}
          viewport={skipAnimation ? undefined : { once: true, amount: 0.25 }}
        >
          {cards.map((card) => (
            <motion.li
              key={card.title}
              className={styles.card}
              variants={skipAnimation ? undefined : fadeUp}
            >
              <h3
                className={cn(
                  styles.cardTitle,
                  card.accent === "navy" ? styles.cardTitleNavy : styles.cardTitleCyan
                )}
              >
                {card.title}
              </h3>
              <p className={styles.cardBody}>{card.body}</p>
            </motion.li>
          ))}
        </motion.ul>

        <motion.ul
          className={styles.pills}
          variants={stagger}
          initial={skipAnimation ? false : "hidden"}
          whileInView={skipAnimation ? undefined : "visible"}
          animate={skipAnimation ? "visible" : undefined}
          viewport={skipAnimation ? undefined : { once: true, amount: 0.3 }}
        >
          {pills.map((label) => (
            <motion.li
              key={label}
              className={styles.pill}
              variants={skipAnimation ? undefined : fadeUp}
            >
              <span className={styles.pillIcon} aria-hidden>
                <img src={CHECK_CIRCLE} alt="" width={42} height={42} className={styles.pillCircle} />
                <img src={CHECK} alt="" width={20} height={23} className={styles.pillCheck} />
              </span>
              <span className={styles.pillLabel}>{label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
