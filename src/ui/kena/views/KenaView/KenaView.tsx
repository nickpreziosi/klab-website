import KenaCardsSection from "@/ui/kena/components/kena-cards-section/kena-cards-section";
import Kena3dSection from "@/ui/kena/components/kena-3d-section/kena-3d-section";
import KenaHeroSection from "@/ui/kena/components/kena-hero-section/kena-hero-section";
import styles from "./KenaView.module.css";
import KenaCtaSection from "@/ui/kena/components/kena-cta-section/kena-cta-section";

export function KenaView() {
  return (
    <main className={styles.container}>
      <div className={styles.heroSection}>
        <KenaHeroSection />
      </div>
      <KenaCardsSection />
      <Kena3dSection />
      <KenaCtaSection />
    </main>
  );
}
