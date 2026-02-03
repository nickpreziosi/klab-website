"use client";
import { useEffect, useRef } from "react";
import styles from "./hero.module.css";
import "./hero.module.css";
import HeroText from "@/ui/shared/components/hero-text/hero-text";
import VideoPlayer from "@/ui/shared/components/video-player/video-player";
import { useTranslations } from "@/ui/shared/hooks/use-translations";
import { useLocale } from "@/ui/shared/providers/locale-context/locale-context";

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { t } = useTranslations();
  const { localePath } = useLocale();

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
            text={t("hero.title")}
            subtitle={t("hero.subtitle")}
            buttonText={t("hero.contactSales")}
            buttonHref={localePath("/contact/sales")}
          />
        </div>

        <VideoPlayer posterUrl="/keo-home-main2.jpg" videoUrl="/keo-home-main.mp4"></VideoPlayer>
      </div>
    </section>
  );
};
