import KenaCardsSection from "../../components/kena/kena-cards-section/kena-cards-section";
import Kena3dSection from "../../components/kena/kena-3d-section/kena-3d-section";
import KenaHeroSection from "../../components/kena/kena-hero-section/kena-hero-section";
import styles from "./page.module.css";
import KenaCtaSection from "../../components/kena/kena-cta-section/kena-cta-section";
import KenaPassword from "../../components/kena/kena-password/kena-password";

export default function KenaAIPage() {
  return (
    <main className={styles.container}>
      <KenaHeroSection />

      <KenaPassword>
        <KenaCardsSection />
        <Kena3dSection />
        <KenaCtaSection />
      </KenaPassword>
    </main>
  );
}
