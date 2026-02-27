"use client";

import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import type { NavTranslations, DrawerTranslations } from "@/ui/shared/types/translations";
import { buildDrawerTranslations, buildNavTranslations } from "@/ui/shared/types/translations";
import { Link } from "@/i18n/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ClientOnly } from "@/ui/shared/components/client-only/client-only";
import { MobileThemeToggle } from "@/ui/shared/components/mobile-theme-toggle/mobile-theme-toggle";
import { MobileLocaleSwitcher } from "@/ui/shared/components/mobile-locale-switcher/mobile-locale-switcher";
import { KlabLogo } from "@/ui/shared/components/klab-logo/klab-logo";
import {
  TECHNOLOGIES,
  SVGLogo,
  preloadTechnologyLogos,
} from "@/ui/shared/components/technologies-showcase/technologies-showcase";
import { useTheme } from "@/ui/shared/hooks/use-theme";
import { consumeShouldReopenDrawerAfterLocale } from "@/ui/shared/utils/drawer-reopen-after-locale";
import styles from "./drawer.module.css";

function TechLogo({ src, className }: { src: string; title: string; className?: string }) {
  return (
    <div className={className} aria-hidden>
      <SVGLogo src={src} className={styles.dropdownItemLogoSvg} />
    </div>
  );
}

export type DrawerProps = {
  /** When provided (from layout via Navbar), drawer copy is SSR'd */
  drawerTranslations?: DrawerTranslations;
  /** When provided (from layout via Navbar), nav copy in drawer is SSR'd */
  navTranslations?: NavTranslations;
};

export const Drawer = (props: DrawerProps) => {
  const { drawerTranslations: serverDrawerTranslations, navTranslations: serverNavTranslations } =
    props ?? {};
  const skipNextCloseRef = useRef(false);
  const reopenedAtRef = useRef<number>(0);
  const reopenedRef = useRef(false);
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    const shouldOpen = consumeShouldReopenDrawerAfterLocale();
    if (shouldOpen) {
      skipNextCloseRef.current = true;
      reopenedRef.current = true;
      reopenedAtRef.current = Date.now();
    }
    return shouldOpen;
  });
  const [skipDrawerAnimation, setSkipDrawerAnimation] = useState(() => reopenedRef.current);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const { effectiveTheme } = useTheme();
  const pathname = usePathname();

  // Reopen drawer after locale switch when pathname changes (e.g. client nav without remount).
  useEffect(() => {
    if (!consumeShouldReopenDrawerAfterLocale()) return;
    skipNextCloseRef.current = true;
    reopenedAtRef.current = Date.now();
    setSkipDrawerAnimation(true);
    setIsOpen(true);
  }, [pathname]);

  // Preload technology logos when drawer mounts so opening the technologies list is instant (Safari/mobile).
  useEffect(() => {
    if (typeof requestIdleCallback === "undefined") return;
    const id = requestIdleCallback(() => preloadTechnologyLogos(), { timeout: 2000 });
    return () => cancelIdleCallback(id);
  }, []);

  const [prepareClose, setPrepareClose] = useState(false);
  useEffect(() => {
    if (!prepareClose) return;
    setPrepareClose(false);
    setIsOpen(false);
  }, [prepareClose]);

  const handleOpenChange = (open: boolean) => {
    if (!open && skipNextCloseRef.current) {
      const recentlyOpened = Date.now() - reopenedAtRef.current < 200;
      if (recentlyOpened) {
        skipNextCloseRef.current = false;
        return;
      }
      skipNextCloseRef.current = false;
    }
    if (!open) {
      setSkipDrawerAnimation(false);
      setPrepareClose(true);
      return;
    }
    setIsOpen(open);
  };

  const t = useTranslations("drawer");
  const tNav = useTranslations("nav");
  const drawer = serverDrawerTranslations ?? buildDrawerTranslations(t);
  const nav = serverNavTranslations ?? buildNavTranslations(tNav);

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
                  onClick={() => handleOpenChange(false)}
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
                        <svg
                          className={styles.icon}
                          width="18"
                          height="18"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className={styles.navLinkText}>{drawer.home}</span>
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
                        <svg
                          className={styles.icon}
                          width="18"
                          height="18"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.85357 3.85355L7.65355 3.05353C8.2981 2.40901 9.42858 1.96172 10.552 1.80125C11.1056 1.72217 11.6291 1.71725 12.0564 1.78124C12.4987 1.84748 12.7698 1.97696 12.8965 2.10357C13.0231 2.23018 13.1526 2.50125 13.2188 2.94357C13.2828 3.37086 13.2779 3.89439 13.1988 4.44801C13.0383 5.57139 12.591 6.70188 11.9464 7.34645L7.49999 11.7929L6.35354 10.6465C6.15827 10.4512 5.84169 10.4512 5.64643 10.6465C5.45117 10.8417 5.45117 11.1583 5.64643 11.3536L7.14644 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L8.40073 12.3064L9.57124 14.2572C9.65046 14.3893 9.78608 14.4774 9.9389 14.4963C10.0917 14.5151 10.2447 14.4624 10.3535 14.3536L12.3535 12.3536C12.4648 12.2423 12.5172 12.0851 12.495 11.9293L12.0303 8.67679L12.6536 8.05355C13.509 7.19808 14.0117 5.82855 14.1887 4.58943C14.2784 3.9618 14.2891 3.33847 14.2078 2.79546C14.1287 2.26748 13.9519 1.74482 13.6035 1.39645C13.2552 1.04809 12.7325 0.871332 12.2045 0.792264C11.6615 0.710945 11.0382 0.721644 10.4105 0.8113C9.17143 0.988306 7.80189 1.491 6.94644 2.34642L6.32322 2.96968L3.07071 2.50504C2.91492 2.48278 2.75773 2.53517 2.64645 2.64646L0.646451 4.64645C0.537579 4.75533 0.484938 4.90829 0.50375 5.0611C0.522563 5.21391 0.61073 5.34954 0.742757 5.42876L2.69364 6.59928L2.14646 7.14645C2.0527 7.24022 2.00002 7.3674 2.00002 7.50001C2.00002 7.63261 2.0527 7.75979 2.14646 7.85356L3.64647 9.35356C3.84173 9.54883 4.15831 9.54883 4.35357 9.35356C4.54884 9.1583 4.54884 8.84172 4.35357 8.64646L3.20712 7.50001L3.85357 6.85356L6.85357 3.85355ZM10.0993 13.1936L9.12959 11.5775L11.1464 9.56067L11.4697 11.8232L10.0993 13.1936ZM3.42251 5.87041L5.43935 3.85356L3.17678 3.53034L1.80638 4.90074L3.42251 5.87041ZM2.35356 10.3535C2.54882 10.1583 2.54882 9.8417 2.35356 9.64644C2.1583 9.45118 1.84171 9.45118 1.64645 9.64644L0.646451 10.6464C0.451188 10.8417 0.451188 11.1583 0.646451 11.3535C0.841713 11.5488 1.1583 11.5488 1.35356 11.3535L2.35356 10.3535ZM3.85358 11.8536C4.04884 11.6583 4.04885 11.3417 3.85359 11.1465C3.65833 10.9512 3.34175 10.9512 3.14648 11.1465L1.14645 13.1464C0.95119 13.3417 0.951187 13.6583 1.14645 13.8535C1.34171 14.0488 1.65829 14.0488 1.85355 13.8536L3.85358 11.8536ZM5.35356 13.3535C5.54882 13.1583 5.54882 12.8417 5.35356 12.6464C5.1583 12.4512 4.84171 12.4512 4.64645 12.6464L3.64645 13.6464C3.45119 13.8417 3.45119 14.1583 3.64645 14.3535C3.84171 14.5488 4.1583 14.5488 4.35356 14.3535L5.35356 13.3535ZM9.49997 6.74881C10.1897 6.74881 10.7488 6.1897 10.7488 5.5C10.7488 4.8103 10.1897 4.25118 9.49997 4.25118C8.81026 4.25118 8.25115 4.8103 8.25115 5.5C8.25115 6.1897 8.81026 6.74881 9.49997 6.74881Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className={styles.navLinkText}>
                          {nav.technologies}
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
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {TECHNOLOGIES.map((tech) => {
                              const logoSrc =
                                effectiveTheme === "dark" ? tech.logoLight : tech.logoDark;
                              return (
                                <Link
                                  key={tech.href}
                                  href={tech.href}
                                  className={styles.dropdownItem}
                                  onClick={() => handleOpenChange(false)}
                                >
                                  <TechLogo
                                    src={logoSrc}
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
                      transition={skipDrawerAnimation ? { duration: 0 } : { delay: 0.25 }}
                    >
                      <Link
                        href="/company"
                        className={styles.navLink}
                        onClick={() => handleOpenChange(false)}
                      >
                        <svg
                          className={styles.icon}
                          width="18"
                          height="18"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 1C5 0.447715 5.44772 0 6 0H9C9.55228 0 10 0.447715 10 1V2H14C14.5523 2 15 2.44772 15 3V6C15 6.8888 14.6131 7.68734 14 8.23608V11.5C14 12.3284 13.3284 13 12.5 13H2.5C1.67157 13 1 12.3284 1 11.5V8.2359C0.38697 7.68721 0 6.88883 0 6V3C0 2.44772 0.447716 2 1 2H5V1ZM9 1V2H6V1H9ZM1 3H5H5.5H9.5H10H14V6C14 6.654 13.6866 7.23467 13.1997 7.6004C12.8655 7.85144 12.4508 8 12 8H8V7.5C8 7.22386 7.77614 7 7.5 7C7.22386 7 7 7.22386 7 7.5V8H3C2.5493 8 2.1346 7.85133 1.80029 7.60022C1.31335 7.23446 1 6.65396 1 6V3ZM7 9H3C2.64961 9 2.31292 8.93972 2 8.82905V11.5C2 11.7761 2.22386 12 2.5 12H12.5C12.7761 12 13 11.7761 13 11.5V8.82915C12.6871 8.93978 12.3504 9 12 9H8V9.5C8 9.77614 7.77614 10 7.5 10C7.22386 10 7 9.77614 7 9.5V9Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
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
                      transition={skipDrawerAnimation ? { duration: 0 } : { delay: 0.25 }}
                    >
                      <Link
                        href="/news"
                        className={styles.navLink}
                        onClick={() => handleOpenChange(false)}
                      >
                        <svg
                          className={styles.icon}
                          width="18"
                          height="18"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.2 1H4.17741H4.1774C3.86936 0.999988 3.60368 0.999978 3.38609 1.02067C3.15576 1.04257 2.92825 1.09113 2.71625 1.22104C2.51442 1.34472 2.34473 1.51442 2.22104 1.71625C2.09113 1.92825 2.04257 2.15576 2.02067 2.38609C1.99998 2.60367 1.99999 2.86935 2 3.17738V3.1774V3.2V11.8V11.8226V11.8226C1.99999 12.1307 1.99998 12.3963 2.02067 12.6139C2.04257 12.8442 2.09113 13.0717 2.22104 13.2837C2.34473 13.4856 2.51442 13.6553 2.71625 13.779C2.92825 13.9089 3.15576 13.9574 3.38609 13.9793C3.60368 14 3.86937 14 4.17741 14H4.2H10.8H10.8226C11.1306 14 11.3963 14 11.6139 13.9793C11.8442 13.9574 12.0717 13.9089 12.2837 13.779C12.4856 13.6553 12.6553 13.4856 12.779 13.2837C12.9089 13.0717 12.9574 12.8442 12.9793 12.6139C13 12.3963 13 12.1306 13 11.8226V11.8V3.2V3.17741C13 2.86936 13 2.60368 12.9793 2.38609C12.9574 2.15576 12.9089 1.92825 12.779 1.71625C12.6553 1.51442 12.4856 1.34472 12.2837 1.22104C12.0717 1.09113 11.8442 1.04257 11.6139 1.02067C11.3963 0.999978 11.1306 0.999988 10.8226 1H10.8H4.2ZM3.23875 2.07368C3.26722 2.05623 3.32362 2.03112 3.48075 2.01618C3.64532 2.00053 3.86298 2 4.2 2H10.8C11.137 2 11.3547 2.00053 11.5193 2.01618C11.6764 2.03112 11.7328 2.05623 11.7613 2.07368C11.8285 2.11491 11.8851 2.17147 11.9263 2.23875C11.9438 2.26722 11.9689 2.32362 11.9838 2.48075C11.9995 2.64532 12 2.86298 12 3.2V11.8C12 12.137 11.9995 12.3547 11.9838 12.5193C11.9689 12.6764 11.9438 12.7328 11.9263 12.7613C11.8851 12.8285 11.8285 12.8851 11.7613 12.9263C11.7328 12.9438 11.6764 12.9689 11.5193 12.9838C11.3547 12.9995 11.137 13 10.8 13H4.2C3.86298 13 3.64532 12.9995 3.48075 12.9838C3.32362 12.9689 3.26722 12.9438 3.23875 12.9263C3.17147 12.8851 3.11491 12.8285 3.07368 12.7613C3.05624 12.7328 3.03112 12.6764 3.01618 12.5193C3.00053 12.3547 3 12.137 3 11.8V3.2C3 2.86298 3.00053 2.64532 3.01618 2.48075C3.03112 2.32362 3.05624 2.26722 3.07368 2.23875C3.11491 2.17147 3.17147 2.11491 3.23875 2.07368ZM5 10C4.72386 10 4.5 10.2239 4.5 10.5C4.5 10.7761 4.72386 11 5 11H8C8.27614 11 8.5 10.7761 8.5 10.5C8.5 10.2239 8.27614 10 8 10H5ZM4.5 7.5C4.5 7.22386 4.72386 7 5 7H10C10.2761 7 10.5 7.22386 10.5 7.5C10.5 7.77614 10.2761 8 10 8H5C4.72386 8 4.5 7.77614 4.5 7.5ZM5 4C4.72386 4 4.5 4.22386 4.5 4.5C4.5 4.77614 4.72386 5 5 5H10C10.2761 5 10.5 4.77614 10.5 4.5C10.5 4.22386 10.2761 4 10 4H5Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
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
                      transition={skipDrawerAnimation ? { duration: 0 } : { delay: 0.3 }}
                    >
                      <Link
                        href="/contact"
                        className={styles.navLink}
                        onClick={() => handleOpenChange(false)}
                      >
                        <svg
                          className={styles.icon}
                          width="18"
                          height="18"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
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
                    <MobileThemeToggle
                      onBeforeThemeChange={() => {
                        skipNextCloseRef.current = true;
                      }}
                    />
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
