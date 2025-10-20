"use client";
import { motion, AnimatePresence } from "framer-motion";
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
    href: "/solutions/keo-rails",
  },
  {
    title: "KENA AI",
    description: "Advanced AI solutions for business intelligence",
    href: "/solutions/kena-ai",
  },
];

export function DesktopDropdown({ isOpen, onClose }: DesktopDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Dropdown Drawer */}
          <motion.div
            layout
            className={styles.dropdown}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100%", opacity: 1 }}
            exit={{ height: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className={styles.container}>
              <AnimatePresence propagate>
                <motion.div
                  layout
                  className={styles.content}
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  exit={{ y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className={styles.heading}>Our Solutions</h3>
                  <ul className={styles.list}>
                    {solutions.map((solution, index) => (
                      <AnimatePresence key={index} propagate>
                        <motion.li
                          layout
                          key={solution.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.1 + index * 0.05,
                          }}
                        >
                          <Link
                            href={solution.href}
                            className={styles.item}
                            onClick={onClose}
                          >
                            <div className={styles.itemTitle}>
                              {solution.title}
                            </div>
                            <div className={styles.itemDescription}>
                              {solution.description}
                            </div>
                          </Link>
                        </motion.li>
                      </AnimatePresence>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
