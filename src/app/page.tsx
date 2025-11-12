import styles from "./page.module.css";
import { Hero } from "@/app/components/home/hero/hero";
import VideoBackground from "@/app/components/home/video-background/video-background";
import HomeSecondarySection from "@/app/components/home/home-secondary-section/home-secondary-section";
import { LoadingProgressBar } from "./components/ui/loading-progress-bar/loading-progress-bar";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <LoadingProgressBar></LoadingProgressBar>
      </Suspense>
      <VideoBackground
        videoUrl="./keo-home-loop.mp4"
        posterUrl="/keo-home-poster.jpg"
      ></VideoBackground>
      <div className={styles.page}>
        <main className={styles.main}>
          <Hero></Hero>
          <HomeSecondarySection></HomeSecondarySection>
        </main>
      </div>
    </>
  );
}
