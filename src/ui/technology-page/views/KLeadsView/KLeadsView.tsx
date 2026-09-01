"use client";

import { TechnologyPageLayout } from "@/ui/technology-page/components/technology-page-layout/technology-page-layout";
import type { TechnologyPageContentProps } from "@/ui/technology-page/types";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";

export function KLeadsView({ translations, hero, mockups, sections }: TechnologyPageContentProps) {
  const skipAnimation = useSkipAnimationOnLocaleSwitch();
  return (
    <TechnologyPageLayout
      technologyName="K-Leads"
      logoProduct="k-leads"
      hero={hero}
      mockups={mockups}
      sections={sections}
      cta={{ label: translations.contactSales, href: "/contact/sales" }}
      defaultAlt={translations.technologyScreenshot}
      skipAnimation={skipAnimation}
    />
  );
}
