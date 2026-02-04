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
};

export const Hero = ({ translations: serverTranslations }: HeroProps = {}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const t = useTranslations("hero");
  const translations = serverTranslations ?? buildHeroTranslations(t);

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
          />
        </div>

        <VideoPlayer posterUrl="/keo-home-main2.jpg" videoUrl="/keo-home-main.mp4"></VideoPlayer>
      </div>
    </section>
  );
};
