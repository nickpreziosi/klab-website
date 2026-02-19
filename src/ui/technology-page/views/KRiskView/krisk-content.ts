import type {
  TechnologyHero,
  TechnologyMockup,
  TechnologyInfoSection,
} from "@/ui/technology-page/types";

export const kriskHero: TechnologyHero = {
  title: "Know Your Customer To Serve Them Better",
  tagline:
    "Comprehensive intelligence engine that integrates internal history and external data sources to fortify underwriting, proactively protect the portfolio, and drive data-based strategic decisions.",
  highlights: [
    "Risk Assessment with more insights enhanced by AI",
    "Better accuracy unlocking more relationships",
    "Faster and more consistent approvals",
  ],
};

export const kriskMockups: TechnologyMockup[] = [
  {
    src: "/images/mockups/krisk.png",
    variant: "desktop",
    alt: "KRisk platform overview",
  },
];

export const kriskBlocksSection: Extract<TechnologyInfoSection, { type: "blocks" }> = {
  type: "blocks",
  featureTitle: "Key capabilities",
  blocks: [
    {
      heading: "AI Predictive Scoring",
      subheading:
        "Generates fully explainable eligibility scores and risk using advanced AI models.",
      bullets: [],
    },
    {
      heading: "Market Intelligence & Targeting",
      subheading:
        "Uses an advanced algorithm to analyze the buyer-supplier network and identify the highest-potential leads.",
      bullets: [],
    },
    {
      heading: "Proactive Monitoring",
      subheading:
        "Advanced anomaly detection system alerts teams to unusual sales or delinquency changes.",
      bullets: [],
    },
    {
      heading: "Strategic Insight",
      subheading:
        "Provides forecasts and portfolio segmentation against benchmarks to guide commercial strategy.",
      bullets: [],
    },
  ],
};

export const kriskSections: TechnologyInfoSection[] = [kriskBlocksSection];
