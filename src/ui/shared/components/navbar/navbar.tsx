"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as React from "react";
import { useTranslations } from "next-intl";
import type { NavTranslations, DrawerTranslations } from "@/ui/shared/types/translations";
import { buildNavTranslations } from "@/ui/shared/types/translations";
import { Link, usePathname } from "@/i18n/navigation";
import { Drawer } from "../drawer/drawer";
import { DesktopDropdown, type DesktopDropdownVariant } from "@/ui/shared/components/dropdown-menu/dropdown-menu";
import { ThemeToggle } from "@/ui/shared/components/theme-toggle/theme-toggle";
import { LocaleSwitcher } from "@/ui/shared/components/locale-switcher/locale-switcher";
import { KlabLogo } from "@/ui/shared/components/klab-logo/klab-logo";
import { preloadAddonSphereVideos } from "@/ui/shared/components/addon-spheres/addon-sphere-products";
import {
  TECHNOLOGIES,
  preloadTechnologyLogos,
} from "@/ui/shared/components/technologies-showcase/technologies-showcase";
import { useTheme } from "@/ui/shared/hooks/use-theme";
import styles from "./navbar.module.css";

type NavigationMenuDemoProps = {
  /** When provided (from layout), nav copy is SSR'd */
  navTranslations?: NavTranslations;
  /** When provided (from layout), passed to Drawer for SSR'd copy */
  drawerTranslations?: DrawerTranslations;
  /** Server-resolved theme from cookie for correct logo first paint */
  initialTheme?: "light" | "dark";
};

export const NavigationMenuDemo = ({
  navTranslations: serverNavTranslations,
  drawerTranslations,
  initialTheme,
}: NavigationMenuDemoProps = {}) => {
  const path = usePathname();
  const t = useTranslations("nav");
  const nav = serverNavTranslations ?? buildNavTranslations(t);
  const { effectiveTheme } = useTheme();
  const [openDropdown, setOpenDropdown] = useState<DesktopDropdownVariant | null>(null);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [useCompactNav, setUseCompactNav] = useState(false);
  const lastScrollY = useRef(0);
  const krailsTriggerRef = useRef<HTMLButtonElement | null>(null);
  const resourcesTriggerRef = useRef<HTMLButtonElement | null>(null);
  const dropdownContainerRef = useRef<HTMLDivElement | null>(null);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const navListRef = useRef<HTMLUListElement | null>(null);
  const compactNavRef = useRef(false);
  const lastNavWidth = useRef(0);

  useLayoutEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const GAP = 32;
    const HYSTERESIS = 12;

    const check = () => {
      const logo = logoRef.current;
      const navList = navListRef.current;
      if (!logo || !navList) return;

      if (window.innerWidth <= 1024) {
        compactNavRef.current = true;
        setUseCompactNav(true);
        return;
      }

      if (navList.scrollWidth > 0) lastNavWidth.current = navList.scrollWidth;

      const needed = logo.offsetWidth + lastNavWidth.current + GAP;
      const available = navbar.clientWidth;
      const nextCompact = compactNavRef.current
        ? needed > available - HYSTERESIS
        : needed > available;

      compactNavRef.current = nextCompact;
      setUseCompactNav(nextCompact);
    };

    check();
    const observer = new ResizeObserver(check);
    observer.observe(navbar);
    window.addEventListener("resize", check);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [nav.whatWeDo, nav.kRails, nav.whoWeServe, nav.resources]);

  // Preload all tech logos on page load so drawer/dropdown show them instantly (Safari/mobile).
  // Must run in main document before drawer opens; link preload gives highest priority.
  useEffect(() => {
    const urls = new Set<string>();
    for (const tech of TECHNOLOGIES) {
      urls.add(tech.logoLight);
      urls.add(tech.logoDark);
    }
    const links: HTMLLinkElement[] = [];
    urls.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = href;
      document.head.appendChild(link);
      links.push(link);
    });
    return () => links.forEach((link) => link.remove());
  }, []);

  const toggleDropdown = (id: DesktopDropdownVariant) => {
    setOpenDropdown((current) => (current === id ? null : id));
  };

  useEffect(() => {
    setOpenDropdown(null);
  }, [path]);

  useEffect(() => {
    let cancelled = false;
    const handleScroll = () => {
      if (cancelled) return;
      const scrollY = window.scrollY;

      // Scroll-to-hide: hide on scroll down, show on scroll up or at top (desktop + mobile)
      const threshold = 80;
      const scrollDelta = scrollY - lastScrollY.current;

      if (scrollY <= threshold) {
        setIsNavbarHidden(false);
      } else if (scrollDelta > 5) {
        setIsNavbarHidden(true);
      } else if (scrollDelta < -5) {
        setIsNavbarHidden(false);
      }

      lastScrollY.current = scrollY;
    };
    // Re-check after route/locale change (after layout and any scroll restoration).
    // Double rAF so we run after ScrollToTopOnRouteChange restores scroll on locale switch.
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (!cancelled) {
          lastScrollY.current = window.scrollY;
          handleScroll();
        }
      })
    );
    window.addEventListener("load", handleScroll);
    window.addEventListener("scroll", handleScroll);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("load", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [path]);

  const handleTriggerKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    id: DesktopDropdownVariant
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpenDropdown(id);
      setTimeout(() => {
        const firstLink = dropdownContainerRef.current?.querySelector("a");
        firstLink?.focus();
      }, 0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && openDropdown) {
        const trigger =
          openDropdown === "resources" ? resourcesTriggerRef.current : krailsTriggerRef.current;
        setOpenDropdown(null);
        trigger?.focus();
      }
    };

    if (openDropdown) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openDropdown]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        openDropdown &&
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(target) &&
        !krailsTriggerRef.current?.contains(target) &&
        !resourcesTriggerRef.current?.contains(target)
      ) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const shouldHideNavbar = isNavbarHidden && !openDropdown && !drawerOpen;

  const preloadKRails = () => {
    preloadTechnologyLogos(effectiveTheme);
    preloadAddonSphereVideos();
  };

  return (
    <>
      <div className={styles.spacer}>
        <nav
          style={{
            height: "auto",
            backdropFilter: openDropdown ? "none" : "blur(8px)",
            WebkitBackdropFilter: openDropdown ? "none" : "blur(8px)",
            background: openDropdown
              ? "hsl(var(--background))"
              : "hsl(var(--background) / 0.7)",
            borderBottom: "solid 1px hsl(var(--foreground) / 0.2)",
            boxShadow: "var(--shadow-black)",
          }}
          id="navbarContainer"
          aria-label={nav.mainNav}
          className={`${styles.container} ${styles.containerScrolled} ${
            openDropdown && styles.containerDropdownOpen
          } ${shouldHideNavbar && styles.containerHidden}`}
        >
          {/* Preload tech logos on page load so drawer technologies dropdown shows them instantly */}
          <div className={styles.techLogoPreload} aria-hidden>
            {TECHNOLOGIES.flatMap((tech) => [
              <img
                key={`${tech.href}-light`}
                src={tech.logoLight}
                alt=""
                width={24}
                height={24}
                loading="eager"
                fetchPriority="high"
              />,
              <img
                key={`${tech.href}-dark`}
                src={tech.logoDark}
                alt=""
                width={24}
                height={24}
                loading="eager"
                fetchPriority="high"
              />,
            ])}
          </div>
          <div
            ref={navbarRef}
            className={`${styles.navbar} ${useCompactNav ? styles.navbarCompact : ""}`}
          >
            <div className={styles.logoContainer} ref={logoRef}>
              <Link aria-label={nav.goToHomepage} href="/" className={styles.logoLink}>
                <KlabLogo
                  color="orange"
                  format="default"
                  className={styles.logoCompact}
                  height={48}
                />
                <KlabLogo
                  color="orange"
                  format="full"
                  className={styles.logoFull}
                  height={48}
                  initialTheme={initialTheme}
                />
              </Link>
            </div>

            <div className={styles.endCluster}>
              <ul className={styles.navList} ref={navListRef}>
                <li className={styles.navListItem}>
                  <Link className={styles.navLink} href="/">
                    {nav.whatWeDo}
                  </Link>
                </li>

                <li className={styles.navListItem}>
                  <button
                    ref={krailsTriggerRef}
                    onClick={() => toggleDropdown("krails")}
                    onKeyDown={(event) => handleTriggerKeyDown(event, "krails")}
                    onMouseEnter={preloadKRails}
                    onFocus={preloadKRails}
                    className={styles.navLink}
                    aria-expanded={openDropdown === "krails"}
                    aria-haspopup="true"
                    aria-controls="nav-dropdown"
                    aria-label={nav.kRailsMenuLabel}
                  >
                    {nav.kRails}
                    <svg
                      className={`${openDropdown !== "krails" && styles.caretIconOpen} ${styles.caretIcon}`}
                      width="16"
                      height="16"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path>
                    </svg>
                  </button>
                </li>

                <li className={styles.navListItem}>
                  <a className={styles.navLink} href="#">
                    {nav.whoWeServe}
                  </a>
                </li>

                <li className={styles.navListItem}>
                  <Link className={styles.navLink} href="/company">
                    {nav.company}
                  </Link>
                </li>

                <li className={styles.navListItem}>
                  <button
                    ref={resourcesTriggerRef}
                    onClick={() => toggleDropdown("resources")}
                    onKeyDown={(event) => handleTriggerKeyDown(event, "resources")}
                    onMouseEnter={preloadKRails}
                    onFocus={preloadKRails}
                    className={styles.navLink}
                    aria-expanded={openDropdown === "resources"}
                    aria-haspopup="true"
                    aria-controls="nav-dropdown"
                    aria-label={nav.resourcesMenuLabel}
                  >
                    {nav.resources}
                    <svg
                      className={`${openDropdown !== "resources" && styles.caretIconOpen} ${styles.caretIcon}`}
                      width="16"
                      height="16"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path>
                    </svg>
                  </button>
                </li>

                <li className={styles.navListItem}>
                  <Link className={styles.navLink} href="/news">
                    {nav.news}
                  </Link>
                </li>

                <li className={styles.navListItem}>
                  <Link className={styles.navLink} href="/contact">
                    {nav.contact}
                  </Link>
                </li>

                <li className={`${styles.navListItem} ${styles.themeToggleContainer}`}>
                  <ThemeToggle />
                </li>
                <li className={`${styles.navListItem} ${styles.themeToggleContainer}`}>
                  <LocaleSwitcher />
                </li>
              </ul>

              <div className={styles.drawerContainer}>
                <Drawer
                  drawerTranslations={drawerTranslations}
                  navTranslations={serverNavTranslations}
                  onOpenChange={setDrawerOpen}
                />
              </div>
            </div>
          </div>

          <div className={styles.dropdownContainer} ref={dropdownContainerRef}>
            <DesktopDropdown
              isOpen={openDropdown !== null}
              variant={openDropdown ?? "krails"}
              onClose={() => setOpenDropdown(null)}
            />
          </div>
        </nav>
      </div>
    </>
  );
};
