"use client";

import { useTranslations } from "next-intl";
import { TechnologyPageLayout } from "@/ui/technology-page/components/technology-page-layout/technology-page-layout";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";
import {
  TECHNOLOGY_NAMES,
  getPlaceholderMockup,
  getPlaceholderSection,
} from "./technology-placeholder-content";

interface TechnologyPlaceholderViewProps {
  /** Route segment, e.g. "k-talk", "kabl" */
  slug: string;
}

export function TechnologyPlaceholderView({ slug }: TechnologyPlaceholderViewProps) {
  const t = useTranslations("techPlaceholder");
  const tCommon = useTranslations("common");
  const skipAnimation = useSkipAnimationOnLocaleSwitch();
  const name = TECHNOLOGY_NAMES[slug] ?? slug;
  const mockups = getPlaceholderMockup(slug);
  const sections = getPlaceholderSection(slug, t);

  return (
    <TechnologyPageLayout
      technologyName={name}
      mockups={mockups.length > 0 ? mockups : undefined}
      sections={sections}
      cta={{ label: t("contactSales"), href: "/contact/sales" }}
      defaultAlt={tCommon("technologyScreenshot")}
      skipAnimation={skipAnimation}
    />
  );
}
