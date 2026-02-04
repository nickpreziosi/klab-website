import { Suspense } from "react";
import type { HeroTranslations } from "@/ui/home/types";
import { Hero } from "@/ui/home/components/hero/hero";
import VideoBackground from "@/ui/home/components/video-background/video-background";
import HomeSecondarySection from "@/ui/home/components/home-secondary-section/home-secondary-section";
import { LoadingProgressBar } from "@/ui/shared/components/loading-progress-bar/loading-progress-bar";
import styles from "./HomeView.module.css";

type HomeViewProps = {
  /** When provided (from server), hero copy is SSR'd */
  heroTranslations?: HeroTranslations;
};

export function HomeView({ heroTranslations }: HomeViewProps = {}) {
  return (
    <>
      <Suspense fallback={null}>
        <LoadingProgressBar />
      </Suspense>
      <VideoBackground videoUrl="./keo-home-loop.mp4" posterUrl="/keo-home-poster.jpg" />
      <div className={styles.page}>
        <main className={styles.main}>
          <Hero translations={heroTranslations} />
          <HomeSecondarySection />
        </main>
      </div>
    </>
  );
}
