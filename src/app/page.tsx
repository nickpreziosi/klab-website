import styles from "./page.module.css";
import { Hero } from "./components/hero/hero";
import { DataSection } from "./components/dataSection/data-section";
import { NewsletterSection } from "./components/newsletterSection/newsletter-section";
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
