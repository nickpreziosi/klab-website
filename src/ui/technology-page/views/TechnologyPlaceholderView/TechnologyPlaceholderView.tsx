"use client";

import { TechnologyPageLayout } from "@/ui/technology-page/components/technology-page-layout/technology-page-layout";
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
  const name = TECHNOLOGY_NAMES[slug] ?? slug;
  const mockups = getPlaceholderMockup(slug);
  const sections = getPlaceholderSection(slug);

  return (
    <TechnologyPageLayout
      technologyName={name}
      mockups={mockups.length > 0 ? mockups : undefined}
      sections={sections}
      cta={{ label: "Contact sales", href: "/contact/sales" }}
    />
  );
}
