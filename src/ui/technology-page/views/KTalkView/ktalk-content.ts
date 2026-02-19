import type {
  TechnologyHero,
  TechnologyMockup,
  TechnologyInfoSection,
} from "@/ui/technology-page/types";

export const ktalkHero: TechnologyHero = {
  title: "Conversational AI",
  tagline:
    "Conversational AI interface—accessible via text and voice—connected directly to all internal and external data sources across the organization.",
  highlights: [
    "Instantly request accurate insights, summaries, and visualizations using natural language.",
    "Enables faster, data-driven decisions by reducing organizational friction.",
    "Conversational immediate access to portfolio data, eliminating manual reporting.",
    "Integrates with core systems, ensuring secure access to current data.",
  ],
};

export const ktalkMockups: TechnologyMockup[] = [
  {
    src: "/images/mockups/ktalk2.png",
    variant: "phone",
    alt: "KTalk app interface",
  },
];

export const ktalkSections: TechnologyInfoSection[] = [];
