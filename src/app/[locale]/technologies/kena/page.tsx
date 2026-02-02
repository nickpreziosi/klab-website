import KenaCardsSection from "@/app/components/kena/kena-cards-section/kena-cards-section";
import Kena3dSection from "@/app/components/kena/kena-3d-section/kena-3d-section";
import KenaHeroSection from "@/app/components/kena/kena-hero-section/kena-hero-section";
import styles from "./page.module.css";
import KenaCtaSection from "@/app/components/kena/kena-cta-section/kena-cta-section";
import KenaPassword from "@/app/components/kena/kena-password/kena-password";

export default function KenaAIPage() {
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
