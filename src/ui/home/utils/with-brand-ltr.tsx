import type { ReactNode } from "react";

/** Keep “K Rails” as one LTR token so RTL does not render “Rails K”. */
export function withBrandLtr(text: string, className: string): ReactNode {
  return text.split(/(K Rails)/g).map((part, index) =>
    part === "K Rails" ? (
      <span key={index} dir="ltr" className={className}>
        {part}
      </span>
    ) : (
      part
    )
  );
}
