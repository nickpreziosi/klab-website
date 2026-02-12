"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MailIcon, ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/ui/shared/components/button/button";
import { LandingTechnologiesShowcase } from "@/ui/landing-page/components/landing-technologies-showcase/landing-technologies-showcase";
import { LandingLocaleSwitcher } from "@/ui/landing-page/components/landing-locale-switcher/landing-locale-switcher";
import { KlabLogo } from "@/ui/shared/components/klab-logo/klab-logo";
import { useLandingAnimation } from "@/ui/landing-page/providers/landing-animation-provider";
import type { LandingTranslations } from "@/ui/landing-page/types";
import { buildLandingTranslations } from "@/ui/landing-page/types";
import styles from "./landing-page-content.module.css";

const transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const };

const wordVariants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition,
  },
};

export type LandingVariant = "orange" | "wave";

type LandingPageContentProps = {
  variant: LandingVariant;
  /** When provided (from server), translated content is SSR'd; otherwise use client useTranslations */
  translations?: LandingTranslations;
};

export default function LandingPageContent({
  variant,
  translations: serverTranslations,
}: LandingPageContentProps) {
  const t = useTranslations("landing");
  const translations = serverTranslations ?? buildLandingTranslations(t);
  const landingAnimation = useLandingAnimation();
  const skipAnimation = landingAnimation?.hasAnimated ?? false;

  const [isLoaded, setIsLoaded] = useState(skipAnimation);

  useEffect(() => {
    if (skipAnimation) return;
    const id = setTimeout(() => {
      setIsLoaded(true);
      landingAnimation?.setHasAnimated();
    }, 200);
    return () => clearTimeout(id);
  }, [skipAnimation, landingAnimation]);

  const headlineText = translations.headline;
  const headlineWords = headlineText.split(" ");

  const hidden = { opacity: 0, filter: "blur(10px)", y: 10 };
  const visible = { opacity: 1, filter: "blur(0px)", y: 0 };
  const fadeIn = {
    initial: skipAnimation ? visible : hidden,
    animate: skipAnimation || isLoaded ? visible : hidden,
    transition: (delay = 0) => ({ delay, ...transition }),
  };

  const viewport = { once: true, amount: 0.15 } as const;
  const productsTransition = (delay: number) => ({ delay, ...transition });

  const bgSrc =
    variant === "orange" ? "/images/landing-bg-orange.webp" : "/images/landing-bg-wave.webp";

  return (
    <main
      className={`${styles.page} ${styles[`page${variant === "orange" ? "Orange" : "Wave"}`]}`}
      data-variant={variant}
    >
      <div className={styles.backgroundImage} aria-hidden>
        <Image
          src={bgSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div className={styles.backgroundOverlay} />
      <div className={styles.pageContent}>
        <LandingLocaleSwitcher />
        <div className={styles.container}>
        <motion.div
          className={styles.topBar}
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={fadeIn.transition(0)}
        >
          <div className={styles.brand}>
            <KlabLogo
              fullLogoTheme="dark"
              color="orange"
              format="full"
              height={96}
              className={styles.brandLogo}
            />
          </div>
        </motion.div>

        <motion.div
          className={styles.statusBar}
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={fadeIn.transition(0.15)}
        >
          <span className={styles.statusDot} aria-hidden />
          <span>{translations.statusBar}</span>
        </motion.div>

        <motion.h1
          className={styles.headline}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
          initial={skipAnimation ? "visible" : "hidden"}
          animate={isLoaded ? "visible" : "hidden"}
        >
          {headlineWords.map((word, index) => (
            <motion.span
              key={`${index}-${word}`}
              variants={wordVariants}
              className={styles.headlineWord}
            >
              {word}{" "}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className={styles.divider}
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={fadeIn.transition(0.5)}
        />

        <motion.p
          className={styles.subline}
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={fadeIn.transition(0.6)}
        >
          {translations.subline}
        </motion.p>

        <motion.div
          className={styles.ctaRow}
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={fadeIn.transition(0.75)}
        >
          <Button asChild variant="ghost" size="lg" className={styles.learnMoreButton}>
            <Link href="#products">
              <ArrowDown className={styles.mailIcon} />
              {translations.learnMore}
            </Link>
          </Button>
          <Button asChild variant="accent-brand" size="lg">
            <Link href="mailto:carolina@k-lab.ai">
              <MailIcon className={styles.mailIcon} />
              {translations.contactSales}
            </Link>
          </Button>
        </motion.div>
        </div>

        <div id="products" className={`${styles.container} ${styles.productsSection}`}>
        <div className={styles.productsSectionHeader}>
          <motion.h2
            className={styles.headline}
            initial={skipAnimation ? visible : hidden}
            whileInView={visible}
            viewport={viewport}
            transition={productsTransition(0.1)}
          >
            {translations.ourTechnologies}
          </motion.h2>

          <motion.div
            className={styles.divider}
            initial={skipAnimation ? visible : hidden}
            whileInView={visible}
            viewport={viewport}
            transition={productsTransition(0.25)}
          />

          <motion.p
            className={styles.subline}
            initial={skipAnimation ? visible : hidden}
            whileInView={visible}
            viewport={viewport}
            transition={productsTransition(0.35)}
          >
            {translations.technologiesSubline}
          </motion.p>
        </div>

        <motion.div
          className={styles.productsShowcaseWrap}
          initial={skipAnimation ? visible : hidden}
          whileInView={visible}
          viewport={viewport}
          transition={productsTransition(0.45)}
        >
          <LandingTechnologiesShowcase
            variant={variant}
            technologiesDescriptions={translations.technologies}
          />
        </motion.div>
        </div>
      </div>
    </main>
  );
}
