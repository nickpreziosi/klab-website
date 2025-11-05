"use client";
import { useEffect, useRef } from "react";
import styles from "./hero.module.css";
import "./hero.module.css";
import HeroText from "@/app/components/ui/hero-text/hero-text";
import VideoPlayer from "@/app/components/ui/video-player/video-player";

export const Hero = () => {
  // Reference to the video element
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
            maxWidth="600px"
            text="Empowering the Future of Financial Infrastructure"
            subtitle="KEO builds the technology that automates risk, payments, and financial operations — all in one intelligent platform."
            buttonText="Contact Sales"
            buttonHref="/contact/sales"
          />
        </div>

        <VideoPlayer
          posterUrl="/keo-home-main2.jpg"
          videoUrl="/keo-home-main.mp4"
        ></VideoPlayer>
      </div>
    </section>
  );
};
