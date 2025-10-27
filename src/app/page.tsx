import styles from "./page.module.css";
import { Hero } from "./components/hero/hero";
import VideoBackground from "./components/videoBackground/video-background";

export default function Home() {
  return (
    <>
      <VideoBackground></VideoBackground>
      <div className={styles.page}>
        <main className={styles.main}>
          <Hero></Hero>
        </main>
      </div>
    </>
  );
}
