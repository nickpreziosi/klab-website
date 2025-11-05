import KeoRailsHero from "@/app/components/keo-rails/keo-rails-hero/keo-rails-hero";
import styles from "./page.module.css";
import VideoPlayer from "@/app/components/ui/video-player/video-player";
import KeoRailsBuiltWithSection from "@/app/components/keo-rails/keo-rails-built-with-section/keo-rails-built-with-section";
import KeoRailsCtaSection from "@/app/components/keo-rails/keo-rails-cta-section/keo-rails-cta-section";
import KeoRailsCodeSection from "@/app/components/keo-rails/keo-rails-code-section/keo-rails-code-section";
import KeoRailsCaseStudy from "@/app/components/keo-rails/keo-rails-case-study/keo-rails-case-study";
import KeoRailsGridSection from "@/app/components/keo-rails/keo-rails-grid-section/keo-rails-grid-section";

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
      <KeoRailsGridSection></KeoRailsGridSection>
      <KeoRailsBuiltWithSection></KeoRailsBuiltWithSection>

      <KeoRailsCaseStudy></KeoRailsCaseStudy>

      <KeoRailsCtaSection></KeoRailsCtaSection>
    </main>
  );
}
