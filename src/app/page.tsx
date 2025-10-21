import styles from "./page.module.css";
import { NavigationMenuDemo } from "./components/navbar/navbar";
import { Hero } from "./components/hero/hero";
import { DataSection } from "./components/dataSection/data-section";
import { NewsletterSection } from "./components/newsletterSection/newsletter-section";
import { LoadingProgressBar } from "./components/loadingProgressBar/loading-progress-bar";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <NavigationMenuDemo></NavigationMenuDemo>
        <Hero></Hero>

        <DataSection></DataSection>
        <NewsletterSection></NewsletterSection>
      </main>
    </div>
  );
}
