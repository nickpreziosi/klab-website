"use client";

import SectionHeader from "@/ui/shared/components/section-header/section-header";
import KenaTwoColumnContent from "../kena-two-column-content/kena-two-column-content";
import { KenaGateSection } from "../kena-gate-section/kena-gate-section";
import styles from "./kena-hero-section.module.css";
import VideoPlayer from "@/ui/shared/components/video-player/video-player";
import type { KenaTranslations } from "@/ui/kena/views/KenaView/KenaView";

export default function KenaHeroSection({
  translations,
  skipAnimation = false,
  unlocked = true,
  passwordGateMessage,
  passwordGateButton,
  onEnterPassword,
}: {
  translations: KenaTranslations;
  skipAnimation?: boolean;
  unlocked?: boolean;
  passwordGateMessage?: string;
  passwordGateButton?: string;
  onEnterPassword?: () => void;
}) {
  const showGate = !unlocked && passwordGateMessage && passwordGateButton && onEnterPassword;

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
          videoUrl="https://www.youtube-nocookie.com/embed/_9nh42oQJ9U?si=M9vOYBXc6dUnwIW1"
          skipAnimation={skipAnimation}
        />

        <div className={styles.contentWrapper}>
          {showGate ? (
            <KenaGateSection
              message={passwordGateMessage}
              buttonLabel={passwordGateButton}
              onEnterPassword={onEnterPassword}
            />
          ) : (
            <KenaTwoColumnContent
              leftContent={translations.twoColLeft}
              rightContent={translations.twoColRight}
              skipAnimation={skipAnimation}
            />
          )}
        </div>
      </div>
    </section>
  );
}
