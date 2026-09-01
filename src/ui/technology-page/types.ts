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
  /** Short title (displayed as main heading) */
  title: string;
  /** Longer subtitle below the title */
  tagline?: string;
  /** Intro paragraph */
  intro?: string;
  /** Optional short list of highlights (e.g. hero bullet points) */
  highlights?: string[];
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
  /** Technology name for fallback when no logo (e.g. "Kai") */
  technologyName: string;
  /** Brand product for ProductLogo (theme-aware). */
  logoProduct?: "k-rails" | "k-leads" | "k-risk" | "k-talk";
  /** Logo for hero: light theme variant */
  logoLight?: string;
  /** Logo for hero: dark theme variant */
  logoDark?: string;
  /** Optional hero block */
  hero?: TechnologyHero;
  /** Mockup images with device frame variant */
  mockups?: TechnologyMockup[];
  /** One or more info sections (benefits, modules, blocks) */
  sections?: TechnologyInfoSection[];
  /** Optional CTA (e.g. contact/sales link) */
  cta?: { label: string; href: string };
  /** Default alt text for mockup images when mockup.alt is not set (e.g. translated "Technology screenshot") */
  defaultAlt?: string;
  /** When true, skip entrance animations (e.g. locale switch). */
  skipAnimation?: boolean;
  /** 'pill-per-column' = orange pill above each benefit column in a 3-column grid; default = all pills in one row, then columns. */
  benefitColumnsVariant?: "default" | "pill-per-column";
  /** When true, hero mockup column grows to fill the hero and the mockup aligns to the bottom (e.g. K-Talk). */
  heroMockupExtendToBottom?: boolean;
}

/** Server-resolved strings for technology page UI (CTA, image alt). Pass from page to view. */
export interface TechnologyPageTranslations {
  contactSales: string;
  technologyScreenshot: string;
}

/** Translated hero + sections from buildXContent(t). Pass from page to view with mockups. */
export interface TechnologyPageContentProps {
  translations: TechnologyPageTranslations;
  hero: TechnologyHero;
  mockups: TechnologyMockup[];
  sections: TechnologyInfoSection[];
}

/** Translator passed into buildXContent() from getTranslations("techPages"). */
export type TechPageTranslator = (key: string) => string;
