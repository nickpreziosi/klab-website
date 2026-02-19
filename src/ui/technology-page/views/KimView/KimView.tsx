"use client";

import { TechnologyPageLayout } from "@/ui/technology-page/components/technology-page-layout/technology-page-layout";
import { kimHero, kimMockups, kimSections } from "./kim-content";

export function KimView() {
  return (
    <TechnologyPageLayout
      technologyName="Kim"
      logoLight="/logos/kim-logo-light.svg"
      logoDark="/logos/kim-logo-dark.svg"
      hero={kimHero}
      mockups={kimMockups}
      sections={kimSections}
      cta={{ label: "Contact sales", href: "/contact/sales" }}
    />
  );
}
