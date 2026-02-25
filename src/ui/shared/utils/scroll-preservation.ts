/**
 * Used to preserve scroll position and skip animations across locale-only navigations.
 * When switching locale (e.g. /en/company -> /es/company), we save scrollY and set
 * a "skip animations" flag before router.push; the new page reads and clears them.
 */

let savedScrollY: number | null = null;
let skipAnimationsOnNextPageLoad = false;

export function saveScrollBeforeLocaleSwitch(): void {
  if (typeof window === "undefined") return;
  savedScrollY = window.scrollY;
}

/** Read saved scroll without clearing (e.g. for navbar to avoid style flash on locale switch). */
export function getSavedScrollY(): number | null {
  return savedScrollY;
}

export function getAndClearSavedScroll(): number | null {
  const y = savedScrollY;
  savedScrollY = null;
  return y;
}

/** Call from locale switcher before router.push so the next page skips entrance animations. */
export function setSkipAnimationsOnNextPageLoad(): void {
  skipAnimationsOnNextPageLoad = true;
}

export function getSkipAnimationsOnNextPageLoad(): boolean {
  return skipAnimationsOnNextPageLoad;
}

/** Clear when navigating to a different page so only the locale-switch page skips; the next page animates. */
export function clearSkipAnimationsOnNextPageLoad(): void {
  skipAnimationsOnNextPageLoad = false;
}
