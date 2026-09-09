"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ResourceLibraryView } from "@/ui/resource-library/views/ResourceLibraryView";
import { PRESS_COLLECTIONS, toResourceCollections } from "@/ui/press/data/press-collections";
import { KenaGateSection } from "@/ui/kena/components/kena-gate-section/kena-gate-section";
import { PasswordDialog, type PasswordUnlockResult } from "@/ui/shared/components/password-dialog/password-dialog";

const STORAGE_KEY = "press:unlocked";

export function PressView() {
  const t = useTranslations("press");
  const tStaff = useTranslations("companyStaff");
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
        const res = await fetch("/api/press-unlock", {
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

  const collections = unlocked
    ? toResourceCollections(PRESS_COLLECTIONS, {
        title: (collection) => (collection.person ? collection.person.name : t(collection.titleKey)),
        description: (collection) =>
          collection.person
            ? tStaff(`employees.${collection.person.titleKey}.position`)
            : collection.descriptionKey
              ? t(collection.descriptionKey)
              : undefined,
      })
    : [];

  return (
    <>
      <ResourceLibraryView
        heading={t("heading")}
        subtitle={t("subtitle")}
        collections={collections}
        afterHeader={
          unlocked ? undefined : (
            <KenaGateSection
              message={t("passwordGateMessage")}
              buttonLabel={t("passwordGateButton")}
              onEnterPassword={() => setDialogOpen(true)}
            />
          )
        }
      />
      <PasswordDialog
        namespace="press"
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onUnlock={handleUnlock}
      />
    </>
  );
}
