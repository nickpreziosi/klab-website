"use client";

import { TechnologyPageLayout } from "@/ui/technology-page/components/technology-page-layout/technology-page-layout";
import { ktalkHero, ktalkMockups, ktalkSections } from "./ktalk-content";

export function KTalkView() {
  return (
    <TechnologyPageLayout
      technologyName="K-Talk"
      logoLight="/logos/ktalk-logo-light.svg"
      logoDark="/logos/ktalk-logo-dark.svg"
      hero={ktalkHero}
      mockups={ktalkMockups}
      sections={ktalkSections}
      cta={{ label: "Contact sales", href: "/contact/sales" }}
    />
  );
}
