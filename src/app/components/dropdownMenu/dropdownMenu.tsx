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
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
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
                <h3 className={styles.heading}>Our Technologies</h3>
                <ul className={styles.list}>
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
                    >
                      <Link
                        href={solution.href}
                        className={styles.item}
                        onClick={onClose}
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
