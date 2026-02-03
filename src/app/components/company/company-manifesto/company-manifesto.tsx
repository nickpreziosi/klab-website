"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { KlabLogo } from "@/app/components/ui/klab-logo/klab-logo";
import CompanySectionTitle from "@/app/components/company/company-section-title/company-section-title";
import styles from "./company-manifesto.module.css";

const MANIFESTO_ITEMS = [
  { text: "In code we trust. In people we invest.", highlights: ["code we trust", "people we invest"] },
  { text: "Zero friction. Zero fraud. Zero excuses.", highlights: ["Zero friction", "Zero fraud", "Zero excuses"] },
  { text: "We don't build tech. We build trust.", highlights: ["build tech", "build trust"] },
  { text: "Our architecture doesn't sleep.", highlights: ["architecture doesn't sleep"] },
  { text: "Success is only success if it's shared.", highlights: ["success is only success if it's shared"] },
  { text: "Progress, accelerated.", highlights: ["Progress, accelerated."] },
  { text: "Incorruptible by design.", highlights: ["Incorruptible by design."] },
  { text: "We fight fraud. We fund dreams.", highlights: ["fight fraud", "fund dreams"] },
  { text: "Defending the future from the friction of the past.", highlights: ["Defending the future from the friction of the past."] },
  { text: "Infrastructure for the unhackable.", highlights: ["Infrastructure for the unhackable."] },
  { text: "The more we create, the more we give.", highlights: ["The more we create", "the more we give"] },
];

const RADIUS_PERCENT = 44;
const CENTER = 50;
/** Radius of the logo container in viewBox units (0–100). Lines start at this edge. */
const CONTAINER_RADIUS = 16;

function getPointPosition(index: number, total: number) {
  const angleDeg = (360 / total) * index - 90;
  const rad = (angleDeg * Math.PI) / 180;
  const x = CENTER + RADIUS_PERCENT * Math.cos(rad);
  const y = CENTER + RADIUS_PERCENT * Math.sin(rad);
  return { x, y, angleDeg, rad };
}

/** Line start at container edge, end at manifesto point (same angle). */
function getLineEndpoints(pos: { x: number; y: number; rad: number }) {
  const startX = CENTER + CONTAINER_RADIUS * Math.cos(pos.rad);
  const startY = CENTER + CONTAINER_RADIUS * Math.sin(pos.rad);
  return { startX, startY, endX: pos.x, endY: pos.y };
}

function renderManifestoText(text: string, highlights: string[]) {
  if (!highlights.length) return text;
  const parts: { str: string; highlight: boolean }[] = [];
  let i = 0;
  const lower = text.toLowerCase();
  const sortedHighlights = [...highlights].sort((a, b) => b.length - a.length);
  while (i < text.length) {
    let matched = false;
    for (const h of sortedHighlights) {
      if (lower.substring(i, i + h.length) === h.toLowerCase()) {
        parts.push({ str: text.slice(i, i + h.length), highlight: true });
        i += h.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      const nextStart = highlights.reduce<number>((acc, h) => {
        const idx = lower.indexOf(h.toLowerCase(), i);
        return idx === -1 ? acc : Math.min(acc, idx);
      }, text.length);
      parts.push({ str: text.slice(i, nextStart), highlight: false });
      i = nextStart === text.length ? text.length : nextStart;
      if (i >= text.length) break;
    }
  }
  return parts.map((p, idx) =>
    p.highlight ? (
      <span key={idx} className={styles.highlight}>{p.str}</span>
    ) : (
      <span key={idx}>{p.str}</span>
    )
  );
}

export default function CompanyManifesto() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const positions = useMemo(
    () => MANIFESTO_ITEMS.map((_, i) => getPointPosition(i, MANIFESTO_ITEMS.length)),
    []
  );

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <CompanySectionTitle title="Manifesto" inView={inView} />
        </div>

        {/* Desktop: radial diagram */}
        <div className={styles.radialWrapper}>
          <svg
            className={styles.linesSvg}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id="manifestoLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.5)" />
              </linearGradient>
            </defs>
            {/* Logo container circle – lines start at its edge */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={CONTAINER_RADIUS}
              className={styles.logoContainerCircle}
            />
            {positions.map((pos, i) => {
              const { startX, startY, endX, endY } = getLineEndpoints(pos);
              return (
                <motion.path
                  key={i}
                  d={`M ${startX} ${startY} L ${endX} ${endY}`}
                  fill="none"
                  stroke="url(#manifestoLineGrad)"
                  strokeWidth="0.4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{
                    pathLength: { duration: 0.9, delay: 0.15 + i * 0.045, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.25, delay: 0.15 + i * 0.045 },
                  }}
                />
              );
            })}
          </svg>

          <motion.div
            className={styles.centerLogoWrap}
            style={{ left: "50%", top: "50%" }}
            initial={{ opacity: 0, scale: 0.88, x: "-50%", y: "-50%" }}
            animate={
              inView
                ? { opacity: 1, scale: 1, x: "-50%", y: "-50%" }
                : { opacity: 0, scale: 0.88, x: "-50%", y: "-50%" }
            }
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.centerLogoGlow} aria-hidden />
            <KlabLogo color="orange" format="full" width="100%" height="100%" className={styles.centerLogoImage} />
          </motion.div>

          {MANIFESTO_ITEMS.map((item, i) => {
            const pos = positions[i];
            const isRightSide = pos.angleDeg >= -90 && pos.angleDeg < 90;
            return (
              <motion.div
                key={i}
                className={styles.point}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                  textAlign: isRightSide ? "left" : "right",
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.055,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.06 }}
              >
                <p className={styles.pointText}>
                  {renderManifestoText(item.text, item.highlights)}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: stacked list with logo */}
        <div className={styles.listLayout}>
          <ul className={styles.list}>
            {MANIFESTO_ITEMS.map((item, i) => (
              <motion.li
                key={i}
                className={styles.listItem}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className={styles.listItemText}>
                  {renderManifestoText(item.text, item.highlights)}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
