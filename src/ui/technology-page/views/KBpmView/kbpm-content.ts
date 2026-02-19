import type {
  TechnologyHero,
  TechnologyMockup,
  TechnologyInfoSection,
} from "@/ui/technology-page/types";

export const kbpmHero: TechnologyHero = {
  title: "Compliance & Process Automation",
  tagline:
    "Regulatory compliance and business process automation for onboarding, routing, card issuance, and unified workflows.",
};

export const kbpmMockups: TechnologyMockup[] = [
  {
    src: "/images/mockups/kbpm.png",
    variant: "laptop",
    alt: "KBpm platform overview",
  },
];

export const kbpmModulesSection: Extract<
  TechnologyInfoSection,
  { type: "modules" }
> = {
  type: "modules",
  modules: [
    {
      title: "Customer onboarding",
      description:
        "Automates customer onboarding, so new SMEs and corporates enter the system faster and with fewer manual steps.",
    },
    {
      title: "Task routing",
      description:
        "Routes every task to the right team (Risk, Legal, Ops, Collections, Sales) based on workload and permissions.",
    },
    {
      title: "Card issuance & activation",
      description:
        "Manages card issuance and account activation end-to-end, reducing manual errors.",
    },
    {
      title: "Unified workflow",
      description:
        "Orchestrates disbursements, payments, reminders, and collections in a unified workflow.",
    },
    {
      title: "Real-time visibility",
      description:
        "Gives real-time visibility into bottlenecks, delays, SLAs, and operational load across teams.",
    },
    {
      title: "Building blocks",
      description:
        "Reuses building blocks to launch new financial products or regional variations quickly.",
    },
    {
      title: "Audit trails",
      description:
        "Provides complete audit trails of every step, decision, document, and user action.",
    },
    {
      title: "Standardized operations",
      description:
        "Standardizes operations across all countries and product lines with controlled local adaptations.",
    },
  ],
};

export const kbpmSections: TechnologyInfoSection[] = [kbpmModulesSection];
