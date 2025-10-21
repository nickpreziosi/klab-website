"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./dropdown-menu.module.css";

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
    href: "/techologies/kena-ai",
  },
];

export function DesktopDropdown({ isOpen, onClose }: DesktopDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement | null>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);
  const lastItemRef = useRef<HTMLAnchorElement>(null);

  // Store navbar reference
  useEffect(() => {
    navbarRef.current = document.getElementById("navbarContainer");
  }, []);

  // Handle clicks outside of navbar
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (navbarRef.current && !navbarRef.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle keyboard interactions
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "Tab":
          if (
            event.shiftKey &&
            document.activeElement === firstItemRef.current
          ) {
            event.preventDefault();
            lastItemRef.current?.focus();
          } else if (
            !event.shiftKey &&
            document.activeElement === lastItemRef.current
          ) {
            event.preventDefault();
            firstItemRef.current?.focus();
          }
          break;
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (!dropdownRef.current?.contains(event.relatedTarget as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    dropdownRef.current?.addEventListener("focusout", handleFocusOut);

    // Focus first item when opening
    firstItemRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      dropdownRef.current?.removeEventListener("focusout", handleFocusOut);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          key="dropdown-container"
          className={styles.container}
          style={{ overflow: "hidden" }}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: "100%",
            opacity: 1,
            transition: {
              height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.2 },
            },
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.2, delay: 0.1 },
            },
          }}
          role="dialog"
          aria-label="Technologies dropdown"
        >
          <motion.div
            className={styles.dropdown}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
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
                <h3 className={styles.heading} id="dropdown-title">
                  Our Technologies
                </h3>
                <ul
                  className={styles.list}
                  role="menu"
                  aria-labelledby="dropdown-title"
                >
                  {solutions.map((solution, index) => (
                    <motion.li
                      key={solution.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{
                        duration: 0.2,
                        delay: isOpen ? index * 0.05 : (3 - index) * 0.03,
                        ease: "easeOut",
                      }}
                      role="none"
                    >
                      <Link
                        ref={
                          index === 0
                            ? firstItemRef
                            : index === solutions.length - 1
                            ? lastItemRef
                            : null
                        }
                        href={solution.href}
                        className={styles.item}
                        onClick={onClose}
                        role="menuitem"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
