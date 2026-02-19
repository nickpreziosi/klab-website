"use client";

import { TechnologyPageLayout } from "@/ui/technology-page/components/technology-page-layout/technology-page-layout";
import { kablHero, kablMockups, kablSections } from "./kabl-content";

export function KablView() {
  return (
    <TechnologyPageLayout
      technologyName="KABL"
      logoLight="/logos/kabl-logo-light.svg"
      logoDark="/logos/kabl-logo-dark.svg"
      hero={kablHero}
      mockups={kablMockups}
      sections={kablSections}
      cta={{ label: "Contact sales", href: "/contact/sales" }}
    />
  );
}
