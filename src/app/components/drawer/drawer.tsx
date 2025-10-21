"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import styles from "./drawer.module.css";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Logo } from "../logo/logo";

export const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <VisuallyHidden>
        <Dialog.Title>Open Mobile Nav</Dialog.Title>
      </VisuallyHidden>
      <Dialog.Trigger asChild>
        <button className={styles.hamburger} aria-label="Open menu">
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(false)}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className={styles.drawer}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <div className={styles.drawerHeader}>
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    <Logo size="sm"></Logo>
                  </Link>

                  <Dialog.Close asChild>
                    <button
                      className={styles.closeButton}
                      aria-label="Close menu"
                    >
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      href="/"
                      className={styles.navLink}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className={styles.navLinkText}>Home</span>
                      <motion.div
                        className={styles.navLinkUnderline}
                        whileHover={{ scaleX: 1 }}
                        initial={{ scaleX: 0 }}
                      />
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <button
                      className={styles.navLink}
                      onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                    >
                      <span className={styles.navLinkText}>
                        Technologies
                        <motion.svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={styles.chevron}
                          animate={{ rotate: isSolutionsOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path
                            d="M4 6L8 10L12 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
                          <Link
                            href="/"
                            className={styles.dropdownItem}
                            onClick={() => setIsOpen(false)}
                          >
                            KEO Rails
                          </Link>
                          <Link
                            href="/"
                            className={styles.dropdownItem}
                            onClick={() => setIsOpen(false)}
                          >
                            KENA AI
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link
                      href="/"
                      className={styles.navLink}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className={styles.navLinkText}>Why Keo</span>
                      <motion.div
                        className={styles.navLinkUnderline}
                        whileHover={{ scaleX: 1 }}
                        initial={{ scaleX: 0 }}
                      />
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <Link
                      href="/"
                      className={styles.navLink}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className={styles.navLinkText}>Company</span>
                      <motion.div
                        className={styles.navLinkUnderline}
                        whileHover={{ scaleX: 1 }}
                        initial={{ scaleX: 0 }}
                      />
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link
                      href="/"
                      className={styles.navLink}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className={styles.navLinkText}>Contact</span>
                      <motion.div
                        className={styles.navLinkUnderline}
                        whileHover={{ scaleX: 1 }}
                        initial={{ scaleX: 0 }}
                      />
                    </Link>
                  </motion.div>
                </nav>

                <motion.div
                  className={styles.loginContainer}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Link
                    href="/login"
                    className={styles.loginButton}
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      LOG IN
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
