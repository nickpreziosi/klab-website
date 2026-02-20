"use client";

import SectionHeader from "@/ui/shared/components/section-header/section-header";
import KenaTwoColumnContent from "../kena-two-column-content/kena-two-column-content";
import styles from "./kena-hero-section.module.css";
import VideoPlayer from "@/ui/shared/components/video-player/video-player";
import type { KenaTranslations } from "@/ui/kena/views/KenaView/KenaView";

export default function KenaHeroSection({
  translations,
  skipAnimation = false,
}: {
  translations: KenaTranslations;
  skipAnimation?: boolean;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <SectionHeader
            maxWidth={900}
            heading={translations.heroHeading}
            secondHeading={translations.heroSecondHeading}
            subtitle={translations.heroSubtitle}
            align="center"
            animateOnce={true}
            skipAnimation={skipAnimation}
          />
        </div>

        <VideoPlayer
          posterUrl="/images/kena.webp"
          videoUrl="/videos/kena.mp4"
          skipAnimation={skipAnimation}
        />

        <div className={styles.contentWrapper}>
          <KenaTwoColumnContent
            leftContent={translations.twoColLeft}
            rightContent={translations.twoColRight}
            skipAnimation={skipAnimation}
          />
        </div>
      </div>
    </section>
  );
}
