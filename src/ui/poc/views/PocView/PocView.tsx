"use client";

import { ResourceLibraryView } from "@/ui/resource-library/views/ResourceLibraryView";
import type { ResourceCollection } from "@/ui/resource-library/types";

type PocViewProps = {
  heading: string;
  subtitle: string;
  collections: ResourceCollection[];
  emptyMessage?: string;
};

export function PocView({ heading, subtitle, collections, emptyMessage }: PocViewProps) {
  return (
    <ResourceLibraryView
      heading={heading}
      subtitle={subtitle}
      collections={collections}
      emptyMessage={emptyMessage}
    />
  );
}
