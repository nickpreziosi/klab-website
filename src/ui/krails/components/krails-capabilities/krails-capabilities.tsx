"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import { withBrandLtr } from "@/ui/home/utils/with-brand-ltr";
import styles from "./krails-capabilities.module.css";

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

export type KRailsCapabilitiesTranslations = {
  capDashTitle: string;
  capDashBody: string;
  capDashAlt: string;
  capVerifiedTitle: string;
  capVerifiedBody: string;
  capProgramTitle: string;
  capProgramBody: string;
  capProgramAlt: string;
  capErrorsTitle: string;
  capErrorsBody: string;
  capErrorsAlt: string;
  capRailsTitle: string;
  capRailsBody: string;
  capRailsAlt: string;
  capLoopTitle: string;
  capLoopBody: string;
  capLoopAlt: string;
};

type KRailsCapabilitiesProps = {
  translations: KRailsCapabilitiesTranslations;
  skipAnimation?: boolean;
};

export function KRailsCapabilities({
  translations,
  skipAnimation = false,
}: KRailsCapabilitiesProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);
  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.08 },
    },
  };
  const cardFade = skipAnimation
    ? undefined
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.7, ease: ENTRANCE_EASE } },
      };

  return (
    <section
      className={styles.section}
      dir={dir}
      aria-labelledby="krails-capabilities-heading"
    >
      <div className={styles.bg} aria-hidden>
        <img src="/images/krails-capabilities/bg.png" alt="" />
      </div>
      <motion.ul
        className={styles.grid}
        variants={stagger}
        initial={skipAnimation ? false : "hidden"}
        whileInView={skipAnimation ? undefined : "visible"}
        animate={skipAnimation ? "visible" : undefined}
        viewport={skipAnimation ? undefined : { once: true, amount: 0.12 }}
      >
        <motion.li className={`${styles.card} ${styles.hero}`} variants={cardFade}>
          <div className={styles.heroCopy}>
            <h2 id="krails-capabilities-heading" className={styles.title}>
              {translations.capDashTitle}
            </h2>
            <p className={styles.heroBody}>{translations.capDashBody}</p>
          </div>
          <div className={styles.heroMedia}>
            <span className={styles.glow} aria-hidden />
            <img
              src="/images/krails-capabilities/dashboard.png"
              alt={translations.capDashAlt}
              width={552}
              height={310}
            />
          </div>
        </motion.li>

        <motion.li className={`${styles.card} ${styles.verified}`} variants={cardFade}>
          <h3 className={`${styles.title} ${styles.titleOnGradient}`}>
            {withBrandLtr(translations.capVerifiedTitle, styles.brandLtr)}
          </h3>
          <div className={styles.verifiedPanel}>
            <p className={styles.body}>
              {withBrandLtr(translations.capVerifiedBody, styles.brandLtr)}
            </p>
          </div>
        </motion.li>

        <motion.li className={`${styles.card} ${styles.program}`} variants={cardFade}>
          <h3 className={styles.title}>{translations.capProgramTitle}</h3>
          <p className={styles.body}>{translations.capProgramBody}</p>
          <div className={styles.programMedia}>
            <img
              src="/images/krails-capabilities/queue.png"
              alt={translations.capProgramAlt}
              width={315}
              height={190}
            />
          </div>
        </motion.li>

        <motion.li className={`${styles.card} ${styles.errors}`} variants={cardFade}>
          <h3 className={styles.title}>{translations.capErrorsTitle}</h3>
          <div className={styles.alert}>
            <img
              src="/images/krails-capabilities/alert.png"
              alt={translations.capErrorsAlt}
              width={288}
              height={68}
            />
          </div>
          <p className={styles.body}>{translations.capErrorsBody}</p>
        </motion.li>

        <motion.li className={`${styles.card} ${styles.rails}`} variants={cardFade}>
          <h3 className={styles.title}>{translations.capRailsTitle}</h3>
          <p className={styles.body}>{translations.capRailsBody}</p>
          <div className={styles.railsMedia}>
            <img
              src="/images/krails-capabilities/rails.png"
              alt={translations.capRailsAlt}
              width={302}
              height={170}
            />
          </div>
        </motion.li>

        <motion.li className={`${styles.card} ${styles.loop}`} variants={cardFade}>
          <div className={styles.loopInner}>
            <div className={styles.loopCopy}>
              <h3 className={styles.title}>{translations.capLoopTitle}</h3>
              <p className={styles.body}>{translations.capLoopBody}</p>
            </div>
            <img
              className={styles.loopFlow}
              src="/images/krails-capabilities/flow.png"
              alt={translations.capLoopAlt}
              width={355}
              height={284}
            />
          </div>
          <span className={styles.meshA} aria-hidden>
            <img src="/images/krails-capabilities/mesh-a.svg" alt="" />
          </span>
          <span className={styles.meshB} aria-hidden>
            <img src="/images/krails-capabilities/mesh-b.svg" alt="" />
          </span>
        </motion.li>
      </motion.ul>
    </section>
  );
}
