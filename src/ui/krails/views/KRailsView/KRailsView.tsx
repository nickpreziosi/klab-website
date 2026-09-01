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
import {
  KRailsReplaceSystems,
  type KRailsReplaceSystemsTranslations,
} from "@/ui/krails/components/krails-replace-systems/krails-replace-systems";

const KRAILS_VIDEO_POSTER = "/images/krails.webp";

const KRAILS_VIDEO_FI_BY_LOCALE: Record<string, string> = {
  en: "https://www.youtube.com/embed/v2lB2bFP3Cg",
  pt: "https://www.youtube.com/embed/svpMk7kt3gA",
  es: "https://www.youtube.com/embed/ZmvqN8hJGWI",
  ar: "https://www.youtube.com/embed/v2lB2bFP3Cg",
};

const KRAILS_VIDEO_GOV_BY_LOCALE: Record<string, string> = {
  en: "https://www.youtube.com/embed/GlwpGm72TK4",
  pt: "https://www.youtube.com/embed/y_aROIpQ6XE",
  es: "https://www.youtube.com/embed/ucO_EEX_nhc",
  ar: "https://www.youtube.com/embed/GlwpGm72TK4",
};

export interface KRailsTranslations extends KRailsWhyTranslations, KRailsReplaceSystemsTranslations {
  heroHeadingPrefix: string;
  heroHeadingQuestionMark: string;
  heroDescription1: string;
  heroDescription2: string;
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
  const fiVideoUrl = KRAILS_VIDEO_FI_BY_LOCALE[locale] ?? KRAILS_VIDEO_FI_BY_LOCALE.en;
  const govVideoUrl = KRAILS_VIDEO_GOV_BY_LOCALE[locale] ?? KRAILS_VIDEO_GOV_BY_LOCALE.en;
  return (
    <main className={styles.container}>
      <div className={styles.background}>
        <KRailsHero
          headingPrefix={translations.heroHeadingPrefix}
          headingQuestionMark={translations.heroHeadingQuestionMark}
          description1={translations.heroDescription1}
          description2={translations.heroDescription2}
          skipAnimation={skipAnimation}
        />
        <div className={styles.dashboardWrapper}>
          <KRailsDashboard skipAnimation={skipAnimation} />
        </div>
        <KRailsReplaceSystems translations={translations} skipAnimation={skipAnimation} />
        <section
          id="krails-video"
          className={styles.videoSection}
          aria-label={translations.videoSectionTitle}
        >
          <KRailsVideoPlayer
            fiVideoUrl={fiVideoUrl}
            govVideoUrl={govVideoUrl}
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
