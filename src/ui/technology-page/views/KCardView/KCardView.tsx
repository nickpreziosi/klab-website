"use client";

import { TechnologyPageLayout } from "@/ui/technology-page/components/technology-page-layout/technology-page-layout";
import { kcardHero, kcardMockups, kcardSections } from "./kcard-content";

export function KCardView() {
  return (
    <TechnologyPageLayout
      technologyName="KCard"
      logoLight="/logos/kcard-logo-light.svg"
      logoDark="/logos/kcard-logo-dark.svg"
      hero={kcardHero}
      mockups={kcardMockups}
      sections={kcardSections}
      cta={{ label: "Contact sales", href: "/contact/sales" }}
    />
  );
}
