"use client";

import * as React from "react";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { X, ChevronsUpDown, Check } from "lucide-react";
import { Popover } from "react-aria-components";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./multiple-selector.module.css";

export interface MultipleSelectorOption {
  label: string;
  value: string;
}

export interface MultipleSelectorProps {
  options: MultipleSelectorOption[];
  selectedKeys: Set<string>;
  onSelectionChange: (keys: Set<string>) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  emptyIndicator?: React.ReactNode;
  id?: string;
  /** Wrapper className (e.g. for max-height/scroll container) */
  className?: string;
  /** Trigger container className (applied to the clickable trigger box) */
  triggerClassName?: string;
  /** Min width for the trigger. Default unset. */
  minWidth?: number | string;
  /** Max width for the trigger. Default unset. */
  maxWidth?: number | string;
  /** Max height for the trigger when content wraps; enables scroll. Default unset. */
  maxHeight?: number | string;
}

export function MultipleSelector({
  options,
  selectedKeys,
  onSelectionChange,
  placeholder = "Select items...",
  label,
  disabled = false,
  emptyIndicator,
  id: providedId,
  className,
  triggerClassName,
  minWidth,
  maxWidth,
  maxHeight,
}: MultipleSelectorProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>();
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const generatedId = React.useId();
  const selectorId = providedId ?? generatedId;

  // Keep dropdown width in sync with trigger (e.g. when selections change trigger width)
  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
    const updateWidth = () => setTriggerWidth(el.offsetWidth);
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Close when clicking outside trigger or popover
  useEffect(() => {
    if (!open) return;
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [open]);

  const selectedOptions = useMemo(
    () => options.filter((opt) => selectedKeys.has(opt.value)),
    [options, selectedKeys]
  );

  const handleUnselect = useCallback(
    (option: MultipleSelectorOption) => {
      const next = new Set(selectedKeys);
      next.delete(option.value);
      onSelectionChange(next);
    },
    [selectedKeys, onSelectionChange]
  );

  const handleToggle = useCallback(
    (option: MultipleSelectorOption) => {
      const next = new Set(selectedKeys);
      if (next.has(option.value)) {
        next.delete(option.value);
      } else {
        next.add(option.value);
      }
      onSelectionChange(next);
    },
    [selectedKeys, onSelectionChange]
  );

  const filteredOptions = useMemo(() => {
    if (!inputValue.trim()) return options;
    const search = inputValue.toLowerCase();
    return options.filter((opt) => opt.label.toLowerCase().includes(search));
  }, [options, inputValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !inputValue && selectedOptions.length > 0) {
      handleUnselect(selectedOptions[selectedOptions.length - 1]);
    }
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
    if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !open) {
      e.preventDefault();
      setOpen(true);
    }
  };

  useEffect(() => {
    if (!open) {
      setHighlightedIndex(-1);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === "Enter" && highlightedIndex >= 0) {
        e.preventDefault();
        const opt = filteredOptions[highlightedIndex];
        if (opt) handleToggle(opt);
      } else if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filteredOptions, highlightedIndex, handleToggle]);

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const el = listRef.current.children[highlightedIndex] as HTMLElement;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setInputValue("");
      setHighlightedIndex(-1);
    }
  }, [open]);

  const handleOpenChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
  }, []);

  const triggerContainerStyle = {
    ...(minWidth != null && { minWidth: typeof minWidth === "number" ? `${minWidth}px` : minWidth }),
    ...(maxWidth != null && { maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth }),
  };

  const scrollInnerStyle =
    maxHeight != null
      ? {
          maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
          overflowY: "auto" as const,
        }
      : undefined;

  const content = (
    <>
      {/* Entire container is the trigger; focus ring on this wrapper; X clicks still work via stopPropagation */}
      <div
        ref={triggerRef}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${selectorId}-list`}
        id={selectorId}
        className={cn(
          styles.triggerWrapper,
          disabled && styles.triggerDisabled,
          className
        )}
        style={Object.keys(triggerContainerStyle).length > 0 ? triggerContainerStyle : undefined}
        onClick={() => {
          if (!disabled) {
            inputRef.current?.focus();
            setOpen(true);
          }
        }}
      >
        <div
          className={cn(styles.trigger, triggerClassName)}
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            transform: "translateZ(0)",
          }}
        >
          {/* Scroll lives on this inner container only */}
          <div
            className={styles.triggerScroll}
            style={scrollInnerStyle}
          >
            {selectedOptions.map((opt) => (
              <span key={opt.value} className={styles.badge}>
                {opt.label}
                <button
                  type="button"
                  className={styles.badgeRemove}
                  aria-label={`Remove ${opt.label}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleUnselect(opt);
                  }}
                >
                  <X className={styles.icon} aria-hidden />
                </button>
              </span>
            ))}
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              placeholder={selectedOptions.length === 0 ? placeholder : ""}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => !disabled && setOpen(true)}
              disabled={disabled}
              aria-autocomplete="list"
              aria-controls={open ? `${selectorId}-list` : undefined}
              aria-activedescendant={
                highlightedIndex >= 0 && filteredOptions[highlightedIndex]
                  ? `${selectorId}-opt-${filteredOptions[highlightedIndex].value}`
                  : undefined
              }
            />
          </div>
          <button
            type="button"
            className={cn(styles.chevronButton, open && styles.chevronOpen)}
            aria-label={open ? "Close" : "Open"}
            disabled={disabled}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(!open);
              if (!open) setTimeout(() => inputRef.current?.focus(), 0);
            }}
          >
            <ChevronsUpDown className={styles.chevronIcon} aria-hidden />
          </button>
        </div>
      </div>
      <Popover
        triggerRef={triggerRef}
        isOpen={open}
        onOpenChange={handleOpenChange}
        placement="bottom start"
        isNonModal
        className={styles.popover}
        style={triggerWidth != null ? { width: triggerWidth, minWidth: triggerWidth } : undefined}
      >
        <div
          ref={popoverRef}
          className={styles.popoverInner}
          style={{
            backdropFilter: "blur(12px) saturate(180%)",
            WebkitBackdropFilter: "blur(12px) saturate(180%)",
            transform: "translateZ(0)",
          }}
        >
          <div className={styles.popoverListScroll}>
            <div
              id={`${selectorId}-list`}
              role="listbox"
              ref={listRef}
              className={styles.list}
              aria-multiselectable="true"
            >
            {filteredOptions.length === 0 && (
              <div className={styles.empty}>
                {emptyIndicator ?? "No results found."}
              </div>
            )}
            {filteredOptions.map((opt, index) => {
              const isSelected = selectedKeys.has(opt.value);
              return (
                <div
                  key={opt.value}
                  id={`${selectorId}-opt-${opt.value}`}
                  role="option"
                  aria-selected={isSelected}
                  className={cn(
                    styles.option,
                    index === highlightedIndex && styles.optionHighlighted,
                    isSelected && styles.optionSelected
                  )}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleToggle(opt);
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <span className={styles.optionLabel}>{opt.label}</span>
                  <span className={cn(styles.optionCheck, isSelected && styles.optionCheckSelected)}>
                    {isSelected && <Check className={styles.optionCheckIcon} aria-hidden />}
                  </span>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </Popover>
    </>
  );

  if (label) {
    return (
      <div className={styles.wrapper}>
        <label htmlFor={selectorId} className={styles.label}>
          {label}
        </label>
        {content}
      </div>
    );
  }

  return content;
}
