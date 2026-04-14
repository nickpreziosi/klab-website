"use client";

import { useEffect, useRef } from "react";
import HeroText from "@/ui/shared/components/hero-text/hero-text";
import VideoPlayer from "@/ui/shared/components/video-player/video-player";
import { useTranslations } from "next-intl";
import type { HeroTranslations } from "@/ui/home/types";
import { buildHeroTranslations } from "@/ui/home/types";
import styles from "./hero.module.css";
import "./hero.module.css";

type HeroProps = {
  /** When provided (from server), copy is SSR'd; otherwise use client useTranslations */
  translations?: HeroTranslations;
  /** When true, skip entrance animations (e.g. locale switch). */
  skipAnimation?: boolean;
};

export const Hero = ({
  translations: serverTranslations,
  skipAnimation = false,
}: HeroProps = {}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const translations: HeroTranslations =
    serverTranslations ??
    {
      ...buildHeroTranslations(t),
      learnMore: tCommon("learnMore"),
    };

  // Pause video when not visible to save resources
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        videoRef.current?.pause();
      } else {
        videoRef.current?.play();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.mainContainer}>
          <HeroText
            maxWidth="680px"
            text={translations.title}
            subtitle={translations.subtitle}
            buttonText={translations.contactSales}
            buttonHref="/contact/sales"
            buttonTwoText={translations.learnMore}
            buttonTwoHref="#home-promo"
            skipAnimation={skipAnimation}
            deferEntranceUntilLoadingProgress
          />
        </div>
      </div>
    </section>
  );
};
