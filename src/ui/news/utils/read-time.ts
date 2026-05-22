/** Expects Sanity `readTime` to be a number string (e.g. `"5"`). */
export function parseReadTimeMinutes(raw: string | null | undefined): number | undefined {
  if (raw == null || raw === "") return undefined;
  const trimmed = String(raw).trim();
  const n = Number.parseInt(trimmed, 10);
  if (!Number.isFinite(n) || n < 0) return undefined;
  return n;
}

export function formatReadTimeWithUnit(
  raw: string | null | undefined,
  minutesLabel: string
): string | undefined {
  const n = parseReadTimeMinutes(raw);
  if (n === undefined) return undefined;
  return `${n} ${minutesLabel}`;
}
