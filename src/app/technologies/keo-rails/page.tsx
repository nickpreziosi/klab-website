import KeoCardsSection from "@/app/components/keoCardsSection/keo-cards-section";
import KeoRailsHero from "../../components/keoRailsHero/keo-rails-hero";
import styles from "./page.module.css";
import VideoPlayer from "@/app/components/VideoPlayer/video-player";
import KeoRailsBuiltWithSection from "@/app/components/keoRailsBuiltWithSection/keo-rails-built-with-section";
import KeoRailsCtaSection from "@/app/components/keoRailsCtaSection/keo-rails-cta-section";
import KeoRailsDemo from "@/app/components/keoRailsDemo/keo-rails-demo";
import KeoRailsCodeSection from "@/app/components/keoRailsCodeSection/keo-rails-code-section";
import KeoRailsCaseStudy from "@/app/components/keoRailsCaseStudy/keo-rails-case-study";

export default function KeoRailsPage() {
  return (
    <main className={styles.container}>
      <KeoRailsHero
        heading='THE AGE OF "WAIT" IS OVER.'
        subheading="B2B Blockchain-Based Payments and Lending Infrastructure with Near Instant Settlements "
        description="Keo Rails is an embedded payment and lending solution which combines immediate funds availability, settlement finality and instant confirmation - all in a payment made near instantaneously. Bringing together speed, data and communication for execution of payments."
        buttonText="Start my T+0 flow"
        buttonHref="/contact/sales"
        buttonTwoText="Learn More"
        buttonTwoHref="#video"
      >
        {/* You can insert custom HTML, iframe, or other content here */}
        {/* For now, it will use the placeholder content */}
      </KeoRailsHero>
      <div className={styles.videoSection} id="video">
        <VideoPlayer
          posterUrl="/keo-rails1.jpg"
          videoUrl="/keo-rails.mp4"
        ></VideoPlayer>
      </div>

      <KeoRailsCodeSection></KeoRailsCodeSection>
      <KeoRailsDemo></KeoRailsDemo>
      <KeoRailsBuiltWithSection></KeoRailsBuiltWithSection>

      <KeoRailsCaseStudy></KeoRailsCaseStudy>

      <KeoRailsCtaSection></KeoRailsCtaSection>
    </main>
  );
}
