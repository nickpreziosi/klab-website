"use client";

import { TechnologyPageLayout } from "@/ui/technology-page/components/technology-page-layout/technology-page-layout";
import { kaxisHero, kaxisMockups, kaxisSections } from "./kaxis-content";

export function KAxisView() {
  return (
    <TechnologyPageLayout
      technologyName="KAxis"
      logoLight="/logos/kaxis-logo-light.svg"
      logoDark="/logos/kaxis-logo-dark.svg"
      hero={kaxisHero}
      mockups={kaxisMockups}
      sections={kaxisSections}
      cta={{ label: "Contact sales", href: "/contact/sales" }}
    />
  );
}
