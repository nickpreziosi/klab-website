"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Button from "@/ui/shared/components/button/button";
import styles from "./cookie-consent-banner.module.css";

const CONSENT_STORAGE_KEY = "cookie-consent";

export type ConsentStatus = "accepted" | "essential" | null;

export function getStoredConsent(): ConsentStatus | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw === "accepted" || raw === "essential") return raw;
    return null;
  } catch {
    return null;
  }
}

export function setStoredConsent(value: "accepted" | "essential"): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    /* ignore */
  }
}

type CookieConsentBannerProps = {
  onAccept: () => void;
  onEssentialOnly: () => void;
};

export function CookieConsentBanner({ onAccept, onEssentialOnly }: CookieConsentBannerProps) {
  const t = useTranslations("cookieBanner");

  return (
    <div
      className={styles.banner}
      role="dialog"
      aria-label={t("privacyLink")}
      aria-describedby="cookie-banner-desc"
    >
      <div className={styles.bannerInner}>
        <p id="cookie-banner-desc" className={styles.message}>
          {t("message")}
        </p>
        <div className={styles.actions}>
          <Button variant="accent-brand" size="md" onClick={onAccept} aria-label={t("acceptAll")}>
            {t("acceptAll")}
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={onEssentialOnly}
            aria-label={t("essentialOnly")}
          >
            {t("essentialOnly")}
          </Button>
        </div>
      </div>
    </div>
  );
}
