"use client";

import { motion } from "framer-motion";
import styles from "./krails-hero.module.css";
import HeroText from "@/ui/shared/components/hero-text/hero-text";
import heroTextStyles from "@/ui/shared/components/hero-text/hero-text.module.css";
import { ProductLogo } from "@k-lab/components";
import { cn } from "@/ui/shared/utils/utils";
import { Locale } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { withBrandLtr } from "@/ui/home/utils/with-brand-ltr";

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

const headlineLineVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    y: 20,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.8,
      ease: ENTRANCE_EASE,
    },
  },
};

interface KRailsHeroProps {
  headingPrefix: string;
  headingQuestionMark: string;
  description1: string;
  description2: string;
  skipAnimation?: boolean;
}

export default function KRailsHero({
  headingPrefix,
  headingQuestionMark,
  description1,
  description2,
  skipAnimation = false,
}: KRailsHeroProps) {
  const locale = useLocale() as Locale;
  const HERO_TEXT_MAX_WIDTH: Record<Locale, string> = {
    en: "1094px",
    ar: "1094px",
    es: "1094px",
    pt: "1094px",
  };

  const prefixWords = headingPrefix.split(/\s+/u).filter(Boolean);

  const heading = [
    <motion.span key="prefix" className={styles.prefixLine} variants={headlineLineVariants}>
      {prefixWords.map((word, index) => (
        <motion.span
          key={`${index}-${word}`}
          variants={wordVariants}
          className={cn(heroTextStyles.word, styles.prefix)}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.span>,
    <motion.span key="logo" className={styles.logoLine} variants={wordVariants}>
      <span className={styles.logoWrap} dir="ltr">
        <ProductLogo
          product="k-rails"
          variant="theme-aware"
          size="full"
          alt=""
          aria-hidden
          className={styles.heroLogoImg}
          wrapperClassName={styles.heroLogoWrap}
        />
      </span>
      <span className={styles.srOnly} dir="ltr">
        K Rails
      </span>
      <span className={styles.mark}>{headingQuestionMark}</span>
    </motion.span>,
  ];

  return (
    <section className={styles.heroSection}>
      <div className={styles.contentWrapper}>
        <div className={styles.heroTextContainer}>
          <HeroText
            className={heroTextStyles.krailsHero}
            maxWidth={HERO_TEXT_MAX_WIDTH[locale]}
            heading={heading}
            subtitles={[
              withBrandLtr(description1, styles.brandLtr),
              withBrandLtr(description2, styles.brandLtr),
            ]}
            skipAnimation={skipAnimation}
          />
        </div>

        <motion.div style={{ display: "none" }} className={styles.transformedContainer}>
          <div className={styles.perspectiveWrapper}>
            <div className={styles.transformedContent}>
              <motion.div
                className={styles.imageContainer}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={styles.gradientOverlay} />
                <div className={styles.blackOverlay} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
