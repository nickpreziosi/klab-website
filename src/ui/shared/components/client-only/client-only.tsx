"use client";

import { useState, useEffect, type ReactNode } from "react";

/**
 * Renders children only after the component has mounted on the client.
 * Use this to avoid hydration mismatches when children rely on client-only
 * values (e.g. Radix UI's useId() which can differ between server and client in React 19).
 *
 * Optional `placeholder` is rendered during SSR and until the first client paint.
 */
export function ClientOnly({
  children,
  placeholder = null,
}: {
  children: ReactNode;
  placeholder?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{placeholder}</>;
  }

  return <>{children}</>;
}
