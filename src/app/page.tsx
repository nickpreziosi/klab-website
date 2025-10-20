import styles from "./page.module.css";
import { Logo } from "./components/logo/logo";
import { NavigationMenuDemo } from "./components/navbar/navbar";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <NavigationMenuDemo></NavigationMenuDemo>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "200px",
          }}
        >
          <Logo size="xl" animated="constant" />
        </div>
      </main>
    </div>
  );
}
