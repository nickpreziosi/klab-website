import KenaCardsSection from "@/app/components/kenaCardsSection/kena-cards-section";
import Kena3dSection from "../../components/kena3dSection/kena-3d-section";
import KenaHeroSection from "../../components/kenaHeroSection/kena-hero-section";
import styles from "./page.module.css";
import KenaCtaSection from "@/app/components/kenaCtaSection/kena-cta-section";

export default function KenaAIPage() {
  return (
    <main className={styles.container}>
      <KenaHeroSection />
      <KenaCardsSection></KenaCardsSection>
      <Kena3dSection></Kena3dSection>
      <KenaCtaSection></KenaCtaSection>
    </main>
  );
}
