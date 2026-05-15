"use client";
import React, { useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import styles from "./hero-text.module.css";
import Button, { type ButtonProps } from "@/ui/shared/components/button/button";
import { ArrowDownIcon } from "lucide-react";
import { useHomeAnimation } from "@/ui/home/providers/home-animation-provider";
import { getTextDirection, type Locale } from "@/i18n/routing";
import { cn } from "@/ui/shared/utils/utils";

export type HeroTextIconPosition = NonNullable<ButtonProps["iconPosition"]>;

const DEFAULT_PRIMARY_BUTTON_ICON = (
  <svg
    className={cn(styles.primaryButtonIcon, styles.iconRtlMirror)}
    width="20"
    height="20"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

function resolveHeroButtonIcon(
  custom: ReactNode | null | undefined,
  fallback: ReactNode
): ReactNode | undefined {
  if (custom === null) return undefined;
  if (custom === undefined) return fallback;
  return custom;
}

function lucideLikeLabel(iconType: unknown): string {
  if (typeof iconType === "function") {
    const fn = iconType as { displayName?: string; name?: string };
    return (fn.displayName || fn.name || "").trim();
  }
  return "";
}

function iconClassTokens(icon: React.ReactElement): string {
  const props = icon.props as { className?: string };
  return typeof props.className === "string" ? props.className : "";
}

/**
 * Mirrors common forward arrows for Arabic via `.mainTextContainer[dir='rtl'] .iconRtlMirror` in the CSS module.
 * Prefers Lucide `lucide-*` classes when displayName is minified away.
 */
function shouldAutoMirrorIconForRtl(icon: React.ReactElement): boolean {
  const lucideCn = iconClassTokens(icon);
  const skipByClass =
    /\blucide-mail\b|\blucide-plus\b|\blucide-loader\b|\blucide-globe\b/i.test(lucideCn) ||
    /\blucide-arrow-(?:down|up)\b|\blucide-chevron-(?:down|up)\b|\blucide-caret-(?:down|up)\b/i.test(
      lucideCn
    );

  const mirrorByClass =
    /\blucide-arrow-right\b|\blucide-arrow-big-right\b|\blucide-square-arrow-(?:down-)?right\b|\blucide-chevron-right\b|\blucide-chevrons-right\b|\blucide-circle-arrow-(?:down-)?right\b|\blucide-corner-(?:down-)?right\b|\blucide-corner-(?:up-)?right\b|\blucide-move-right\b|\blucide-external-link\b|\blucide-reply\b|\blucide-undo-2\b|\blucide-rotate-cw\b|\blucide-trending(?:-down|-up|-up-down)?\b/i.test(
      lucideCn
    );

  if (mirrorByClass) return true;
  if (skipByClass) return false;
  if (
    /\blucide-arrow-left\b|\blucide-arrow-big-left\b|\blucide-chevron-left\b|\blucide-chevrons-left\b/i.test(
      lucideCn
    )
  ) {
    return false;
  }

  const label = lucideLikeLabel(icon.type);
  if (!label) return false;
  const compact = label.replace(/^Lucide/, "");
  if (/\b(?:Mail|Shield|Minus|Circle|Badge|Bell|Sparkles)\b/i.test(compact)) return false;
  if (/\bArrowDown\b|\bCaretDown\b|\bChevronDown\b/i.test(compact)) return false;
  return /Arrow.*Right|ChevronRight|Corner(?:Up|Down)Right|MoveRight|ExternalLink/i.test(compact);
}

function applyRtlHeroIconMirror(
  icon: ReactNode | undefined,
  isRtl: boolean,
  mirror: boolean | undefined
): ReactNode | undefined {
  if (!isRtl || icon == null) return icon;
  if (!React.isValidElement(icon)) return icon;

  const p = icon.props as { className?: string };
  const mergedExisting = cn(p.className);
  if (mergedExisting.includes("rtlFlipH") || mergedExisting.includes(styles.iconRtlMirror)) return icon;

  let apply = false;
  if (mirror === false) apply = false;
  else if (mirror === true) apply = true;
  else apply = shouldAutoMirrorIconForRtl(icon);

  if (!apply) return icon;

  return React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
    className: cn(p.className, styles.iconRtlMirror),
  });
}

export type HeroTextButtonOrder = "primary-first" | "secondary-first";

interface HeroTextProps {
  maxWidth?: string;
  /** When set, overrides default flex `gap` between headline, subcopy, and CTAs (CSS length, e.g. `var(--gap-sm)`). */
  contentGap?: string;
  text: string;
  subheader?: string;
  subtitle?: string;
  className?: string;
  buttonText?: string;
  buttonHref?: string;
  buttonTwoText?: string;
  buttonTwoHref?: string;
  center?: boolean;
  onButtonClick?: () => void;
  onButtonTwoClick?: () => void;
  /**
   * Primary CTA icon. Omit for default arrow. Pass `null` for no icon.
   */
  buttonIcon?: ReactNode | null;
  /**
   * Secondary CTA icon. Omit for default down arrow. Pass `null` for no icon.
   */
  buttonTwoIcon?: ReactNode | null;
  /**
   * Passed to `Button` as `iconPosition`. Prefer **`start` / `end`** (inline-start / inline-end vs label). `left` / `right` are the same DOM-order aliases the button already uses.
   */
  buttonIconPosition?: HeroTextIconPosition;
  /** Same for the secondary CTA. */
  buttonTwoIconPosition?: HeroTextIconPosition;
  /**
   * Override RTL horizontal mirror for the primary CTA icon (`.iconRtlMirror`).
   * Omit: auto — mirror directional Lucide-style arrows in Arabic; symmetric icons unchanged.
   */
  buttonIconMirrorRtl?: boolean;
  /** Same override for the secondary CTA icon. */
  buttonTwoIconMirrorRtl?: boolean;
  /** When true, skip entrance animations (e.g. locale switch). */
  skipAnimation?: boolean;
  /**
   * When true (home hero), entrance runs only after the loading progress overlay finishes.
   * Other pages keep the default delayed entrance.
   */
  deferEntranceUntilLoadingProgress?: boolean;
  /**
   * DOM order when both CTAs are shown. Default matches legacy layout: secondary, then primary.
   */
  buttonOrder?: HeroTextButtonOrder;
}

export default function HeroText({
  maxWidth,
  contentGap,
  text,
  subheader,
  subtitle,
  className = "",
  buttonText,
  buttonHref,
  buttonTwoText,
  buttonTwoHref,
  center,
  onButtonClick,
  onButtonTwoClick,
  buttonIcon,
  buttonTwoIcon,
  buttonIconPosition = "end",
  buttonTwoIconPosition = "end",
  buttonIconMirrorRtl,
  buttonTwoIconMirrorRtl,
  skipAnimation = false,
  deferEntranceUntilLoadingProgress = false,
  buttonOrder = "secondary-first",
}: HeroTextProps) {
  const homeAnimation = useHomeAnimation();
  const loadingProgressFinished = homeAnimation?.loadingProgressFinished ?? true;
  const markHomeHeroEntranceCompleted = homeAnimation?.markHomeHeroEntranceCompleted;

  const [isLoaded, setIsLoaded] = useState(skipAnimation);

  useEffect(() => {
    if (skipAnimation) {
      setIsLoaded(true);
      return;
    }
    if (deferEntranceUntilLoadingProgress) {
      if (loadingProgressFinished) setIsLoaded(true);
      return;
    }
    const id = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(id);
  }, [skipAnimation, deferEntranceUntilLoadingProgress, loadingProgressFinished]);

  useEffect(() => {
    if (skipAnimation && deferEntranceUntilLoadingProgress) {
      markHomeHeroEntranceCompleted?.();
    }
  }, [skipAnimation, deferEntranceUntilLoadingProgress, markHomeHeroEntranceCompleted]);

  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);
  const isRtl = dir === "rtl";

  // Split text into words for staggered animation
  const words = text.split(" ");

  const resolvedPrimaryIcon = resolveHeroButtonIcon(buttonIcon, DEFAULT_PRIMARY_BUTTON_ICON);
  const resolvedSecondaryIcon = resolveHeroButtonIcon(
    buttonTwoIcon,
    <ArrowDownIcon className={styles.arrowIcon} aria-hidden />
  );

  const primaryIcon =
    resolvedPrimaryIcon === undefined
      ? undefined
      : applyRtlHeroIconMirror(resolvedPrimaryIcon, isRtl, buttonIconMirrorRtl);
  const secondaryIcon =
    resolvedSecondaryIcon === undefined
      ? undefined
      : applyRtlHeroIconMirror(resolvedSecondaryIcon, isRtl, buttonTwoIconMirrorRtl);

  const secondaryBtn =
    buttonTwoText ? (
      <Button
        key="hero-cta-secondary"
        onClick={onButtonTwoClick}
        href={buttonTwoHref}
        variant="secondary"
        size="lg"
        iconPosition={buttonTwoIconPosition}
        icon={secondaryIcon}
      >
        {buttonTwoText}
      </Button>
    ) : null;

  const primaryBtn = (
    <Button
      key="hero-cta-primary"
      onClick={onButtonClick}
      href={buttonHref}
      variant="accent-brand"
      size="lg"
      iconPosition={buttonIconPosition}
      icon={primaryIcon}
    >
      {buttonText}
    </Button>
  );

  const ctaButtons =
    buttonOrder === "primary-first"
      ? [primaryBtn, secondaryBtn].filter(Boolean)
      : [secondaryBtn, primaryBtn].filter(Boolean);

  return (
    <div
      dir={dir}
      style={{
        maxWidth: maxWidth ? maxWidth : "100%",
        ...(contentGap ? { gap: contentGap } : {}),
      }}
      className={`${styles.mainTextContainer} ${className}`}
    >
      <motion.h1
        style={{
          justifyContent: center ? "center" : "flex-start",
        }}
        className={styles.mainHeading}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        initial={skipAnimation ? "visible" : "hidden"}
        animate={isLoaded ? "visible" : "hidden"}
        onAnimationComplete={() => {
          if (deferEntranceUntilLoadingProgress && isLoaded && !skipAnimation) {
            markHomeHeroEntranceCompleted?.();
          }
        }}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: {
                opacity: 0,
                filter: "blur(10px)",
                y: 20,
              },
              visible: {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            className={styles.word}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.h1>
      {subheader && (
        <motion.h2
          className={styles.subheader}
          initial={
            skipAnimation
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(10px)", y: 10 }
          }
          animate={
            isLoaded
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(10px)", y: 10 }
          }
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {subheader}
        </motion.h2>
      )}
      {subtitle && (
        <motion.p
          className={styles.mainText}
          initial={
            skipAnimation
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(10px)", y: 10 }
          }
          animate={
            isLoaded
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(10px)", y: 10 }
          }
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {subtitle}
        </motion.p>
      )}
      {buttonText && (
        <motion.div
          className={styles.buttonGroup}
          initial={skipAnimation ? "visible" : "hidden"}
          animate={isLoaded ? "visible" : "hidden"}
          variants={{
            hidden: {
              opacity: 0,
              filter: "blur(10px)",
            },
            visible: {
              opacity: 1,
              filter: "blur(0px)",

              transition: {
                delay: 0.6,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          onClick={onButtonClick}
          {...(buttonHref && { href: buttonHref })}
        >
          {ctaButtons}
        </motion.div>
      )}
    </div>
  );
}
