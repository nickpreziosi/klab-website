"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./dropdown-menu.module.css";
import { useEffect, useState } from "react";

/**
 * Original Technologies dropdown content: grid of technology links.
 * Kept as backup; use this file to restore the grid if we revert from the semicircle showcase.
 */

interface SVGLogoProps {
  src: string;
}

function SVGLogo({ src }: SVGLogoProps) {
  const [svgContent, setSvgContent] = useState<string>("");
  const isKabl = src.includes("KAbl.svg");
  const isKAxis = src.includes("KAxis.svg");

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((text) => {
        let processed = text;
        if (isKabl) {
          processed = processed
            .replace(/fill="#f37022"/g, 'fill="currentColor"')
            .replace(/fill='#f37022'/g, "fill='currentColor'")
            .replace(
              /(<(?:path|polygon|g)[^>]*fill=["']#306fc6["'][^>]*?)\s*(\/?>)/g,
              '$1 class="kabl-blue"$2'
            )
            .replace(
              /(<line[^>]*stroke=["']#306fc6["'][^>]*?)\s*(\/?>)/g,
              '$1 class="kabl-blue-stroke"$2'
            );
        } else if (isKAxis) {
          processed = processed
            .replace(/fill="#f37022"/g, 'fill="currentColor"')
            .replace(/fill='#f37022'/g, "fill='currentColor'")
            .replace(/stroke="#f37022"/g, 'stroke="currentColor"')
            .replace(/stroke='#f37022'/g, "stroke='currentColor'");
        } else {
          processed = processed
            .replace(/fill="#f37022"/g, 'fill="currentColor"')
            .replace(/fill='#f37022'/g, "fill='currentColor'")
            .replace(/fill="#306fc6"/g, 'fill="currentColor"')
            .replace(/fill='#306fc6'/g, "fill='currentColor'");
        }
        processed = processed.replace(/<\?xml[^>]*\?>/i, "");
        setSvgContent(processed);
      })
      .catch((err) => console.error("Failed to load SVG:", err));
  }, [src, isKabl, isKAxis]);

  if (!svgContent) return null;
  return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
}

const solutions = [
  {
    title: "K-Rails",
    logo: "/logos/01-KRails.svg",
    description: "B2B blockchain payments and lending with instant settlements",
    href: "/technologies/krails",
  },
  {
    title: "Kena",
    logo: "/logos/03-Kena_2.svg",
    description: "World's first AI underwriter for intelligent credit decisions",
    href: "/technologies/kena",
  },
  {
    title: "K-Talk",
    logo: "/logos/05-KTalk.svg",
    description: "AI-powered chatbot for internal and external support",
    href: "/technologies/ktalk",
  },
  {
    title: "K-Risk",
    logo: "/logos/k-risk-logo.svg",
    description: "AI-powered risk assessment and decision making",
    href: "/technologies/krisk",
  },
  {
    title: "KABL",
    logo: "/logos/KAbl.svg",
    description: "Integrated automation eliminating silos with AI and blockchain",
    href: "/technologies/kabl",
  },
  {
    title: "K-Pay",
    logo: "/logos/KCard.svg",
    description: "Multi-currency payment gateway with real-time FX",
    href: "/technologies/kcard",
  },
  {
    title: "K-Comply",
    logo: "/logos/KBPM.svg",
    description: "Regulatory compliance automation with blockchain",
    href: "/technologies/kbpm",
  },
  {
    title: "K-Ledger",
    logo: "/logos/01-K-Lab.svg",
    description: "Immutable transaction ledger with enterprise security",
    href: "/technologies/kim",
  },
  {
    title: "K-Connect",
    logo: "/logos/02-KAxis.svg",
    description: "API-first platform connecting financial institutions",
    href: "/technologies/kaxis",
  },
  {
    title: "K-Insights",
    logo: "/logos/KLeads.svg",
    description: "Real-time analytics and predictive insights",
    href: "/technologies/kleads",
  },
  {
    title: "K-Wallet",
    logo: "/logos/06-Kai_2.svg",
    description: "Enterprise digital wallet with multi-signature support",
    href: "/technologies/kai",
  },
];

export interface TechnologiesDropdownGridProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TechnologiesDropdownGrid({ isOpen, onClose }: TechnologiesDropdownGridProps) {
  return (
    <>
      <h3 className={styles.heading}>Our Technologies</h3>
      <ul tabIndex={0} id="nav-dropdown-menu" role="menu" className={styles.list}>
        {solutions.map((solution, index) => (
          <motion.li
            key={solution.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
              duration: 0.4,
              delay: isOpen ? index * 0.05 : (10 - index) * 0.05,
              ease: "easeOut",
            }}
          >
            <Link
              role="menuitem"
              href={solution.href}
              className={styles.item}
              onClick={onClose}
              tabIndex={0}
              aria-label={solution.title}
            >
              <span className={styles.srOnly}>{solution.title}</span>
              <div className={styles.itemLogo}>
                <SVGLogo src={solution.logo} />
              </div>
              <div className={styles.itemDescription}>{solution.description}</div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </>
  );
}
