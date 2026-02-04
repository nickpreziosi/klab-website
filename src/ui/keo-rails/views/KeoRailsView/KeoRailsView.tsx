import KeoRailsHero from "@/ui/keo-rails/components/keo-rails-hero/keo-rails-hero";
import styles from "./KeoRailsView.module.css";
import VideoPlayer from "@/ui/shared/components/video-player/video-player";
import KeoRailsBuiltWithSection from "@/ui/keo-rails/components/keo-rails-built-with-section/keo-rails-built-with-section";
import KeoRailsCtaSection from "@/ui/keo-rails/components/keo-rails-cta-section/keo-rails-cta-section";
import KeoRailsCodeSection from "@/ui/keo-rails/components/keo-rails-code-section/keo-rails-code-section";
import KeoRailsCaseStudy from "@/ui/keo-rails/components/keo-rails-case-study/keo-rails-case-study";
import KeoRailsGridSection from "@/ui/keo-rails/components/keo-rails-grid-section/keo-rails-grid-section";
import KeoRailsDashboardPanels from "@/ui/keo-rails/components/keo-rails-dashboard-panels/keo-rails-dashboard-panels";

export function KeoRailsView() {
  return (
    <main className={styles.container}>
      <KeoRailsHero
        heading='THE AGE OF "WAIT" IS OVER.'
        subheading="B2B Blockchain-Based Payments and Lending Infrastructure with Near Instant Settlements "
        description="KRails is an embedded payment and lending solution which combines immediate funds availability, settlement finality and instant confirmation - all in a payment made near instantaneously. Bringing together speed, data and communication for execution of payments."
        buttonText="Start my T+0 flow"
        buttonHref="/contact/sales"
        buttonTwoText="Learn More"
        buttonTwoHref="#video"
      />
      <KeoRailsDashboardPanels />
      <div className={styles.videoSection} id="video">
        <VideoPlayer posterUrl="/keo-rails1.jpg" videoUrl="/keo-rails.mp4" />
      </div>
      <KeoRailsCodeSection />
      <KeoRailsGridSection />
      <KeoRailsBuiltWithSection />
      <KeoRailsCtaSection />
    </main>
  );
}
