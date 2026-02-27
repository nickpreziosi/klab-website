/**
 * Signal to reopen the mobile drawer after a locale switch.
 * Used when the user changes locale from inside the drawer so the drawer stays open
 * on the new locale instead of closing.
 *
 * Uses both in-memory (client-side nav, same JS context) and sessionStorage
 * (full page reload on locale change). Timestamp in storage avoids reopening from stale flags.
 */

const SESSION_KEY = "drawerReopenAfterLocale";
const MAX_AGE_MS = 15_000;

let pendingReopen = false;

/** Call from mobile locale switcher before router.push when user switches locale from the drawer. */
export function setShouldReopenDrawerAfterLocale(): void {
  pendingReopen = true;
  try {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, String(Date.now()));
    }
  } catch {
    /* ignore */
  }
}

/**
 * Call from Drawer when pathname or locale changes (or on mount).
 * Returns true if we should reopen the drawer (and clears the signal).
 * Only returns true if the signal was set recently (avoids stale sessionStorage).
 */
export function consumeShouldReopenDrawerAfterLocale(): boolean {
  const fromMemory = pendingReopen;
  pendingReopen = false;

  let fromStorage = false;
  try {
    if (typeof window !== "undefined") {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        sessionStorage.removeItem(SESSION_KEY);
        const ts = Number(raw);
        if (!Number.isNaN(ts) && Date.now() - ts <= MAX_AGE_MS) {
          fromStorage = true;
        }
      }
    }
  } catch {
    /* ignore */
  }

  return fromMemory || fromStorage;
}
