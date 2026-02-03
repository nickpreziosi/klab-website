"use client";

import { useEffect, useState } from "react";

export type ThemePreference = "light" | "dark" | "system";
export type EffectiveTheme = "light" | "dark";

/**
 * Resolves the current effective theme (light or dark) from data-theme, localStorage, or system preference.
 * Safe to call only in browser (returns "dark" during SSR).
 */
export function getEffectiveTheme(): EffectiveTheme {
  if (typeof document === "undefined") return "dark";
  const theme = document.documentElement.getAttribute("data-theme");
  if (theme === "light" || theme === "dark") return theme;
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    if (stored === "system") {
      return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
  } catch {
    /* ignore */
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredTheme(): ThemePreference {
  if (typeof window === "undefined") return "system";
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {
    /* ignore */
  }
  return "system";
}

export interface UseThemeResult {
  /** User preference: "light" | "dark" | "system" */
  theme: ThemePreference;
  /** Resolved theme for rendering: "light" | "dark" */
  effectiveTheme: EffectiveTheme;
}

/**
 * Hook that returns the current theme preference and the effective theme (light/dark).
 * Subscribes to "themechange" and system preference so components re-render when theme changes.
 */
export function useTheme(): UseThemeResult {
  const [theme, setTheme] = useState<ThemePreference>(getStoredTheme);
  const [effectiveTheme, setEffectiveTheme] = useState<EffectiveTheme>(() =>
    typeof document !== "undefined" ? getEffectiveTheme() : "dark"
  );

  useEffect(() => {
    const apply = () => {
      setTheme(getStoredTheme());
      setEffectiveTheme(getEffectiveTheme());
    };
    window.addEventListener("themechange", apply);
    const storageHandler = (e: StorageEvent) => {
      if (e.key === "theme" && typeof e.newValue === "string") apply();
    };
    window.addEventListener("storage", storageHandler);
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    media?.addEventListener("change", apply);
    return () => {
      window.removeEventListener("themechange", apply);
      window.removeEventListener("storage", storageHandler);
      media?.removeEventListener("change", apply);
    };
  }, []);

  return { theme, effectiveTheme };
}
