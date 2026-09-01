"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./dropdown-menu.module.css";
import { useEffect, useRef } from "react";
import { NavAddonSpheres } from "@/ui/shared/components/addon-spheres/nav-addon-spheres";
import { NavResourceSpheres } from "@/ui/shared/components/addon-spheres/nav-resource-spheres";

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

export function DesktopDropdown({ isOpen, variant, onClose }: DesktopDropdownProps) {
  const tKrails = useTranslations("technologiesDropdown");
  const tResources = useTranslations("resourcesDropdown");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when viewport shrinks from desktop to mobile while open
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
            height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.3 },
          }}
        >
          <div className={styles.container}>
            <motion.div
              key={variant}
              className={styles.content}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.15,
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
              exit={{ y: -20, opacity: 0, transition: { delay: 0 } }}
            >
              {variant === "resources" ? (
                <NavResourceSpheres onLinkClick={onClose} headerTitle={tResources("heading")} />
              ) : (
                <NavAddonSpheres onLinkClick={onClose} headerTitle={tKrails("heading")} />
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
