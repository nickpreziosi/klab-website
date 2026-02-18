"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "@/ui/shared/components/button/button";
import type {
  TechnologyPageLayoutProps,
  TechnologyInfoSection,
  TechnologyMockup,
} from "@/ui/technology-page/types";
import styles from "./technology-page-layout.module.css";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

function MockupCard({ mockup }: { mockup: TechnologyMockup }) {
  const wrapperClass =
    mockup.variant === "phone"
      ? styles.mockupWrapperPhone
      : mockup.variant === "laptop"
        ? styles.mockupWrapperLaptop
        : styles.mockupWrapperDesktop;

  return (
    <div className={`${styles.mockupWrapper} ${wrapperClass}`}>
      <Image
        src={mockup.src}
        alt={mockup.alt ?? "Technology screenshot"}
        width={mockup.variant === "phone" ? 280 : mockup.variant === "laptop" ? 560 : 720}
        height={mockup.variant === "phone" ? 560 : 360}
        className={styles.mockupImage}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  );
}

function BenefitColumnsSection({
  section,
  pillsOnly,
  hidePills,
}: {
  section: Extract<TechnologyInfoSection, { type: "benefit-columns" }>;
  pillsOnly?: boolean;
  hidePills?: boolean;
}) {
  const showPills = !hidePills && section.categoryLabels.length > 0;
  const showColumns = !pillsOnly;

  return (
    <>
      {showPills && (
        <div className={styles.categoryPills}>
          {section.categoryLabels.map((label) => (
            <span key={label} className={styles.pill}>
              {label}
            </span>
          ))}
        </div>
      )}
      {showColumns && (
        <div className={styles.benefitColumns}>
          {section.columns.map((col, i) => (
            <div key={i} className={styles.benefitColumn}>
              <p className={styles.benefitMainPoint}>{col.mainPoint}</p>
              {col.subPoints.map((point, j) => (
                <p key={j} className={styles.benefitSubPoint}>
                  {point}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function ModulesSection({
  section,
}: {
  section: Extract<TechnologyInfoSection, { type: "modules" }>;
}) {
  return (
    <>
      {section.header && (
        <p className={styles.modulesHeader}>{section.header}</p>
      )}
      <div className={styles.modulesGrid}>
        {section.modules.map((mod, i) => (
          <div key={i} className={styles.moduleCard}>
            <h3 className={styles.moduleTitle}>{mod.title}</h3>
            <p className={styles.moduleDescription}>{mod.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function BlocksSection({
  section,
}: {
  section: Extract<TechnologyInfoSection, { type: "blocks" }>;
}) {
  return (
    <div className={styles.blocksSection}>
      {section.featureTitle && (
        <div className={styles.featureTitleBlock}>
          <h3 className={styles.featureTitle}>{section.featureTitle}</h3>
          {section.featureSubline && (
            <p className={styles.featureSubline}>{section.featureSubline}</p>
          )}
        </div>
      )}
      {section.blocks.map((block, i) => (
        <div key={i} className={styles.block}>
          <h4 className={styles.blockHeading}>{block.heading}</h4>
          <p className={styles.blockSubheading}>{block.subheading}</p>
          <ul className={styles.blockBullets}>
            {block.bullets.map((b, j) => (
              <li key={j}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function InfoSectionRenderer({
  section,
  benefitColumnsHidePills,
}: {
  section: TechnologyInfoSection;
  benefitColumnsHidePills?: boolean;
}) {
  if (section.type === "benefit-columns") {
    return (
      <BenefitColumnsSection
        section={section}
        hidePills={benefitColumnsHidePills}
      />
    );
  }
  if (section.type === "modules") {
    return <ModulesSection section={section} />;
  }
  return <BlocksSection section={section} />;
}

export function TechnologyPageLayout({
  technologyName,
  hero,
  mockups,
  sections,
  cta,
}: TechnologyPageLayoutProps) {
  const heroRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const mockupInView = useInView(mockupRef, { once: true, amount: 0.1 });
  const sectionsInView = useInView(sectionsRef, { once: true, amount: 0.1 });

  const firstMockupInHero = hero && mockups && mockups.length > 0;
  const mockupsBelow = firstMockupInHero ? mockups!.slice(1) : mockups ?? [];

  return (
    <main className={styles.container}>
      {hero && (
        <motion.section
          ref={heroRef}
          className={styles.heroSection}
          initial={fadeIn.initial}
          animate={heroInView ? fadeIn.animate : {}}
          transition={fadeIn.transition}
        >
          <div className={styles.heroInner}>
            <div className={styles.heroTextCol}>
              <div className={styles.heroTitleRow}>
                <span className={styles.heroTitle}>{technologyName}</span>
                <span className={styles.heroTitle}>{hero.title}</span>
              </div>
              {hero.tagline && (
                <h1 className={styles.heroTagline}>{hero.tagline}</h1>
              )}
              <div className={styles.heroRow}>
                {hero.intro && (
                  <>
                    <span className={styles.heroIntroIcon} aria-hidden>
                      →
                    </span>
                    <p className={styles.heroIntro}>{hero.intro}</p>
                  </>
                )}
              </div>
              {sections?.some((s) => s.type === "benefit-columns") && (
                <BenefitColumnsSection
                  section={
                    sections.find((s) => s.type === "benefit-columns") as Extract<
                      TechnologyInfoSection,
                      { type: "benefit-columns" }
                    >
                  }
                  pillsOnly
                />
              )}
            </div>
            {firstMockupInHero && mockups![0] && (
              <div className={styles.heroImageCol}>
                <MockupCard mockup={mockups![0]} />
              </div>
            )}
          </div>
        </motion.section>
      )}

      {mockupsBelow.length > 0 && (
        <motion.section
          ref={mockupRef}
          className={styles.mockupSection}
          initial={fadeIn.initial}
          animate={mockupInView ? fadeIn.animate : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className={styles.mockupInner}>
            <div className={styles.mockupGrid}>
              {mockupsBelow.map((m, i) => (
                <MockupCard key={i} mockup={m} />
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {sections && (() => {
        const sectionsToShow = sections;
        if (sectionsToShow.length === 0) return null;
        return (
          <motion.section
            ref={sectionsRef}
            className={styles.infoSection}
            initial={fadeIn.initial}
            animate={sectionsInView ? fadeIn.animate : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className={styles.infoInner}>
              {sectionsToShow.map((section, i) => (
                <div key={i} className={styles.sectionBlock}>
                  <InfoSectionRenderer
                    section={section}
                    benefitColumnsHidePills={!!hero}
                  />
                </div>
              ))}
            </div>
          </motion.section>
        );
      })()}

      {cta && (
        <section className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <Button href={cta.href} variant="secondary">
              {cta.label}
            </Button>
          </div>
        </section>
      )}
    </main>
  );
}
