"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/ui/shared/constants/blur-placeholder";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { CompanyHeroTranslations } from "@/ui/company/types";
import { buildCompanyHeroTranslations } from "@/ui/company/types";
import { KlabLogo } from "@/ui/shared/components/klab-logo/klab-logo";
import styles from "./company-hero.module.css";

const fadeUp = {
  initial: { opacity: 0, y: 20, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const stagger = 0.15;
const duration = 0.6;
const ease = [0.22, 1, 0.36, 1] as const;

/** Logo height by viewport: desktop 120, tablet 96, mobile 72, small 56 */
function useHeroLogoHeight(): number {
  const [height, setHeight] = useState(120);

  useEffect(() => {
    const mq1024 = window.matchMedia("(max-width: 1024px)");
    const mq768 = window.matchMedia("(max-width: 768px)");
    const mq480 = window.matchMedia("(max-width: 480px)");

    const update = () => {
      if (mq480.matches) setHeight(56);
      else if (mq768.matches) setHeight(72);
      else if (mq1024.matches) setHeight(96);
      else setHeight(120);
    };

    update();
    mq480.addEventListener("change", update);
    mq768.addEventListener("change", update);
    mq1024.addEventListener("change", update);
    return () => {
      mq480.removeEventListener("change", update);
      mq768.removeEventListener("change", update);
      mq1024.removeEventListener("change", update);
    };
  }, []);

  return height;
}

const visible = { opacity: 1, y: 0, filter: "blur(0px)" };
const visibleScale = { opacity: 1, scale: 1, filter: "blur(0px)" };

type CompanyHeroProps = {
  /** When provided (from server), copy is SSR'd; otherwise use client useTranslations */
  translations?: CompanyHeroTranslations;
  /** When true, skip entrance animations (e.g. locale switch). */
  skipAnimation?: boolean;
};

export const CompanyHero = ({
  translations: serverTranslations,
  skipAnimation = false,
}: CompanyHeroProps = {}) => {
  const logoHeight = useHeroLogoHeight();
  const t = useTranslations("companyHero");
  const translations = serverTranslations ?? buildCompanyHeroTranslations(t);
  const initial = skipAnimation ? visible : fadeUp.initial;
  const animate = skipAnimation ? visible : fadeUp.animate;
  const logoInitial = skipAnimation
    ? visibleScale
    : { opacity: 0, scale: 0.92, filter: "blur(10px)" };
  const logoAnimate = skipAnimation ? visibleScale : { opacity: 1, scale: 1, filter: "blur(0px)" };

  return (
    <section className={styles.content}>
      <div className={styles.hero}>
        <Image
          priority
          className={styles.heroImage}
          width={1200}
          height={1405}
          alt={t("employeeImageAlt")}
          src="/images/bg-logo-right.webp"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
        <div className={styles.heroText}>
          <div className={styles.heroHeaderContainer}>
            <div className={styles.heroLogo}>
              <motion.div
                className={styles.heroLogoInner}
                initial={logoInitial}
                animate={logoAnimate}
                transition={{ duration, delay: stagger, ease }}
              >
                <KlabLogo color="light" format="default" height={logoHeight} />
              </motion.div>
            </div>
            <motion.h1
              className={styles.heroHeader}
              initial={initial}
              animate={animate}
              transition={{ duration, ease }}
            >
              {translations.headlineLine1}
              <br />
              {translations.headlineLine2}
            </motion.h1>
          </div>

          <div className={styles.heroTaglinesContainer}>
            <motion.p
              className={styles.heroSubhead}
              initial={initial}
              animate={animate}
              transition={{ duration, delay: stagger * 2, ease }}
            >
              {translations.subhead}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};
