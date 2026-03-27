"use client";

import { useTranslations } from "next-intl";
import VideoPlayer from "@/ui/shared/components/video-player/video-player";
import styles from "./home-phone-promo-section.module.css";

const VIDEO = "/videos/klab-promo.mp4";
const POSTER = "/images/klab-promo.webp";

type HomePhonePromoSectionProps = {
  skipAnimation?: boolean;
};

export function HomePhonePromoSection({ skipAnimation = false }: HomePhonePromoSectionProps) {
  const t = useTranslations("hero");

  return (
    <section
      id="home-promo"
      className={styles.section}
      aria-label={t("promoVideoSectionLabel")}
    >
      <div className={styles.inner}>
        <VideoPlayer
          videoUrl={VIDEO}
          posterUrl={POSTER}
          skipAnimation={skipAnimation}
          variant="phone"
          posterAlt={t("promoVideoPosterAlt")}
        />
      </div>
    </section>
  );
}
