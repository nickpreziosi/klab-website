import styles from "./page.module.css";
import { Hero } from "./components/hero/hero";
import VideoBackground from "./components/videoBackground/video-background";
import HomeSecondarySection from "./components/homeSecondarySection/home-secondary-section";

export default function Home() {
  return (
    <>
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
