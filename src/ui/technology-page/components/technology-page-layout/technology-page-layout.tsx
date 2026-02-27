"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Button from "@/ui/shared/components/button/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui/shared/components/card/card";
import { useTheme } from "@/ui/shared/hooks/use-theme";
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

function MockupCard({
  mockup,
  defaultAlt,
  priority = false,
}: {
  mockup: TechnologyMockup;
  defaultAlt: string;
  /** When true, preload image (e.g. hero mockup) so it loads like company hero and avoids placeholder flash. */
  priority?: boolean;
}) {
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
        alt={mockup.alt ?? defaultAlt}
        width={mockup.variant === "phone" ? 380 : mockup.variant === "laptop" ? 560 : 720}
        height={mockup.variant === "phone" ? 760 : 360}
        className={styles.mockupImage}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        placeholder="empty"
        priority={priority}
      />
    </div>
  );
}

function BenefitColumnsSection({
  section,
  pillsOnly,
  hidePills,
  pillPerColumn,
}: {
  section: Extract<TechnologyInfoSection, { type: "benefit-columns" }>;
  pillsOnly?: boolean;
  hidePills?: boolean;
  pillPerColumn?: boolean;
}) {
  const showPills = !hidePills && section.categoryLabels.length > 0;
  const showColumns = !pillsOnly;

  if (pillPerColumn && showColumns) {
    return (
      <div className={styles.benefitColumnsWithPills}>
        {section.columns.map((col, i) => (
          <div key={i} className={styles.benefitColumnWithPill}>
            {showPills && section.categoryLabels[i] != null && (
              <div className={styles.categoryPills}>
                <span className={styles.pill}>
                  <Check className={styles.pillCheck} aria-hidden />
                  {section.categoryLabels[i]}
                </span>
              </div>
            )}
            <div className={styles.benefitColumn}>
              <p className={styles.benefitMainPoint}>{col.mainPoint}</p>
              <ul className={styles.benefitSubPoints}>
                {col.subPoints.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {showPills && (
        <div className={styles.categoryPills}>
          {section.categoryLabels.map((label) => (
            <span key={label} className={styles.pill}>
              <Check className={styles.pillCheck} aria-hidden />
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
              <ul className={styles.benefitSubPoints}>
                {col.subPoints.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
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
          <Card key={i}>
            <CardHeader>
              <CardTitle className={styles.moduleCardTitle}>
                {mod.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={styles.moduleCardDescription}>{mod.description}</p>
            </CardContent>
          </Card>
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
          <h2 className={styles.featureTitle}>{section.featureTitle}</h2>
          {section.featureSubline && (
            <p className={styles.featureSubline}>{section.featureSubline}</p>
          )}
        </div>
      )}
      <div
        className={styles.blocksGrid}
        data-count={section.blocks.length}
      >
        {section.blocks.map((block, i) => (
          <Card key={i} className={styles.blockCard}>
            <CardHeader>
              <CardTitle className={styles.blockCardTitle}>
                {block.heading}
              </CardTitle>
              <p className={styles.blockCardSubheading}>{block.subheading}</p>
            </CardHeader>
            <CardContent>
              {block.bullets.length > 0 && (
                <ul className={styles.blockCardBullets}>
                  {block.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
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
  logoLight,
  logoDark,
  hero,
  mockups,
  sections,
  cta,
  defaultAlt: defaultAltProp,
  skipAnimation = false,
  benefitColumnsVariant = "default",
  heroMockupExtendToBottom = false,
}: TechnologyPageLayoutProps) {
  const defaultAlt = defaultAltProp ?? "Technology screenshot";
  const { effectiveTheme } = useTheme();
  const heroRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const sectionsInView = useInView(sectionsRef, { once: true, amount: 0.1 });
  const effectiveHeroInView = skipAnimation || heroInView;
  const effectiveSectionsInView = skipAnimation || sectionsInView;

  const firstMockupInHero = hero && mockups && mockups.length > 0;
  const mockupsBelow = firstMockupInHero ? mockups!.slice(1) : mockups ?? [];
  /* Dark theme = light-colored logo (logoLight); light theme = dark-colored logo (logoDark) */
  const logoSrc =
    logoLight && logoDark
      ? effectiveTheme === "dark"
        ? logoLight
        : logoDark
      : null;

  return (
    <main className={styles.container}>
      {hero && (
        <motion.section
          ref={heroRef}
          className={`${styles.heroSection} ${heroMockupExtendToBottom ? styles.heroSectionMockupExtend : ""}`}
          initial={skipAnimation ? fadeIn.animate : fadeIn.initial}
          animate={effectiveHeroInView ? fadeIn.animate : {}}
          transition={fadeIn.transition}
        >
          <div className={styles.heroInner}>
            <div className={styles.heroRow}>
              <div className={styles.heroTextCol}>
                <div className={styles.heroTitleRow}>
                {logoSrc ? (
                  <Image
                    key={logoSrc}
                    src={logoSrc}
                    alt=""
                    width={160}
                    height={48}
                    className={styles.heroLogo}
                    priority
                  />
                ) : (
                  <span className={styles.heroTitle}>{technologyName}</span>
                )}
                </div>
                {hero.title && (
                  <h1 className={styles.heroTagline}>{hero.title}</h1>
                )}
                {hero.tagline && (
                  <p className={styles.heroSubtitle}>{hero.tagline}</p>
                )}
                {hero.intro && (
                  <p className={styles.heroIntro}>{hero.intro}</p>
                )}
                {hero.highlights && hero.highlights.length > 0 && (
                  <ul className={styles.heroHighlights}>
                    {hero.highlights.map((item, i) => (
                      <li key={i} className={styles.heroHighlightItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {cta && (
                  <div className={styles.heroCtaWrap}>
                    <Button
                      href={cta.href}
                      variant="accent-brand"
                      iconPosition="end"
                      icon={<ArrowRight className={styles.heroCtaIcon} />}
                    >
                      {cta.label}
                    </Button>
                  </div>
                )}
              </div>
              {firstMockupInHero && mockups![0] && (
                <div className={styles.heroImageCol}>
                  <MockupCard mockup={mockups![0]} defaultAlt={defaultAlt} priority />
                </div>
              )}
            </div>
            {sections?.some((s) => s.type === "benefit-columns") && (
              <div className={styles.heroBenefitColumns}>
                <BenefitColumnsSection
                  section={
                    sections.find((s) => s.type === "benefit-columns") as Extract<
                      TechnologyInfoSection,
                      { type: "benefit-columns" }
                    >
                  }
                  pillPerColumn={benefitColumnsVariant === "pill-per-column"}
                />
              </div>
            )}
          </div>
        </motion.section>
      )}

      {((mockupsBelow.length > 0) || (sections && sections.some((s) => s.type !== "benefit-columns"))) && (
        <motion.section
          ref={sectionsRef}
          className={styles.contentSection}
          initial={skipAnimation ? fadeIn.animate : fadeIn.initial}
          animate={effectiveSectionsInView ? fadeIn.animate : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className={styles.contentInner}>
            {mockupsBelow.length > 0 && (
              <div className={styles.mockupGrid}>
                {mockupsBelow.map((m, i) => (
                  <MockupCard key={i} mockup={m} defaultAlt={defaultAlt} />
                ))}
              </div>
            )}
            {sections && (() => {
              const sectionsToShow = sections.filter((s) => s.type !== "benefit-columns");
              if (sectionsToShow.length === 0) return null;
              return (
                <>
                  {sectionsToShow.map((section, i) => (
                    <div key={i} className={styles.sectionBlock}>
                      <InfoSectionRenderer
                        section={section}
                        benefitColumnsHidePills={false}
                      />
                    </div>
                  ))}
                </>
              );
            })()}
          </div>
        </motion.section>
      )}

      {cta && !hero && (
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
