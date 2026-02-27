"use client";

/**
 * Root-level provider for "skip entrance animation for this path after locale switch".
 * Lives in the root layout so it never unmounts when [locale] changes; the [locale]
 * layout and its SkipAnimationOnLocaleSwitchProvider can remount, but this state
 * persists so the new page reads the correct skip flag.
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type SkipAnimationForPathContextValue = {
  /** Full path we're about to navigate to (set before router.push); consumer clears when matched. */
  pathToSkip: string | null;
  setPathToSkip: (path: string | null) => void;
};

const SkipAnimationForPathContext = createContext<SkipAnimationForPathContextValue | null>(null);

export function SkipAnimationForPathProvider({ children }: { children: ReactNode }) {
  const [pathToSkip, setPathToSkip] = useState<string | null>(null);
  const stableSet = useCallback((path: string | null) => setPathToSkip(path), []);
  return (
    <SkipAnimationForPathContext.Provider value={{ pathToSkip, setPathToSkip: stableSet }}>
      {children}
    </SkipAnimationForPathContext.Provider>
  );
}

export function useSetSkipAnimationForPath(): (path: string | null) => void {
  const ctx = useContext(SkipAnimationForPathContext);
  return ctx ? ctx.setPathToSkip : () => {};
}

export function useSkipAnimationForPath(): string | null {
  const ctx = useContext(SkipAnimationForPathContext);
  return ctx?.pathToSkip ?? null;
}
