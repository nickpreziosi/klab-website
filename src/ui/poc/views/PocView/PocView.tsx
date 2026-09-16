"use client";

import { ResourceDownloadLibraryView } from "@/ui/resource-library/views/ResourceDownloadLibraryView";
import type { ResourceCollection } from "@/ui/resource-library/types";

type PocViewProps = {
  heading: string;
  subtitle: string;
  collections: ResourceCollection[];
  emptyMessage?: string;
};

export function PocView({ heading, subtitle, collections, emptyMessage }: PocViewProps) {
  return (
    <ResourceDownloadLibraryView
      heading={heading}
      subtitle={subtitle}
      collections={collections}
      emptyMessage={emptyMessage}
    />
  );
}
