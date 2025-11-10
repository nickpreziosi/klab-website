"use client";

import { motion } from "motion/react";
import styles from "./keo-rails-dashboard-panels.module.css";
// using inline SVGs for language icons instead of raster Image imports

export default function KeoRailsDashboardPanels() {
  return (
    <div inert tabIndex={-1} aria-hidden className={styles.dashboardContainer}>
      <motion.div className={styles.dashboardStack}>
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
              <span className={styles.searchText}>Jump to</span>
              <span className={styles.searchIcon}>⌘</span>
            </div>
            <nav className={styles.navList}>
              <div className={styles.navGroupTitle}>KEO Rails API</div>

              <div className={styles.navGroup}>
                <button className={styles.navItem}>
                  <span>Core</span>
                  <svg
                    className={styles.navIcon}
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <button className={styles.navItemActive}>
                  <span className={styles.navPath}>/api/health</span>
                  <span className={styles.navBadge}>GET</span>
                </button>
                <button className={styles.navItem}>
                  <span>Accounts</span>
                  <svg
                    className={styles.navIcon}
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <button className={styles.navItem}>
                  <span>Invoices</span>
                  <svg
                    className={styles.navIcon}
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <button className={styles.navItem}>
                  <span>Loans</span>
                  <svg
                    className={styles.navIcon}
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
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
            </div>
            <div className={styles.urlDisplay}>
              <span className={styles.methodBadge}>GET</span>
              https://staging.ablkeor.com/api/health
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionHeading}>Responses</h3>
              <div className={styles.responseList}>
                <div className={styles.responseItem}>
                  <span className={styles.statusBadge}>
                    <span className={styles.statusDot} data-status="success" />
                    200
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
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
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
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
                <button className={styles.langTab} aria-label="Shell">
                  <div className={styles.langTabContent}>
                    <svg
                      height="20"
                      viewBox="-0.153305614872707 -16.047683547530013 587.519258222215 678.613169536194"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g stroke-width="2.41">
                        <path
                          d="M546.353 124.75L334.494-1.03a79.795 79.795 0 0 0-81.747 0L40.853 124.75A84.504 84.504 0 0 0 .001 197.545v251.523a84.504 84.504 0 0 0 40.852 72.752l211.859 125.737a79.837 79.837 0 0 0 81.747 0L546.318 521.82a84.504 84.504 0 0 0 40.894-72.795v-251.47a84.504 84.504 0 0 0-40.852-72.794z"
                          fill="#fff"
                        />
                        <path
                          d="M546.353 124.75L334.494-1.03a79.795 79.795 0 0 0-81.747 0L40.853 124.75A84.504 84.504 0 0 0 .001 197.545v251.523a84.504 84.504 0 0 0 40.852 72.752l211.859 125.737a79.837 79.837 0 0 0 81.747 0L546.318 521.82a84.504 84.504 0 0 0 40.894-72.795v-251.47a84.504 84.504 0 0 0-40.852-72.794zM260.13 634.697L48.272 508.96a69.74 69.74 0 0 1-33.597-59.9V197.539a69.698 69.698 0 0 1 33.597-59.9l211.859-125.78a65.329 65.329 0 0 1 66.94 0l211.683 125.78a69.274 69.274 0 0 1 32.538 48.446c-7.042-14.975-22.865-19.089-41.319-8.484L329.7 301.64c-24.987 14.55-43.398 30.967-43.44 61.088v246.98c0 18.03 7.253 29.695 18.453 33.131a64.904 64.904 0 0 1-11.115 1.06 65.626 65.626 0 0 1-33.47-9.205z"
                          fill="#2f3a3e"
                        />
                        <path
                          d="M490.823 473.378l-52.773 31.563a3.86 3.86 0 0 0-2.418 3.436v13.872c0 1.697 1.146 2.375 2.546 1.57l53.579-32.58a4.242 4.242 0 0 0 1.612-4.243v-12.175c-.043-1.57-1.273-2.248-2.546-1.442z"
                          fill="#3ab14a"
                        />
                        <path
                          d="M378.498 357.185c1.697-.848 3.097 0 3.14 2.419l.169 18.41a33.937 33.937 0 0 1 20.277-2.46c1.315.34 1.867 2.121 1.358 4.242l-4.03 16.163a6.957 6.957 0 0 1-1.824 3.224 4.242 4.242 0 0 1-1.06.764 2.418 2.418 0 0 1-1.57.254 26.895 26.895 0 0 0-19.556 3.14 24.562 24.562 0 0 0-14.466 21.76c0 8.485 4.242 10.818 19.047 11.073 19.556.34 28.041 8.866 28.253 28.592a70.122 70.122 0 0 1-25.963 52.9l.34 18.071a6.618 6.618 0 0 1-3.097 5.515l-10.69 6.151c-1.697.849-3.097 0-3.14-2.376v-17.774c-9.162 3.818-18.453 4.71-24.391 2.334-1.103-.425-1.612-2.079-1.145-3.988l3.86-16.332a6.83 6.83 0 0 1 1.909-3.394 4.242 4.242 0 0 1 1.018-.721 2.121 2.121 0 0 1 1.74 0 29.694 29.694 0 0 0 22.44-2.842 29.356 29.356 0 0 0 16.587-25.454c0-9.163-5.048-12.98-16.968-13.066-15.4 0-29.695-2.969-29.992-25.453a65.753 65.753 0 0 1 24.858-50.311l-.763-18.496a6.575 6.575 0 0 1 3.096-5.6z"
                          fill="#fff"
                        />
                      </g>
                    </svg>
                    <span className={styles.langLabelText}>Shell</span>
                  </div>
                </button>

                <button className={styles.langTab} aria-label="Node.js">
                  <div className={styles.langTabContent}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 256 282"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMinYMin meet"
                    >
                      <g fill="#8CC84B">
                        <path d="M116.504 3.58c6.962-3.985 16.03-4.003 22.986 0 34.995 19.774 70.001 39.517 104.99 59.303 6.581 3.707 10.983 11.031 10.916 18.614v118.968c.049 7.897-4.788 15.396-11.731 19.019-34.88 19.665-69.742 39.354-104.616 59.019-7.106 4.063-16.356 3.75-23.24-.646-10.457-6.062-20.932-12.094-31.39-18.15-2.137-1.274-4.546-2.288-6.055-4.36 1.334-1.798 3.719-2.022 5.657-2.807 4.365-1.388 8.374-3.616 12.384-5.778 1.014-.694 2.252-.428 3.224.193 8.942 5.127 17.805 10.403 26.777 15.481 1.914 1.105 3.852-.362 5.488-1.274 34.228-19.345 68.498-38.617 102.72-57.968 1.268-.61 1.969-1.956 1.866-3.345.024-39.245.006-78.497.012-117.742.145-1.576-.767-3.025-2.192-3.67-34.759-19.575-69.5-39.18-104.253-58.76a3.621 3.621 0 0 0-4.094-.006C91.2 39.257 56.465 58.88 21.712 78.454c-1.42.646-2.373 2.071-2.204 3.653.006 39.245 0 78.497 0 117.748a3.329 3.329 0 0 0 1.89 3.303c9.274 5.259 18.56 10.481 27.84 15.722 5.228 2.814 11.647 4.486 17.407 2.33 5.083-1.823 8.646-7.01 8.549-12.407.048-39.016-.024-78.038.036-117.048-.127-1.732 1.516-3.163 3.2-3 4.456-.03 8.918-.06 13.374.012 1.86-.042 3.14 1.823 2.91 3.568-.018 39.263.048 78.527-.03 117.79.012 10.464-4.287 21.85-13.966 26.97-11.924 6.177-26.662 4.867-38.442-1.056-10.198-5.09-19.93-11.097-29.947-16.55C5.368 215.886.555 208.357.604 200.466V81.497c-.073-7.74 4.504-15.197 11.29-18.85C46.768 42.966 81.636 23.27 116.504 3.58z" />
                        <path d="M146.928 85.99c15.21-.979 31.493-.58 45.18 6.913 10.597 5.742 16.472 17.793 16.659 29.566-.296 1.588-1.956 2.464-3.472 2.355-4.413-.006-8.827.06-13.24-.03-1.872.072-2.96-1.654-3.195-3.309-1.268-5.633-4.34-11.212-9.642-13.929-8.139-4.075-17.576-3.87-26.451-3.785-6.479.344-13.446.905-18.935 4.715-4.214 2.886-5.494 8.712-3.99 13.404 1.418 3.369 5.307 4.456 8.489 5.458 18.33 4.794 37.754 4.317 55.734 10.626 7.444 2.572 14.726 7.572 17.274 15.366 3.333 10.446 1.872 22.932-5.56 31.318-6.027 6.901-14.805 10.657-23.56 12.697-11.647 2.597-23.734 2.663-35.562 1.51-11.122-1.268-22.696-4.19-31.282-11.768-7.342-6.375-10.928-16.308-10.572-25.895.085-1.619 1.697-2.748 3.248-2.615 4.444-.036 8.888-.048 13.332.006 1.775-.127 3.091 1.407 3.182 3.08.82 5.367 2.837 11 7.517 14.182 9.032 5.827 20.365 5.428 30.707 5.591 8.568-.38 18.186-.495 25.178-6.158 3.689-3.23 4.782-8.634 3.785-13.283-1.08-3.925-5.186-5.754-8.712-6.95-18.095-5.724-37.736-3.647-55.656-10.12-7.275-2.571-14.31-7.432-17.105-14.906-3.9-10.578-2.113-23.662 6.098-31.765 8.006-8.06 19.563-11.164 30.551-12.275z" />
                      </g>
                    </svg>
                    <span className={styles.langLabelText}>Node</span>
                  </div>
                </button>

                <button className={styles.langTab} aria-label="Ruby">
                  <div className={styles.langTabContent}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      preserveAspectRatio="xMinYMin meet"
                      viewBox="0 0 256 255"
                    >
                      <defs>
                        <linearGradient
                          id="a"
                          x1="84.75%"
                          x2="58.254%"
                          y1="111.399%"
                          y2="64.584%"
                        >
                          <stop offset="0%" stopColor="#FB7655" />
                          <stop offset="0%" stopColor="#FB7655" />
                          <stop offset="41%" stopColor="#E42B1E" />
                          <stop offset="99%" stopColor="#900" />
                          <stop offset="100%" stopColor="#900" />
                        </linearGradient>
                        <linearGradient
                          id="b"
                          x1="116.651%"
                          x2="1.746%"
                          y1="60.89%"
                          y2="19.288%"
                        >
                          <stop offset="0%" stopColor="#871101" />
                          <stop offset="0%" stopColor="#871101" />
                          <stop offset="99%" stopColor="#911209" />
                          <stop offset="100%" stopColor="#911209" />
                        </linearGradient>
                        <linearGradient
                          id="c"
                          x1="75.774%"
                          x2="38.978%"
                          y1="219.327%"
                          y2="7.829%"
                        >
                          <stop offset="0%" stopColor="#871101" />
                          <stop offset="0%" stopColor="#871101" />
                          <stop offset="99%" stopColor="#911209" />
                          <stop offset="100%" stopColor="#911209" />
                        </linearGradient>
                        <linearGradient
                          id="d"
                          x1="50.012%"
                          x2="66.483%"
                          y1="7.234%"
                          y2="79.135%"
                        >
                          <stop offset="0%" stopColor="#FFF" />
                          <stop offset="0%" stopColor="#FFF" />
                          <stop offset="23%" stopColor="#E57252" />
                          <stop offset="46%" stopColor="#DE3B20" />
                          <stop offset="99%" stopColor="#A60003" />
                          <stop offset="100%" stopColor="#A60003" />
                        </linearGradient>
                        <linearGradient
                          id="e"
                          x1="46.174%"
                          x2="49.932%"
                          y1="16.348%"
                          y2="83.047%"
                        >
                          <stop offset="0%" stopColor="#FFF" />
                          <stop offset="0%" stopColor="#FFF" />
                          <stop offset="23%" stopColor="#E4714E" />
                          <stop offset="56%" stopColor="#BE1A0D" />
                          <stop offset="99%" stopColor="#A80D00" />
                          <stop offset="100%" stopColor="#A80D00" />
                        </linearGradient>
                        <linearGradient
                          id="f"
                          x1="36.965%"
                          x2="49.528%"
                          y1="15.594%"
                          y2="92.478%"
                        >
                          <stop offset="0%" stopColor="#FFF" />
                          <stop offset="0%" stopColor="#FFF" />
                          <stop offset="18%" stopColor="#E46342" />
                          <stop offset="40%" stopColor="#C82410" />
                          <stop offset="99%" stopColor="#A80D00" />
                          <stop offset="100%" stopColor="#A80D00" />
                        </linearGradient>
                        <linearGradient
                          id="g"
                          x1="13.609%"
                          x2="85.764%"
                          y1="58.346%"
                          y2="-46.717%"
                        >
                          <stop offset="0%" stopColor="#FFF" />
                          <stop offset="0%" stopColor="#FFF" />
                          <stop offset="54%" stopColor="#C81F11" />
                          <stop offset="99%" stopColor="#BF0905" />
                          <stop offset="100%" stopColor="#BF0905" />
                        </linearGradient>
                        <linearGradient
                          id="h"
                          x1="27.624%"
                          x2="50.745%"
                          y1="21.135%"
                          y2="79.056%"
                        >
                          <stop offset="0%" stopColor="#FFF" />
                          <stop offset="0%" stopColor="#FFF" />
                          <stop offset="31%" stopColor="#DE4024" />
                          <stop offset="99%" stopColor="#BF190B" />
                          <stop offset="100%" stopColor="#BF190B" />
                        </linearGradient>
                        <linearGradient
                          id="i"
                          x1="-20.667%"
                          x2="104.242%"
                          y1="122.282%"
                          y2="-6.342%"
                        >
                          <stop offset="0%" stopColor="#BD0012" />
                          <stop offset="0%" stopColor="#BD0012" />
                          <stop offset="7%" stopColor="#FFF" />
                          <stop offset="17%" stopColor="#FFF" />
                          <stop offset="27%" stopColor="#C82F1C" />
                          <stop offset="33%" stopColor="#820C01" />
                          <stop offset="46%" stopColor="#A31601" />
                          <stop offset="72%" stopColor="#B31301" />
                          <stop offset="99%" stopColor="#E82609" />
                          <stop offset="100%" stopColor="#E82609" />
                        </linearGradient>
                        <linearGradient
                          id="j"
                          x1="58.792%"
                          x2="11.964%"
                          y1="65.205%"
                          y2="50.128%"
                        >
                          <stop offset="0%" stopColor="#8C0C01" />
                          <stop offset="0%" stopColor="#8C0C01" />
                          <stop offset="54%" stopColor="#990C00" />
                          <stop offset="99%" stopColor="#A80D0E" />
                          <stop offset="100%" stopColor="#A80D0E" />
                        </linearGradient>
                        <linearGradient
                          id="k"
                          x1="79.319%"
                          x2="23.088%"
                          y1="62.754%"
                          y2="17.888%"
                        >
                          <stop offset="0%" stopColor="#7E110B" />
                          <stop offset="0%" stopColor="#7E110B" />
                          <stop offset="99%" stopColor="#9E0C00" />
                          <stop offset="100%" stopColor="#9E0C00" />
                        </linearGradient>
                        <linearGradient
                          id="l"
                          x1="92.88%"
                          x2="59.841%"
                          y1="74.122%"
                          y2="39.704%"
                        >
                          <stop offset="0%" stopColor="#79130D" />
                          <stop offset="0%" stopColor="#79130D" />
                          <stop offset="99%" stopColor="#9E120B" />
                          <stop offset="100%" stopColor="#9E120B" />
                        </linearGradient>
                        <linearGradient
                          id="o"
                          x1="56.57%"
                          x2="3.105%"
                          y1="101.717%"
                          y2="11.993%"
                        >
                          <stop offset="0%" stopColor="#8B2114" />
                          <stop offset="0%" stopColor="#8B2114" />
                          <stop offset="43%" stopColor="#9E100A" />
                          <stop offset="99%" stopColor="#B3100C" />
                          <stop offset="100%" stopColor="#B3100C" />
                        </linearGradient>
                        <linearGradient
                          id="p"
                          x1="30.87%"
                          x2="92.471%"
                          y1="35.599%"
                          y2="100.694%"
                        >
                          <stop offset="0%" stopColor="#B31000" />
                          <stop offset="0%" stopColor="#B31000" />
                          <stop offset="44%" stopColor="#910F08" />
                          <stop offset="99%" stopColor="#791C12" />
                          <stop offset="100%" stopColor="#791C12" />
                        </linearGradient>
                        <radialGradient
                          id="m"
                          cx="32.001%"
                          cy="40.21%"
                          r="69.573%"
                          fx="32.001%"
                          fy="40.21%"
                        >
                          <stop offset="0%" stopColor="#A80D00" />
                          <stop offset="0%" stopColor="#A80D00" />
                          <stop offset="99%" stopColor="#7E0E08" />
                          <stop offset="100%" stopColor="#7E0E08" />
                        </radialGradient>
                        <radialGradient
                          id="n"
                          cx="13.549%"
                          cy="40.86%"
                          r="88.386%"
                          fx="13.549%"
                          fy="40.86%"
                        >
                          <stop offset="0%" stopColor="#A30C00" />
                          <stop offset="0%" stopColor="#A30C00" />
                          <stop offset="99%" stopColor="#800E08" />
                          <stop offset="100%" stopColor="#800E08" />
                        </radialGradient>
                      </defs>
                      <path
                        fill="url(#a)"
                        d="m197.467 167.764-145.52 86.41 188.422-12.787L254.88 51.393l-57.414 116.37z"
                      />
                      <path
                        fill="url(#b)"
                        d="M240.677 241.257 224.482 129.48l-44.113 58.25 60.308 53.528z"
                      />
                      <path
                        fill="url(#c)"
                        d="m240.896 241.257-118.646-9.313-69.674 21.986 188.32-12.673z"
                      />
                      <path
                        fill="url(#d)"
                        d="m52.744 253.955 29.64-97.1L17.16 170.8l35.583 83.154z"
                      />
                      <path
                        fill="url(#e)"
                        d="M180.358 188.05 153.085 81.226l-78.047 73.16 105.32 33.666z"
                      />
                      <path
                        fill="url(#f)"
                        d="m248.693 82.73-73.777-60.256-20.544 66.418 94.321-6.162z"
                      />
                      <path
                        fill="url(#g)"
                        d="M214.191.99 170.8 24.97 143.424.669l70.767.322z"
                      />
                      <path
                        fill="url(#h)"
                        d="m0 203.372 18.177-33.151-14.704-39.494L0 203.372z"
                      />
                      <path
                        fill="#FFF"
                        d="m2.496 129.48 14.794 41.963 64.283-14.422 73.39-68.207 20.712-65.787L143.063 0 87.618 20.75c-17.469 16.248-51.366 48.396-52.588 49-1.21.618-22.384 40.639-32.534 59.73z"
                      />
                      <path
                        fill="url(#i)"
                        d="M54.442 54.094c37.86-37.538 86.667-59.716 105.397-40.818 18.72 18.898-1.132 64.823-38.992 102.349-37.86 37.525-86.062 60.925-104.78 42.027-18.73-18.885.515-66.032 38.375-103.558z"
                      />
                      <path
                        fill="url(#j)"
                        d="m52.744 253.916 29.408-97.409 97.665 31.376c-35.312 33.113-74.587 61.106-127.073 66.033z"
                      />
                      <path
                        fill="url(#k)"
                        d="m155.092 88.622 25.073 99.313c29.498-31.016 55.972-64.36 68.938-105.603l-94.01 6.29z"
                      />
                      <path
                        fill="url(#l)"
                        d="M248.847 82.833c10.035-30.282 12.35-73.725-34.966-81.791l-38.825 21.445 73.791 60.346z"
                      />
                      <path
                        fill="#9E1209"
                        d="M0 202.935c1.39 49.979 37.448 50.724 52.808 51.162l-35.48-82.86L0 202.935z"
                      />
                      <path
                        fill="url(#m)"
                        d="M155.232 88.777c22.667 13.932 68.35 41.912 69.276 42.426 1.44.81 19.695-30.784 23.838-48.64l-93.114 6.214z"
                      />
                      <path
                        fill="url(#n)"
                        d="m82.113 156.507 39.313 75.848c23.246-12.607 41.45-27.967 58.121-44.42l-97.434-31.428z"
                      />
                      <path
                        fill="url(#o)"
                        d="m17.174 171.34-5.57 66.328c10.51 14.357 24.97 15.605 40.136 14.486-10.973-27.311-32.894-81.92-34.566-80.814z"
                      />
                      <path
                        fill="url(#p)"
                        d="m174.826 22.654 78.1 10.96c-4.169-17.662-16.969-29.06-38.787-32.623l-39.313 21.663z"
                      />
                    </svg>
                    <span className={styles.langLabelText}>Ruby</span>
                  </div>
                </button>

                <button className={styles.langTab} aria-label="PHP">
                  <div className={styles.langTabContent}>
                    <svg
                      viewBox="0 0 96.17000000000002 48.124"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M7.579 10.123h14.204c4.169.035 7.19 1.237 9.063 3.604s2.491 5.6 1.855 9.699c-.247 1.873-.795 3.71-1.643 5.512a16.385 16.385 0 0 1-3.392 4.876c-1.767 1.837-3.657 3.003-5.671 3.498s-4.099.742-6.254.742h-6.36l-2.014 10.07H0zm6.201 6.042l-3.18 15.9c.212.035.424.053.636.053h.742c3.392.035 6.219-.3 8.48-1.007 2.261-.742 3.781-3.321 4.558-7.738.636-3.71 0-5.848-1.908-6.413-1.873-.565-4.222-.83-7.049-.795-.424.035-.83.053-1.219.053h-1.113zM41.093 0h7.314L46.34 10.123h6.572c3.604.071 6.289.813 8.056 2.226 1.802 1.413 2.332 4.099 1.59 8.056l-3.551 17.649h-7.42L54.979 21.2c.353-1.767.247-3.021-.318-3.763s-1.784-1.113-3.657-1.113l-5.883-.053-4.346 21.783h-7.314zM70.412 10.123h14.204c4.169.035 7.19 1.237 9.063 3.604s2.491 5.6 1.855 9.699c-.247 1.873-.795 3.71-1.643 5.512a16.385 16.385 0 0 1-3.392 4.876c-1.767 1.837-3.657 3.003-5.671 3.498s-4.099.742-6.254.742h-6.36L70.2 48.124h-7.367zm6.201 6.042l-3.18 15.9c.212.035.424.053.636.053h.742c3.392.035 6.219-.3 8.48-1.007 2.261-.742 3.781-3.321 4.558-7.738.636-3.71 0-5.848-1.908-6.413-1.873-.565-4.222-.83-7.049-.795-.424.035-.83.053-1.219.053H76.56z" />
                    </svg>
                    <span className={styles.langLabelText}>PHP</span>
                  </div>
                </button>

                <button className={styles.langTab} aria-label="Python">
                  <div className={styles.langTabContent}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 256 255"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMinYMin meet"
                    >
                      <defs>
                        <linearGradient
                          x1="12.959%"
                          y1="12.039%"
                          x2="79.639%"
                          y2="78.201%"
                          id="a"
                        >
                          <stop stop-color="#387EB8" offset="0%" />
                          <stop stop-color="#366994" offset="100%" />
                        </linearGradient>
                        <linearGradient
                          x1="19.128%"
                          y1="20.579%"
                          x2="90.742%"
                          y2="88.429%"
                          id="b"
                        >
                          <stop stop-color="#FFE052" offset="0%" />
                          <stop stop-color="#FFC331" offset="100%" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"
                        fill="url(#a)"
                      />
                      <path
                        d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"
                        fill="url(#b)"
                      />
                    </svg>
                    <span className={styles.langLabelText}>Python</span>
                  </div>
                </button>
                <button className={styles.langTabDots} aria-label="More">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className={styles.codeSection}>
              <div className={styles.codeSectionTitle}>REQUEST</div>
              <div className={styles.codeWithGutter}>
                <ol className={styles.gutter} aria-hidden>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ol>

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
                    </span>
                    :{" "}
                    <span className={styles.codeString}>
                      &quot;application json&quot;
                    </span>
                    {"}"}
                    {"\n\n"}
                    <span className={styles.codeVariable}>response</span> ={" "}
                    <span className={styles.codeVariable}>requests</span>.
                    <span className={styles.codeFunction}>get</span>(
                    <span className={styles.codeVariable}>url</span>,{" "}
                    <span className={styles.codeVariable}>headers</span>)
                    {"\n\n"}
                    <span className={styles.codeFunction}>print</span>(
                    <span className={styles.codeVariable}>response</span>.
                    <span className={styles.codeProperty}>text</span>)
                  </code>
                </pre>
              </div>

              <div className={styles.codeSectionTitle}>RESPONSE</div>
              <div className={styles.codeWithGutter}>
                <pre className={styles.codeBlock}>
                  <code>
                    {"{"}
                    {"\n  "}
                    <span className={styles.codeString}>
                      &quot;status&quot;
                    </span>
                    : <span className={styles.codeString}>&quot;ok&quot;</span>,
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
                    <span className={styles.codeString}>
                      &quot;string&quot;
                    </span>
                    ,{"\n  "}
                    <span className={styles.codeString}>
                      &quot;version&quot;
                    </span>
                    :{" "}
                    <span className={styles.codeString}>
                      &quot;v0.1.0&quot;
                    </span>
                    ,{"\n  "}
                    <span className={styles.codeString}>
                      &quot;branch&quot;
                    </span>
                    :{" "}
                    <span className={styles.codeString}>
                      &quot;branch&quot;
                    </span>
                    ,{"\n  "}
                    <span className={styles.codeString}>
                      &quot;details&quot;
                    </span>
                    : {"{"}
                    <span className={styles.codeString}>&quot;redis&quot;</span>
                    : {"{"}
                    <span className={styles.codeString}>
                      &quot;status&quot;
                    </span>
                    : <span className={styles.codeString}>&quot;up&quot;</span>
                    {"}"}
                    {"}"}
                    {"\n}"}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Vignette overlay */}
      <div className={styles.dashboardVignette} />
    </div>
  );
}
