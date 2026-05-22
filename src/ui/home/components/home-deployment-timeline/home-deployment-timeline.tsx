"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./home-deployment-timeline.module.css";
import { TIMELINE_ICONS } from "./timeline-icons";

const STEP_KEYS = [
  "stepScoping",
  "stepOnboarding",
  "stepIntegrate",
  "stepDeploy",
  "stepTest",
  "stepGoLive",
] as const;

type HomeDeploymentTimelineProps = {
  skipAnimation?: boolean;
};

export function HomeDeploymentTimeline({ skipAnimation = false }: HomeDeploymentTimelineProps) {
  const t = useTranslations("homeSecondary");

  return (
    <motion.div
      className={styles.sectionHeaderAndTimeline}
      initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={skipAnimation ? undefined : { opacity: 1, y: 0 }}
      viewport={skipAnimation ? undefined : { once: true, amount: 0.2 }}
      transition={skipAnimation ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
    >
            <div className={styles.deploymentTimeline}>
              <div className={styles.deploymentTimelineCopy}>
                <h2 className={styles.timelineTitle}>
                  <span className={styles.timelineTitlePrimary}>{t("timelineTitlePrimary")}</span>{" "}
                  <br className={styles.timelineTitleBreak}></br>
                  <span className={styles.timelineTitleAccent}>{t("timelineTitleAccent")}.</span>
                </h2>
                <p className={styles.timelineMethodology}>{t("timelineMethodology")}</p>
                <ul className={styles.deploymentStatList}>
                  <li className={styles.deploymentStatItem}>{t("deploymentStat1")}</li>
                  <li className={styles.deploymentStatItem}>{t("deploymentStat2")}</li>
                  <li className={styles.deploymentStatItem}>{t("deploymentStat3")}</li>
                </ul>
              </div>
              <div className={styles.timelineLayout}>
                {(() => {
                  const steps = STEP_KEYS.map((key) => ({ label: t(key) }));
                  return (
                    <>
                      {/* Row 1: label on top for step 1 (index 0), then alternating: even = label+arrow, odd = icon */}
                      <div className={styles.timelineRow1}>
                        {steps.map((step, index) => {
                          const iconDef = TIMELINE_ICONS[index];
                          const showLabel = index % 2 === 0;
                          return (
                            <div key={index} className={styles.timelineCell}>
                              {showLabel ? (
                                <div className={styles.timelineLabelWithArrow}>
                                  <span className={styles.timelineStepText}>{step.label}</span>
                                  <svg
                                    className={`${styles.timelineLabelArrow} ${index % 2 === 0 ? styles.timelineLabelArrowRotate180 : ""}`}
                                    viewBox="0 0 23.1 16.27"
                                    aria-hidden
                                  >
                                    <path
                                      d="M2.06.63l12.84,14.49c.41.44.09,1.16-.52,1.14l-7.19-.17c-.74-.02-1.44-.35-1.92-.91L.64,9.3C.21,8.8-.01,8.17,0,7.52L.14,1.36C.17.37,1.39-.09,2.06.63Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M21.83.21l-10.17,9.74,4.52,5.1c.26.28.22.68,0,.92.16-.02.31-.08.42-.19l5.64-5.06c.52-.46.82-1.13.82-1.82l.04-8.16c0-.67-.8-1.01-1.28-.55Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </div>
                              ) : (
                                <div className={styles.timelineStepIcon}>
                                  <svg
                                    className={styles.timelineStepIconSvg}
                                    viewBox={iconDef.viewBox}
                                    aria-hidden
                                  >
                                    <path d={iconDef.path} fill="#fff" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      {/* Row 2: track (accent bg), "Step #", circle arrows positioned absolutely */}
                      <div className={styles.timelineRow2Track}>
                        <div className={styles.timelineBar} aria-hidden />
                        <div className={styles.timelineStepLabels}>
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <span key={n} className={styles.timelineStepLabel} data-step={n}>
                              {t("stepN", { n })}
                            </span>
                          ))}
                        </div>
                        {[0, 1, 2, 3, 4, 5].map((index) => {
                          const isEven = index % 2 === 0;
                          const edge = index % 2 === 0 ? "left" : "right";
                          return (
                            <span
                              key={index}
                              className={
                                isEven
                                  ? `${styles.timelineCircleArrow} ${styles.timelineCircleArrowBottom}`
                                  : `${styles.timelineCircleArrow} ${styles.timelineCircleArrowTop}`
                              }
                              data-step-index={index}
                              data-edge={edge}
                              aria-hidden
                            >
                              <svg
                                className={styles.timelineCircleArrowSvg}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                {isEven ? (
                                  <path d="M12 5v14M5 12l7 7 7-7" />
                                ) : (
                                  <path d="M12 19V5M5 12l7-7 7 7" />
                                )}
                              </svg>
                            </span>
                          );
                        })}
                      </div>
                      {/* Row 3: icon for step 1 (index 0), then alternating: even = icon, odd = label+arrow */}
                      <div className={styles.timelineRow3}>
                        {steps.map((step, index) => {
                          const iconDef = TIMELINE_ICONS[index];
                          const showLabel = index % 2 === 1;
                          return (
                            <div key={index} className={styles.timelineCell}>
                              {showLabel ? (
                                <div className={styles.timelineLabelWithArrow}>
                                  <svg
                                    className={styles.timelineLabelArrow}
                                    viewBox="0 0 23.1 16.27"
                                    aria-hidden
                                  >
                                    <path
                                      d="M2.06.63l12.84,14.49c.41.44.09,1.16-.52,1.14l-7.19-.17c-.74-.02-1.44-.35-1.92-.91L.64,9.3C.21,8.8-.01,8.17,0,7.52L.14,1.36C.17.37,1.39-.09,2.06.63Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M21.83.21l-10.17,9.74,4.52,5.1c.26.28.22.68,0,.92.16-.02.31-.08.42-.19l5.64-5.06c.52-.46.82-1.13.82-1.82l.04-8.16c0-.67-.8-1.01-1.28-.55Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                  <span className={styles.timelineStepText}>{step.label}</span>
                                </div>
                              ) : (
                                <div className={styles.timelineStepIcon}>
                                  <svg
                                    className={styles.timelineStepIconSvg}
                                    viewBox={iconDef.viewBox}
                                    aria-hidden
                                  >
                                    <path d={iconDef.path} fill="#fff" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
    </motion.div>
  );
}
