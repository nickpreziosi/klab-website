"use client";
import styles from "./cta-section.module.css";
import { Logo } from "../logo/logo";
import { motion } from "framer-motion";
import Link from "next/link";

export const CtaSection = () => {
  return (
    <>
      <section className={styles.container}>
        <Logo size="xl" animated="constant"></Logo>
        <div className={styles.textContent}>
          <h2>Ready to Elevate Your B2B Payments?</h2>
          <p>
            Discover how KEO&apos;s innovative digital payment and inventory
            financing solutions can transform your business operations. Contact
            us today to learn more!
          </p>
          <motion.div
            className={styles.loginContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Link href="/login" className={styles.loginButton}>
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};
