"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./dropdown-menu.module.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavAddonSpheres } from "@/ui/shared/components/addon-spheres/nav-addon-spheres";
import { NavResourceLinks } from "@/ui/shared/components/addon-spheres/nav-resource-links";

/**
 * Original grid implementation is in dropdown-menu-grid.tsx.
 * To revert to the grid: import { TechnologiesDropdownGrid } from "./dropdown-menu-grid"
 * and render <TechnologiesDropdownGrid isOpen={isOpen} onClose={onClose} /> inside the content div.
 */

export type DesktopDropdownVariant = "krails" | "resources";

interface DesktopDropdownProps {
  isOpen: boolean;
  variant: DesktopDropdownVariant;
  onClose: () => void;
}

const EASE = [0.4, 0, 0.2, 1] as const;

export function DesktopDropdown({ isOpen, variant, onClose }: DesktopDropdownProps) {
  const tKrails = useTranslations("technologiesDropdown");
  const tResources = useTranslations("resourcesDropdown");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastHeightRef = useRef<number | null>(null);
  const [swapHeight, setSwapHeight] = useState<number | "auto">("auto");
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;
  const prevVariantRef = useRef<DesktopDropdownVariant | null>(null);
  const isSwap = isOpen && prevVariantRef.current != null && prevVariantRef.current !== variant;

  useEffect(() => {
    if (isOpen) prevVariantRef.current = variant;
    else {
      prevVariantRef.current = null;
      lastHeightRef.current = null;
      setSwapHeight("auto");
      if (dropdownRef.current) dropdownRef.current.style.overflow = "hidden";
    }
  }, [isOpen, variant]);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!isOpen || !panel) return;

    const next = panel.scrollHeight;
    const prev = lastHeightRef.current;

    if (!isSwap || prev == null || Math.abs(prev - next) < 1) {
      lastHeightRef.current = next;
      return;
    }

    lastHeightRef.current = next;
    setSwapHeight(prev);
    const frame = requestAnimationFrame(() => setSwapHeight(next));
    return () => cancelAnimationFrame(frame);
  }, [variant, isOpen, isSwap]);

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;

    let lastWidth = window.innerWidth;

    const handleResize = () => {
      const w = window.innerWidth;
      if (lastWidth > 1024 && w <= 1024) {
        onClose();
      }
      lastWidth = w;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          className={styles.dropdown}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            height: { duration: 0.3, ease: EASE },
            opacity: { duration: 0.3 },
          }}
          onAnimationStart={() => {
            if (dropdownRef.current) dropdownRef.current.style.overflow = "hidden";
          }}
          onAnimationComplete={() => {
            if (isOpenRef.current && dropdownRef.current) {
              dropdownRef.current.style.height = "auto";
              dropdownRef.current.style.overflow = "visible";
            }
          }}
        >
          <div className={styles.container}>
            <motion.div
              className={styles.swap}
              initial={false}
              animate={{ height: swapHeight }}
              transition={{ duration: isSwap ? 0.3 : 0, ease: EASE }}
            >
              <AnimatePresence
                onExitComplete={() => {
                  if (isOpenRef.current) setSwapHeight("auto");
                }}
              >
                <motion.div
                  key={variant}
                  ref={panelRef}
                  className={styles.content}
                  initial={isSwap ? { opacity: 0 } : { y: -20, opacity: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={isSwap ? { opacity: 0 } : { opacity: 1, y: 0, transition: { duration: 0 } }}
                  transition={
                    isSwap
                      ? { duration: 0.2, ease: EASE }
                      : { delay: 0.15, duration: 0.3, ease: EASE }
                  }
                >
                  {variant === "resources" ? (
                    <NavResourceLinks onLinkClick={onClose} headerTitle={tResources("heading")} />
                  ) : (
                    <NavAddonSpheres onLinkClick={onClose} headerTitle={tKrails("heading")} />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
