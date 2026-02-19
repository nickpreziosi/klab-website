"use client";

import { TechnologyPageLayout } from "@/ui/technology-page/components/technology-page-layout/technology-page-layout";
import { kbpmHero, kbpmMockups, kbpmSections } from "./kbpm-content";

export function KBpmView() {
  return (
    <TechnologyPageLayout
      technologyName="KBpm"
      logoLight="/logos/kbpm-logo-light.svg"
      logoDark="/logos/kbpm-logo-dark.svg"
      hero={kbpmHero}
      mockups={kbpmMockups}
      sections={kbpmSections}
      cta={{ label: "Contact sales", href: "/contact/sales" }}
    />
  );
}
