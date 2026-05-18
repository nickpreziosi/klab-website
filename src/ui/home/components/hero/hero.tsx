"use client";

import HeroText from "@/ui/shared/components/hero-text/hero-text";
import heroTextStyles from "@/ui/shared/components/hero-text/hero-text.module.css";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { HeroTranslations } from "@/ui/home/types";
import { buildHeroTranslations } from "@/ui/home/types";
import styles from "./hero.module.css";
import "./hero.module.css";
import { Lock, Mail, Search, Wrench } from "lucide-react";

const HIGHLIGHT_ICON_SIZE = 32;

const HIGHLIGHT_ICONS = [
  <Wrench key="wrench" size={HIGHLIGHT_ICON_SIZE} strokeWidth={2.25} aria-hidden />,
  <Lock key="lock" size={HIGHLIGHT_ICON_SIZE} strokeWidth={2.25} aria-hidden />,
  <Search key="search" size={HIGHLIGHT_ICON_SIZE} strokeWidth={2.25} aria-hidden />,
] as const;

const HERO_TEXT_MAX_WIDTH: Record<Locale, string> = {
  en: "860px",
  ar: "860px",
  es: "1040px",
  pt: "1040px",
};

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
  const locale = useLocale() as Locale;
  const t = useTranslations("hero");
  const translations: HeroTranslations = serverTranslations ?? buildHeroTranslations(t);

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.mainContainer}>
          <HeroText
            className={heroTextStyles.homeHero}
            maxWidth={HERO_TEXT_MAX_WIDTH[locale]}
            text={translations.title}
            highlightPhrase={translations.titleHighlight}
            subtitle={translations.subtitleIntro}
            subtitleHighlights={translations.subtitleHighlights.map((text, index) => ({
              text,
              icon: HIGHLIGHT_ICONS[index],
            }))}
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
