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

const SKIP_ANIMATIONS_SESSION_KEY = "skipAnimationsOnNextPageLoad";
const SKIP_ANIMATIONS_FOR_PATH_KEY = "skipAnimationForPath";

/** Call from locale switcher before router.push so the next page skips entrance animations. */
export function setSkipAnimationsOnNextPageLoad(): void {
  skipAnimationsOnNextPageLoad = true;
  try {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SKIP_ANIMATIONS_SESSION_KEY, "1");
    }
  } catch {
    /* ignore */
  }
}

/**
 * Set the exact full path we're navigating to so the skip-animation provider can match it.
 * Use this when switching locale so the target page skips even if the provider runs before/after the flag.
 */
export function setSkipAnimationForPath(fullPath: string): void {
  try {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SKIP_ANIMATIONS_FOR_PATH_KEY, fullPath);
    }
  } catch {
    /* ignore */
  }
}

function normalizePath(p: string): string {
  if (p === "/" || p === "") return p;
  return p.endsWith("/") ? p.slice(0, -1) : p;
}

/**
 * Returns true if current pathname matches the stored "skip for path" and consumes the key.
 * Normalizes trailing slashes so "/es/company" matches "/es/company/".
 */
export function consumeSkipAnimationForPath(pathname: string): boolean {
  try {
    if (typeof window === "undefined") return false;
    const stored = sessionStorage.getItem(SKIP_ANIMATIONS_FOR_PATH_KEY);
    if (stored === null) return false;
    if (normalizePath(stored) !== normalizePath(pathname)) return false;
    sessionStorage.removeItem(SKIP_ANIMATIONS_FOR_PATH_KEY);
    return true;
  } catch {
    return false;
  }
}

/** If sessionStorage has the skip flag (e.g. after remount), sync to in-memory and clear storage. */
export function syncSkipAnimationsFromSession(): void {
  try {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SKIP_ANIMATIONS_SESSION_KEY)) {
      sessionStorage.removeItem(SKIP_ANIMATIONS_SESSION_KEY);
      skipAnimationsOnNextPageLoad = true;
    }
  } catch {
    /* ignore */
  }
}

export function getSkipAnimationsOnNextPageLoad(): boolean {
  return skipAnimationsOnNextPageLoad;
}

/** Clear when navigating to a different page so only the locale-switch page skips; the next page animates. */
export function clearSkipAnimationsOnNextPageLoad(): void {
  skipAnimationsOnNextPageLoad = false;
  try {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(SKIP_ANIMATIONS_SESSION_KEY);
      sessionStorage.removeItem(SKIP_ANIMATIONS_FOR_PATH_KEY);
    }
  } catch {
    /* ignore */
  }
}
