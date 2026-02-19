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
  "ktalk",
  "krisk",
  "kabl",
  "kcard",
  "kbpm",
  "kim",
  "kaxis",
  "kleads",
  "kai",
] as const;

export type TechDescriptionKey = (typeof TECH_DESCRIPTION_KEYS)[number];

/* Technology data - same copy as navbar dropdown; exported for drawer/nav. Descriptions come from landing.technologies. */
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
    title: "K-Talk",
    logoLight: "/logos/ktalk-logo-light.svg",
    logoDark: "/logos/ktalk-logo-dark.svg",
    descriptionKey: "ktalk",
    href: "/technologies/ktalk",
  },
  {
    title: "K-Risk",
    logoLight: "/logos/krisk-logo-light.svg",
    logoDark: "/logos/krisk-logo-dark.svg",
    descriptionKey: "krisk",
    href: "/technologies/krisk",
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
    title: "K-Insights",
    logoLight: "/logos/kleads-logo-light.svg",
    logoDark: "/logos/kleads-logo-dark.svg",
    descriptionKey: "kleads",
    href: "/technologies/kleads",
  },
  {
    title: "K-Wallet",
    logoLight: "/logos/kai-logo-light.svg",
    logoDark: "/logos/kai-logo-dark.svg",
    descriptionKey: "kai",
    href: "/technologies/kai",
  },
];

/* Left row (5): K-Pay, K-Insights, K-Talk, K-Connect, K-Risk */
const LEFT_ORDER = [5, 9, 2, 8, 3];

/* Right row (6): K-Rails, Kena, K-Wallet, KABL, K-Comply, K-Ledger */
const RIGHT_ORDER_FIXED = [0, 1, 10, 4, 6, 7];

export function SVGLogo({ src, className }: { src: string; className?: string }) {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((text) => {
        const processed = text.replace(/<\?xml[^>]*\?>/i, "");
        setSvgContent(processed);
      })
      .catch((err) => console.error("Failed to load SVG:", err));
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
  /** When set, renders a top row with this title on the left and carousel buttons on the right (e.g. "Our Technologies"). */
  headerTitle?: string;
} = {}) {
  const t = useTranslations("landing");
  const { effectiveTheme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const kleadsLogoRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [logoHeight, setLogoHeight] = useState<number>(40);
  const [expandedIndex, setExpandedIndex] = useState<{
    side: "left" | "right";
    index: number;
  } | null>(null);
  const getDescription = useCallback(
    (tech: (typeof TECHNOLOGIES)[0]) => t(`technologies.${tech.descriptionKey}`),
    [t]
  );
  const logoSrc = useCallback(
    (tech: (typeof TECHNOLOGIES)[0]) =>
      effectiveTheme === "dark" ? tech.logoDark : tech.logoLight,
    [effectiveTheme]
  );

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(updateScrollState);
    });
    ro.observe(el);
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

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
    // Initial measure after a tick (SVG may not be loaded yet)
    const t = setTimeout(() => {
      const svg = el.querySelector("svg");
      if (svg) {
        const h = svg.getBoundingClientRect().height;
        if (h > 0) setLogoHeight(h);
      }
    }, 100);
    return () => {
      ro.disconnect();
      clearTimeout(t);
    };
  }, [effectiveTheme]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth;
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  const carouselNavEl =
    canScrollLeft || canScrollRight ? (
      <div className={styles.carouselNav}>
        <button
          type="button"
          className={styles.carouselBtn}
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          Previous
        </button>
        <button
          type="button"
          className={styles.carouselBtn}
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          Next
        </button>
      </div>
    ) : null;

  return (
    <TooltipProvider delayDuration={200}>
      <div
        ref={wrapperRef}
        className={`${styles.wrapper} ${className ?? ""}`.trim()}
        style={{ "--tech-logo-height": `${logoHeight}px` } as React.CSSProperties}
      >
        {headerTitle ? (
          <div className={styles.headerRow}>
            <h3 className={styles.headerTitle}>{headerTitle}</h3>
            {carouselNavEl}
          </div>
        ) : null}
        <div ref={scrollRef} className={styles.scrollContainer}>
          {leftTechs.map((tech, index) => (
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

          {rightTechs.map((tech, index) => (
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

        {!headerTitle && carouselNavEl}
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
