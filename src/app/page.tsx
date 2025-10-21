import styles from "./page.module.css";
import { Logo } from "./components/logo/logo";
import { NavigationMenuDemo } from "./components/navbar/navbar";
import { Hero } from "./components/hero/hero";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <NavigationMenuDemo></NavigationMenuDemo>
        <Hero></Hero>
      </main>
    </div>
  );
}
