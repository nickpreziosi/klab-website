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
  /** Resolved theme from server (e.g. from cookie) - used for SSR/systemResolvedTheme fallback only; user preference comes from localStorage */
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
  const themeRef = React.useRef<Theme>("system");
  const [theme, setThemeState] = React.useState<Theme>(() => {
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
  const [systemResolvedTheme, setSystemResolvedTheme] = React.useState<EffectiveTheme>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return initialTheme ?? "dark";
  });
  const effectiveTheme =
    theme === "system" ? systemResolvedTheme : (theme as EffectiveTheme);

  themeRef.current = theme;

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

  // Always keep systemResolvedTheme in sync so switching back to "system" shows correct theme
  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const root = document.documentElement;
    const handleChange = () => {
      const resolved = getResolvedTheme("system");
      setSystemResolvedTheme(resolved);
      if (themeRef.current === "system") {
        root.classList.add("no-transitions");
        root.classList.toggle("dark", resolved === "dark");
        root.setAttribute("data-theme", resolved);
        persistTheme("system", resolved, storageKey);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => root.classList.remove("no-transitions"));
        });
      }
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [storageKey]);

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
 * Hook that syncs with DOM theme (html.dark, data-theme) for media like images/videos.
 * Mirrors the StaffCard pattern: reads from the same DOM state the head script sets,
 * subscribes to themechange + matchMedia for system preference changes.
 * Use for theme-dependent media that must be correct on initial load and system changes.
 */
export function useEffectiveThemeSync(): EffectiveTheme {
  const [effectiveTheme, setEffectiveTheme] = React.useState<EffectiveTheme>(() =>
    typeof document !== "undefined" ? getEffectiveTheme() : "dark"
  );
  React.useLayoutEffect(() => {
    setEffectiveTheme(getEffectiveTheme());
  }, []);
  React.useEffect(() => {
    const onThemeChange = () => setEffectiveTheme(getEffectiveTheme());
    window.addEventListener("themechange", onThemeChange);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", onThemeChange);
    return () => {
      window.removeEventListener("themechange", onThemeChange);
      media.removeEventListener("change", onThemeChange);
    };
  }, []);
  return effectiveTheme;
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
