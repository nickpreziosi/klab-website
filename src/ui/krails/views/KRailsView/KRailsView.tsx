"use client";

import { useLocale } from "next-intl";
import KRailsHero from "@/ui/krails/components/krails-hero/krails-hero";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";
import styles from "./KRailsView.module.css";
import KRailsBuiltWith from "@/ui/krails/components/krails-built-with/krails-built-with";
import KRailsCta from "@/ui/krails/components/krails-cta/krails-cta";
import KRailsCodeSection from "@/ui/krails/components/krails-code-section/krails-code-section";
import KRailsWhy from "@/ui/krails/components/krails-why/krails-why";
import type { KRailsWhyTranslations } from "@/ui/krails/types/krails-why-translations";
import KRailsDashboard from "@/ui/krails/components/krails-dashboard/krails-dashboard";
import KRailsVideoPlayer from "@/ui/krails/components/krails-video-player/krails-video-player";

const KRAILS_VIDEO_FI = "https://www.youtube.com/embed/v6XF9PLVIAw";
const KRAILS_VIDEO_GOV = "https://www.youtube.com/embed/WFlJvmHsfPU";
const KRAILS_VIDEO_POSTER = "/images/krails.webp";

export interface KRailsTranslations extends KRailsWhyTranslations {
  heroHeading: string;
  heroHeadingHighlight: string;
  heroDescription: string;
  heroButtonPrimary: string;
  heroButtonSecondary: string;
  logoAlt: string;
  builtWithHeading: string;
  ctaSubheading: string;
  ctaButton: string;
  codeSectionHeadingLine1: string;
  codeSectionHeadingLine2: string;
  codeSectionHowCard0Title: string;
  codeSectionHowCard0Description: string;
  codeSectionHowCard1Title: string;
  codeSectionHowCard1Description: string;
  codeSectionHowCard2Title: string;
  codeSectionHowCard2Description: string;
  codeSectionHowCard3Title: string;
  codeSectionHowCard3Description: string;
  videoSectionTitle: string;
  videoPosterAlt: string;
  videoChoicePrompt: string;
  videoFiLabel: string;
  videoGovLabel: string;
  videoFiPlayAria: string;
  videoGovPlayAria: string;
}

export function KRailsView({ translations }: { translations: KRailsTranslations }) {
  const skipAnimation = useSkipAnimationOnLocaleSwitch();
  const locale = useLocale();
  return (
    <main className={styles.container}>
      <div className={styles.background}>
        <KRailsHero
          logoAlt={translations.logoAlt}
          heading={translations.heroHeading}
          headingHighlight={translations.heroHeadingHighlight}
          description={translations.heroDescription}
          buttonText={translations.heroButtonPrimary}
          buttonHref="#krails-video"
          buttonTwoText={translations.heroButtonSecondary}
          buttonTwoHref={`/${locale}/contact/sales`}
          skipAnimation={skipAnimation}
        />
        <div className={styles.dashboardWrapper}>
          <KRailsDashboard skipAnimation={skipAnimation} />
        </div>
        <section
          id="krails-video"
          className={styles.videoSection}
          aria-label={translations.videoSectionTitle}
        >
          <KRailsVideoPlayer
            fiVideoUrl={KRAILS_VIDEO_FI}
            govVideoUrl={KRAILS_VIDEO_GOV}
            posterUrl={KRAILS_VIDEO_POSTER}
            posterAlt={translations.videoPosterAlt}
            fiLabel={translations.videoFiLabel}
            govLabel={translations.videoGovLabel}
            fiPlayAria={translations.videoFiPlayAria}
            govPlayAria={translations.videoGovPlayAria}
            choicePrompt={translations.videoChoicePrompt}
            skipAnimation={skipAnimation}
          />
        </section>
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
