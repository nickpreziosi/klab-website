import type {
  TechnologyHero,
  TechnologyMockup,
  TechnologyInfoSection,
} from "@/ui/technology-page/types";

export const kablHero: TechnologyHero = {
  title: "American Express Integration",
  tagline:
    "Global penetration via American Express integration. K-Lab is entering a multi-phase strategic integration to embed its full technology suite into Amex Business Link™, enabling distribution across AMEX's global commercial network.",
  highlights: [
    "AMEX issuers gain access to real-time credit intelligence.",
    "Merchants receive automated working-capital augmentation.",
    "Corporate cardholders access dynamic credit limits.",
    "Transaction risk scoring becomes AI-native and continuous.",
    "Settlement cycles compress significantly, increasing network liquidity.",
    "This integration positions K-Lab as one of the few U.S.-led fintechs capable of providing global, bank-ready, AI + blockchain financial infrastructure at scale.",
  ],
};

export const kablMockups: TechnologyMockup[] = [
  {
    src: "/images/mockups/kabl.png",
    variant: "desktop",
    alt: "KABL ecosystem overview",
  },
];

export const kablSections: TechnologyInfoSection[] = [];
