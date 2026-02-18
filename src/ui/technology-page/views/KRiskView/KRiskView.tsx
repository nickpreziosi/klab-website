"use client";

import { TechnologyPageLayout } from "@/ui/technology-page/components/technology-page-layout/technology-page-layout";
import {
  kriskHero,
  kriskMockups,
  kriskSections,
} from "./krisk-content";

export function KRiskView() {
  return (
    <TechnologyPageLayout
      technologyName="KRisk"
      logoLight="/logos/krisk-logo-light.svg"
      logoDark="/logos/krisk-logo-dark.svg"
      hero={kriskHero}
      mockups={kriskMockups}
      sections={kriskSections}
      cta={{ label: "Contact sales", href: "/contact/sales" }}
    />
  );
}
