"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

function pathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && hasLocale(routing.locales, first)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

function scrollToHash(hash: string, behavior: ScrollBehavior) {
  if (!hash || hash === "#") return false;
  const id = decodeURIComponent(hash.slice(1));
  const element = document.getElementById(id);
  if (!element) return false;
  element.scrollIntoView({ behavior, block: "start" });
  return true;
}

/**
 * Intercepts same-page anchor link clicks and scrolls to the target with
 * smooth behavior. Keeps route-change scroll instant (handled by globals.css
 * scroll-behavior: auto) while making in-page anchor links smooth.
 * Also scrolls to the hash after navigating to a different route.
 */
export function SmoothAnchorScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash === "#") return;

    const tryScroll = () => scrollToHash(hash, "smooth");
    if (tryScroll()) return;

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        tryScroll();
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href*="#"]') as HTMLAnchorElement | null;
      if (!anchor || !anchor.href) return;

      const url = new URL(anchor.href);
      const hash = url.hash;
      if (!hash || hash === "#") return;

      const isSamePage =
        anchor.getAttribute("href")?.startsWith("#") ||
        pathWithoutLocale(url.pathname) === pathWithoutLocale(pathname) ||
        url.pathname === window.location.pathname;

      if (!isSamePage) return;

      const id = decodeURIComponent(hash.slice(1));
      const element = document.getElementById(id);
      if (!element) return;

      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}${hash}`,
      );
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname]);

  return null;
}
