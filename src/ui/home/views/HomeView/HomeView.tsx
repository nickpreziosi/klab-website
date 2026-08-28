"use client";

import type { HeroTranslations, HomeKrailsTranslations } from "@/ui/home/types";
import { Hero } from "@/ui/home/components/hero/hero";
import { ProductCarousel } from "@/ui/home/components/product-carousel/product-carousel";
import { WhatIsKrails } from "@/ui/home/components/what-is-krails/what-is-krails";
import { ReplaceSystems } from "@/ui/home/components/replace-systems/replace-systems";
import VideoBackground from "@/ui/home/components/video-background/video-background";
import HomeSecondarySection from "@/ui/home/components/home-secondary-section/home-secondary-section";
import { LoadingProgressBar } from "@/ui/shared/components/loading-progress-bar/loading-progress-bar";
import { useHomeAnimation } from "@/ui/home/providers/home-animation-provider";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";
import styles from "./HomeView.module.css";

const BACKGROUND_VIDEO = "/videos/klab-hero-loop.mp4";
const BACKGROUND_POSTER = "/images/bg-logo-zoom-right.webp";

type HomeViewProps = {
  /** When provided (from server), hero copy is SSR'd */
  heroTranslations?: HeroTranslations;
  homeKrailsTranslations: HomeKrailsTranslations;
};

export function HomeView({ heroTranslations, homeKrailsTranslations }: HomeViewProps) {
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
          <ProductCarousel skipAnimation={skipFromLocaleSwitch} />
          <WhatIsKrails
            translations={homeKrailsTranslations}
            skipAnimation={skipFromLocaleSwitch}
          />
          <ReplaceSystems
            translations={homeKrailsTranslations}
            skipAnimation={skipFromLocaleSwitch}
          />
          <HomeSecondarySection skipAnimation={skipFromLocaleSwitch} />
        </main>
      </div>
    </>
  );
}
