"use client";
import { useEffect, useRef } from "react";
import styles from "./hero.module.css";
import "./hero.module.css";
import { LoadingProgressBar } from "../loadingProgressBar/loading-progress-bar";

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
      <LoadingProgressBar></LoadingProgressBar>

      <video
        ref={videoRef}
        autoPlay={true}
        loop={true}
        muted={true}
        className={styles.backgroundVideo}
        src="https://www.pexels.com/download/video/34268861/"
      ></video>

      <div className={styles.content}>
        <div className={styles.overlay} aria-hidden></div>
        <div className={styles.mainContainer}>
          <div className={styles.mainTextContainer}>
            <h1 className={styles.mainHeading}>We Pay. You Grow.</h1>
            <p className={styles.mainText}>
              B2B digital payment and inventory financing solutions that
              streamline financial transactions between buyers and suppliers.
            </p>
          </div>
        </div>
        <iframe
          className={styles.videoEmbed}
          src="https://www.youtube.com/embed/Ivd6J240bNs?si=pyT7u2GxKWe1Izey"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};
