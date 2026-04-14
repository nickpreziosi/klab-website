"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type HomeAnimationContextValue = {
  /** True after the home page has run its loading/animation once this session (e.g. after locale switch). */
  hasAnimated: boolean;
  /** Call when the home page has finished its first load and entrance animations. */
  setHasAnimated: () => void;
  /** True after the loading progress overlay has finished (or was skipped because `hasAnimated`). */
  loadingProgressFinished: boolean;
  markLoadingProgressFinished: () => void;
  resetLoadingProgressFinished: () => void;
  /**
   * True after the home hero’s entrance animation has finished (or was skipped) this session.
   * Used with `hasAnimated` so the hero can still animate once after the loading bar completes.
   */
  homeHeroEntranceCompleted: boolean;
  markHomeHeroEntranceCompleted: () => void;
};

const HomeAnimationContext = createContext<HomeAnimationContextValue | null>(null);

export function HomeAnimationProvider({ children }: { children: ReactNode }) {
  const [hasAnimated, setHasAnimatedState] = useState(false);
  const setHasAnimated = useCallback(() => setHasAnimatedState(true), []);

  const [loadingProgressFinished, setLoadingProgressFinished] = useState(false);
  const markLoadingProgressFinished = useCallback(() => setLoadingProgressFinished(true), []);
  const resetLoadingProgressFinished = useCallback(() => setLoadingProgressFinished(false), []);

  const [homeHeroEntranceCompleted, setHomeHeroEntranceCompleted] = useState(false);
  const markHomeHeroEntranceCompleted = useCallback(() => setHomeHeroEntranceCompleted(true), []);

  const value = useMemo(
    () => ({
      hasAnimated,
      setHasAnimated,
      loadingProgressFinished,
      markLoadingProgressFinished,
      resetLoadingProgressFinished,
      homeHeroEntranceCompleted,
      markHomeHeroEntranceCompleted,
    }),
    [
      hasAnimated,
      setHasAnimated,
      loadingProgressFinished,
      markLoadingProgressFinished,
      resetLoadingProgressFinished,
      homeHeroEntranceCompleted,
      markHomeHeroEntranceCompleted,
    ]
  );

  return (
    <HomeAnimationContext.Provider value={value}>
      {children}
    </HomeAnimationContext.Provider>
  );
}

export function useHomeAnimation() {
  const ctx = useContext(HomeAnimationContext);
  return ctx;
}
