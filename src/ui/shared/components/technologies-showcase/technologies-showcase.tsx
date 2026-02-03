"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { KlabLogo } from "@/ui/shared/components/klab-logo/klab-logo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/shared/components/tooltip/tooltip";
import { useTheme } from "@/ui/shared/hooks/use-theme";
import styles from "./technologies-showcase.module.css";

/* Technology data - same copy as navbar dropdown; exported for drawer/nav */
export const TECHNOLOGIES = [
  {
    title: "K-Rails",
    logoLight: "/logos/krails-logo-light.svg",
    logoDark: "/logos/krails-logo-dark.svg",
    description: "B2B blockchain payments and lending with instant settlements",
    href: "/technologies/k-rails",
  },
  {
    title: "Kena",
    logoLight: "/logos/kena-logo-light.svg",
    logoDark: "/logos/kena-logo-dark.svg",
    description: "World's first AI underwriter for intelligent credit decisions",
    href: "/technologies/kena",
  },
  {
    title: "K-Talk",
    logoLight: "/logos/ktalk-logo-light.svg",
    logoDark: "/logos/ktalk-logo-dark.svg",
    description: "AI-powered chatbot for internal and external support",
    href: "/technologies/k-talk",
  },
  {
    title: "K-Risk",
    logoLight: "/logos/krisk-logo-light.svg",
    logoDark: "/logos/krisk-logo-dark.svg",
    description: "AI-powered risk assessment and decision making",
    href: "/technologies/kena",
  },
  {
    title: "KABL",
    logoLight: "/logos/kabl-logo-light.svg",
    logoDark: "/logos/kabl-logo-dark.svg",
    description: "Integrated automation eliminating silos with AI and blockchain",
    href: "/technologies/kabl",
  },
  {
    title: "K-Pay",
    logoLight: "/logos/kcard-logo-light.svg",
    logoDark: "/logos/kcard-logo-dark.svg",
    description: "Multi-currency payment gateway with real-time FX",
    href: "/technologies/k-pay",
  },
  {
    title: "K-Comply",
    logoLight: "/logos/kbpm-logo-light.svg",
    logoDark: "/logos/kbpm-logo-dark.svg",
    description: "Regulatory compliance automation with blockchain",
    href: "/technologies/k-comply",
  },
  {
    title: "K-Ledger",
    logoLight: "/logos/kim-logo-light.svg",
    logoDark: "/logos/kim-logo-dark.svg",
    description: "Immutable transaction ledger with enterprise security",
    href: "/technologies/k-ledger",
  },
  {
    title: "K-Connect",
    logoLight: "/logos/kaxis-logo-light.svg",
    logoDark: "/logos/kaxis-logo-dark.svg",
    description: "API-first platform connecting financial institutions",
    href: "/technologies/k-connect",
  },
  {
    title: "K-Insights",
    logoLight: "/logos/kleads-logo-light.svg",
    logoDark: "/logos/kleads-logo-dark.svg",
    description: "Real-time analytics and predictive insights",
    href: "/technologies/k-insights",
  },
  {
    title: "K-Wallet",
    logoLight: "/logos/kai-logo-light.svg",
    logoDark: "/logos/kai-logo-dark.svg",
    description: "Enterprise digital wallet with multi-signature support",
    href: "/technologies/k-wallet",
  },
];

/* Left row (5): K-Pay, K-Insights, K-Talk, K-Connect, K-Risk */
const LEFT_ORDER = [5, 9, 2, 8, 3];

/* Right row (6): K-Rails, Kena, K-Wallet, KABL, K-Comply, K-Ledger */
const RIGHT_ORDER_FIXED = [0, 1, 10, 4, 6, 7];

function SVGLogo({ src, className }: { src: string; className?: string }) {
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
  const { effectiveTheme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<{
    side: "left" | "right";
    index: number;
  } | null>(null);
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
      <div ref={wrapperRef} className={`${styles.wrapper} ${className ?? ""}`.trim()}>
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
            />
          ))}

          <div className={styles.centerItem}>
            <div className={styles.centerCircle}>
              <div className={styles.centerBackground}>
                <Image
                  src="/bg-wave.jpeg"
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
  logoSrc,
  side,
  isExpanded,
  onToggle,
  onLinkClick,
  expandOnFirstTap,
  SVGLogo: LogoComponent,
}: {
  tech: (typeof TECHNOLOGIES)[0];
  logoSrc: string;
  side: "left" | "right";
  isExpanded: boolean;
  onToggle: () => void;
  onLinkClick?: () => void;
  expandOnFirstTap?: boolean;
  SVGLogo: typeof SVGLogo;
}) {
  return (
    <div
      className={`${styles.techItem} ${isExpanded ? styles.expanded : ""}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) onToggle();
      }}
    >
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
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={styles.techContent}>
              <div className={styles.techLogo}>
                <LogoComponent src={logoSrc} />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={60} className={styles.techTooltip}>
            {tech.description}
          </TooltipContent>
        </Tooltip>
      </Link>
      {/* Inline description for touch/expanded only; hover uses Radix Tooltip */}
      <div className={styles.description} role="tooltip" aria-hidden>
        {tech.description}
      </div>
    </div>
  );
}
