"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { getAndClearSavedScroll } from "@/ui/shared/utils/scroll-preservation";

/**
 * Returns the path without the locale segment (e.g. "/en/company" -> "/company").
 * Used to detect locale-only vs real route changes.
 */
function pathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && hasLocale(routing.locales, first)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

/**
 * Scrolls the window to top when the route changes, but NOT when only the
 * locale segment changes (e.g. /en/company -> /es/company). Locale-only
 * changes restore saved scroll position (so first-time locale load keeps
 * position too); all other navigations scroll to top.
 */
export function ScrollToTopOnRouteChange() {
  const pathname = usePathname();
  const prevPathWithoutLocale = useRef<string | null>(null);

  useEffect(() => {
    const current = pathWithoutLocale(pathname);
    const isLocaleOnlyChange =
      prevPathWithoutLocale.current !== null && prevPathWithoutLocale.current === current;

    if (isLocaleOnlyChange) {
      const savedY = getAndClearSavedScroll();
      if (savedY !== null) {
        // Double rAF so we run after layout/paint and any async scroll-to-top from Next
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo(0, savedY);
          });
        });
      }
    } else if (prevPathWithoutLocale.current !== null && prevPathWithoutLocale.current !== current) {
      window.scrollTo(0, 0);
    }

    prevPathWithoutLocale.current = current;
  }, [pathname]);

  return null;
}
