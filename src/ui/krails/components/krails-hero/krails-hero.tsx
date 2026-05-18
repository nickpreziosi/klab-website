"use client";

import { motion } from "framer-motion";
import { ArrowDownIcon } from "lucide-react";
import styles from "./krails-hero.module.css";
import HeroText, { type HeroTextButtonOrder } from "@/ui/shared/components/hero-text/hero-text";
import heroTextStyles from "@/ui/shared/components/hero-text/hero-text.module.css";
import { cn } from "@/ui/shared/utils/utils";
import { useEffectiveThemeSync } from "@/ui/shared/hooks/use-theme";
import { Locale } from "@/i18n/routing";
import { useLocale } from "next-intl";

const LOGO_LIGHT = "/logos/krails-logo-light.svg";
const LOGO_DARK = "/logos/krails-logo-dark.svg";

/** Learn More: downward (scroll to content). Request Access: forward arrow (same as HeroText default primary). */
const learnMoreButtonIcon = <ArrowDownIcon className={heroTextStyles.arrowIcon} aria-hidden />;

const requestAccessButtonIcon = (
  <svg
    className={cn(heroTextStyles.primaryButtonIcon, heroTextStyles.iconRtlMirror)}
    width="20"
    height="20"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

interface KRailsHeroProps {
  heading: string;
  headingHighlight: string;
  description: string;
  logoAlt: string;
  buttonText: string;
  buttonHref: string;
  buttonTwoText?: string;
  buttonTwoHref?: string;
  buttonOrder?: HeroTextButtonOrder;
  skipAnimation?: boolean;
}

export default function KRailsHero({
  heading,
  headingHighlight,
  description,
  logoAlt,
  buttonText,
  buttonHref,
  buttonTwoText,
  buttonTwoHref,
  buttonOrder = "primary-first",
  skipAnimation = false,
}: KRailsHeroProps) {
  const effectiveTheme = useEffectiveThemeSync();
  const locale = useLocale() as Locale;
  const logoSrc = effectiveTheme === "dark" ? LOGO_LIGHT : LOGO_DARK;
  const HERO_TEXT_MAX_WIDTH: Record<Locale, string> = {
    en: "920px",
    ar: "920px",
    es: "1100px",
    pt: "1200px",
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.contentWrapper}>
        <div className={styles.heroTextContainer}>
          <div className={styles.logoRow}>
            <motion.img
              className={styles.heroLogo}
              src={logoSrc}
              alt={logoAlt}
              width={280}
              height={72}
              initial={skipAnimation ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={skipAnimation ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <HeroText
            className={heroTextStyles.krailsHero}
            maxWidth={HERO_TEXT_MAX_WIDTH[locale]}
            text={heading}
            highlightPhrase={headingHighlight}
            subtitle={description}
            buttonText={buttonText}
            buttonHref={buttonHref}
            buttonIcon={learnMoreButtonIcon}
            buttonTwoText={buttonTwoText}
            buttonTwoHref={buttonTwoHref}
            buttonTwoIcon={requestAccessButtonIcon}
            buttonOrder={buttonOrder}
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
