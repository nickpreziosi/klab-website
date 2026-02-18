/**
 * Types for the reusable technology page layout.
 * Supports varying content: hero, mockups, benefit columns, and orange-headed sections.
 */

export type MockupVariant = "phone" | "laptop" | "desktop";

export interface TechnologyMockup {
  src: string;
  variant: MockupVariant;
  alt?: string;
}

export interface TechnologyHero {
  /** Main title, e.g. "Expected Benefits" */
  title: string;
  /** Large tagline */
  tagline?: string;
  /** Intro paragraph (e.g. next to tagline) */
  intro?: string;
}

/** One benefit category with a list of points (for column layout). */
export interface BenefitColumn {
  title: string;
  mainPoint: string;
  subPoints: string[];
}

/** Section with orange heading, subheading, and bullets (e.g. "Startups, SMB & Enterprise"). */
export interface TechnologyInfoBlock {
  heading: string;
  subheading: string;
  bullets: string[];
}

/** Architecture/module box (e.g. "Experience Layer", "Payments & Rails"). */
export interface TechnologyModule {
  title: string;
  description: string;
}

export type TechnologyInfoSection =
  | {
      type: "benefit-columns";
      /** Category labels shown as pills/tabs */
      categoryLabels: string[];
      /** One column per category; order must match categoryLabels */
      columns: BenefitColumn[];
    }
  | {
      type: "modules";
      /** Optional header, e.g. "Architecture overview: Scalable. Secure. Modular" */
      header?: string;
      modules: TechnologyModule[];
    }
  | {
      type: "blocks";
      /** Optional feature line above blocks, e.g. "Expanding Market Reach" */
      featureTitle?: string;
      featureSubline?: string;
      blocks: TechnologyInfoBlock[];
    };

export interface TechnologyPageLayoutProps {
  /** Technology name for logo/heading context (e.g. "Kai") */
  technologyName: string;
  /** Optional hero block */
  hero?: TechnologyHero;
  /** Mockup images with device frame variant */
  mockups?: TechnologyMockup[];
  /** One or more info sections (benefits, modules, blocks) */
  sections?: TechnologyInfoSection[];
  /** Optional CTA (e.g. contact/sales link) */
  cta?: { label: string; href: string };
}
