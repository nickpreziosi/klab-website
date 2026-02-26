"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@/ui/shared/components/google-analytics/google-analytics";
import {
  CookieConsentBanner,
  getStoredConsent,
  setStoredConsent,
  type ConsentStatus,
} from "@/ui/shared/components/cookie-consent-banner/cookie-consent-banner";

/**
 * Renders the cookie consent banner when no choice is stored, and loads
 * Google Analytics only after the user accepts. Essential-only choice
 * does not load GA.
 */
export function CookieConsentProvider() {
  const [consent, setConsent] = useState<ConsentStatus | undefined>(undefined);

  useEffect(() => {
    setConsent(getStoredConsent() ?? null);
  }, []);

  const accept = () => {
    setStoredConsent("accepted");
    setConsent("accepted");
  };

  const essentialOnly = () => {
    setStoredConsent("essential");
    setConsent("essential");
  };

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics />}
      {consent === null && (
        <CookieConsentBanner onAccept={accept} onEssentialOnly={essentialOnly} />
      )}
    </>
  );
}
