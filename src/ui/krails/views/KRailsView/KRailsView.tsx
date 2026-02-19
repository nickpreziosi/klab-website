import KRailsHero from "@/ui/krails/components/krails-hero/krails-hero";
import styles from "./KRailsView.module.css";
import KRailsBuiltWith from "@/ui/krails/components/krails-built-with/krails-built-with";
import KRailsCta from "@/ui/krails/components/krails-cta/krails-cta";
import KRailsCodeSection from "@/ui/krails/components/krails-code-section/krails-code-section";
import KRailsCaseStudy from "@/ui/krails/components/krails-case-study/krails-case-study";
import KRailsWhy from "@/ui/krails/components/krails-why/krails-why";
import KRailsDashboard from "@/ui/krails/components/krails-dashboard/krails-dashboard";

export function KRailsView() {
  return (
    <main className={styles.container}>
      <div className={styles.background}>
        <KRailsHero
          heading='THE AGE OF "WAIT" IS OVER.'
          subheading="B2B Blockchain-Based Payments and Lending Infrastructure with Near Instant Settlements "
          description="KRails is an embedded payment and lending solution which combines immediate funds availability, settlement finality and instant confirmation - all in a payment made near instantaneously. Bringing together speed, data and communication for execution of payments."
          buttonText="Start my T+0 flow"
          buttonHref="/contact/sales"
          buttonTwoText="Learn More"
          buttonTwoHref="#code"
        />
        <KRailsDashboard />
        <KRailsCodeSection />
      </div>

      <KRailsWhy />
      <div className={styles.lastSection}>
        <KRailsBuiltWith />
        <KRailsCta />
      </div>
    </main>
  );
}
