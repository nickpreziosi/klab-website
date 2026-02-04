/**
 * Used to preserve scroll position across locale-only navigations.
 * When switching locale (e.g. /en/company -> /es/company), we save scrollY
 * before router.push and restore it after the route updates, so the first
 * time a locale is loaded we still keep scroll position.
 */

let savedScrollY: number | null = null;

export function saveScrollBeforeLocaleSwitch(): void {
  if (typeof window === "undefined") return;
  savedScrollY = window.scrollY;
}

export function getAndClearSavedScroll(): number | null {
  const y = savedScrollY;
  savedScrollY = null;
  return y;
}
