"use client";

/**
 * Skip-animation-on-locale-switch
 * -------------------------------
 * When the user switches locale (e.g. EN → ES on the same page), entrance animations
 * are skipped so content appears immediately. The flag is set in the locale switcher
 * before router.push and cleared when the pathname changes (so only that page skips;
 * the next page animates).
 *
 * Where the flag is set (all call setSkipAnimationsOnNextPageLoad() before router.push):
 * - locale-switcher.tsx (desktop nav)
 * - mobile-locale-switcher.tsx (mobile drawer)
 *
 * Pages/views that use useSkipAnimationOnLocaleSwitch() and pass skipAnimation to
 * animated children: HomeView, CompanyView, ContactView, NewsView, all technology
 * views (Kabl, KAxis, KBpm, KCard, KRisk, KTalk, Kim, Kai, TechnologyPlaceholderView),
 * KenaView, KRailsView.
 *
 * Pages with no entrance animations (no wiring needed): FoundationView, LitepapersView.
 *
 * Shared components that accept skipAnimation: SectionHeader, HeroText, VideoPlayer,
 * ContactLink, CompanySectionTitle, TechnologyPageLayout.
 *
 * Optional follow-ups: ArticleView (wire hook + pass to motion); NewsCard (add
 * skipAnimation prop from NewsView).
 */

import { createContext, useContext, useRef, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  getSkipAnimationsOnNextPageLoad,
  setSkipAnimationsOnNextPageLoad,
  clearSkipAnimationsOnNextPageLoad,
  syncSkipAnimationsFromSession,
  consumeSkipAnimationForPath,
} from "@/ui/shared/utils/scroll-preservation";
import {
  useSkipAnimationForPath,
  useSetSkipAnimationForPath,
} from "@/ui/shared/providers/skip-animation-for-path-provider/skip-animation-for-path-provider";

type SkipAnimationOnLocaleSwitchContextValue = {
  skipAnimation: boolean;
};

const SkipAnimationOnLocaleSwitchContext = createContext<SkipAnimationOnLocaleSwitchContextValue>({
  skipAnimation: false,
});

function normalizePath(p: string): string {
  if (p === "/" || p === "") return p;
  return p.endsWith("/") ? p.slice(0, -1) : p;
}

/**
 * Returns true when we should skip entrance animations (e.g. after locale switch).
 * Prefers root-level pathToSkip (state that persists when [locale] layout remounts);
 * falls back to sessionStorage consume so it works regardless of render order.
 */
export function useSkipAnimationOnLocaleSwitch(): boolean {
  const pathname = usePathname();
  const pathToSkip = useSkipAnimationForPath();
  const setPathToSkip = useSetSkipAnimationForPath();
  const [cachedSkipPath, setCachedSkipPath] = useState<string | null>(null);
  const fromPathRef = useRef<boolean | null>(null);
  const pathnameRef = useRef(pathname);

  if (pathnameRef.current !== pathname) {
    pathnameRef.current = pathname;
    fromPathRef.current = null;
    setCachedSkipPath(null);
  }

  const pathMatches = pathToSkip !== null && normalizePath(pathToSkip) === normalizePath(pathname);
  const fromRootContext =
    pathMatches ||
    (cachedSkipPath !== null && normalizePath(cachedSkipPath) === normalizePath(pathname));

  useEffect(() => {
    if (pathToSkip !== null && normalizePath(pathToSkip) === normalizePath(pathname)) {
      setCachedSkipPath(pathname);
      setPathToSkip(null);
    }
  }, [pathname, pathToSkip, setPathToSkip]);

  if (fromPathRef.current === null && typeof window !== "undefined") {
    fromPathRef.current = consumeSkipAnimationForPath(pathname);
  }

  const fromContext = useContext(SkipAnimationOnLocaleSwitchContext).skipAnimation;
  return fromRootContext || fromPathRef.current === true || fromContext;
}

export function SkipAnimationOnLocaleSwitchProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const skippedForPathnameRef = useRef<string | null>(null);

  // Restore flag from sessionStorage when provider remounts (e.g. new layout instance after locale switch).
  syncSkipAnimationsFromSession();

  // Path-based skip: locale switcher stores the target full path; if we're on that path, skip and sync to in-memory.
  // This works regardless of render order so the page always sees skipAnimation: true when landing after locale switch.
  if (consumeSkipAnimationForPath(pathname)) {
    setSkipAnimationsOnNextPageLoad();
  }

  // Clear only when pathname changed to a *different* page (user navigated away from the one we skipped for).
  if (skippedForPathnameRef.current !== null && pathname !== skippedForPathnameRef.current) {
    clearSkipAnimationsOnNextPageLoad();
    skippedForPathnameRef.current = null;
  }

  const skipAnimation = getSkipAnimationsOnNextPageLoad();
  if (skipAnimation) {
    skippedForPathnameRef.current = pathname;
  }

  return (
    <SkipAnimationOnLocaleSwitchContext.Provider value={{ skipAnimation }}>
      {children}
    </SkipAnimationOnLocaleSwitchContext.Provider>
  );
}
