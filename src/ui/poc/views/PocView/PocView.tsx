"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ResourceDownloadLibraryView } from "@/ui/resource-library/views/ResourceDownloadLibraryView";
import { PressGateSection } from "@/ui/press/components/press-gate-section/press-gate-section";
import {
  PasswordDialog,
  type PasswordUnlockResult,
} from "@/ui/shared/components/password-dialog/password-dialog";
import type { ResourceCollection } from "@/ui/resource-library/types";

const STORAGE_KEY = "poc:unlocked";

type PocViewProps = {
  heading: string;
  subtitle: string;
  collections: ResourceCollection[];
  emptyMessage?: string;
};

export function PocView({ heading, subtitle, collections, emptyMessage }: PocViewProps) {
  const t = useTranslations("poc");
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
    async (password: string): Promise<PasswordUnlockResult> => {
      try {
        const res = await fetch("/api/poc-unlock", {
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

  return (
    <>
      <ResourceDownloadLibraryView
        heading={heading}
        subtitle={subtitle}
        collections={unlocked ? collections : []}
        emptyMessage={unlocked ? emptyMessage : undefined}
        afterHeader={
          unlocked ? undefined : (
            <PressGateSection
              message={t("passwordGateMessage")}
              buttonLabel={t("passwordGateButton")}
              onEnterPassword={() => setDialogOpen(true)}
            />
          )
        }
      />
      <PasswordDialog
        namespace="poc"
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onUnlock={handleUnlock}
      />
    </>
  );
}
