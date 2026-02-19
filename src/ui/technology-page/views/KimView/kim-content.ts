import type {
  TechnologyHero,
  TechnologyMockup,
  TechnologyInfoSection,
} from "@/ui/technology-page/types";

export const kimHero: TechnologyHero = {
  title: "AI-Powered Invoice Management",
  tagline:
    "Our AI-powered invoice management solution turns a traditionally manual, error-prone process into a fully automated, intelligent, and trusted digital workflow—unlocking speed, liquidity, and confidence across the supply chain.",
};

export const kimMockups: TechnologyMockup[] = [
  {
    src: "/images/mockups/kim.png",
    variant: "desktop",
    alt: "Kim invoice workflow",
  },
];

export const kimBlocksSection: Extract<TechnologyInfoSection, { type: "blocks" }> = {
  type: "blocks",
  blocks: [
    {
      heading: "Faster Processing & Financing",
      subheading: "",
      bullets: [
        "Reduces processing from days to minutes",
        "Accelerates approvals and access financing",
        "Enables dynamic discounting and early payment programs",
      ],
    },
    {
      heading: "Reduce Risk & Errors",
      subheading: "",
      bullets: [
        "Eliminates manual data entry and reconciliation",
        "Smart contracts enforce agreed terms automatically",
        "Immutable blockchain records prevent disputes and fraud",
      ],
    },
    {
      heading: "Improved Cash Flow Visibility",
      subheading: "",
      bullets: [
        "Real-time insight into invoice status and payment timelines",
        "Predictive alerts based on historical payment behavior",
        "Clear view of liabilities and receivables across suppliers",
      ],
    },
    {
      heading: "Built for Trust & Compliance",
      subheading: "",
      bullets: [
        "Single source of truth shared across all parties",
        "Tamper-proof audit trail for regulators and auditors",
        "Enhanced transparency strengthens buyer-supplier relationships",
      ],
    },
  ],
};

export const kimSections: TechnologyInfoSection[] = [kimBlocksSection];
