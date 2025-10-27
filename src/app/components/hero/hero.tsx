"use client";
import { useEffect, useRef } from "react";
import styles from "./hero.module.css";
import "./hero.module.css";
import { LoadingProgressBar } from "../loadingProgressBar/loading-progress-bar";
import Link from "next/link";
import HeroText from "../heroText/hero-text";
import SectionHeader from "../sectionHeader/section-header";
import HomeSecondarySection from "../homeSecondarySection/home-secondary-section";
import VideoPlayer from "../VideoPlayer/video-player";

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
            text="Empowering the Future of Financial Infrastructure"
            subtitle="KEO builds the technology that automates risk, payments, and financial operations — all in one intelligent platform."
            buttonText="Get Started"
            buttonHref="/contact/sales"
          />
        </div>

        <VideoPlayer
          posterUrl="/kena-video.jpg"
          videoUrl="https://player.vimeo.com/video/1119375393?badge=0&amp;autoplay=1&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        ></VideoPlayer>

        <div className={styles.secondaryContainer}>
          <HomeSecondarySection></HomeSecondarySection>

          <div></div>
        </div>
      </div>
    </section>
  );
};
