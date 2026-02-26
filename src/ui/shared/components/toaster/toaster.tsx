"use client";

import { Toaster as Sonner } from "sonner";
import { useTheme } from "@/ui/shared/providers/theme-provider";

type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * Viewport-relative toast container. Renders at bottom-right by default.
 * Add once to the root layout (inside ThemeProvider). Use toast() from "sonner" to show messages.
 */
function Toaster({ ...props }: ToasterProps) {
  const { effectiveTheme, mounted } = useTheme();
  const theme = mounted ? effectiveTheme : "light";

  return (
    <Sonner
      theme={theme as "light" | "dark"}
      className="klab-toaster"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: "klab-toast",
          description: "klab-toast-description",
          actionButton: "klab-toast-action",
          cancelButton: "klab-toast-cancel",
          success: "klab-toast-success",
          error: "klab-toast-error",
          warning: "klab-toast-warning",
        },
      }}
      closeButton
      {...props}
    />
  );
}

export { Toaster };
