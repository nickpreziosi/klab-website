"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/ui/shared/components/tooltip/tooltip";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./cycle-toggle.module.css";

export interface CycleToggleOption<T = string> {
  value: T;
  icon?: React.ComponentType<{ className?: string }>;
  label?: string;
  content?: React.ReactNode;
}

export interface CycleToggleProps<T = string> {
  options: CycleToggleOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  layout?: "sidebar" | "default";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Tooltip position (default: "bottom") */
  tooltipSide?: "top" | "right" | "bottom" | "left";
  /** Tooltip offset in pixels (default: 12) */
  tooltipSideOffset?: number;
  /** Custom tooltip content. Receives the current option. If not provided, uses option.label or option.value. */
  getTooltipContent?: (option: CycleToggleOption<T>) => React.ReactNode;
}

export function CycleToggle<T = string>({
  options,
  value,
  onValueChange,
  layout = "default",
  className,
  onClick,
  tooltipSide = "bottom",
  tooltipSideOffset = 12,
  getTooltipContent,
}: CycleToggleProps<T>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!mounted) return;
      const currentIndex = options.findIndex((opt) => opt.value === value);
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % options.length;
      onValueChange(options[nextIndex].value);
      onClick?.(e);
    },
    [mounted, options, value, onValueChange, onClick]
  );

  const currentOption = options.find((opt) => opt.value === value) ?? options[0];
  const CurrentIcon = currentOption.icon;
  const isReady = mounted && options.some((opt) => opt.value === value);

  const button = (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        styles.cycleButton,
        layout === "sidebar" ? styles.cycleButtonSidebar : styles.cycleButtonDefault,
        className
      )}
      aria-label={currentOption.label ?? String(currentOption.value)}
    >
      {!isReady ? (
        <span className={styles.iconWrapper} aria-hidden="true" />
      ) : currentOption.content ? (
        currentOption.content
      ) : (
        <span className={styles.iconWrapper} data-allow-transition>
          {options.map((option) => {
            const Icon = option.icon;
            if (!Icon) return null;
            const isActive = option.value === value;
            return (
              <Icon
                key={String(option.value)}
                className={cn(styles.icon, isActive ? styles.iconActive : styles.iconInactive)}
              />
            );
          })}
        </span>
      )}
      <span className={styles.srOnly}>{currentOption.label ?? `Current: ${currentOption.value}`}</span>
    </button>
  );

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side={tooltipSide} sideOffset={tooltipSideOffset}>
          {getTooltipContent
            ? getTooltipContent(currentOption)
            : currentOption.label ?? String(currentOption.value)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
