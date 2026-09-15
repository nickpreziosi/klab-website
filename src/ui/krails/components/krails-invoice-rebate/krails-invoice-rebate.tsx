"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import { withBrandLtr } from "@/ui/home/utils/with-brand-ltr";
import {
  RebateBankIcon,
  RebateInvoiceIcon,
  RebateKrailsIcon,
  RebatePackageIcon,
} from "@/ui/shared/components/rebate-step-icons/rebate-step-icons";
import styles from "./krails-invoice-rebate.module.css";

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

const FEATURE_BACKGROUNDS = [
  { src: "/images/krails-cards/krails-box-1.gif" },
  { src: "/images/krails-cards/krails-box-2.mp4" },
  { src: "/images/krails-cards/krails-box-3.mp4", playbackRate: 2 },
  { src: "/images/krails-cards/krails-box-4.mp4" },
  { src: "/images/krails-cards/krails-box-5.mp4" },
] as const;

const PHONE_BACKGROUND = {
  src: "/images/krails-cards/krails-box-6.mp4",
} as const;

type FeatureMedia = {
  src: string;
  playbackRate?: number;
};

function FeatureBackground({
  media,
  alt,
  videoRef,
}: {
  media: FeatureMedia;
  alt?: string;
  videoRef?: RefObject<HTMLVideoElement | null>;
}) {
  if (media.src.endsWith(".mp4")) {
    return (
      <video
        ref={videoRef}
        className={styles.featureBg}
        src={media.src}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label={alt}
        aria-hidden={alt ? undefined : true}
      />
    );
  }

  return (
    <img
      className={styles.featureBg}
      src={media.src}
      alt={alt ?? ""}
      aria-hidden={alt ? undefined : true}
    />
  );
}

function FeatureCanvas({
  media,
  alt,
  children,
}: {
  media: FeatureMedia;
  alt?: string;
  children?: ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (media.playbackRate) video.playbackRate = media.playbackRate;
    void video.play().catch(() => {});
  }, [media.playbackRate, media.src]);

  return (
    <div className={styles.featureCanvas}>
      <FeatureBackground media={media} alt={alt} videoRef={videoRef} />
      {children}
    </div>
  );
}

export type KRailsInvoiceRebateTranslations = {
  rebateBody: string;
  rebateSteps: { title: string; body: string }[];
  rebateCards: { title: string; body: string }[];
  rebatePhoneAlt: string;
  rebateAlignTitle: string;
  rebateAlignItems: string[];
  rebateAlignCta: string;
  rebateAlignDashAlt: string;
};

type KRailsInvoiceRebateProps = {
  translations: KRailsInvoiceRebateTranslations;
  skipAnimation?: boolean;
};

export function KRailsInvoiceRebate({
  translations,
  skipAnimation = false,
}: KRailsInvoiceRebateProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);
  const steps = translations.rebateSteps;
  const fade = skipAnimation
    ? { duration: 0 }
    : { duration: 0.7, ease: ENTRANCE_EASE };
  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.08 },
    },
  };
  const cardFade = skipAnimation
    ? undefined
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.7, ease: ENTRANCE_EASE } },
      };

  return (
    <section className={styles.section} dir={dir} aria-labelledby="krails-invoice-rebate-heading">
      <div className={styles.inner}>
        <motion.div
          className={styles.card}
          initial={skipAnimation ? false : { opacity: 0 }}
          whileInView={skipAnimation ? undefined : { opacity: 1 }}
          animate={skipAnimation ? { opacity: 1 } : undefined}
          viewport={skipAnimation ? undefined : { once: true, amount: 0.2 }}
          transition={fade}
        >
          <h2 id="krails-invoice-rebate-heading" className={styles.lede}>
            {translations.rebateBody}
          </h2>
          <div className={styles.stepperWrap}>
            <div className={styles.track} aria-hidden>
              <span className={styles.beam} />
            </div>
            <ol className={styles.stepper}>
              {steps.map((step, index) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.node}>
                    {index === 0 ? <RebatePackageIcon /> : null}
                    {index === 1 ? <RebateInvoiceIcon /> : null}
                    {index === 2 ? <RebateBankIcon /> : null}
                    {index === 3 ? <RebateKrailsIcon /> : null}
                  </span>
                  <div className={styles.copy}>
                    <p className={styles.stepTitle}>{withBrandLtr(step.title, styles.brandLtr)}</p>
                    <p className={styles.stepBody}>{withBrandLtr(step.body, styles.brandLtr)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>

        <motion.ul
          className={styles.featureGrid}
          variants={stagger}
          initial={skipAnimation ? false : "hidden"}
          whileInView={skipAnimation ? undefined : "visible"}
          animate={skipAnimation ? "visible" : undefined}
          viewport={skipAnimation ? undefined : { once: true, amount: 0.12 }}
        >
          {translations.rebateCards.map((feature, index) => (
            <motion.li key={feature.title} className={styles.featureCard} variants={cardFade}>
              <FeatureCanvas media={FEATURE_BACKGROUNDS[index]}>
                <div className={styles.featureContent}>
                  <div className={styles.featurePanel}>
                    <h3 className={styles.featureTitle}>{withBrandLtr(feature.title, styles.brandLtr)}</h3>
                    <p className={styles.featureBody}>{withBrandLtr(feature.body, styles.brandLtr)}</p>
                  </div>
                </div>
              </FeatureCanvas>
            </motion.li>
          ))}
          <motion.li className={`${styles.featureCard} ${styles.phoneCard}`} variants={cardFade}>
            <FeatureCanvas media={PHONE_BACKGROUND} alt={translations.rebatePhoneAlt} />
          </motion.li>
        </motion.ul>

        <motion.div
          className={styles.align}
          variants={stagger}
          initial={skipAnimation ? false : "hidden"}
          whileInView={skipAnimation ? undefined : "visible"}
          animate={skipAnimation ? "visible" : undefined}
          viewport={skipAnimation ? undefined : { once: true, amount: 0.2 }}
        >
          <div className={styles.alignPhoto} aria-hidden>
            <img src="/images/krails-rebate-align/bg.png" alt="" />
            <span className={styles.alignTint} />
          </div>
          <div className={styles.alignInner}>
            <div className={styles.alignCopy}>
              <motion.h3 className={styles.alignTitle} variants={cardFade}>
                {withBrandLtr(translations.rebateAlignTitle, styles.brandLtr)}
              </motion.h3>
              <ul className={styles.alignList}>
                {translations.rebateAlignItems.map((item) => (
                  <motion.li key={item} className={styles.alignItem} variants={cardFade}>
                    {withBrandLtr(item, styles.brandLtr)}
                  </motion.li>
                ))}
              </ul>
              <motion.a
                className={styles.alignCta}
                href="#krails-invoice-rebate-heading"
                variants={cardFade}
              >
                {translations.rebateAlignCta}
              </motion.a>
            </div>
            <motion.img
              className={styles.alignDash}
              src="/images/krails-rebate-align/dashboard.png"
              alt={translations.rebateAlignDashAlt}
              width={463}
              height={260}
              variants={cardFade}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
