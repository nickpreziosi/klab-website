"use client";

import KenaCardsSection from "@/ui/kena/components/kena-cards-section/kena-cards-section";
import Kena3dSection from "@/ui/kena/components/kena-3d-section/kena-3d-section";
import KenaHeroSection from "@/ui/kena/components/kena-hero-section/kena-hero-section";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";
import styles from "./KenaView.module.css";
import KenaCtaSection from "@/ui/kena/components/kena-cta-section/kena-cta-section";

export interface KenaTranslations {
  heroHeading: string;
  heroSecondHeading: string;
  heroSubtitle: string;
  twoColLeft: string;
  twoColRight: string;
  cardsHeading: string;
  cardsImageAlt: string;
  feature0Title: string;
  feature0Description: string;
  feature1Title: string;
  feature1Description: string;
  feature2Title: string;
  feature2Description: string;
  feature3Title: string;
  feature3Description: string;
  section3dHeading: string;
  step0Heading: string;
  step0Text: string;
  step1Heading: string;
  step1Text: string;
  step2Heading: string;
  step2Text: string;
  step3Heading: string;
  step3Text: string;
  step4Heading: string;
  step4Text: string;
  ctaHeading: string;
  ctaButton: string;
}

export function KenaView({ translations }: { translations: KenaTranslations }) {
  const skipAnimation = useSkipAnimationOnLocaleSwitch();
  return (
    <main className={styles.container}>
      <div className={styles.heroSection}>
        <KenaHeroSection translations={translations} skipAnimation={skipAnimation} />
      </div>
      <KenaCardsSection translations={translations} skipAnimation={skipAnimation} />
      <div className={styles.lastSection}>
        <Kena3dSection translations={translations} skipAnimation={skipAnimation} />
        <KenaCtaSection translations={translations} skipAnimation={skipAnimation} />
      </div>
    </main>
  );
}
