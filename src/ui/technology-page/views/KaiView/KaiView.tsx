"use client";

import { TechnologyPageLayout } from "@/ui/technology-page/components/technology-page-layout/technology-page-layout";
import { kaiHero, kaiMockups, kaiSections } from "./kai-content";

export function KaiView() {
  return (
    <TechnologyPageLayout
      technologyName="Kai"
      logoLight="/logos/kai-logo-light.svg"
      logoDark="/logos/kai-logo-dark.svg"
      hero={kaiHero}
      mockups={kaiMockups}
      sections={kaiSections}
      cta={{ label: "Contact sales", href: "/contact/sales" }}
    />
  );
}
