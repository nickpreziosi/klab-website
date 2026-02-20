"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Moon, Sun, Monitor } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/ui/shared/components/tooltip/tooltip";
import { CycleToggle, type CycleToggleOption } from "@/ui/shared/components/cycle-toggle/cycle-toggle";
import { useTheme, type Theme } from "@/ui/shared/providers/theme-provider";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./theme-toggle.module.css";

export type ThemeToggleMode = "cycle" | "toggle-group";

export interface ThemeToggleProps {
  /** "cycle" = click to cycle (Light→Dark→System→Light), "toggle-group" = three buttons */
  mode?: ThemeToggleMode;
  /** "sidebar" = compact, "default" = standard (cycle mode only) */
  layout?: "sidebar" | "default";
  className?: string;
}

function useThemeOptions(): CycleToggleOption<Theme>[] {
  const t = useTranslations("theme");
  return [
    { value: "light", icon: Sun, label: t("light") },
    { value: "dark", icon: Moon, label: t("dark") },
    { value: "system", icon: Monitor, label: t("system") },
  ];
}

export function ThemeToggle({
  mode = "cycle",
  layout = "default",
  className,
}: ThemeToggleProps) {
  const t = useTranslations("theme");
  const { theme, setTheme, mounted } = useTheme();
  const [mountedState, setMountedState] = React.useState(false);
  const THEME_OPTIONS = useThemeOptions();

  React.useEffect(() => {
    setMountedState(true);
  }, []);

  const safeTheme = mounted && mountedState ? theme : "system";

  const handleThemeChange = React.useCallback(
    (value: Theme) => {
      setTheme(value);
    },
    [setTheme]
  );

  const handleItemClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (mode === "cycle") {
    return (
      <div className={cn(styles.toggleContainer, className)}>
        <CycleToggle
          options={THEME_OPTIONS}
          value={safeTheme}
          onValueChange={handleThemeChange}
          layout={layout}
          onClick={handleItemClick}
          getTooltipContent={(opt) => `${t("themeLabel")}: ${opt.label}`}
        />
      </div>
    );
  }

  /* Toggle-group mode: three buttons side by side */
  return (
    <div
      className={cn(styles.toggleGroupWrapper, className)}
      suppressHydrationWarning
      data-theme-toggle
    >
      <TooltipProvider delayDuration={0}>
        <div className={styles.toggleGroup}>
          {THEME_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isActive = safeTheme === option.value;
            return (
              <Tooltip key={option.value}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => handleThemeChange(option.value)}
                    onMouseDown={handleItemClick}
                    aria-label={option.label}
                    className={cn(
                      styles.toggleGroupItem,
                      isActive && styles.toggleGroupItemActive
                    )}
                  >
                    {Icon && <Icon className={styles.toggleGroupIcon} />}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={12}>
                  {t("themeLabel")}: {option.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
}
