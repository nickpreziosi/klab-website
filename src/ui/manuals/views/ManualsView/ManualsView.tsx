"use client";

import { ResourceDownloadLibraryView } from "@/ui/resource-library/views/ResourceDownloadLibraryView";
import type { ResourceCollection } from "@/ui/resource-library/types";

type ManualsViewProps = {
  heading: string;
  subtitle: string;
  emptyMessage: string;
  collections?: ResourceCollection[];
};

export function ManualsView({
  heading,
  subtitle,
  emptyMessage,
  collections = [],
}: ManualsViewProps) {
  return (
    <ResourceDownloadLibraryView
      heading={heading}
      subtitle={subtitle}
      collections={collections}
      emptyMessage={emptyMessage}
    />
  );
}
