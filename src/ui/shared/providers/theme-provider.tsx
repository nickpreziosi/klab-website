"use client";

import * as React from "react";

export type Theme = "light" | "dark" | "system";
export type EffectiveTheme = "light" | "dark";

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Default theme when no saved preference exists */
  defaultTheme?: Theme;
  /** localStorage key for persistence */
  storageKey?: string;
  /** Initial theme from server (e.g. from cookie) - takes precedence over localStorage */
  initialTheme?: EffectiveTheme;
}

interface ThemeProviderContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  effectiveTheme: EffectiveTheme;
  mounted: boolean;
}

const ThemeContext = React.createContext<ThemeProviderContextValue | undefined>(undefined);

function getResolvedTheme(theme: Theme): EffectiveTheme {
  if (theme === "light") return "light";
  if (theme === "dark") return "dark";
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "dark";
}

function persistTheme(
  theme: Theme,
  resolved: EffectiveTheme,
  storageKey: string
) {
  try {
    localStorage.setItem(storageKey, theme);
    const ev = new CustomEvent("themechange", { detail: theme });
    window.dispatchEvent(ev);
    document.cookie = `theme=${encodeURIComponent(resolved)}; path=/; max-age=${60 * 60 * 24 * 365}`;
  } catch {
    /* ignore */
  }
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  initialTheme,
}: ThemeProviderProps) {
  const previousThemeRef = React.useRef<Theme | null>(null);
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (initialTheme) return initialTheme;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored === "light" || stored === "dark" || stored === "system") return stored;
      if (stored === "keo") return "system"; // legacy value
    } catch {
      /* ignore */
    }
    return defaultTheme;
  });
  const [mounted, setMounted] = React.useState(false);
  const effectiveTheme = getResolvedTheme(theme);

  // Apply theme immediately on mount (script may have already set class; we sync with our state)
  React.useLayoutEffect(() => {
    const root = document.documentElement;
    const resolved = getResolvedTheme(theme);
    root.classList.toggle("dark", resolved === "dark");
    root.setAttribute("data-theme", resolved);
    setMounted(true);
  }, []);

  React.useLayoutEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const resolved = getResolvedTheme(theme);
    const shouldDisableTransitions =
      previousThemeRef.current !== null && previousThemeRef.current !== theme;

    if (shouldDisableTransitions) {
      root.classList.add("no-transitions");
    }

    root.classList.toggle("dark", resolved === "dark");
    root.setAttribute("data-theme", resolved);
    persistTheme(theme, resolved, storageKey);

    if (shouldDisableTransitions) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          root.classList.remove("no-transitions");
        });
      });
    }

    previousThemeRef.current = theme;
  }, [theme, mounted, storageKey]);

  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        const newTheme = e.newValue as Theme;
        if (newTheme === "light" || newTheme === "dark" || newTheme === "system") {
          setThemeState(newTheme);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [storageKey]);

  React.useEffect(() => {
    if (theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const root = document.documentElement;
    const handleChange = () => {
      root.classList.add("no-transitions");
      const resolved = getResolvedTheme("system");
      root.classList.toggle("dark", resolved === "dark");
      root.setAttribute("data-theme", resolved);
      persistTheme("system", resolved, storageKey);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => root.classList.remove("no-transitions"));
      });
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [theme, storageKey]);

  const setTheme = React.useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
    },
    []
  );

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
      effectiveTheme,
      mounted,
    }),
    [theme, setTheme, effectiveTheme, mounted]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeProviderContextValue {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

/**
 * Resolves the current effective theme from the DOM (class="dark" on html).
 * Safe to call in browser. Used for initial state before ThemeProvider hydrates.
 */
export function getEffectiveTheme(): EffectiveTheme {
  if (typeof document === "undefined") return "dark";
  const root = document.documentElement;
  if (root.classList.contains("dark")) return "dark";
  if (root.getAttribute("data-theme") === "light") return "light";
  if (root.getAttribute("data-theme") === "dark") return "dark";
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    if (stored === "system") {
      return window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
  } catch {
    /* ignore */
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
