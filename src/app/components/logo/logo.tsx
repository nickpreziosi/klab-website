"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./logo.module.css";
import type React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean | "constant";
  fit?: "fixed" | "contain" | "cover" | "fill" | "fit-content";
  flat?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 48,
  md: 80,
  lg: 120,
  xl: 160,
};

const logoVariants = {
  initial: {
    scale: 1,
    rotate: 0,
  },
  hover: {
    scale: 1.05,
    rotate: [0, -2, 2, -2, 0],
    transition: {
      rotate: {
        duration: 0.5,
        ease: "easeInOut",
      },
      scale: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  },
};

const constantAnimationVariants = {
  animate: {
    rotate: [0, -3, 3, -3, 0],
    scale: [1, 1.02, 1, 1.02, 1],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  },
};

export const Logo = ({
  size = "md",
  animated = true,
  fit = "fixed",
  flat = false,
  className,
}: LogoProps) => {
  const logoSize = sizeMap[size];

  const isAnimated = animated !== false;
  const isConstantAnimation = animated === "constant";

  const getSizeClass = () => {
    if (fit === "fit-content") {
      return styles.fitContent;
    } else if (fit === "contain" || fit === "cover" || fit === "fill") {
      return styles[
        `fit${fit.charAt(0).toUpperCase()}${fit.slice(
          1
        )}` as keyof typeof styles
      ];
    } else {
      return styles[
        `size${size.charAt(0).toUpperCase()}${size.slice(
          1
        )}` as keyof typeof styles
      ];
    }
  };

  const getObjectFitClass = () => {
    switch (fit) {
      case "contain":
        return styles.objectContain;
      case "cover":
        return styles.objectCover;
      case "fill":
        return styles.objectFill;
      default:
        return styles.objectContain;
    }
  };

  const containerClasses = [
    styles.logoContainer,
    getSizeClass(),
    !isAnimated && styles.noAnimation,
    flat && styles.flat,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const motionProps = (
    isConstantAnimation
      ? {
          variants: constantAnimationVariants,
          animate: "animate",
        }
      : isAnimated
      ? {
          variants: logoVariants,
          initial: "initial",
          whileHover: "hover",
          whileTap: { scale: 0.95 },
        }
      : undefined
  ) as React.ComponentProps<typeof motion.div> | undefined;

  const inner = (
    <div className={styles.logoInner}>
      <Image
        src="/keo-logo.png"
        alt="KEO Logo"
        width={logoSize}
        height={logoSize}
        className={getObjectFitClass()}
        priority
      />
    </div>
  );

  if (isAnimated) {
    return (
      <motion.div className={containerClasses} {...motionProps}>
        {inner}
      </motion.div>
    );
  }

  return <div className={containerClasses}>{inner}</div>;
};
