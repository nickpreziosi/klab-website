"use client";

import { Suspense } from "react";
import styles from "./HomeView.module.css";
import { Hero } from "@/ui/home/components/hero/hero";
import VideoBackground from "@/ui/home/components/video-background/video-background";
import HomeSecondarySection from "@/ui/home/components/home-secondary-section/home-secondary-section";
import { LoadingProgressBar } from "@/ui/shared/components/loading-progress-bar/loading-progress-bar";

export function HomeView() {
  return (
    <>
      <Suspense fallback={null}>
        <LoadingProgressBar />
      </Suspense>
      <VideoBackground videoUrl="./keo-home-loop.mp4" posterUrl="/keo-home-poster.jpg" />
      <div className={styles.page}>
        <main className={styles.main}>
          <Hero />
          <HomeSecondarySection />
        </main>
      </div>
    </>
  );
}
