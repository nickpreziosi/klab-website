import styles from "./page.module.css";
import { Hero } from "./components/hero/hero";
import { DataSection } from "./components/dataSection/data-section";
import { NewsletterSection } from "./components/newsletterSection/newsletter-section";

export default function Home() {
  return (
    <>
      <div className={styles.backgroundVideo}>
        <div className={styles.videoEmbedObjectFitCover}>
          <iframe
            width="100%"
            height="auto"
            frameBorder="0"
            src="https://player.vimeo.com/video/1119375393?autoplay=1&loop=1&autopause=0&background=1&badge=0&player_id=0&app_id=58479"
            allow="autoplay; encrypted-media"
            title="Vimeo video player"
          ></iframe>
        </div>
      </div>
      <div className={styles.page}>
        <main className={styles.main}>
          <Hero></Hero>
          <DataSection></DataSection>
          <NewsletterSection></NewsletterSection>
        </main>
      </div>
    </>
  );
}
