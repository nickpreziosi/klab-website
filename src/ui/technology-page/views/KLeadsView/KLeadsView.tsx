"use client";

import { TechnologyPageLayout } from "@/ui/technology-page/components/technology-page-layout/technology-page-layout";
import { kleadsHero, kleadsMockups, kleadsSections } from "./kleads-content";

export function KLeadsView() {
  return (
    <TechnologyPageLayout
      technologyName="K-Leads"
      logoLight="/logos/kleads-logo-light.svg"
      logoDark="/logos/kleads-logo-dark.svg"
      hero={kleadsHero}
      mockups={kleadsMockups}
      sections={kleadsSections}
      cta={{ label: "Contact sales", href: "/contact/sales" }}
    />
  );
}
