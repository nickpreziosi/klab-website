"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import KenaCardsSection from "@/ui/kena/components/kena-cards-section/kena-cards-section";
import Kena3dSection from "@/ui/kena/components/kena-3d-section/kena-3d-section";
import KenaHeroSection from "@/ui/kena/components/kena-hero-section/kena-hero-section";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";
import styles from "./KenaView.module.css";
import KenaCtaSection from "@/ui/kena/components/kena-cta-section/kena-cta-section";
import { KenaPasswordDialog } from "@/ui/kena/components/kena-password-dialog/kena-password-dialog";
import type { KenaUnlockResult } from "@/ui/kena/components/kena-password-dialog/kena-password-dialog";

export interface KenaTranslations {
  heroHeading: string;
  heroSecondHeading: string;
  heroSubtitle: string;
  twoColLeft: string;
  twoColRight: string;
  cardsHeading: string;
  cardsImageAlt: string;
  feature0Title: string;
  feature0Description: string;
  feature1Title: string;
  feature1Description: string;
  feature2Title: string;
  feature2Description: string;
  feature3Title: string;
  feature3Description: string;
  section3dHeading: string;
  step0Heading: string;
  step0Text: string;
  step1Heading: string;
  step1Text: string;
  step2Heading: string;
  step2Text: string;
  step3Heading: string;
  step3Text: string;
  step4Heading: string;
  step4Text: string;
  ctaHeading: string;
  ctaButton: string;
}

const STORAGE_KEY = "kena:unlocked";

export function KenaView({ translations }: { translations: KenaTranslations }) {
  const t = useTranslations("kena");
  const skipAnimation = useSkipAnimationOnLocaleSwitch();
  const [unlocked, setUnlocked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "true") {
        setUnlocked(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleUnlock = useCallback(
    async (password: string): Promise<KenaUnlockResult> => {
      try {
        const res = await fetch("/api/kena-unlock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });

        if (res.ok) {
          try {
            localStorage.setItem(STORAGE_KEY, "true");
          } catch {
            // ignore
          }
          setUnlocked(true);
          setDialogOpen(false);
          return { ok: true };
        }

        if (res.status === 401) {
          return { ok: false, message: t("passwordErrorInvalid") };
        }
        return { ok: false, message: t("passwordErrorGeneric") };
      } catch {
        return { ok: false, message: t("passwordErrorNetwork") };
      }
    },
    [t]
  );

  const closeDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.heroSection}>
        <KenaHeroSection
          translations={translations}
          skipAnimation={skipAnimation}
          unlocked={unlocked}
          passwordGateMessage={unlocked ? undefined : t("passwordGateMessage")}
          passwordGateButton={unlocked ? undefined : t("passwordGateButton")}
          onEnterPassword={unlocked ? undefined : () => setDialogOpen(true)}
        />
      </div>

      {unlocked && (
        <>
          <KenaCardsSection translations={translations} skipAnimation={skipAnimation} />
          <div className={styles.lastSection}>
            <Kena3dSection translations={translations} skipAnimation={skipAnimation} />
            <KenaCtaSection translations={translations} skipAnimation={skipAnimation} />
          </div>
        </>
      )}

      <KenaPasswordDialog
        open={dialogOpen}
        onClose={closeDialog}
        onUnlock={handleUnlock}
      />
    </main>
  );
}
