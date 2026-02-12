import styles from "./keo-dashboard.module.css";
import { motion } from "motion/react";

export default function KeoMockDashboard() {
  return (
    <div className={styles.dashboardWrapper}>
      <div className={`${styles.apiFrames} `}>
        {/* Frame 1: Sidebar Navigation */}
        <motion.div
          initial={{
            opacity: 0,
            y: -48,
            rotateX: 8,
            scale: 0.98,
            filter: "blur(12px)",
            boxShadow: "hsl(var(--accent) / 0.35) 0px 5px 15px",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            boxShadow: "var(--shadow-black)",
          }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{
            duration: 0.9,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            stiffness: 90,
            damping: 16,
          }}
          className={`${styles.apiFrame} ${styles.frame1}`}
        >
          <div inert aria-hidden tabIndex={-1} className={styles.frameContent}>
            <div className={styles.apiSidebar}>
              <div className={styles.apiVersion}>V1</div>
              <h2 className={styles.apiTitle}>API Reference</h2>
              <div className={styles.jumpTo}>
                <input type="text" placeholder="Jump to" className={styles.jumpInput} />
                <span className={styles.cmdIcon}>⌘K</span>
              </div>
              <nav className={styles.apiNav}>
                <div className={styles.apiNavSection}>
                  <div className={`${styles.apiNavItem} ${styles.expanded}`}>
                    <span className={styles.chevron}>›</span>
                    <span>KEO Rails API</span>
                  </div>
                  <div className={styles.apiNavSubItems}>
                    <div className={`${styles.apiNavItem} ${styles.subItem}`}>
                      <span>Core</span>
                      <span className={styles.methodBadge}>GET</span>
                    </div>
                    <div className={`${styles.apiNavItem} ${styles.subItem} ${styles.hasChildren}`}>
                      <span className={styles.chevron}>›</span>
                      <span>/api/health</span>
                    </div>
                    <div className={`${styles.apiNavItem} ${styles.subItem} ${styles.hasChildren}`}>
                      <span className={styles.chevron}>›</span>
                      <span>Accounts</span>
                    </div>
                    <div className={`${styles.apiNavItem} ${styles.subItem} ${styles.hasChildren}`}>
                      <span className={styles.chevron}>›</span>
                      <span>Invoices</span>
                    </div>
                    <div className={`${styles.apiNavItem} ${styles.subItem}`}>
                      <span>Loans</span>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </motion.div>

        {/* Frame 2: API Response UI */}
        <motion.div
          initial={{
            opacity: 0,
            y: -48,
            rotateX: 8,
            scale: 0.98,
            filter: "blur(12px)",
            boxShadow: "hsl(var(--accent) / 0.35) 0px 5px 15px",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            boxShadow: "var(--shadow-black)",
          }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{
            duration: 0.9,
            delay: 0.6,
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            stiffness: 90,
            damping: 16,
          }}
          className={`${styles.apiFrame} ${styles.frame2}`}
        >
          <div inert aria-hidden tabIndex={-1} className={styles.frameContent}>
            <div className={styles.apiResponse}>
              <h3 className={styles.endpointTitle}>/api/health</h3>
              <div className={styles.urlBar}>
                <input
                  type="text"
                  value="https://staging.abksor.com/api/health"
                  readOnly
                  className={styles.urlInput}
                />
              </div>
              <button className={styles.getButton}>GET</button>

              <div className={styles.responsesSection}>
                <h4 className={styles.responsesTitle}>Responses</h4>
                <div className={styles.responseCards}>
                  <div className={`${styles.responseCard} ${styles.success}`}>
                    <div className={styles.statusRow}>
                      <span className={styles.statusDot}></span>
                      <span className={styles.statusCode}>200</span>
                      <span className={styles.arrow}>→</span>
                    </div>
                    <p className={styles.statusMessage}>Health check is successful</p>
                  </div>
                  <div className={`${styles.responseCard} ${styles.error}`}>
                    <div className={styles.statusRow}>
                      <span className={styles.statusDot}></span>
                      <span className={styles.statusCode}>503</span>
                    </div>
                    <p className={styles.statusMessage}>Health check is not ok</p>
                  </div>
                </div>
              </div>

              <div className={styles.metaInfo}>
                <span className={styles.uploadInfo}>
                  <span className={styles.linkIcon}>🔗</span>
                  Upload 8 months ago
                </span>
                <span className={styles.accountsLink}>
                  Accounts <span className={styles.arrow}>→</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Frame 3: Code Editor */}
        <motion.div
          initial={{
            opacity: 0,
            y: -48,
            rotateX: 8,
            scale: 0.98,
            filter: "blur(12px)",
            boxShadow: "hsl(var(--accent) / 0.35) 0px 5px 15px",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            boxShadow: "var(--shadow-black)",
          }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{
            duration: 0.9,
            delay: 0.9,
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            stiffness: 90,
            damping: 16,
          }}
          className={`${styles.apiFrame} ${styles.frame3}`}
        >
          <div inert aria-hidden tabIndex={-1} className={styles.frameContent}>
            <div className={styles.codeEditor}>
              <div className={styles.languageSection}>
                <h4 className={styles.sectionTitle}>LANGUAGE</h4>
                <div className={styles.languageButtons}>
                  <button className={styles.langButton}>
                    <span className={styles.langIcon}>-//</span>
                    <span>Shell</span>
                  </button>
                  <button className={styles.langButton}>
                    <span className={styles.langIcon}>⬢</span>
                    <span>Node</span>
                  </button>
                  <button className={styles.langButton}>
                    <span className={styles.langIcon}>◆</span>
                    <span>Ruby</span>
                  </button>
                  <button className={styles.langButton}>
                    <span className={styles.langIcon}>PHP</span>
                    <span>PHP</span>
                  </button>
                  <button className={styles.langButton}>
                    <span className={styles.langIcon}>🐍</span>
                    <span>Python</span>
                  </button>
                </div>
              </div>

              <div className={styles.codeBlock}>
                <h4 className={styles.sectionTitle}>REQUEST</h4>
                <pre className={styles.code}>
                  <code>
                    <span className={styles.lineNumber}>1</span>{" "}
                    <span className={styles.keyword}>import</span> requests
                    {"\n"}
                    <span className={styles.lineNumber}>2</span>
                    {"\n"}
                    <span className={styles.lineNumber}>3</span>{" "}
                    <span className={styles.variable}>url</span> ={" "}
                    <span className={styles.string}>
                      &quot;https://staging.abksor.com/api/health&quot;
                    </span>
                    {"\n"}
                    <span className={styles.lineNumber}>4</span>
                    {"\n"}
                    <span className={styles.lineNumber}>5</span>{" "}
                    <span className={styles.variable}>headers</span> = {"{"}
                    <span className={styles.string}>&quot;accept&quot;</span>:{" "}
                    <span className={styles.string}>&quot;application/json&quot;</span>
                    {"}"}
                    {"\n"}
                    <span className={styles.lineNumber}>6</span>
                    {"\n"}
                    <span className={styles.lineNumber}>7</span>{" "}
                    <span className={styles.variable}>response</span> = requests.
                    <span className={styles.function}>get</span>(url, headers=headers){"\n"}
                    <span className={styles.lineNumber}>8</span>
                    {"\n"}
                    <span className={styles.lineNumber}>9</span>{" "}
                    <span className={styles.keyword}>print</span>(response.
                    <span className={styles.function}>text</span>())
                  </code>
                </pre>
              </div>

              <div className={styles.codeBlock}>
                <h4 className={styles.sectionTitle}>RESPONSE</h4>
                <pre className={styles.code}>
                  <code>
                    <span className={styles.lineNumber}>1</span> {"{"}
                    {"\n"}
                    <span className={styles.lineNumber}>2</span>{" "}
                    <span className={styles.string}>&quot;status&quot;</span>:{" "}
                    <span className={styles.string}>&quot;ok&quot;</span>,{"\n"}
                    <span className={styles.lineNumber}>3</span>{" "}
                    <span className={styles.string}>&quot;onCommitHash&quot;</span>:{" "}
                    <span className={styles.string}>&quot;af3ba93ba41ca1bb373d35ed39ad9&quot;</span>
                    ,{"\n"}
                    <span className={styles.lineNumber}>4</span>{" "}
                    <span className={styles.string}>&quot;name&quot;</span>:{" "}
                    <span className={styles.string}>&quot;string&quot;</span>,{"\n"}
                    <span className={styles.lineNumber}>5</span>{" "}
                    <span className={styles.string}>&quot;version&quot;</span>:{" "}
                    <span className={styles.string}>&quot;v0.1.0&quot;</span>,{"\n"}
                    <span className={styles.lineNumber}>6</span>{" "}
                    <span className={styles.string}>&quot;branch&quot;</span>:{" "}
                    <span className={styles.string}>&quot;branch&quot;</span>,{"\n"}
                    <span className={styles.lineNumber}>7</span>{" "}
                    <span className={styles.string}>&quot;details&quot;</span>: {"{"}
                    {"\n"}
                    <span className={styles.lineNumber}>8</span>{" "}
                    <span className={styles.string}>&quot;redis&quot;</span>: {"{"}
                    {"\n"}
                    <span className={styles.lineNumber}>9</span>{" "}
                    <span className={styles.string}>&quot;status&quot;</span>:{" "}
                    <span className={styles.string}>&quot;up&quot;</span>
                    {"\n"}
                    <span className={styles.lineNumber}>10</span> {"}"}
                    {"\n"}
                    <span className={styles.lineNumber}>11</span> {"}"}
                    {"\n"}
                    <span className={styles.lineNumber}>12</span> {"}"}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
