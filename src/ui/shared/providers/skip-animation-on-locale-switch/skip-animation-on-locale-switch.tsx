"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  getSkipAnimationsOnNextPageLoad,
  clearSkipAnimationsOnNextPageLoad,
} from "@/ui/shared/utils/scroll-preservation";

type SkipAnimationOnLocaleSwitchContextValue = {
  /** True only on the page we switched locale to; cleared when pathname changes so the next page animates. */
  skipAnimation: boolean;
};

const SkipAnimationOnLocaleSwitchContext =
  createContext<SkipAnimationOnLocaleSwitchContextValue>({
    skipAnimation: false,
  });

export function useSkipAnimationOnLocaleSwitch(): boolean {
  return useContext(SkipAnimationOnLocaleSwitchContext).skipAnimation;
}

export function SkipAnimationOnLocaleSwitchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);
  const pathnameChanged = prevPathname.current !== pathname;
  if (pathnameChanged) prevPathname.current = pathname;

  const skipPathnameRef = useRef<string | null>(null);
  if (pathnameChanged) {
    const flag = getSkipAnimationsOnNextPageLoad();
    skipPathnameRef.current = flag ? pathname : null;
  }
  const skipAnimation = skipPathnameRef.current === pathname;

  useLayoutEffect(() => {
    if (pathnameChanged) {
      const flag = getSkipAnimationsOnNextPageLoad();
      if (flag) clearSkipAnimationsOnNextPageLoad();
    }
    return () => {
      clearSkipAnimationsOnNextPageLoad();
      skipPathnameRef.current = null;
    };
  }, [pathname]);

  return (
    <SkipAnimationOnLocaleSwitchContext.Provider value={{ skipAnimation }}>
      {children}
    </SkipAnimationOnLocaleSwitchContext.Provider>
  );
}
