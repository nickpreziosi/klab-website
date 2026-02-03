"use client";

import { cn } from "@/app/lib/utils";
import { getEffectiveTheme } from "@/app/lib/use-theme";
import styles from "./klab-logo.module.css";
import { useEffect, useState } from "react";

/** Color variant of the K-Lab logo */
export type KlabLogoColor = "light" | "orange";

/** Format variant: "default" = icon/mark only, "full" = with wordmark */
export type KlabLogoFormat = "default" | "full";

/** When format is "full": "auto" follows theme; "light" = gradient text; "dark" = all-orange */
export type FullLogoTheme = "auto" | "light" | "dark";

export type KlabLogoVariant = `${KlabLogoColor}-${KlabLogoFormat}`;

/**
 * Full logo with gradient text (#171920 → black). Shown in light mode when fullLogoTheme is "auto".
 */
const LOGO_FULL_LIGHT_PATH = "/logos/klab-logo-dark-text.svg";

/**
 * Map of (color, format) -> public path for the SVG.
 * Logo assets are SVG files but large (~4MB) due to embedded raster; we use <img> to avoid bundle bloat.
 * For orange-full with fullLogoTheme "auto", src is chosen by effective theme (single img = no stacking outline).
 */
const LOGO_PATHS: Record<KlabLogoVariant, string> = {
  "light-default": "/logos/klab-logo-light.svg",
  "light-full": "/logos/klab-logo-light-full.svg",
  "orange-default": "/logos/klab-logo-orange.svg",
  "orange-full": "/logos/klab-logo-orange-full.svg",
};

/** ViewBox dimensions per variant for aspect-ratio sizing when only one dimension is set */
const LOGO_VIEWBOX: Record<KlabLogoVariant, { w: number; h: number }> = {
  "light-default": { w: 273.66, h: 273.66 },
  "light-full": { w: 867.95, h: 248.85 },
  "orange-default": { w: 274.92, h: 274.92 },
  "orange-full": { w: 867.95, h: 248.85 },
};

export interface KlabLogoProps {
  color?: KlabLogoColor;
  format?: KlabLogoFormat;
  variant?: KlabLogoVariant;
  /** When format is "full": "auto" = follow theme (default); "light" = gradient text; "dark" = all-orange */
  fullLogoTheme?: FullLogoTheme;
  size?: "sm" | "md" | "lg" | "xl";
  width?: number | string;
  height?: number | string;
  alt?: string;
  className?: string;
  objectFit?: "contain" | "cover" | "fill";
}

function getVariant(
  color: KlabLogoColor,
  format: KlabLogoFormat
): KlabLogoVariant {
  return `${color}-${format}`;
}

const sizeMap = {
  sm: 48,
  md: 80,
  lg: 120,
  xl: 160,
} as const;

export function KlabLogo({
  color = "orange",
  format = "default",
  variant,
  fullLogoTheme = "auto",
  size = "md",
  width,
  height,
  alt = "K-Lab Logo",
  className,
  objectFit = "contain",
}: KlabLogoProps) {
  const resolvedVariant = variant ?? getVariant(color, format);
  const isOrangeFull = resolvedVariant === "orange-full";
  const useThemeSwitch = isOrangeFull && fullLogoTheme === "auto";

  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark" | null>(
    () => (typeof document !== "undefined" ? getEffectiveTheme() : null)
  );
  useEffect(() => {
    if (!useThemeSwitch) return;
    setEffectiveTheme(getEffectiveTheme());
    const onThemeChange = () => setEffectiveTheme(getEffectiveTheme());
    window.addEventListener("themechange", onThemeChange);
    window.addEventListener("storage", onThemeChange);
    return () => {
      window.removeEventListener("themechange", onThemeChange);
      window.removeEventListener("storage", onThemeChange);
    };
  }, [useThemeSwitch]);

  const baseSrc = LOGO_PATHS[resolvedVariant];
  const src =
    useThemeSwitch && effectiveTheme === "light"
      ? LOGO_FULL_LIGHT_PATH
      : isOrangeFull && fullLogoTheme === "light"
        ? LOGO_FULL_LIGHT_PATH
        : baseSrc;
  const viewBox = LOGO_VIEWBOX[resolvedVariant];

  if (!src || !viewBox) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[KlabLogo] Unknown variant: ${resolvedVariant}. Add to LOGO_PATHS and LOGO_VIEWBOX.`
      );
    }
    return null;
  }

  const sizeNum = sizeMap[size];
  const hasWidth = width !== undefined;
  const hasHeight = height !== undefined;

  let w: number | string;
  let h: number | string;
  if (hasWidth && hasHeight) {
    w = typeof width === "string" ? width : Number(width);
    h = typeof height === "string" ? height : Number(height);
  } else if (hasHeight) {
    h = typeof height === "string" ? height : Number(height);
    w = typeof h === "number" ? (h * viewBox.w) / viewBox.h : sizeNum;
  } else if (hasWidth) {
    w = typeof width === "string" ? width : Number(width);
    h = typeof w === "number" ? (w * viewBox.h) / viewBox.w : sizeNum;
  } else {
    h = sizeNum;
    w = viewBox.w === viewBox.h ? sizeNum : (sizeNum * viewBox.w) / viewBox.h;
  }

  const wrapperStyle: React.CSSProperties = {
    display: "inline-block",
    flexShrink: 0,
    width: typeof w === "number" ? `${w}px` : w,
    height: typeof h === "number" ? `${h}px` : h,
    lineHeight: 0,
  };

  const imgClass = cn(
    styles.img,
    objectFit === "contain" && styles.objectContain,
    objectFit === "cover" && styles.objectCover,
    objectFit === "fill" && styles.objectFill
  );
  const imgStyle =
    typeof w === "string" || typeof h === "string"
      ? { width: "100%" as const, height: "100%" as const }
      : undefined;
  const imgProps = {
    alt,
    width: typeof w === "number" ? w : undefined,
    height: typeof h === "number" ? h : undefined,
    className: imgClass,
    style: imgStyle,
    decoding: "async" as const,
    fetchPriority: "low" as const,
  };

  return (
    <span
      className={cn(styles.root, className)}
      style={wrapperStyle}
      role="img"
      aria-label={alt}
    >
      <img {...imgProps} src={src} />
    </span>
  );
}
