"use client";

import { createContext, useContext, useLayoutEffect, type ReactNode } from "react";
import {
  getSkipAnimationsOnNextPageLoad,
  clearSkipAnimationsOnNextPageLoad,
} from "@/ui/shared/utils/scroll-preservation";

type SkipAnimationOnLocaleSwitchContextValue = {
  /** True on the first render after a locale switch; cleared in effect so next page animates. */
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
  const skipAnimation = getSkipAnimationsOnNextPageLoad();

  useLayoutEffect(() => {
    if (skipAnimation) clearSkipAnimationsOnNextPageLoad();
  });

  return (
    <SkipAnimationOnLocaleSwitchContext.Provider value={{ skipAnimation }}>
      {children}
    </SkipAnimationOnLocaleSwitchContext.Provider>
  );
}
