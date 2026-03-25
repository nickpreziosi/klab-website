"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ClientOnly } from "@/ui/shared/components/client-only/client-only";
import { KlabLogo } from "@/ui/shared/components/klab-logo/klab-logo";
import Button from "@/ui/shared/components/button/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/shared/components/popover/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/shared/components/tooltip/tooltip";
import { useTranslations } from "next-intl";
import { useTheme } from "@/ui/shared/hooks/use-theme";
import styles from "./technologies-showcase-vertical.module.css";

const BREAKPOINT_DESKTOP = 1024;

const TECH_KEYS = [
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

type TechKey = (typeof TECH_KEYS)[number];

const TECHNOLOGIES: {
  title: string;
  logoLight: string;
  logoDark: string;
  descriptionKey: TechKey;
}[] = [
  {
    title: "KRails",
    logoLight: "/logos/krails-logo-light.svg",
    logoDark: "/logos/krails-logo-dark.svg",
    descriptionKey: "krails",
  },
  {
    title: "Kena",
    logoLight: "/logos/kena-logo-light.svg",
    logoDark: "/logos/kena-logo-dark.svg",
    descriptionKey: "kena",
  },
  {
    title: "KTalk",
    logoLight: "/logos/ktalk-logo-light.svg",
    logoDark: "/logos/ktalk-logo-dark.svg",
    descriptionKey: "ktalk",
  },
  {
    title: "KRisk",
    logoLight: "/logos/krisk-logo-light.svg",
    logoDark: "/logos/krisk-logo-dark.svg",
    descriptionKey: "krisk",
  },
  {
    title: "KAbl",
    logoLight: "/logos/kabl-logo-light.svg",
    logoDark: "/logos/kabl-logo-dark.svg",
    descriptionKey: "kabl",
  },
  {
    title: "KCard",
    logoLight: "/logos/kcard-logo-light.svg",
    logoDark: "/logos/kcard-logo-dark.svg",
    descriptionKey: "kcard",
  },
  {
    title: "KBpm",
    logoLight: "/logos/kbpm-logo-light.svg",
    logoDark: "/logos/kbpm-logo-dark.svg",
    descriptionKey: "kbpm",
  },
  {
    title: "Kim",
    logoLight: "/logos/kim-logo-light.svg",
    logoDark: "/logos/kim-logo-dark.svg",
    descriptionKey: "kim",
  },
  {
    title: "KAxis",
    logoLight: "/logos/kaxis-logo-light.svg",
    logoDark: "/logos/kaxis-logo-dark.svg",
    descriptionKey: "kaxis",
  },
  {
    title: "KLeads",
    logoLight: "/logos/kleads-logo-light.svg",
    logoDark: "/logos/kleads-logo-dark.svg",
    descriptionKey: "kleads",
  },
  {
    title: "Kai",
    logoLight: "/logos/kai-logo-light.svg",
    logoDark: "/logos/kai-logo-dark.svg",
    descriptionKey: "kai",
  },
];

const LEFT_ORDER = [5, 9, 2, 8, 3];
const RIGHT_ORDER_FIXED = [0, 1, 10, 4, 6, 7];

const leftTechs = LEFT_ORDER.map((i) => TECHNOLOGIES[i]).filter(Boolean);
const rightTechs = RIGHT_ORDER_FIXED.map((i) => TECHNOLOGIES[i]).filter(Boolean);

const WIDEST_LOGO_KEY: TechKey = "kleads";

/**
 * Allowlist for which technology semicircles should be visible.
 * Keep the rest of the data intact so we can re-enable later.
 */
const VISIBLE_TECH_KEYS: readonly TechKey[] = ["kleads", "krisk", "krails", "kena"];
const VISIBLE_TECH_KEY_SET = new Set<TechKey>(VISIBLE_TECH_KEYS);

const visibleLeftTechs = leftTechs.filter((tech) => VISIBLE_TECH_KEY_SET.has(tech.descriptionKey));
const visibleRightTechs = rightTechs.filter((tech) => VISIBLE_TECH_KEY_SET.has(tech.descriptionKey));

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${BREAKPOINT_DESKTOP}px)`);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

// Cache SVG content by src so logos don't flash on locale change (remount)
const svgCache = new Map<string, string>();

function SVGLogo({ src, className }: { src: string; className?: string }) {
  const [svgContent, setSvgContent] = useState<string>(() => svgCache.get(src) ?? "");

  useEffect(() => {
    const cached = svgCache.get(src);
    if (cached) {
      setSvgContent(cached);
      return;
    }
    fetch(src)
      .then((res) => res.text())
      .then((text) => {
        const processed = text.replace(/<\?xml[^>]*\?>/i, "");
        svgCache.set(src, processed);
        setSvgContent(processed);
      })
      .catch((err) => console.error("Failed to load SVG:", err));
  }, [src]);

  if (!svgContent) return null;
  return <div className={className} dangerouslySetInnerHTML={{ __html: svgContent }} />;
}

type ShowcaseVariant = "orange" | "wave";

function CenterCircle({ variant }: { variant: ShowcaseVariant }) {
  const centerBgSrc = variant === "wave" ? "/images/bg-orange.webp" : "/images/bg-wave.webp";
  return (
    <div className={styles.centerItem}>
      <div className={styles.centerCircle}>
        <div className={styles.centerBackground}>
          <Image src={centerBgSrc} alt="" fill sizes="(max-width: 1440px) 120px, 160px" priority />
        </div>
        <div className={styles.centerContent}>
          {variant === "wave" ? (
            <KlabLogo color="light" format="full" height="auto" width="100%" />
          ) : (
            <KlabLogo
              color="orange"
              format="full"
              fullLogoTheme="dark"
              height="auto"
              width="100%"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function TechSlot({
  tech,
  logoSrc,
  description,
  learnMoreLabel,
  side,
  isExpanded,
  onToggle,
  SVGLogo: LogoComponent,
  variant,
  isWidestLogo,
  logoRef,
  popoverContentClassName,
}: {
  tech: (typeof TECHNOLOGIES)[0];
  logoSrc: string;
  description: string;
  learnMoreLabel: string;
  side: "left" | "right";
  isExpanded: boolean;
  onToggle: () => void;
  SVGLogo: typeof SVGLogo;
  variant: "desktop" | "mobile";
  isWidestLogo?: boolean;
  logoRef?: React.RefObject<HTMLDivElement | null>;
  popoverContentClassName?: string;
}) {
  const tooltipClass = styles.techTooltip;
  const tooltipSide = "bottom";
  const logoClassName =
    variant === "mobile" && isWidestLogo
      ? `${styles.techLogo} ${styles.techLogoWidest}`
      : styles.techLogo;

  if (variant === "mobile") {
    return (
      <div className={styles.techItem}>
        <Popover open={isExpanded} onOpenChange={() => onToggle()}>
          <PopoverTrigger asChild>
            <div
              role="button"
              tabIndex={0}
              className={`${styles.techCircle} ${side === "left" ? styles.leftHalf : styles.rightHalf}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onToggle();
                }
              }}
              aria-label={tech.title}
            >
              <div className={styles.techContent}>
                <div ref={logoRef} className={logoClassName}>
                  <LogoComponent src={logoSrc} />
                </div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            side={side === "left" ? "bottom" : "top"}
            sideOffset={12}
            align="center"
            className={[styles.popoverMobile, popoverContentClassName].filter(Boolean).join(" ")}
          >
            <div className={styles.popoverMobileContent}>
              <h4 className={styles.popoverMobileTitle}>{tech.title}</h4>
              <p className={styles.popoverMobileDescription}>{description}</p>
              <Button
                href={`/technologies/${tech.descriptionKey}`}
                variant="accent-brand"
                className={styles.popoverMobileLink}
              >
                {learnMoreLabel}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <div
      className={`${styles.techItem} ${isExpanded ? styles.expanded : ""}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) onToggle();
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            role="button"
            tabIndex={0}
            className={`${styles.techCircle} ${side === "left" ? styles.leftHalf : styles.rightHalf}`}
            onFocus={() => onToggle()}
            onClick={() => onToggle()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onToggle();
              }
            }}
            aria-label={tech.title}
          >
            <div className={styles.techContent}>
              <div className={styles.techLogo}>
                <LogoComponent src={logoSrc} />
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side={tooltipSide} sideOffset={24} className={tooltipClass}>
          {description}
        </TooltipContent>
      </Tooltip>
      <div className={styles.description} role="tooltip" aria-hidden>
        {description}
      </div>
    </div>
  );
}

export function TechnologiesShowcaseVertical({
  variant = "orange",
  className,
  /** When provided (from server), descriptions are SSR'd; otherwise use client useTranslations */
  technologiesDescriptions,
  /** When true, mobile uses site theme (same as desktop TechnologiesShowcase); use on home page */
  useThemeForMobile = false,
}: {
  variant?: ShowcaseVariant;
  className?: string;
  technologiesDescriptions?: Record<string, string>;
  useThemeForMobile?: boolean;
} = {}) {
  const isDesktop = useIsDesktop();
  const t = useTranslations("technologiesShowcase");
  const tCommon = useTranslations("common");
  const { effectiveTheme } = useTheme();
  const kleadsLogoRef = useRef<HTMLDivElement>(null);
  // Controls how tall the technology logos are within each semicircle.
  // We clamp measurement to this value so the SVGs don't overflow vertically.
  const MOBILE_ICON_HEIGHT = 34;
  const [logoHeight, setLogoHeight] = useState(MOBILE_ICON_HEIGHT);
  const [expandedIndex, setExpandedIndex] = useState<{
    side: "left" | "right";
    index: number;
  } | null>(null);

  const setLeft = (index: number) =>
    setExpandedIndex((prev) =>
      prev?.side === "left" && prev?.index === index ? null : { side: "left", index }
    );
  const setRight = (index: number) =>
    setExpandedIndex((prev) =>
      prev?.side === "right" && prev?.index === index ? null : { side: "right", index }
    );

  const getDescription = (tech: (typeof TECHNOLOGIES)[0]) =>
    technologiesDescriptions?.[tech.descriptionKey] ?? t(`technologies.${tech.descriptionKey}`);

  // Desktop: always light circles → dark logos. Mobile: if useThemeForMobile, match desktop (theme circles + logo by effectiveTheme)
  const logoSrc = (tech: (typeof TECHNOLOGIES)[0]) => tech.logoDark;
  const mobileLogoSrc = (tech: (typeof TECHNOLOGIES)[0]) =>
    useThemeForMobile
      ? effectiveTheme === "dark"
        ? tech.logoDark
        : tech.logoLight
      : tech.logoDark;

  // Mobile: measure KLeads (widest) logo height so other logos can match
  useEffect(() => {
    const el = kleadsLogoRef.current;
    if (!el) return;
    const MAX_MOBILE_LOGO_HEIGHT = MOBILE_ICON_HEIGHT;
    const measure = () => {
      const svg = el.querySelector("svg");
      if (svg) {
        const h = Math.min(svg.getBoundingClientRect().height, MAX_MOBILE_LOGO_HEIGHT);
        if (h > 0) setLogoHeight(h);
      }
    };
    const ro = new ResizeObserver(() => requestAnimationFrame(measure));
    ro.observe(el);
    measure();
    const t1 = setTimeout(measure, 100);
    const t2 = setTimeout(measure, 400);
    return () => {
      ro.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const placeholder = (
    <div
      className={`${styles.wrapperMobile} ${className ?? ""}`.trim()}
      style={{ minHeight: 380 }}
      aria-hidden
    />
  );

  return (
    <ClientOnly placeholder={placeholder}>
      {isDesktop ? (
        <TooltipProvider delayDuration={200}>
          <div className={`${styles.wrapperDesktop} ${className ?? ""}`.trim()}>
            <div className={styles.gridDesktop}>
              {visibleLeftTechs.map((tech, index) => (
                <TechSlot
                  key={`left-${tech.title}-${index}`}
                  tech={tech}
                  logoSrc={logoSrc(tech)}
                  description={getDescription(tech)}
                  learnMoreLabel={tCommon("learnMore")}
                  side="left"
                  isExpanded={expandedIndex?.side === "left" && expandedIndex?.index === index}
                  onToggle={() => setLeft(index)}
                  SVGLogo={SVGLogo}
                  variant="desktop"
                />
              ))}
              <CenterCircle variant={variant} />
              {visibleRightTechs.map((tech, index) => (
                <TechSlot
                  key={`right-${tech.title}-${index}`}
                  tech={tech}
                  logoSrc={logoSrc(tech)}
                  description={getDescription(tech)}
                  learnMoreLabel={tCommon("learnMore")}
                  side="right"
                  isExpanded={expandedIndex?.side === "right" && expandedIndex?.index === index}
                  onToggle={() => setRight(index)}
                  SVGLogo={SVGLogo}
                  variant="desktop"
                />
              ))}
            </div>
          </div>
        </TooltipProvider>
      ) : (
        <div
          className={[
            styles.wrapperMobile,
            useThemeForMobile ? styles.wrapperMobileThemeAware : "",
            className ?? "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={
            {
              "--tech-logo-height": `${logoHeight}px`,
              "--icon-height": `${MOBILE_ICON_HEIGHT}px`,
            } as React.CSSProperties
          }
        >
          <div className={styles.columnMobile}>
            <div className={styles.rowMobileTop}>
              {visibleLeftTechs.map((tech, index) => (
                <TechSlot
                  key={`left-${tech.title}-${index}`}
                  tech={tech}
                  logoSrc={mobileLogoSrc(tech)}
                  description={getDescription(tech)}
                  learnMoreLabel={tCommon("learnMore")}
                  side="left"
                  isExpanded={expandedIndex?.side === "left" && expandedIndex?.index === index}
                  onToggle={() => setLeft(index)}
                  SVGLogo={SVGLogo}
                  variant="mobile"
                  isWidestLogo={tech.descriptionKey === WIDEST_LOGO_KEY}
                  logoRef={tech.descriptionKey === WIDEST_LOGO_KEY ? kleadsLogoRef : undefined}
                  popoverContentClassName={
                    useThemeForMobile ? styles.popoverMobileThemeAware : undefined
                  }
                />
              ))}
            </div>
            <CenterCircle variant={variant} />
            <div className={styles.rowMobileBottom}>
              {visibleRightTechs.map((tech, index) => (
                <TechSlot
                  key={`right-${tech.title}-${index}`}
                  tech={tech}
                  logoSrc={mobileLogoSrc(tech)}
                  description={getDescription(tech)}
                  learnMoreLabel={tCommon("learnMore")}
                  side="right"
                  isExpanded={expandedIndex?.side === "right" && expandedIndex?.index === index}
                  onToggle={() => setRight(index)}
                  SVGLogo={SVGLogo}
                  variant="mobile"
                  isWidestLogo={tech.descriptionKey === WIDEST_LOGO_KEY}
                  logoRef={tech.descriptionKey === WIDEST_LOGO_KEY ? kleadsLogoRef : undefined}
                  popoverContentClassName={
                    useThemeForMobile ? styles.popoverMobileThemeAware : undefined
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </ClientOnly>
  );
}
