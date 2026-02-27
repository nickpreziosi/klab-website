/**
 * Signal to reopen the mobile drawer after a locale switch.
 * Used when the user changes locale from inside the drawer so the drawer stays open
 * on the new locale instead of closing.
 *
 * Also keeps the locale switcher accordion and technologies dropdown open across
 * the switch when they were open before.
 *
 * Uses both in-memory (client-side nav, same JS context) and sessionStorage
 * (full page reload on locale change). Timestamp in storage avoids reopening from stale flags.
 */

const SESSION_KEY = "drawerReopenAfterLocale";
const SESSION_FLAGS_KEY = "drawerReopenFlags";
const MAX_AGE_MS = 15_000;

let pendingReopen = false;
let keepLocaleSwitcherOpen = false;
let keepTechnologiesOpen = false;

/** Current technologies dropdown open state; set by Drawer so locale switcher can read it before nav. */
let drawerTechnologiesOpen = false;

/** Call from mobile locale switcher before router.push when user switches locale from the drawer. */
export function setShouldReopenDrawerAfterLocale(): void {
  pendingReopen = true;
  try {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, String(Date.now()));
      sessionStorage.setItem(
        SESSION_FLAGS_KEY,
        JSON.stringify({
          ts: Date.now(),
          keepLocaleSwitcherOpen,
          keepTechnologiesOpen,
        })
      );
    }
  } catch {
    /* ignore */
  }
}

/** Flags read from storage when consuming drawer reopen; distributed to consumers. */
let pendingFlags: { keepLocaleSwitcherOpen: boolean; keepTechnologiesOpen: boolean } | null = null;

/**
 * Call from Drawer when pathname or locale changes (or on mount).
 * Returns true if we should reopen the drawer (and clears the signal).
 * Also reads and stores flags for consumeKeepTechnologiesOpen/consumeKeepLocaleSwitcherOpen.
 */
export function consumeShouldReopenDrawerAfterLocale(): boolean {
  const fromMemory = pendingReopen;
  pendingReopen = false;

  let fromStorage = false;
  try {
    if (typeof window !== "undefined") {
      const raw = sessionStorage.getItem(SESSION_KEY);
      const flagsRaw = sessionStorage.getItem(SESSION_FLAGS_KEY);
      if (raw) {
        sessionStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(SESSION_FLAGS_KEY);
        const ts = Number(raw);
        if (!Number.isNaN(ts) && Date.now() - ts <= MAX_AGE_MS) {
          fromStorage = true;
          if (flagsRaw) {
            const data = JSON.parse(flagsRaw) as { ts: number; keepLocaleSwitcherOpen?: boolean; keepTechnologiesOpen?: boolean };
            if (data && !Number.isNaN(data.ts) && Date.now() - data.ts <= MAX_AGE_MS) {
              pendingFlags = {
                keepLocaleSwitcherOpen: Boolean(data.keepLocaleSwitcherOpen),
                keepTechnologiesOpen: Boolean(data.keepTechnologiesOpen),
              };
            }
          }
        }
      }
    }
  } catch {
    /* ignore */
  }

  if (fromMemory && !pendingFlags) {
    pendingFlags = { keepLocaleSwitcherOpen, keepTechnologiesOpen };
    keepLocaleSwitcherOpen = false;
    keepTechnologiesOpen = false;
  }

  return fromMemory || fromStorage;
}

/** Call from mobile locale switcher before router.push so the accordion stays open after switch. */
export function setKeepLocaleSwitcherOpen(): void {
  keepLocaleSwitcherOpen = true;
}

/** Call from MobileLocaleSwitcher on mount/render; returns true once and clears. */
export function consumeKeepLocaleSwitcherOpen(): boolean {
  let value = keepLocaleSwitcherOpen;
  keepLocaleSwitcherOpen = false;
  if (pendingFlags) {
    value = value || pendingFlags.keepLocaleSwitcherOpen;
    pendingFlags = null;
  }
  return value;
}

/** Call from Drawer so locale switcher can read current state before router.push. */
export function setDrawerTechnologiesOpen(open: boolean): void {
  drawerTechnologiesOpen = open;
}

/** Call from mobile locale switcher in switchLocale to persist technologies open state. */
export function getDrawerTechnologiesOpen(): boolean {
  return drawerTechnologiesOpen;
}

/** Call from mobile locale switcher before router.push if technologies dropdown was open. */
export function setKeepTechnologiesOpen(open: boolean): void {
  keepTechnologiesOpen = open;
}

/** Call from Drawer when reopening after locale; returns true once and clears. */
export function consumeKeepTechnologiesOpen(): boolean {
  let value = keepTechnologiesOpen;
  keepTechnologiesOpen = false;
  if (pendingFlags) {
    value = value || pendingFlags.keepTechnologiesOpen;
    pendingFlags = pendingFlags.keepLocaleSwitcherOpen
      ? { keepLocaleSwitcherOpen: true, keepTechnologiesOpen: false }
      : null;
  }
  return value;
}
