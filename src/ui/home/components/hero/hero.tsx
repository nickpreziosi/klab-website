"use client";

import HeroText from "@/ui/shared/components/hero-text/hero-text";
import { useTranslations } from "next-intl";
import type { HeroTranslations } from "@/ui/home/types";
import { buildHeroTranslations } from "@/ui/home/types";
import styles from "./hero.module.css";
import "./hero.module.css";
import { ArrowRightIcon, Mail } from "lucide-react";

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
            buttonText={translations.contactSales}
            buttonHref="/contact/sales"
            buttonIcon={<Mail style={{ width: "20px", height: "20px" }} aria-hidden />}
            buttonTwoIcon={<ArrowRightIcon style={{ width: "20px", height: "20px" }} aria-hidden />}
            buttonTwoText={translations.seeKRailsInAction}
            buttonTwoHref="/technologies/krails"
            buttonIconPosition="start"
            buttonTwoIconPosition="end"
            buttonTwoIconMirrorRtl
            skipAnimation={skipAnimation}
            deferEntranceUntilLoadingProgress
          />
        </div>
      </div>
    </section>
  );
};
