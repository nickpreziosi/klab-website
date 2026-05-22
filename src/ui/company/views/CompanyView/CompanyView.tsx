"use client";

import type { CompanyHeroTranslations } from "@/ui/company/types";
import type { StaffMember } from "@/ui/company/components/company-staff-section/company-staff-section";
import { CompanyHero } from "@/ui/company/components/company-hero/company-hero";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";
import styles from "./CompanyView.module.css";
import JourneyTimeline from "@/ui/company/components/journey-timeline/journey-timeline";
import CompanyCulture from "@/ui/company/components/company-culture/company-culture";
import CompanyBrandSection from "@/ui/company/components/company-brand-section/company-brand-section";
import KlabFoundationSection from "@/ui/company/components/klab-foundation-section/klab-foundation-section";
import CompanyManifesto from "@/ui/company/components/company-manifesto/company-manifesto";
import CompanyStaffSection from "@/ui/company/components/company-staff-section/company-staff-section";

type CompanyViewProps = {
  /** When provided (from server), company hero copy is SSR'd */
  companyHeroTranslations?: CompanyHeroTranslations;
  /** Staff with translated position/bio (from server) */
  employees: StaffMember[];
  board: StaffMember[];
};

export function CompanyView({ companyHeroTranslations, employees, board }: CompanyViewProps) {
  const skipAnimation = useSkipAnimationOnLocaleSwitch();
  return (
    <div className={styles.page}>
      <CompanyHero translations={companyHeroTranslations} skipAnimation={skipAnimation} />
      <main className={styles.main}>
        <JourneyTimeline skipAnimation={skipAnimation} />
        <CompanyBrandSection skipAnimation={skipAnimation} />
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
