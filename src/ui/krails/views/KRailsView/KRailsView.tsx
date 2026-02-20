"use client";

import KRailsHero from "@/ui/krails/components/krails-hero/krails-hero";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";
import styles from "./KRailsView.module.css";
import KRailsBuiltWith from "@/ui/krails/components/krails-built-with/krails-built-with";
import KRailsCta from "@/ui/krails/components/krails-cta/krails-cta";
import KRailsCodeSection from "@/ui/krails/components/krails-code-section/krails-code-section";
import KRailsWhy from "@/ui/krails/components/krails-why/krails-why";
import KRailsDashboard from "@/ui/krails/components/krails-dashboard/krails-dashboard";

export interface KRailsTranslations {
  heroHeading: string;
  heroSubheading: string;
  heroDescription: string;
  heroButtonPrimary: string;
  heroButtonSecondary: string;
  whyHeading: string;
  whySubheading: string;
  whyBlock0Heading: string;
  whyBlock0Description: string;
  whyBlock1Heading: string;
  whyBlock1Description: string;
  whyBlock2Heading: string;
  whyBlock2Description: string;
  whyBlock3Heading: string;
  whyBlock3Description: string;
  whyCtaButton: string;
  builtWithHeading: string;
  ctaHeading: string;
  ctaSubheading: string;
  ctaHighlight: string;
  ctaButton: string;
  codeSectionHeadingLine1: string;
  codeSectionHeadingLine2: string;
  codeSectionCardTrustTitle: string;
  codeSectionCardTrustDescription: string;
  codeSectionCardCertaintyTitle: string;
  codeSectionCardCertaintyDescription: string;
}

export function KRailsView({ translations }: { translations: KRailsTranslations }) {
  const skipAnimation = useSkipAnimationOnLocaleSwitch();
  return (
    <main className={styles.container}>
      <div className={styles.background}>
        <KRailsHero
          heading={translations.heroHeading}
          subheading={translations.heroSubheading}
          description={translations.heroDescription}
          buttonText={translations.heroButtonPrimary}
          buttonHref="/contact/sales"
          buttonTwoText={translations.heroButtonSecondary}
          buttonTwoHref="#code"
          skipAnimation={skipAnimation}
        />
        <KRailsDashboard />
        <KRailsCodeSection translations={translations} skipAnimation={skipAnimation} />
      </div>

      <KRailsWhy translations={translations} skipAnimation={skipAnimation} />
      <div className={styles.lastSection}>
        <KRailsBuiltWith translations={translations} skipAnimation={skipAnimation} />
        <KRailsCta translations={translations} skipAnimation={skipAnimation} />
      </div>
    </main>
  );
}
