"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { KlabLogo } from "@/ui/shared/components/klab-logo/klab-logo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/shared/components/tooltip/tooltip";
import { useTheme } from "@/ui/shared/hooks/use-theme";
import styles from "./technologies-showcase.module.css";

const TECH_DESCRIPTION_KEYS = [
  "krails",
  "kena",
  "krisk",
  "kleads",
  "kabl",
  "kcard",
  "kbpm",
  "kim",
  "kaxis",
  "kai",
] as const;

export type TechDescriptionKey = (typeof TECH_DESCRIPTION_KEYS)[number];

/* Technology data - same copy as navbar dropdown; exported for drawer/nav. Descriptions come from technologiesShowcase.technologies. */
export const TECHNOLOGIES: {
  title: string;
  logoLight: string;
  logoDark: string;
  descriptionKey: TechDescriptionKey;
  href: string;
}[] = [
  {
    title: "K-Rails",
    logoLight: "/logos/krails-logo-light.svg",
    logoDark: "/logos/krails-logo-dark.svg",
    descriptionKey: "krails",
    href: "/technologies/krails",
  },
  {
    title: "Kena",
    logoLight: "/logos/kena-logo-light.svg",
    logoDark: "/logos/kena-logo-dark.svg",
    descriptionKey: "kena",
    href: "/technologies/kena",
  },
  {
    title: "K-Risk",
    logoLight: "/logos/krisk-logo-light.svg",
    logoDark: "/logos/krisk-logo-dark.svg",
    descriptionKey: "krisk",
    href: "/technologies/krisk",
  },
  {
    title: "K-Leads",
    logoLight: "/logos/kleads-logo-light.svg",
    logoDark: "/logos/kleads-logo-dark.svg",
    descriptionKey: "kleads",
    href: "/technologies/kleads",
  },
  {
    title: "KABL",
    logoLight: "/logos/kabl-logo-light.svg",
    logoDark: "/logos/kabl-logo-dark.svg",
    descriptionKey: "kabl",
    href: "/technologies/kabl",
  },
  {
    title: "K-Pay",
    logoLight: "/logos/kcard-logo-light.svg",
    logoDark: "/logos/kcard-logo-dark.svg",
    descriptionKey: "kcard",
    href: "/technologies/kcard",
  },
  {
    title: "K-Comply",
    logoLight: "/logos/kbpm-logo-light.svg",
    logoDark: "/logos/kbpm-logo-dark.svg",
    descriptionKey: "kbpm",
    href: "/technologies/kbpm",
  },
  {
    title: "K-Ledger",
    logoLight: "/logos/kim-logo-light.svg",
    logoDark: "/logos/kim-logo-dark.svg",
    descriptionKey: "kim",
    href: "/technologies/kim",
  },
  {
    title: "K-Connect",
    logoLight: "/logos/kaxis-logo-light.svg",
    logoDark: "/logos/kaxis-logo-dark.svg",
    descriptionKey: "kaxis",
    href: "/technologies/kaxis",
  },
  {
    title: "K-Wallet",
    logoLight: "/logos/kai-logo-light.svg",
    logoDark: "/logos/kai-logo-dark.svg",
    descriptionKey: "kai",
    href: "/technologies/kai",
  },
];

/* Left row (4): K-Rails, Kena, K-Pay, K-Connect */
const LEFT_ORDER = [0, 1, 5, 8];

/* Right row (6): K-Risk, K-Leads, K-Wallet, KABL, K-Comply, K-Ledger */
const RIGHT_ORDER_FIXED = [2, 3, 9, 4, 6, 7];

/** Cache SVG content by URL so dropdown/drawer and theme switches reuse the same fetch. */
const svgContentCache = new Map<string, Promise<string>>();

function getCachedSvgContent(src: string): Promise<string> {
  let p = svgContentCache.get(src);
  if (!p) {
    p = fetch(src)
      .then((res) => res.text())
      .then((text) => text.replace(/<\?xml[^>]*\?>/i, ""))
      .catch((err) => {
        console.error("Failed to load SVG:", err);
        return "";
      });
    svgContentCache.set(src, p);
  }
  return p;
}

/** Preload technology logo SVGs for one or both themes so dropdown/drawer render without delay. */
export function preloadTechnologyLogos(theme?: "light" | "dark") {
  const urls = new Set<string>();
  for (const tech of TECHNOLOGIES) {
    if (theme === "dark" || theme === undefined) urls.add(tech.logoDark);
    if (theme === "light" || theme === undefined) urls.add(tech.logoLight);
  }
  urls.forEach((src) => getCachedSvgContent(src));
}

export function SVGLogo({ src, className }: { src: string; className?: string }) {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    getCachedSvgContent(src).then((content) => {
      if (!cancelled) setSvgContent(content);
    });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!svgContent) return null;
  return <div className={className} dangerouslySetInnerHTML={{ __html: svgContent }} />;
}

const ArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const leftTechs = LEFT_ORDER.map((i) => TECHNOLOGIES[i]).filter(Boolean);
const rightTechs = RIGHT_ORDER_FIXED.map((i) => TECHNOLOGIES[i]).filter(Boolean);

/** KLeads is the widest logo - used as the full-width reference; others match its height. */
const WIDEST_LOGO_KEY: TechDescriptionKey = "kleads";

/**
 * Allowlist for which technology semicircles should be visible.
 * Keep the rest of the data intact so we can re-enable later.
 */
const NAVIGABLE_TECH_KEYS: readonly TechDescriptionKey[] = ["krails", "kena", "krisk", "kleads"];
const NAVIGABLE_TECH_KEY_SET = new Set<TechDescriptionKey>(NAVIGABLE_TECH_KEYS);

export function TechnologiesShowcase({
  onLinkClick,
  className,
  expandOnFirstTap = true,
  headerTitle,
}: {
  onLinkClick?: () => void;
  className?: string;
  /** When false (e.g. in dropdown), every click navigates. When true (standalone page), first tap on touch expands, second navigates. */
  expandOnFirstTap?: boolean;
  /** When set, renders a top row with this title (e.g. "Our Technologies"). */
  headerTitle?: string;
} = {}) {
  const t = useTranslations("technologiesShowcase");
  const { effectiveTheme } = useTheme();
  const gridRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const kleadsLogoRef = useRef<HTMLDivElement>(null);
  const [logoHeight, setLogoHeight] = useState<number>(40);
  const [expandedIndex, setExpandedIndex] = useState<{
    side: "left" | "right";
    index: number;
  } | null>(null);

  const visibleLeftTechs = leftTechs.filter((tech) => NAVIGABLE_TECH_KEY_SET.has(tech.descriptionKey));
  const visibleRightTechs = rightTechs.filter((tech) => NAVIGABLE_TECH_KEY_SET.has(tech.descriptionKey));
  // Keep the center K-Lab circle occupying 2 columns, and distribute the remaining
  // columns evenly based on how many visible tech semicircles are on each side.
  // This avoids "placeholder" DOM and keeps the remaining items centered.
  const gridTemplateColumns = [
    `repeat(${visibleLeftTechs.length}, minmax(0, 1fr))`,
    "minmax(60px, 1fr)",
    "minmax(60px, 1fr)",
    `repeat(${visibleRightTechs.length}, minmax(0, 1fr))`,
  ].join(" ");

  const getDescription = useCallback(
    (tech: (typeof TECHNOLOGIES)[0]) => t(`technologies.${tech.descriptionKey}`),
    [t]
  );
  const logoSrc = useCallback(
    (tech: (typeof TECHNOLOGIES)[0]) =>
      effectiveTheme === "dark" ? tech.logoDark : tech.logoLight,
    [effectiveTheme]
  );

  // Measure KLeads logo height when full-width; other logos match this height
  useEffect(() => {
    const el = kleadsLogoRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const svg = el.querySelector("svg");
      if (svg) {
        const h = svg.getBoundingClientRect().height;
        if (h > 0) setLogoHeight(h);
      }
    });
    ro.observe(el);
    const tId = setTimeout(() => {
      const svg = el.querySelector("svg");
      if (svg) {
        const h = svg.getBoundingClientRect().height;
        if (h > 0) setLogoHeight(h);
      }
    }, 100);
    return () => {
      ro.disconnect();
      clearTimeout(tId);
    };
  }, [effectiveTheme]);

  return (
    <TooltipProvider delayDuration={200}>
      <div
        ref={wrapperRef}
        className={`${styles.wrapper} ${className ?? ""}`.trim()}
        style={
          {
            "--tech-logo-height": `${logoHeight}px`,
          } as React.CSSProperties
        }
      >
        {headerTitle ? (
          <div className={styles.headerRow}>
            <h3 className={styles.headerTitle}>{headerTitle}</h3>
          </div>
        ) : null}
        <div ref={gridRef} className={styles.scrollContainer} style={{ gridTemplateColumns }}>
          {visibleLeftTechs.map((tech, index) => (
            <TechSemiCircle
              key={`left-${tech.href}-${index}`}
              tech={tech}
              description={getDescription(tech)}
              logoSrc={logoSrc(tech)}
              side="left"
              isExpanded={expandedIndex?.side === "left" && expandedIndex?.index === index}
              onToggle={() =>
                setExpandedIndex((prev) =>
                  prev?.side === "left" && prev?.index === index ? null : { side: "left", index }
                )
              }
              onLinkClick={onLinkClick}
              expandOnFirstTap={expandOnFirstTap}
              SVGLogo={SVGLogo}
              isWidestLogo={tech.descriptionKey === WIDEST_LOGO_KEY}
              logoRef={tech.descriptionKey === WIDEST_LOGO_KEY ? kleadsLogoRef : undefined}
            />
          ))}

          <div className={styles.centerItem}>
            <div className={styles.centerCircle}>
              <div className={styles.centerBackground}>
                <Image
                  src="/images/bg-wave.webp"
                  alt=""
                  fill
                  sizes="(max-width: 1440px) 120px, 160px"
                  priority
                />
              </div>
              <div className={styles.centerContent}>
                <KlabLogo
                  color="orange"
                  format="full"
                  fullLogoTheme="dark"
                  height="auto"
                  width="100%"
                />
              </div>
            </div>
          </div>

          {visibleRightTechs.map((tech, index) => (
            <TechSemiCircle
              key={`right-${tech.href}-${index}`}
              tech={tech}
              description={getDescription(tech)}
              logoSrc={logoSrc(tech)}
              side="right"
              isExpanded={expandedIndex?.side === "right" && expandedIndex?.index === index}
              onToggle={() =>
                setExpandedIndex((prev) =>
                  prev?.side === "right" && prev?.index === index ? null : { side: "right", index }
                )
              }
              onLinkClick={onLinkClick}
              expandOnFirstTap={expandOnFirstTap}
              SVGLogo={SVGLogo}
              isWidestLogo={tech.descriptionKey === WIDEST_LOGO_KEY}
              logoRef={tech.descriptionKey === WIDEST_LOGO_KEY ? kleadsLogoRef : undefined}
            />
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}

function TechSemiCircle({
  tech,
  description,
  logoSrc,
  side,
  isExpanded,
  onToggle,
  onLinkClick,
  expandOnFirstTap,
  SVGLogo: LogoComponent,
  isWidestLogo,
  logoRef,
}: {
  tech: (typeof TECHNOLOGIES)[0];
  description: string;
  logoSrc: string;
  side: "left" | "right";
  isExpanded: boolean;
  onToggle: () => void;
  onLinkClick?: () => void;
  expandOnFirstTap?: boolean;
  SVGLogo: typeof SVGLogo;
  isWidestLogo: boolean;
  logoRef?: React.RefObject<HTMLDivElement | null>;
}) {
  if (!NAVIGABLE_TECH_KEY_SET.has(tech.descriptionKey)) return null;

  return (
    <div
      className={`${styles.techItem} ${isExpanded ? styles.expanded : ""}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) onToggle();
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={tech.href}
            className={`${styles.techCircle} ${side === "left" ? styles.leftHalf : styles.rightHalf}`}
            onFocus={() => expandOnFirstTap && onToggle()}
            onClick={(e) => {
              if (expandOnFirstTap && !isExpanded) {
                e.preventDefault();
                onToggle();
                return;
              }
              onLinkClick?.();
            }}
            aria-label={tech.title}
          >
            <div className={styles.techContent}>
              <div
                ref={logoRef}
                className={`${styles.techLogo} ${isWidestLogo ? styles.techLogoWidest : ""} ${tech.descriptionKey === "kbpm" ? styles.techLogoKbpm : ""}`}
              >
                <LogoComponent src={logoSrc} />
              </div>
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={24} className={styles.techTooltip}>
          {description}
        </TooltipContent>
      </Tooltip>
      {/* Inline description for touch/expanded only; hover uses Radix Tooltip */}
      <div className={styles.description} role="tooltip" aria-hidden>
        {description}
      </div>
    </div>
  );
}
