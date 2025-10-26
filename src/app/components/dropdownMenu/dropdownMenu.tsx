"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "./dropdown-menu.module.css";

import { useEffect, useRef } from "react";

interface DesktopDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const solutions = [
  {
    title: "KEO Rails",
    description:
      "Streamline your railway operations with intelligent automation",
    href: "/technologies/keo-rails",
  },
  {
    title: "KENA AI",
    description: "Advanced AI solutions for business intelligence",
    href: "/technologies/kena-ai",
  },
];

export function DesktopDropdown({ isOpen, onClose }: DesktopDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const links =
        dropdownRef.current?.querySelectorAll<HTMLAnchorElement>(
          'a[role="menuitem"]'
        );
      if (!links || links.length === 0) return;

      const currentIndex = Array.from(links).findIndex(
        (link) => link === document.activeElement
      );

      if (event.key === "ArrowDown") {
        event.preventDefault();
        // Loop to first item if at the end
        const nextIndex =
          currentIndex === links.length - 1 ? 0 : currentIndex + 1;
        links[nextIndex]?.focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        // Loop to last item if at the beginning
        const prevIndex =
          currentIndex <= 0 ? links.length - 1 : currentIndex - 1;
        links[prevIndex]?.focus();
      } else if (event.key === "Tab") {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      // Small delay to allow animation to start
      const timer = setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
              className={styles.content}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <h3 className={styles.heading}>Our Technologies</h3>
              <ul
                tabIndex={0}
                id="nav-dropdown-menu"
                role="menu"
                className={styles.list}
              >
                {solutions.map((solution, index) => (
                  <motion.li
                    key={solution.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      duration: 0.4,
                      delay: isOpen ? index * 0.2 : (3 - index) * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      role="menuitem"
                      href={solution.href}
                      className={styles.item}
                      onClick={onClose}
                      tabIndex={0}
                    >
                      <div className={styles.itemTitle}>{solution.title}</div>
                      <div className={styles.itemDescription}>
                        {solution.description}
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
