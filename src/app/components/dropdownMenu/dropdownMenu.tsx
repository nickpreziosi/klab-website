"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "./dropdown-menu.module.css";

import { useEffect, useRef } from "react";

interface DesktopDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  /** Optional ref to the button that toggles the dropdown so clicks on it can be ignored */
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

const solutions = [
  {
    title: "KEO Rails",
    description:
      "Streamline your railway operations with intelligent automation",
    href: "/solutions/keo-rails",
  },
  {
    title: "KENA AI",
    description: "Advanced AI solutions for business intelligence",
    href: "/solutions/kena-ai",
  },
  {
    title: "KEO Invoice Management Portal",
    description: "Simplify invoice processing and management",
    href: "/solutions/invoice-portal",
  },
  {
    title: "KEO Teams & WhatsApp AI Chat",
    description:
      "Analyze business data and KPIs with the help of our conversational AI interface for Microsot Teams and WhatsApp",
    href: "/solutions/teams-whatsapp-ai-chat",
  },
];

export function DesktopDropdown({
  isOpen,
  onClose,
  triggerRef,
}: DesktopDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
      )}
    </AnimatePresence>
  );
}
