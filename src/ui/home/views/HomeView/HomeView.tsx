"use client";

import type { HeroTranslations } from "@/ui/home/types";
import type { KRailsWhyTranslations } from "@/ui/krails/types/krails-why-translations";
import { Hero } from "@/ui/home/components/hero/hero";
import KRailsWhy from "@/ui/krails/components/krails-why/krails-why";
import VideoBackground from "@/ui/home/components/video-background/video-background";
import HomeSecondarySection from "@/ui/home/components/home-secondary-section/home-secondary-section";
import FaqSection from "@/ui/home/components/faq-section/faq-section";
import { LoadingProgressBar } from "@/ui/shared/components/loading-progress-bar/loading-progress-bar";
import { useHomeAnimation } from "@/ui/home/providers/home-animation-provider";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import styles from "./HomeView.module.css";

const BACKGROUND_VIDEO = "/videos/klab-hero-loop.mp4";
const BACKGROUND_POSTER = "/images/bg-logo-zoom-right.webp";

type HomeViewProps = {
  /** When provided (from server), hero copy is SSR'd */
  heroTranslations?: HeroTranslations;
  /** K Rails use-cases section (replaces former phone promo). */
  krailsWhyTranslations: KRailsWhyTranslations;
};

export function HomeView({ heroTranslations, krailsWhyTranslations }: HomeViewProps) {
  const locale = useLocale() as Locale;
  const homeAnimation = useHomeAnimation();
  const skipFromLocaleSwitch = useSkipAnimationOnLocaleSwitch();
  const skipAnimation = skipFromLocaleSwitch || (homeAnimation?.hasAnimated ?? false);
  /** Hero must not treat `hasAnimated` as “skip” until the first entrance has run after the loading bar. */
  const heroSkipAnimation =
    skipFromLocaleSwitch ||
    ((homeAnimation?.hasAnimated && homeAnimation?.homeHeroEntranceCompleted) ?? false);

  return (
    <>
      {/* Outside Suspense so the boundary resolving does not remount the loader and replay the 1s animation */}
      <LoadingProgressBar />
      <VideoBackground
        videoUrl={BACKGROUND_VIDEO}
        posterUrl={BACKGROUND_POSTER}
        skipAnimation={skipAnimation}
      />
      <div className={styles.page}>
        <main className={styles.main}>
          <Hero translations={heroTranslations} skipAnimation={heroSkipAnimation} />
          <KRailsWhy
            sectionId="use-cases"
            translations={krailsWhyTranslations}
            skipAnimation={skipFromLocaleSwitch}
            useCaseCtaHref={(index) =>
              index === 0
                ? `/${locale}/technologies/krails#krails-video`
                : `/${locale}/contact/sales`
            }
          />
          <HomeSecondarySection skipAnimation={skipFromLocaleSwitch} />
        </main>
      </div>
    </>
  );
}
