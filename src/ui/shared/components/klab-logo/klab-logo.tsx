"use client";

import { cn } from "@/ui/shared/utils/utils";
import styles from "./klab-logo.module.css";
import type { CSSProperties } from "react";

/** Color variant of the K-Lab logo */
export type KlabLogoColor = "light" | "orange";

/** Format variant: "default" = icon/mark only, "full" = with wordmark */
export type KlabLogoFormat = "default" | "full";

/** When format is "full": "auto" follows theme; "light" = grey mark; "dark" = white mark */
export type FullLogoTheme = "auto" | "light" | "dark";

export type KlabLogoVariant = `${KlabLogoColor}-${KlabLogoFormat}`;

const LOGO_ICON_GREY = "/logos/klab-logo-icon.svg";
const LOGO_ICON_WHITE = "/logos/klab-logo-icon-white.svg";
const LOGO_FULL_GREY = "/logos/klab-logo-full-dark.svg";
const LOGO_FULL_WHITE = "/logos/klab-logo-full-white.svg";

const LOGO_VIEWBOX = {
  icon: { w: 217.361, h: 217.361 },
  full: { w: 734.722, h: 217.585 },
} as const;

export interface KlabLogoProps {
  color?: KlabLogoColor;
  format?: KlabLogoFormat;
  variant?: KlabLogoVariant;
  /** When format is "full": "auto" = follow theme (default); "light" = grey; "dark" = white */
  fullLogoTheme?: FullLogoTheme;
  /** Server-resolved theme for correct logo on first paint (e.g. from cookie). Omit for system preference. */
  initialTheme?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  width?: number | string;
  height?: number | string;
  alt?: string;
  className?: string;
  objectFit?: "contain" | "cover" | "fill";
}

function getVariant(color: KlabLogoColor, format: KlabLogoFormat): KlabLogoVariant {
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
  const [resolvedColor, resolvedFormat] = resolvedVariant.split("-") as [KlabLogoColor, KlabLogoFormat];
  const followTheme = resolvedColor !== "light" && fullLogoTheme === "auto";
  const forcedTheme: "light" | "dark" | null = followTheme
    ? null
    : resolvedColor === "light" || fullLogoTheme === "dark"
      ? "dark"
      : "light";
  const greySrc = resolvedFormat === "default" ? LOGO_ICON_GREY : LOGO_FULL_GREY;
  const whiteSrc = resolvedFormat === "default" ? LOGO_ICON_WHITE : LOGO_FULL_WHITE;
  const src = forcedTheme === "dark" ? whiteSrc : greySrc;
  const viewBox = resolvedFormat === "default" ? LOGO_VIEWBOX.icon : LOGO_VIEWBOX.full;

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

  const wrapperStyle: CSSProperties = {
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
    style: imgStyle,
    decoding: "async" as const,
    fetchPriority: "low" as const,
  };

  return (
    <span className={cn(styles.root, className)} style={wrapperStyle} role="img" aria-label={alt}>
      {followTheme ? (
        <>
          <img
            {...imgProps}
            src={greySrc}
            className={cn(imgClass, styles.themeLight)}
          />
          <img
            {...imgProps}
            src={whiteSrc}
            className={cn(imgClass, styles.themeDark)}
          />
        </>
      ) : (
        <img {...imgProps} src={src} className={imgClass} />
      )}
    </span>
  );
}
