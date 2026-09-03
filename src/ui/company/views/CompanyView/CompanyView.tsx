"use client";

import type {
  CompanyHeroTranslations,
  CompanyWhatWeBuiltTranslations,
  JourneyTimelineTranslations,
} from "@/ui/company/types";
import type { StaffMember } from "@/ui/company/components/company-staff-section/company-staff-section";
import { CompanyHero } from "@/ui/company/components/company-hero/company-hero";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";
import styles from "./CompanyView.module.css";
import JourneyTimeline from "@/ui/company/components/journey-timeline/journey-timeline";
import CompanyCulture from "@/ui/company/components/company-culture/company-culture";
import KlabFoundationSection from "@/ui/company/components/klab-foundation-section/klab-foundation-section";
import CompanyManifesto from "@/ui/company/components/company-manifesto/company-manifesto";
import CompanyStaffSection from "@/ui/company/components/company-staff-section/company-staff-section";
import CompanyWhatWeBuiltSection from "@/ui/company/components/company-what-we-built-section/company-what-we-built-section";

type CompanyViewProps = {
  /** When provided (from server), company hero copy is SSR'd */
  companyHeroTranslations?: CompanyHeroTranslations;
  /** When provided (from server), What We Built copy is SSR'd */
  companyWhatWeBuiltTranslations?: CompanyWhatWeBuiltTranslations;
  /** When provided (from server), trajectory copy is SSR'd */
  journeyTimelineTranslations?: JourneyTimelineTranslations;
  /** Staff with translated position/bio (from server) */
  employees: StaffMember[];
  board: StaffMember[];
};

export function CompanyView({
  companyHeroTranslations,
  companyWhatWeBuiltTranslations,
  journeyTimelineTranslations,
  employees,
  board,
}: CompanyViewProps) {
  const skipAnimation = useSkipAnimationOnLocaleSwitch();
  return (
    <div className={styles.page}>
      <CompanyHero translations={companyHeroTranslations} skipAnimation={skipAnimation} />
      <main className={styles.main}>
        <CompanyWhatWeBuiltSection
          translations={companyWhatWeBuiltTranslations}
          skipAnimation={skipAnimation}
        />
        <JourneyTimeline translations={journeyTimelineTranslations} skipAnimation={skipAnimation} />
        <CompanyManifesto skipAnimation={skipAnimation} />
        <KlabFoundationSection skipAnimation={skipAnimation} />
        <CompanyCulture skipAnimation={skipAnimation} />
        <div className={styles.staffContainer}>
          <section className={styles.staffSection}>
            <CompanyStaffSection
              employees={employees}
              board={board}
              skipAnimation={skipAnimation}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
