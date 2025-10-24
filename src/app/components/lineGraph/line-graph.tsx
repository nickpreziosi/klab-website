"use client";

import { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { motion } from "framer-motion";
import styles from "./line-graph.module.css";

// Sample fintech data - revenue growth over months
const generateData = () => [
  { month: "Jan", value: 45000, projected: 42000 },
  { month: "Feb", value: 52000, projected: 48000 },
  { month: "Mar", value: 48000, projected: 54000 },
  { month: "Apr", value: 61000, projected: 58000 },
  { month: "May", value: 55000, projected: 63000 },
  { month: "Jun", value: 67000, projected: 67000 },
  { month: "Jul", value: 72000, projected: 71000 },
  { month: "Aug", value: 78000, projected: 76000 },
  { month: "Sep", value: 85000, projected: 82000 },
  { month: "Oct", value: 92000, projected: 89000 },
  { month: "Nov", value: 98000, projected: 96000 },
  { month: "Dec", value: 105000, projected: 103000 },
];

interface FintechLineGraphProps {
  title?: string;
  subtitle?: string;
  showProjected?: boolean;
}

export const LineGraph = ({
  title = "Revenue Growth",
  subtitle = "Year-over-year performance",
  showProjected = true,
}: FintechLineGraphProps) => {
  const [data, setData] = useState(generateData());

  return (
    <div className={styles.background}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.textContent}>
          <h2>Tailored to Your Business Needs</h2>
          <p>
            KEO offers customized supply finance solutions that result in
            improved cash management, increased working capital, and faster B2B
            transactions that boost business growth.
          </p>
        </div>
        <div className={styles.flex}>
          <div className={styles.header}>
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {title}
            </motion.h2>
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {subtitle}
            </motion.p>
          </div>

          <motion.div
            className={styles.chartWrapper}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width="100%"
                height="100%"
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff004c" stopOpacity={0.4} />
                    <stop offset="50%" stopColor="#ff004c" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#ff004c" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorProjected"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ff004c" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#ff004c" stopOpacity={0} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1a1a1a"
                  strokeOpacity={0.3}
                  vertical={false}
                />

                <XAxis
                  className={styles.graphXAxis}
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  className={styles.graphXAxis}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />

                {showProjected && (
                  <Area
                    type="monotone"
                    dataKey="projected"
                    stroke="#ff004c"
                    strokeWidth={1.5}
                    strokeDasharray="5 5"
                    fill="url(#colorProjected)"
                    fillOpacity={1}
                    animationDuration={2000}
                    animationBegin={400}
                  />
                )}

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#ff004c"
                  strokeWidth={3}
                  fill="url(#colorValue)"
                  fillOpacity={1}
                  filter="url(#glow)"
                  animationDuration={1000}
                  animationBegin={0}
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Animated grid overlay for extra tech effect */}
            <div className={styles.gridOverlay} />
          </motion.div>
        </div>
      </motion.div>
      {/* Stats cards */}
      <motion.div
        className={styles.statsContainer}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Current</div>
          <div className={styles.statValue}>$105k</div>
          <div className={styles.statChange}>+23.4%</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Average</div>
          <div className={styles.statValue}>$71.5k</div>
          <div className={styles.statChange}>+18.2%</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Peak</div>
          <div className={styles.statValue}>$105k</div>
          <div className={styles.statChange}>Dec 2024</div>
        </div>
      </motion.div>
    </div>
  );
};
