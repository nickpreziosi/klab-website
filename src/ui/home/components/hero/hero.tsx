"use client";

import HeroText from "@/ui/shared/components/hero-text/hero-text";
import { useTranslations } from "next-intl";
import type { HeroTranslations } from "@/ui/home/types";
import { buildHeroTranslations } from "@/ui/home/types";
import styles from "./hero.module.css";
import "./hero.module.css";
import { Mail } from "lucide-react";

type HeroProps = {
  /** When provided (from server), copy is SSR'd; otherwise use client useTranslations */
  translations?: HeroTranslations;
  /** When true, skip entrance animations (e.g. locale switch). */
  skipAnimation?: boolean;
};

export const Hero = ({
  translations: serverTranslations,
  skipAnimation = false,
}: HeroProps = {}) => {
  const t = useTranslations("hero");
  const translations: HeroTranslations = serverTranslations ?? buildHeroTranslations(t);

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.mainContainer}>
          <HeroText
            maxWidth="820px"
            text={translations.title}
            subtitle={translations.subtitle}
            buttonText={translations.seeKRailsInAction}
            buttonHref="/technologies/krails"
            buttonTwoText={translations.contactSales}
            buttonTwoHref="/contact/sales"
            buttonTwoIcon={<Mail style={{ width: "20px", height: "20px" }} aria-hidden />}
            buttonTwoIconPosition="start"
            buttonOrder="primary-first"
            buttonIconPosition="end"
            skipAnimation={skipAnimation}
            deferEntranceUntilLoadingProgress
          />
        </div>
      </div>
    </section>
  );
};
