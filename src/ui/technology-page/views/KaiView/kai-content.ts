import type {
  TechnologyHero,
  TechnologyMockup,
  TechnologyInfoSection,
} from "@/ui/technology-page/types";

export const kaiHero: TechnologyHero = {
  title: "Don't compromise. Now businesses can work harder and smarter.",
  tagline:
    "Kai delivers comprehensive solutions that enhance your existing infrastructure while adding revolutionary capabilities for tomorrow's financial challenges.",
};

export const kaiMockups: TechnologyMockup[] = [
  {
    src: "/images/mockups/kai.png",
    variant: "desktop",
    alt: "Kai platform overview",
  },
];

export const kaiBenefitColumns: Extract<
  TechnologyInfoSection,
  { type: "benefit-columns" }
> = {
  type: "benefit-columns",
  categoryLabels: [
    "Value Proposition",
    "Efficiency Improvements",
    "Enhanced Decision-Making",
    "Cost Savings",
    "Security & Privacy",
  ],
  columns: [
    {
      title: "Value Proposition",
      mainPoint:
        "Kai supports full lifecycle orchestration from onboarding, origination to loan management and settlement.",
      subPoints: [
        "Fully integrated set of modules built for rapid deployment.",
        "24/7/365 accessibility and global reach",
      ],
    },
    {
      title: "Efficiency Improvements",
      mainPoint:
        "Automate workflows with enhanced oversight, freeing up valuable time and operational expenses.",
      subPoints: [
        "Significant reduction in manual tasks and data entry",
        "Streamlined processes from onboarding through collections",
      ],
    },
    {
      title: "Enhanced Decision-Making",
      mainPoint:
        "The power of enterprise-grade analytics at your fingertips, analyzing trends and market conditions continuously.",
      subPoints: [
        "AI-powered insights for faster, more accurate decisions",
        "Proactive risk monitoring and early warning systems",
      ],
    },
    {
      title: "Cost Savings",
      mainPoint:
        "Maximize value from your existing infrastructure while adding powerful new capabilities.",
      subPoints: [
        "More back-office automation with your current infrastructure",
        "Customizable modules that integrate with existing systems",
      ],
    },
    {
      title: "Security & Privacy",
      mainPoint:
        "Futureproofed with blockchain technology offering advanced protection and compliance features.",
      subPoints: [
        "Permission layers providing flexibility and regulatory compliance",
        "Immutable ledgering for complete audit trails and data integrity",
      ],
    },
  ],
};

export const kaiModulesSection: Extract<
  TechnologyInfoSection,
  { type: "modules" }
> = {
  type: "modules",
  header:
    "Architecture overview: Scalable. Secure. Modular",
  modules: [
    {
      title: "Experience Layer",
      description:
        "Kai Web/Mobile interfaces and K-Talks (text/voice) for instant insights and seamless user interaction.",
    },
    {
      title: "Core Modules",
      description:
        "K-BPM, K-Rails, K-Axis, K-Risk, K-Leads, and the upcoming Corporate Card Platform.",
    },
    {
      title: "Data & AI",
      description:
        "Central data warehouse with explainable models; continuous monitoring, drift/bias checks for reliable analytics.",
    },
    {
      title: "Corporate Card Issuance",
      description:
        "Automating manual processes for more efficient spend management and reporting oversight.",
    },
    {
      title: "Payments & Rails",
      description:
        "K-Rails system with invoice NFTs, credit pools, Smart contracts, and stablecoin reserve, integrated with traditional banking infrastructure.",
    },
    {
      title: "Integration Layer",
      description:
        "Secure APIs connecting to ERP/CRM systems, banking partners, tax authorities, credit bureaus, and accounting platforms.",
    },
    {
      title: "Security & Compliance",
      description:
        "Role-based access control, end-to-end encryption, comprehensive audit trails, privacy-preserving permissions, and KYB/KYC/AML safeguards.",
    },
    {
      title: "Credit Management & Expense Processing Platform",
      description:
        "AI-powered expense recognition, policy enforcement, and fraud prevention capabilities.",
    },
  ],
};

export const kaiBlocksSection: Extract<
  TechnologyInfoSection,
  { type: "blocks" }
> = {
  type: "blocks",
  featureTitle: "Expanding Market Reach",
  featureSubline:
    "Unlocks untapped market potential and reaches entirely new segments through the K partnership.",
  blocks: [
    {
      heading: "Startups, SMB & Enterprise",
      subheading: "The Bigger Picture for Your Business",
      bullets: [
        "Kai expands beyond payments to deliver a comprehensive business ecosystem supporting organizational scale and complexity.",
        "Embedded AI runs in the background suggesting automation at the point of repetition, freeing up valuable time for you to get back to growing your business.",
        "Scale with confidence using modules specifically designed for your growth stage.",
      ],
    },
    {
      heading: "Financial Solutions",
      subheading: "Interoperability with Speed and Compliance",
      bullets: [
        "Enhance legacy systems through seamless integration with core banking APIs while unlocking next-generation capabilities.",
        "Flexibility and interoperability allow FIs to integrate today while planning for the growth and speed of tomorrow's market.",
        "Empower supply chain financing, trade finance, cash management, accounts payable, and expense control with built-in compliance.",
      ],
    },
    {
      heading: "Partners",
      subheading: "Enhance your current tooling",
      bullets: [
        "Supercharge your existing systems and processes with modular, intelligent capabilities that drive performance.",
        "Kai acts as an extension of the team, enabling real-time, data-driven decisions and freeing up time for strategic initiatives.",
        "Differentiate your offering with embedded intelligence and financial capabilities that complement your core business.",
      ],
    },
  ],
};

export const kaiSections: TechnologyInfoSection[] = [
  kaiBenefitColumns,
  kaiModulesSection,
  kaiBlocksSection,
];
