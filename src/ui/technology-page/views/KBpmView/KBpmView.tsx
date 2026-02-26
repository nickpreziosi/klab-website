"use client";

import { TechnologyPageLayout } from "@/ui/technology-page/components/technology-page-layout/technology-page-layout";
import type { TechnologyPageContentProps } from "@/ui/technology-page/types";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";

export function KBpmView({ translations, hero, mockups, sections }: TechnologyPageContentProps) {
  const skipAnimation = useSkipAnimationOnLocaleSwitch();
  return (
    <TechnologyPageLayout
      technologyName="KBpm"
      logoLight="/logos/kbpm-logo-light.svg"
      logoDark="/logos/kbpm-logo-dark.svg"
      hero={hero}
      mockups={mockups}
      sections={sections}
      cta={{ label: translations.contactSales, href: "/contact/sales" }}
      defaultAlt={translations.technologyScreenshot}
      skipAnimation={skipAnimation}
    />
  );
}
