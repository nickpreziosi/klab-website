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
 * views (Kabl, KAxis, KBpm, KCard, KLeads, KRisk, KTalk, Kim, Kai, TechnologyPlaceholderView),
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

import { createContext, useContext, useLayoutEffect, type ReactNode } from "react";
import {
  getSkipAnimationsOnNextPageLoad,
  clearSkipAnimationsOnNextPageLoad,
} from "@/ui/shared/utils/scroll-preservation";

type SkipAnimationOnLocaleSwitchContextValue = {
  /** True on the first render after a locale switch; cleared in effect so next page animates. */
  skipAnimation: boolean;
};

const SkipAnimationOnLocaleSwitchContext = createContext<SkipAnimationOnLocaleSwitchContextValue>({
  skipAnimation: false,
});

export function useSkipAnimationOnLocaleSwitch(): boolean {
  return useContext(SkipAnimationOnLocaleSwitchContext).skipAnimation;
}

export function SkipAnimationOnLocaleSwitchProvider({ children }: { children: ReactNode }) {
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
