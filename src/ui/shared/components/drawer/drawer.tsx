"use client";

import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import type { NavTranslations, DrawerTranslations } from "@/ui/shared/types/translations";
import { buildDrawerTranslations, buildNavTranslations } from "@/ui/shared/types/translations";
import { Link } from "@/i18n/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ClientOnly } from "@/ui/shared/components/client-only/client-only";
import { MobileThemeToggle } from "@/ui/shared/components/mobile-theme-toggle/mobile-theme-toggle";
import { MobileLocaleSwitcher } from "@/ui/shared/components/mobile-locale-switcher/mobile-locale-switcher";
import { ProductLogo } from "@k-lab/components";
import { KlabLogo } from "@/ui/shared/components/klab-logo/klab-logo";
import {
  TECHNOLOGIES,
  preloadTechnologyLogos,
} from "@/ui/shared/components/technologies-showcase/technologies-showcase";
import { RESOURCE_NAV_ITEMS } from "@/ui/shared/components/addon-spheres/resource-nav-items";
import { useTheme } from "@/ui/shared/hooks/use-theme";
import {
  consumeShouldReopenDrawerAfterLocale,
  setDrawerTechnologiesOpen,
  consumeKeepTechnologiesOpen,
} from "@/ui/shared/utils/drawer-reopen-after-locale";
import { routing } from "@/i18n/routing";
import styles from "./drawer.module.css";

const VISIBLE_TECH_DESCRIPTION_KEYS: Set<string> = new Set(["ktalk", "krisk", "krails", "kena", "kleads"]);

/** Path without the locale segment (e.g. /en/about → /about) so we can tell locale switch from route change. */
function pathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && routing.locales.includes(first as (typeof routing.locales)[number])) {
    return "/" + segments.slice(1).join("/");
  }
  return pathname;
}

/** Native img so logos show as soon as cached (no async fetch+setState delay). Drawer preloads when open. */
function DrawerTechLogo({
  src,
  product,
  className,
}: {
  src: string;
  product?: (typeof TECHNOLOGIES)[number]["product"];
  title: string;
  className?: string;
}) {
  return (
    <div className={className} aria-hidden>
      {product ? (
        <ProductLogo product={product} className={styles.dropdownItemLogoImg} aria-hidden />
      ) : (
        <img
          src={src}
          alt=""
          className={styles.dropdownItemLogoImg}
          width={24}
          height={24}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      )}
    </div>
  );
}

export type DrawerProps = {
  /** When provided (from layout via Navbar), drawer copy is SSR'd */
  drawerTranslations?: DrawerTranslations;
  /** When provided (from layout via Navbar), nav copy in drawer is SSR'd */
  navTranslations?: NavTranslations;
  /** Called when drawer open state changes (e.g. for navbar scroll-to-hide) */
  onOpenChange?: (open: boolean) => void;
};

export const Drawer = (props: DrawerProps) => {
  const {
    drawerTranslations: serverDrawerTranslations,
    navTranslations: serverNavTranslations,
    onOpenChange: onOpenChangeProp,
  } = props ?? {};
  const reopenedRef = useRef(false);
  const prevPathnameRef = useRef<string | null>(null);
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    const shouldOpen = consumeShouldReopenDrawerAfterLocale();
    if (shouldOpen) reopenedRef.current = true;
    return shouldOpen;
  });
  const [skipDrawerAnimation, setSkipDrawerAnimation] = useState(() => reopenedRef.current);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const { effectiveTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setDrawerTechnologiesOpen(isSolutionsOpen);
  }, [isSolutionsOpen]);

  // Close only when the route (path) changes, not on locale-only change. Reopen after locale switch when requested.
  useEffect(() => {
    const pathOnly = pathWithoutLocale(pathname);
    const prevPathname = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    if (prevPathname === null) {
      // First run: don't close; reopen if we mounted after locale switch.
      if (consumeShouldReopenDrawerAfterLocale()) {
        setSkipDrawerAnimation(true);
        setIsOpen(true);
        onOpenChangeProp?.(true);
        if (consumeKeepTechnologiesOpen()) setIsSolutionsOpen(true);
      }
      return;
    }

    const prevPathOnly = pathWithoutLocale(prevPathname);
    if (pathOnly === prevPathOnly) {
      // Locale-only change (same path, different locale): don't close; reopen if switcher requested it.
      if (consumeShouldReopenDrawerAfterLocale()) {
        setSkipDrawerAnimation(true);
        setIsOpen(true);
        onOpenChangeProp?.(true);
        if (consumeKeepTechnologiesOpen()) setIsSolutionsOpen(true);
      }
      return;
    }

    // Route changed (different path): close drawer with exit animation.
    if (reopenedRef.current) reopenedRef.current = false;
    setSkipDrawerAnimation(false);
    setPrepareClose(true);
  }, [pathname]);

  // Preload technology logos when drawer mounts so opening the technologies list is instant (Safari/mobile).
  useEffect(() => {
    if (typeof requestIdleCallback === "undefined") return;
    const id = requestIdleCallback(() => preloadTechnologyLogos(), { timeout: 2000 });
    return () => cancelIdleCallback(id);
  }, []);

  // Preload current theme's logos as soon as drawer opens so the technologies dropdown has them ready.
  useEffect(() => {
    if (isOpen) preloadTechnologyLogos(effectiveTheme);
  }, [isOpen, effectiveTheme]);

  const [prepareClose, setPrepareClose] = useState(false);
  useEffect(() => {
    if (!prepareClose) return;
    setPrepareClose(false);
    setIsOpen(false);
    onOpenChangeProp?.(false);
  }, [prepareClose, onOpenChangeProp]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSkipDrawerAnimation(false);
      setPrepareClose(true);
      onOpenChangeProp?.(false);
      return;
    }
    setIsOpen(open);
    onOpenChangeProp?.(true);
  };

  const t = useTranslations("drawer");
  const tNav = useTranslations("nav");
  const tResources = useTranslations("resourcesDropdown");
  const drawer = serverDrawerTranslations ?? buildDrawerTranslations(t);
  const nav = serverNavTranslations ?? buildNavTranslations(tNav);

  const visibleTechnologies = TECHNOLOGIES.filter((tech) =>
    VISIBLE_TECH_DESCRIPTION_KEYS.has(tech.descriptionKey)
  );

  const hamburgerPlaceholder = (
    <button type="button" className={styles.hamburger} aria-label={drawer.openMenu}>
      <span className={styles.hamburgerLine} />
      <span className={styles.hamburgerLine} />
      <span className={styles.hamburgerLine} />
    </button>
  );

  return (
    <ClientOnly placeholder={hamburgerPlaceholder}>
      <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
        <VisuallyHidden>
          <Dialog.Title>{drawer.dialogTitle}</Dialog.Title>
          <Dialog.Description>{drawer.dialogDescription}</Dialog.Description>
        </VisuallyHidden>
        <Dialog.Trigger asChild>
          <button className={styles.hamburger} aria-label={drawer.openMenu}>
            <motion.div
              className={styles.hamburgerLine}
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className={styles.hamburgerLine}
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className={styles.hamburgerLine}
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </Dialog.Trigger>

        <AnimatePresence>
          {isOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  className={styles.overlay}
                  initial={{ opacity: skipDrawerAnimation ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: skipDrawerAnimation ? 1 : 0 }}
                  transition={{ duration: skipDrawerAnimation ? 0 : 0.3 }}
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <motion.div
                  className={styles.drawer}
                  initial={{ x: skipDrawerAnimation ? 0 : "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: skipDrawerAnimation ? 0 : "100%" }}
                  transition={
                    skipDrawerAnimation
                      ? { duration: 0 }
                      : { type: "spring", damping: 25, stiffness: 200 }
                  }
                >
                  <div className={styles.drawerHeader}>
                    <Link
                      className={styles.logoLink}
                      href="/"
                      onClick={() => handleOpenChange(false)}
                    >
                      <KlabLogo color="orange" format="full" height={40} />
                    </Link>

                    <Dialog.Close asChild>
                      <button className={styles.closeButton} aria-label={drawer.closeMenu}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </Dialog.Close>
                  </div>

                  {/* Preload tech logos as soon as drawer opens so dropdown shows them without delay */}
                  {isOpen && (
                    <div className={styles.logoPreload} aria-hidden>
                      {visibleTechnologies.map((tech) => {
                        const logoSrc =
                          effectiveTheme === "dark" ? tech.logoLight : tech.logoDark;
                        return (
                          <img
                            key={tech.href}
                            src={logoSrc}
                            alt=""
                            width={24}
                            height={24}
                            loading="eager"
                            fetchPriority="high"
                          />
                        );
                      })}
                    </div>
                  )}

                  <nav className={styles.nav}>
                    <motion.div
                      initial={skipDrawerAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={skipDrawerAnimation ? { duration: 0 } : { delay: 0.1 }}
                    >
                      <Link
                        href="/"
                        className={styles.navLink}
                        onClick={() => handleOpenChange(false)}
                      >
                        <span className={styles.navLinkText}>{nav.whatWeDo}</span>
                        <motion.div
                          className={styles.navLinkUnderline}
                          whileHover={{ scaleX: 1 }}
                          initial={{ scaleX: 0 }}
                        />
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={skipDrawerAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={skipDrawerAnimation ? { duration: 0 } : { delay: 0.15 }}
                    >
                      <button
                        className={styles.navLink}
                        onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                      >
                        <span className={styles.navLinkText}>
                          {nav.kRails}
                          <motion.svg
                            width="30"
                            height="30"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.chevron}
                            animate={{ rotate: isSolutionsOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <path
                              d="M4 6L7.5 9.5L11 6"
                              fill="currentColor"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            />
                          </motion.svg>
                        </span>
                        <motion.div
                          className={styles.navLinkUnderline}
                          whileHover={{ scaleX: 1 }}
                          initial={{ scaleX: 0 }}
                        />
                      </button>

                      <AnimatePresence>
                        {isSolutionsOpen && (
                          <motion.div
                            className={styles.dropdown}
                            initial={
                              skipDrawerAnimation
                                ? { height: "auto", opacity: 1 }
                                : { height: 0, opacity: 0 }
                            }
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: skipDrawerAnimation ? 0 : 0.3 }}
                          >
                            {visibleTechnologies.map((tech) => {
                              const logoSrc =
                                effectiveTheme === "dark" ? tech.logoLight : tech.logoDark;
                              return (
                                <Link
                                  key={tech.href}
                                  href={tech.href}
                                  className={styles.dropdownItem}
                                  onClick={() => handleOpenChange(false)}
                                >
                                  <DrawerTechLogo
                                    src={logoSrc}
                                    product={tech.product}
                                    title={tech.title}
                                    className={`${styles.dropdownItemLogo} ${tech.descriptionKey === "kbpm" ? styles.dropdownItemLogoKbpm : ""}`}
                                  />
                                  <VisuallyHidden>{tech.title}</VisuallyHidden>
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div
                      initial={skipDrawerAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={skipDrawerAnimation ? { duration: 0 } : { delay: 0.2 }}
                    >
                      <a
                        href="#"
                        className={styles.navLink}
                        onClick={() => handleOpenChange(false)}
                      >
                        <span className={styles.navLinkText}>{nav.whoWeServe}</span>
                        <motion.div
                          className={styles.navLinkUnderline}
                          whileHover={{ scaleX: 1 }}
                          initial={{ scaleX: 0 }}
                        />
                      </a>
                    </motion.div>

                    <motion.div
                      initial={skipDrawerAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={skipDrawerAnimation ? { duration: 0 } : { delay: 0.25 }}
                    >
                      <Link
                        href="/company"
                        className={styles.navLink}
                        onClick={() => handleOpenChange(false)}
                      >
                        <span className={styles.navLinkText}>{nav.company}</span>
                        <motion.div
                          className={styles.navLinkUnderline}
                          whileHover={{ scaleX: 1 }}
                          initial={{ scaleX: 0 }}
                        />
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={skipDrawerAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={skipDrawerAnimation ? { duration: 0 } : { delay: 0.28 }}
                    >
                      <button
                        className={styles.navLink}
                        onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                      >
                        <span className={styles.navLinkText}>
                          {nav.resources}
                          <motion.svg
                            width="30"
                            height="30"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.chevron}
                            animate={{ rotate: isResourcesOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <path
                              d="M4 6L7.5 9.5L11 6"
                              fill="currentColor"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            />
                          </motion.svg>
                        </span>
                        <motion.div
                          className={styles.navLinkUnderline}
                          whileHover={{ scaleX: 1 }}
                          initial={{ scaleX: 0 }}
                        />
                      </button>

                      <AnimatePresence>
                        {isResourcesOpen && (
                          <motion.div
                            className={styles.dropdown}
                            initial={
                              skipDrawerAnimation
                                ? { height: "auto", opacity: 1 }
                                : { height: 0, opacity: 0 }
                            }
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: skipDrawerAnimation ? 0 : 0.3 }}
                          >
                            {RESOURCE_NAV_ITEMS.map((item) => (
                              <a
                                key={item.id}
                                href={item.href}
                                className={`${styles.dropdownItem} ${styles.dropdownItemResource}`}
                                onClick={() => handleOpenChange(false)}
                              >
                                {tResources(item.id)}
                                <ExternalLink
                                  className={`${styles.dropdownItemExternal} rtlFlipH`}
                                  aria-hidden
                                  strokeWidth={2}
                                />
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div
                      initial={skipDrawerAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={skipDrawerAnimation ? { duration: 0 } : { delay: 0.3 }}
                    >
                      <Link
                        href="/news"
                        className={styles.navLink}
                        onClick={() => handleOpenChange(false)}
                      >
                        <span className={styles.navLinkText}>{nav.news}</span>
                        <motion.div
                          className={styles.navLinkUnderline}
                          whileHover={{ scaleX: 1 }}
                          initial={{ scaleX: 0 }}
                        />
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={skipDrawerAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={skipDrawerAnimation ? { duration: 0 } : { delay: 0.32 }}
                    >
                      <Link
                        href="/contact"
                        className={styles.navLink}
                        onClick={() => handleOpenChange(false)}
                      >
                        <span className={styles.navLinkText}>{nav.contact}</span>
                        <motion.div
                          className={styles.navLinkUnderline}
                          whileHover={{ scaleX: 1 }}
                          initial={{ scaleX: 0 }}
                        />
                      </Link>
                    </motion.div>
                  </nav>

                  <motion.div
                    className={styles.themeToggleContainer}
                    initial={skipDrawerAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={skipDrawerAnimation ? { duration: 0 } : { delay: 0.35 }}
                    style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}
                  >
                    <MobileLocaleSwitcher />
                    <MobileThemeToggle />
                  </motion.div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </ClientOnly>
  );
};
