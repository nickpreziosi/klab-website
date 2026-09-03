"use client";

import { ResourceLibraryView } from "@/ui/resource-library/views/ResourceLibraryView";

type ManualsViewProps = {
  heading: string;
  subtitle: string;
  emptyMessage: string;
};

export function ManualsView({ heading, subtitle, emptyMessage }: ManualsViewProps) {
  return (
    <ResourceLibraryView
      heading={heading}
      subtitle={subtitle}
      collections={[]}
      emptyMessage={emptyMessage}
    />
  );
}
