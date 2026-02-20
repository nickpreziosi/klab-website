"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
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
  const skipAnimation = getSkipAnimationsOnNextPageLoad();

  useLayoutEffect(() => {
    return () => {
      clearSkipAnimationsOnNextPageLoad();
    };
  }, [pathname]);

  return (
    <SkipAnimationOnLocaleSwitchContext.Provider value={{ skipAnimation }}>
      {children}
    </SkipAnimationOnLocaleSwitchContext.Provider>
  );
}
