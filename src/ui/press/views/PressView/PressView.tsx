"use client";

import { useTranslations } from "next-intl";
import { ResourceLibraryView } from "@/ui/resource-library/views/ResourceLibraryView";
import { PRESS_COLLECTIONS, toResourceCollections } from "@/ui/press/data/press-collections";

export function PressView() {
  const t = useTranslations("press");
  const tStaff = useTranslations("companyStaff");
  const collections = toResourceCollections(PRESS_COLLECTIONS, {
    title: (collection) => (collection.person ? collection.person.name : t(collection.titleKey)),
    description: (collection) =>
      collection.person
        ? tStaff(`employees.${collection.person.titleKey}.position`)
        : collection.descriptionKey
          ? t(collection.descriptionKey)
          : undefined,
  });

  return (
    <ResourceLibraryView heading={t("heading")} subtitle={t("subtitle")} collections={collections} />
  );
}
