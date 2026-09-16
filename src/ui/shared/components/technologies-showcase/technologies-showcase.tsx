"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ProductLogo } from "@k-lab/components";
import { KlabLogo } from "@/ui/shared/components/klab-logo/klab-logo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/shared/components/tooltip/tooltip";
import { useTheme } from "@/ui/shared/hooks/use-theme";
import { BRAND_LOGO_SRC, BRAND_PRODUCT_SLUG } from "@/ui/shared/components/addon-spheres/brand-logos";
import { TechnologiesShowcaseLogoArrow } from "./technologies-showcase-arrow";
import styles from "./technologies-showcase.module.css";

const TECH_DESCRIPTION_KEYS = ["krails", "ktalk", "krisk", "kleads"] as const;

export type TechDescriptionKey = (typeof TECH_DESCRIPTION_KEYS)[number];

/* Technology data - same copy as navbar dropdown; exported for drawer/nav. Descriptions come from technologiesShowcase.technologies. */
export const TECHNOLOGIES: {
  title: string;
  logoLight: string;
  logoDark: string;
  descriptionKey: TechDescriptionKey;
  /** Product page href. Omit when the product has no standalone page. */
  href?: string;
  product?: (typeof BRAND_PRODUCT_SLUG)[keyof typeof BRAND_PRODUCT_SLUG];
}[] = [
  {
    title: "K-Rails",
    logoLight: BRAND_LOGO_SRC.krails.white,
    logoDark: BRAND_LOGO_SRC.krails.dark,
    descriptionKey: "krails",
    href: "/krails",
    product: BRAND_PRODUCT_SLUG.krails,
  },
  {
    title: "K-Talk",
    logoLight: BRAND_LOGO_SRC.ktalk.white,
    logoDark: BRAND_LOGO_SRC.ktalk.dark,
    descriptionKey: "ktalk",
    product: BRAND_PRODUCT_SLUG.ktalk,
  },
  {
    title: "K-Risk",
    logoLight: BRAND_LOGO_SRC.krisk.white,
    logoDark: BRAND_LOGO_SRC.krisk.dark,
    descriptionKey: "krisk",
    product: BRAND_PRODUCT_SLUG.krisk,
  },
  {
    title: "K-Leads",
    logoLight: BRAND_LOGO_SRC.kleads.white,
    logoDark: BRAND_LOGO_SRC.kleads.dark,
    descriptionKey: "kleads",
    product: BRAND_PRODUCT_SLUG.kleads,
  },
];

/* Left: K-Rails, K-Talk */
const LEFT_ORDER = [0, 1];

/* Right: K-Risk, K-Leads */
const RIGHT_ORDER_FIXED = [2, 3];

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

const leftTechs = LEFT_ORDER.map((i) => TECHNOLOGIES[i]).filter(Boolean);
const rightTechs = RIGHT_ORDER_FIXED.map((i) => TECHNOLOGIES[i]).filter(Boolean);

/** KLeads is the widest logo - used as the full-width reference; others match its height. */
const WIDEST_LOGO_KEY: TechDescriptionKey = "kleads";

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

  const visibleLeftTechs = leftTechs;
  const visibleRightTechs = rightTechs;
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
      const mark = [...el.querySelectorAll("img, svg")].find(
        (node) => getComputedStyle(node).display !== "none"
      );
      if (mark) {
        const h = mark.getBoundingClientRect().height;
        if (h > 0) setLogoHeight(h);
      }
    });
    ro.observe(el);
    const tId = setTimeout(() => {
      const mark = [...el.querySelectorAll("img, svg")].find(
        (node) => getComputedStyle(node).display !== "none"
      );
      if (mark) {
        const h = mark.getBoundingClientRect().height;
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
              key={`left-${tech.descriptionKey}-${index}`}
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
                  src="/images/bg-logo-left.webp"
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
              key={`right-${tech.descriptionKey}-${index}`}
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
  const circleClass = `${styles.techCircle} ${side === "left" ? styles.leftHalf : styles.rightHalf}`;
  const circleContent = (
    <div className={styles.techContent}>
      <div
        ref={logoRef}
        className={`${styles.techLogo} ${isWidestLogo ? styles.techLogoWidest : ""}`}
      >
        {tech.product ? (
          <ProductLogo
            product={tech.product}
            className={styles.techLogoImg}
            wrapperClassName={styles.techLogoMark}
            aria-hidden
          />
        ) : (
          <LogoComponent src={logoSrc} />
        )}
        <TechnologiesShowcaseLogoArrow />
      </div>
    </div>
  );

  return (
    <div
      className={`${styles.techItem} ${isExpanded ? styles.expanded : ""}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) onToggle();
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          {tech.href ? (
            <Link
              href={tech.href}
              className={circleClass}
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
              {circleContent}
            </Link>
          ) : (
            <button
              type="button"
              className={circleClass}
              onFocus={() => expandOnFirstTap && onToggle()}
              onClick={() => onToggle()}
              aria-label={tech.title}
            >
              {circleContent}
            </button>
          )}
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
