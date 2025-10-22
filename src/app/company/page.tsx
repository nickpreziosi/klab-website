import styles from "./page.module.css";
import { NavigationMenuDemo } from "../components/navbar/navbar";
import { NewsletterSection } from "../components/newsletterSection/newsletter-section";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <NavigationMenuDemo></NavigationMenuDemo>

        <NewsletterSection></NewsletterSection>
      </main>
    </div>
  );
}
