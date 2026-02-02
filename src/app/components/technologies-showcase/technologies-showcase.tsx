"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { KlabLogo } from "@/app/components/ui/klab-logo/klab-logo";
import styles from "./technologies-showcase.module.css";

/* Technology data - same copy as navbar dropdown */
const TECHNOLOGIES = [
  {
    title: "K-Rails",
    logo: "/logos/01-KRails.svg",
    description: "B2B blockchain payments and lending with instant settlements",
    href: "/technologies/k-rails",
  },
  {
    title: "Kena",
    logo: "/logos/03-Kena_2.svg",
    description: "World's first AI underwriter for intelligent credit decisions",
    href: "/technologies/kena",
  },
  {
    title: "K-Talk",
    logo: "/logos/05-KTalk.svg",
    description: "AI-powered chatbot for internal and external support",
    href: "/technologies/k-talk",
  },
  {
    title: "K-Risk",
    logo: "/logos/k-risk-logo.svg",
    description: "AI-powered risk assessment and decision making",
    href: "/technologies/kena",
  },
  {
    title: "KABL",
    logo: "/logos/KAbl.svg",
    description: "Integrated automation eliminating silos with AI and blockchain",
    href: "/technologies/kabl",
  },
  {
    title: "K-Pay",
    logo: "/logos/KCard.svg",
    description: "Multi-currency payment gateway with real-time FX",
    href: "/technologies/k-pay",
  },
  {
    title: "K-Comply",
    logo: "/logos/KBPM.svg",
    description: "Regulatory compliance automation with blockchain",
    href: "/technologies/k-comply",
  },
  {
    title: "K-Ledger",
    logo: "/logos/01-K-Lab.svg",
    description: "Immutable transaction ledger with enterprise security",
    href: "/technologies/k-ledger",
  },
  {
    title: "K-Connect",
    logo: "/logos/02-KAxis.svg",
    description: "API-first platform connecting financial institutions",
    href: "/technologies/k-connect",
  },
  {
    title: "K-Insights",
    logo: "/logos/KLeads.svg",
    description: "Real-time analytics and predictive insights",
    href: "/technologies/k-insights",
  },
  {
    title: "K-Wallet",
    logo: "/logos/06-Kai_2.svg",
    description: "Enterprise digital wallet with multi-signature support",
    href: "/technologies/k-wallet",
  },
];

/* Left row (5): K-Pay, K-Insights, K-Talk, K-Connect, K-Risk */
const LEFT_ORDER = [5, 9, 2, 8, 3];

/* Right row (6): K-Rails, Kena, K-Wallet, KABL, K-Comply, K-Ledger */
const RIGHT_ORDER_FIXED = [0, 1, 10, 4, 6, 7];

function SVGLogo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const [svgContent, setSvgContent] = useState<string>("");
  const isKabl = src.includes("KAbl.svg");
  const isKAxis = src.includes("KAxis.svg");

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((text) => {
        let processed = text;
        if (isKabl) {
          processed = processed
            .replace(/fill="#f37022"/g, 'fill="currentColor"')
            .replace(/fill='#f37022'/g, "fill='currentColor'")
            .replace(
              /(<(?:path|polygon|g)[^>]*fill=["']#306fc6["'][^>]*?)\s*(\/?>)/g,
              '$1 class="kabl-blue"$2'
            )
            .replace(
              /(<line[^>]*stroke=["']#306fc6["'][^>]*?)\s*(\/?>)/g,
              '$1 class="kabl-blue-stroke"$2'
            );
        } else if (isKAxis) {
          processed = processed
            .replace(/fill="#f37022"/g, 'fill="currentColor"')
            .replace(/fill='#f37022'/g, "fill='currentColor'")
            .replace(/stroke="#f37022"/g, 'stroke="currentColor"')
            .replace(/stroke='#f37022'/g, "stroke='currentColor'");
        } else {
          processed = processed
            .replace(/fill="#f37022"/g, 'fill="currentColor"')
            .replace(/fill='#f37022'/g, "fill='currentColor'")
            .replace(/fill="#306fc6"/g, 'fill="currentColor"')
            .replace(/fill='#306fc6'/g, "fill='currentColor'");
        }
        processed = processed.replace(/<\?xml[^>]*\?>/i, "");
        setSvgContent(processed);
      })
      .catch((err) => console.error("Failed to load SVG:", err));
  }, [src, isKabl, isKAxis]);

  if (!svgContent) return null;
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<{
    side: "left" | "right";
    index: number;
  } | null>(null);
  const [floatingTooltip, setFloatingTooltip] = useState<{
    description: string;
    left: number;
    top: number;
  } | null>(null);

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

  const showTooltip = (description: string, anchor: DOMRect) => {
    setFloatingTooltip({
      description,
      left: anchor.left + anchor.width / 2,
      top: anchor.bottom + 8,
    });
  };
  const hideTooltip = () => setFloatingTooltip(null);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${className ?? ""}`.trim()}
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
            side="left"
            isExpanded={
              expandedIndex?.side === "left" && expandedIndex?.index === index
            }
            onToggle={() =>
              setExpandedIndex((prev) =>
                prev?.side === "left" && prev?.index === index
                  ? null
                  : { side: "left", index }
              )
            }
            onLinkClick={onLinkClick}
            expandOnFirstTap={expandOnFirstTap}
            onShowTooltip={showTooltip}
            onHideTooltip={hideTooltip}
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
              <KlabLogo color="orange" format="full" height="auto" width="100%" />
            </div>
          </div>
        </div>

        {rightTechs.map((tech, index) => (
          <TechSemiCircle
            key={`right-${tech.href}-${index}`}
            tech={tech}
            side="right"
            isExpanded={
              expandedIndex?.side === "right" &&
              expandedIndex?.index === index
            }
            onToggle={() =>
              setExpandedIndex((prev) =>
                prev?.side === "right" && prev?.index === index
                  ? null
                  : { side: "right", index }
              )
            }
            onLinkClick={onLinkClick}
            expandOnFirstTap={expandOnFirstTap}
            onShowTooltip={showTooltip}
            onHideTooltip={hideTooltip}
            SVGLogo={SVGLogo}
          />
        ))}
      </div>

      {!headerTitle && carouselNavEl}

      {floatingTooltip && (
        <div
          className={styles.floatingTooltip}
          style={{
            left: floatingTooltip.left,
            top: floatingTooltip.top,
            transform: "translateX(-50%)",
          }}
          role="tooltip"
        >
          {floatingTooltip.description}
        </div>
      )}
    </div>
  );
}

function TechSemiCircle({
  tech,
  side,
  isExpanded,
  onToggle,
  onLinkClick,
  expandOnFirstTap,
  onShowTooltip,
  onHideTooltip,
  SVGLogo: LogoComponent,
}: {
  tech: (typeof TECHNOLOGIES)[0];
  side: "left" | "right";
  isExpanded: boolean;
  onToggle: () => void;
  onLinkClick?: () => void;
  expandOnFirstTap?: boolean;
  onShowTooltip?: (description: string, anchor: DOMRect) => void;
  onHideTooltip?: () => void;
  SVGLogo: typeof SVGLogo;
}) {
  return (
    <div
      className={`${styles.techItem} ${isExpanded ? styles.expanded : ""}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) onToggle();
      }}
      onMouseEnter={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        onShowTooltip?.(tech.description, rect);
      }}
      onMouseLeave={() => onHideTooltip?.()}
    >
      <Link
        href={tech.href}
        className={`${styles.techCircle} ${
          side === "left" ? styles.leftHalf : styles.rightHalf
        }`}
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
          <div className={styles.techLogo}>
            <LogoComponent src={tech.logo} />
          </div>
        </div>
      </Link>
      {/* Inline description for touch/expanded only; hover uses floating tooltip */}
      <div className={styles.description} role="tooltip" aria-hidden>
        {tech.description}
      </div>
    </div>
  );
}
