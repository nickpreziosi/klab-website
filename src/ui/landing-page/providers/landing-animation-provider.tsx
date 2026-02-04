"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type LandingAnimationContextValue = {
  /** True after the landing page has run its entrance animation once this session (e.g. after locale switch). */
  hasAnimated: boolean;
  /** Call when the landing page has finished its first entrance animation. */
  setHasAnimated: () => void;
};

const LandingAnimationContext = createContext<LandingAnimationContextValue | null>(null);

export function LandingAnimationProvider({ children }: { children: ReactNode }) {
  const [hasAnimated, setHasAnimatedState] = useState(false);
  const setHasAnimated = useCallback(() => setHasAnimatedState(true), []);

  return (
    <LandingAnimationContext.Provider value={{ hasAnimated, setHasAnimated }}>
      {children}
    </LandingAnimationContext.Provider>
  );
}

export function useLandingAnimation() {
  const ctx = useContext(LandingAnimationContext);
  return ctx;
}
