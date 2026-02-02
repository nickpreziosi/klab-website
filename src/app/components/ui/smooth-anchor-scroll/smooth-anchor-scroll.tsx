"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Intercepts same-page anchor link clicks and scrolls to the target with
 * smooth behavior. Keeps route-change scroll instant (handled by globals.css
 * scroll-behavior: auto) while making in-page anchor links smooth.
 */
export function SmoothAnchorScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href*="#"]') as HTMLAnchorElement | null;
      if (!anchor || !anchor.href) return;

      const url = new URL(anchor.href);
      const hash = url.hash;
      if (!hash || hash === "#") return;

      // Same page: hash-only href or same pathname
      const isSamePage =
        anchor.getAttribute("href")?.startsWith("#") ||
        (url.pathname === pathname || url.pathname === window.location.pathname);

      if (!isSamePage) return;

      const id = hash.slice(1);
      const element = document.getElementById(id);
      if (!element) return;

      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update URL without jumping (replaceState keeps hash in address bar)
      window.history.replaceState(null, "", hash);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname]);

  return null;
}
