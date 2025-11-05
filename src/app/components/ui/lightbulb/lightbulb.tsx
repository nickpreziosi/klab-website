"use client";

import { motion } from "framer-motion";
import styles from "./lightbulb.module.css";
import { Logo } from "@/app/components/ui/logo/logo";

interface LightbulbProps {
  size?: number;
  glowColor?: string;
}

export default function Lightbulb({
  size = 200,
  glowColor = "#ff004cff",
}: LightbulbProps) {
  return (
    <div className={styles.container} style={{ width: size, height: size }}>
      <motion.div
        className={styles.lightbulb}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={styles.outerGlow}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            background: `radial-gradient(circle, ${glowColor}30 0%, transparent 70%)`,
          }}
        />

        <svg viewBox="0 0 200 280" className={styles.bulbSvg}>
          {/* Bulb outline */}
          <motion.path
            d="M 100 20
               C 140 20, 160 50, 160 90
               C 160 120, 145 140, 135 160
               C 130 170, 125 180, 125 190
               L 75 190
               C 75 180, 70 170, 65 160
               C 55 140, 40 120, 40 90
               C 40 50, 60 20, 100 20 Z"
            fill="none"
            stroke={glowColor}
            strokeWidth="3"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Filament holder top */}
          <rect
            x="75"
            y="190"
            width="50"
            height="8"
            fill="none"
            stroke={glowColor}
            strokeWidth="2"
          />

          {/* Screw base threads */}
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x="70"
              y={198 + i * 12}
              width="60"
              height="8"
              fill="none"
              stroke={glowColor}
              strokeWidth="2"
              rx="2"
            />
          ))}

          {/* Bottom cap */}
          <ellipse
            cx="100"
            cy="250"
            rx="30"
            ry="8"
            fill="none"
            stroke={glowColor}
            strokeWidth="2"
          />
        </svg>

        {/* KEO Logo inside bulb */}
        <motion.div
          className={styles.logoContainer}
          animate={{
            opacity: [0.75, 1, 0.75],
            scale: [0.85, 0.9, 0.85],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Logo size="lg"></Logo>
        </motion.div>
      </motion.div>
    </div>
  );
}
