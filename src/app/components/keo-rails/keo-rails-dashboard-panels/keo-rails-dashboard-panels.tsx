"use client";

import { motion } from "motion/react";
import styles from "./keo-rails-dashboard-panels.module.css";

export default function KeoRailsDashboardPanels() {
  return (
    <div inert tabIndex={-1} aria-hidden className={styles.dashboardContainer}>
      <div className={styles.dashboardStack}>
        {/* Panel 1: API Reference Sidebar */}
        <motion.div
          initial={{
            opacity: 0,
            filter: "blur(12px)",
            boxShadow: "rgba(var(--accent-color-rgb), 0.35) 0px 5px 15px",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            boxShadow: "var(--shadow-black)",
          }}
          transition={{
            duration: 0.9,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            stiffness: 90,
            damping: 16,
          }}
          className={`${styles.dashboardPanel} ${styles.panelOne}`}
        >
          <div className={styles.windowChrome}>
            <div className={styles.windowDots}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          </div>
          <div className={styles.panelContent}>
            <div className={styles.sidebarHeader}>
              <h2 className={styles.versionBadge}>V1</h2>
              <h3 className={styles.sectionTitle}>API Reference</h3>
            </div>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>⌘</span>
              <span className={styles.searchText}>Jump to</span>
            </div>
            <nav className={styles.navList}>
              <div className={styles.navGroup}>
                <div className={styles.navGroupTitle}>KEO Rails API</div>
                <div className={styles.navGroupTitle}>Core</div>
                <button className={styles.navItemActive}>
                  <span className={styles.navIcon}>/</span>
                  <span>api/health</span>
                  <span className={styles.navBadge}>GET</span>
                </button>
              </div>
              <div className={styles.navGroup}>
                <button className={styles.navItem}>
                  <span className={styles.navIcon}>▾</span>
                  <span>Accounts</span>
                </button>
                <button className={styles.navItem}>
                  <span className={styles.navIcon}>▾</span>
                  <span>Invoices</span>
                </button>
                <button className={styles.navItem}>
                  <span className={styles.navIcon}>▾</span>
                  <span>Loans</span>
                </button>
              </div>
            </nav>
          </div>
        </motion.div>

        {/* Panel 2: API Endpoint Details */}
        <motion.div
          initial={{
            opacity: 0,
            filter: "blur(12px)",
            boxShadow: "rgba(var(--accent-color-rgb), 0.35) 0px 5px 15px",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            boxShadow: "var(--shadow-black)",
          }}
          transition={{
            duration: 0.9,
            delay: 0.6,
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            stiffness: 90,
            damping: 16,
          }}
          className={`${styles.dashboardPanel} ${styles.panelTwo}`}
        >
          <div className={styles.windowChrome}>
            <div className={styles.windowDots}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          </div>
          <div className={styles.panelContent}>
            <div className={styles.endpointHeader}>
              <h1 className={styles.endpointPath}>/api/health</h1>
              <span className={styles.methodBadge}>GET</span>
            </div>
            <div className={styles.urlDisplay}>
              https://staging.ablkeor.com/api/health
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionHeading}>Responses</h3>
              <div className={styles.responseList}>
                <div className={styles.responseItem}>
                  <span className={styles.statusBadge}>
                    <span className={styles.statusDot} data-status="success" />
                    200
                  </span>
                  <div className={styles.responseContent}>
                    <p className={styles.responseTitle}>
                      Health check is successful
                    </p>
                  </div>
                </div>
                <div className={styles.responseItem}>
                  <span className={styles.statusBadge}>
                    <span className={styles.statusDot} data-status="error" />
                    503
                  </span>
                  <div className={styles.responseContent}>
                    <p className={styles.responseTitle}>
                      Health check is not ok
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.metaInfo}>
              <span className={styles.uploadIcon}>⏱</span>
              <span>Upload 8 months ago</span>
            </div>

            <div className={styles.footerNav}>
              <span>Accounts</span>
              <span className={styles.navArrow}>→</span>
            </div>
          </div>
        </motion.div>

        {/* Panel 3: Code Example */}
        <motion.div
          initial={{
            opacity: 0,
            filter: "blur(12px)",
            boxShadow: "rgba(var(--accent-color-rgb), 0.35) 0px 5px 15px",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            boxShadow: "var(--shadow-black)",
          }}
          transition={{
            duration: 0.9,
            delay: 0.9,
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            stiffness: 90,
            damping: 16,
          }}
          className={`${styles.dashboardPanel} ${styles.panelThree}`}
        >
          <div className={styles.windowChrome}>
            <div className={styles.windowDots}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          </div>
          <div className={styles.panelContent}>
            <div className={styles.languageSection}>
              <div className={styles.languageLabel}>LANGUAGE</div>
              <div className={styles.langTabs}>
                <button className={styles.langTab}>
                  <span className={styles.langIcon}>&#47;&#47;</span>
                  <span>Shell</span>
                </button>
                <button className={`${styles.langTab} ${styles.langTabActive}`}>
                  <span className={styles.langIcon}>⬢</span>
                  <span>Node</span>
                </button>
                <button className={styles.langTab}>
                  <span className={styles.langIcon}>◆</span>
                  <span>Ruby</span>
                </button>
                <button className={styles.langTab}>
                  <span className={styles.langIcon}>🐘</span>
                  <span>PHP</span>
                </button>
                <button className={styles.langTab}>
                  <span className={styles.langIcon}>🐍</span>
                  <span>Python</span>
                </button>
              </div>
            </div>

            <div className={styles.codeSection}>
              <div className={styles.codeSectionTitle}>REQUEST</div>
              <pre className={styles.codeBlock}>
                <code>
                  <span className={styles.codeKeyword}>import</span>{" "}
                  <span className={styles.codeVariable}>requests</span>
                  {"\n\n"}
                  <span className={styles.codeVariable}>url</span> ={" "}
                  <span className={styles.codeString}>
                    &quot;https://staging.ablkeor.com/api/health&quot;
                  </span>
                  {"\n\n"}
                  <span className={styles.codeVariable}>headers</span> = {"{"}
                  <span className={styles.codeString}>
                    &quot;accept&quot;
                  </span>:{" "}
                  <span className={styles.codeString}>
                    &quot;application json&quot;
                  </span>
                  {"}"}
                  {"\n\n"}
                  <span className={styles.codeVariable}>response</span> ={" "}
                  <span className={styles.codeVariable}>requests</span>.
                  <span className={styles.codeFunction}>get</span>(
                  <span className={styles.codeVariable}>url</span>,{" "}
                  <span className={styles.codeVariable}>headers</span>=
                  <span className={styles.codeVariable}>headers</span>){"\n\n"}
                  <span className={styles.codeFunction}>print</span>(
                  <span className={styles.codeVariable}>response</span>.
                  <span className={styles.codeProperty}>text</span>)
                </code>
              </pre>
            </div>

            <div className={styles.codeSection}>
              <div className={styles.codeSectionTitle}>RESPONSE</div>
              <pre className={styles.codeBlock}>
                <code>
                  {"{"}
                  {"\n  "}
                  <span className={styles.codeString}>
                    &quot;status&quot;
                  </span>:{" "}
                  <span className={styles.codeString}>&quot;ok&quot;</span>,
                  {"\n  "}
                  <span className={styles.codeString}>
                    &quot;gitCommitHash&quot;
                  </span>
                  :{" "}
                  <span className={styles.codeString}>
                    &quot;af2be31b347cd15be731435ecb39ed9&quot;
                  </span>
                  ,{"\n  "}
                  <span className={styles.codeString}>
                    &quot;name&quot;
                  </span>:{" "}
                  <span className={styles.codeString}>&quot;string&quot;</span>,
                  {"\n  "}
                  <span className={styles.codeString}>&quot;version&quot;</span>
                  :{" "}
                  <span className={styles.codeString}>&quot;v0.1.0&quot;</span>,
                  {"\n  "}
                  <span className={styles.codeString}>
                    &quot;branch&quot;
                  </span>:{" "}
                  <span className={styles.codeString}>&quot;branch&quot;</span>,
                  {"\n  "}
                  <span className={styles.codeString}>&quot;details&quot;</span>
                  : {"{"}
                  <span className={styles.codeString}>
                    &quot;redis&quot;
                  </span>: {"{"}
                  <span className={styles.codeString}>
                    &quot;status&quot;
                  </span>:{" "}
                  <span className={styles.codeString}>&quot;up&quot;</span>
                  {"}"}
                  {"}"}
                  {"\n}"}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Vignette overlay */}
      <div className={styles.dashboardVignette} />
    </div>
  );
}
