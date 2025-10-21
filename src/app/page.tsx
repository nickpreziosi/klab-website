import styles from "./page.module.css";
import { NavigationMenuDemo } from "./components/navbar/navbar";
import { Hero } from "./components/hero/hero";
import { DataSection } from "./components/dataSection/data-section";
import { CtaSection } from "./components/ctaSection/cta-section";
import { NewsletterSection } from "./components/newsletterSection/newsletter-section";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <NavigationMenuDemo></NavigationMenuDemo>
        <Hero></Hero>
        <CtaSection></CtaSection>
        <DataSection></DataSection>
        <NewsletterSection></NewsletterSection>
      </main>
    </div>
  );
}
