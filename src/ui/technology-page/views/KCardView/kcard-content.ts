import type {
  TechnologyHero,
  TechnologyMockup,
  TechnologyInfoSection,
} from "@/ui/technology-page/types";

export const kcardHero: TechnologyHero = {
  title: "Expense Management",
  tagline:
    "Global enforcement for corporate card issuance, credit management, expense processing, and policy oversight.",
  highlights: [
    "Corporate card issuance",
    "Credit management",
    "Expense processing platform",
    "Policy enforcement and reporting oversight",
  ],
};

export const kcardMockups: TechnologyMockup[] = [
  {
    src: "/images/mockups/kcard.png",
    variant: "desktop",
    alt: "KCard expense management",
  },
];

export const kcardSections: TechnologyInfoSection[] = [];
