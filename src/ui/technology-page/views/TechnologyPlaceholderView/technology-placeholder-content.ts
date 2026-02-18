import type { TechnologyMockup, TechnologyInfoSection } from "@/ui/technology-page/types";

/**
 * Map technology slug (route segment) to mockup image path in public/images/mockups.
 * Omit technologies that have no mockup or use a custom view (e.g. kena, k-rails).
 */
export const TECHNOLOGY_MOCKUP_PATHS: Record<string, string> = {
  "k-wallet": "/images/mockups/kai.png",
  "k-talk": "/images/mockups/ktalk.png",
  kabl: "/images/mockups/kabl.png",
  "k-pay": "/images/mockups/kcard.png",
  "k-comply": "/images/mockups/kbpm.png",
  "k-ledger": "/images/mockups/kim.png",
  "k-connect": "/images/mockups/kaxis.png",
  "k-insights": "/images/mockups/kleads.png",
};

/** Display name by technology slug. */
export const TECHNOLOGY_NAMES: Record<string, string> = {
  "k-wallet": "K-Wallet",
  "k-talk": "K-Talk",
  kabl: "KABL",
  "k-pay": "K-Pay",
  "k-comply": "K-Comply",
  "k-ledger": "K-Ledger",
  "k-connect": "K-Connect",
  "k-insights": "K-Insights",
};

export function getPlaceholderMockup(slug: string): TechnologyMockup[] {
  const src = TECHNOLOGY_MOCKUP_PATHS[slug];
  if (!src) return [];
  return [{ src, variant: "desktop", alt: `${TECHNOLOGY_NAMES[slug] ?? slug} overview` }];
}

export function getPlaceholderSection(slug: string): TechnologyInfoSection[] {
  const name = TECHNOLOGY_NAMES[slug] ?? slug;
  return [
    {
      type: "blocks",
      featureTitle: `${name}`,
      featureSubline: "Detailed use cases and benefits for this technology are coming soon.",
      blocks: [
        {
          heading: "Overview",
          subheading: "Learn more soon",
          bullets: [
            "This page will include mockups, use cases, and detailed information.",
            "Contact us for early access or demos.",
          ],
        },
      ],
    },
  ];
}
