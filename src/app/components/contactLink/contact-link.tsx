"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./contact-link.module.css";
import Button from "../ui/button/button";
interface ContactLinkProps {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  buttonText: string;
}

export function ContactLink({
  icon,
  title,
  description,
  href,
  buttonText,
}: ContactLinkProps) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -4 }}
    >
      <h3 className={styles.title}>{title}</h3>

      <p className={styles.description}>{description}</p>

      <Button
        href={href}
        text={buttonText}
        variant="outline"
        iconPosition="end"
        size="sm"
        fontWeight={300}
        icon={
          <svg
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        }
      />
    </motion.div>
  );
}
