"use client";

import { useLocale } from "next-intl";
import KRailsHero from "@/ui/krails/components/krails-hero/krails-hero";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";
import styles from "./KRailsView.module.css";
import KRailsDashboard from "@/ui/krails/components/krails-dashboard/krails-dashboard";
import KRailsVideoPlayer from "@/ui/krails/components/krails-video-player/krails-video-player";
import {
  KRailsReplaceSystems,
  type KRailsReplaceSystemsTranslations,
} from "@/ui/krails/components/krails-replace-systems/krails-replace-systems";
import {
  KRailsInvoiceRebate,
  type KRailsInvoiceRebateTranslations,
} from "@/ui/krails/components/krails-invoice-rebate/krails-invoice-rebate";
import {
  KRailsCapabilities,
  type KRailsCapabilitiesTranslations,
} from "@/ui/krails/components/krails-capabilities/krails-capabilities";
import {
  WhoWeServe,
  type WhoWeServeTranslations,
} from "@/ui/home/components/who-we-serve/who-we-serve";

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

export interface KRailsTranslations
  extends KRailsReplaceSystemsTranslations,
    KRailsInvoiceRebateTranslations,
    KRailsCapabilitiesTranslations,
    WhoWeServeTranslations {
  heroHeadingPrefix: string;
  heroHeadingQuestionMark: string;
  heroDescription1: string;
  heroDescription2: string;
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
        <KRailsInvoiceRebate translations={translations} skipAnimation={skipAnimation} />
        <KRailsCapabilities translations={translations} skipAnimation={skipAnimation} />
        <div className={styles.whoWeServe}>
          <WhoWeServe translations={translations} skipAnimation={skipAnimation} />
        </div>
      </div>
    </main>
  );
}
