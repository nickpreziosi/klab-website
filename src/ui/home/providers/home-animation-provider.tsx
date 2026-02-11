"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type HomeAnimationContextValue = {
  /** True after the home page has run its loading/animation once this session (e.g. after locale switch). */
  hasAnimated: boolean;
  /** Call when the home page has finished its first load and entrance animations. */
  setHasAnimated: () => void;
};

const HomeAnimationContext = createContext<HomeAnimationContextValue | null>(null);

export function HomeAnimationProvider({ children }: { children: ReactNode }) {
  const [hasAnimated, setHasAnimatedState] = useState(false);
  const setHasAnimated = useCallback(() => setHasAnimatedState(true), []);

  return (
    <HomeAnimationContext.Provider value={{ hasAnimated, setHasAnimated }}>
      {children}
    </HomeAnimationContext.Provider>
  );
}

export function useHomeAnimation() {
  const ctx = useContext(HomeAnimationContext);
  return ctx;
}
