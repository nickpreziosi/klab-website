"use client";

import { ResourceLibraryView } from "@/ui/resource-library/views/ResourceLibraryView";
import type { ResourceCollection } from "@/ui/resource-library/types";

type PocViewProps = {
  heading: string;
  subtitle: string;
  collections: ResourceCollection[];
};

export function PocView({ heading, subtitle, collections }: PocViewProps) {
  return (
    <ResourceLibraryView heading={heading} subtitle={subtitle} collections={collections} />
  );
}
