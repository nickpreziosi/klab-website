"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/ui/shared/utils/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import styles from "./combobox.module.css";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  onBlur?: () => void;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
  /** Hide the selected value in the input (e.g. for floating labels) */
  hideValue?: boolean;
  "aria-describedby"?: string;
  label?: string;
  id?: string;
  /** When set, used for a stable input id (avoids hydration mismatch with useId). */
  name?: string;
  autoComplete?: string;
  error?: boolean;
}

export function Combobox({
  options,
  value: controlledValue,
  onValueChange,
  onBlur,
  onOpenChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No option found.",
  className,
  disabled = false,
  hideValue = false,
  "aria-describedby": ariaDescribedBy,
  label,
  id: providedId,
  name,
  autoComplete = "off",
  error = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const ignoreNextFocusRef = React.useRef(false);
  const generatedId = React.useId();
  const comboboxId = providedId ?? (name ? `field-${name}` : generatedId);

  const [internalValue, setInternalValue] = React.useState("");
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (controlledValue === undefined) setInternalValue(newValue);
      onValueChange?.(newValue);
    },
    [controlledValue, onValueChange]
  );

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = React.useMemo(() => {
    if (!search.trim()) return options;
    const searchLower = search.toLowerCase();
    return options.filter((opt) => opt.label.toLowerCase().includes(searchLower));
  }, [options, search]);

  React.useEffect(() => {
    if (!open) {
      setSearch("");
      setHighlightedIndex(-1);
    }
  }, [open]);

  const closePopover = React.useCallback(() => {
    ignoreNextFocusRef.current = true;
    setOpen(false);
    if (onBlur) setTimeout(() => onBlur(), 0);
    onOpenChange?.(false);
  }, [onBlur, onOpenChange]);

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!next) ignoreNextFocusRef.current = true;
      setOpen(next);
      if (!next && onBlur) setTimeout(() => onBlur(), 0);
      onOpenChange?.(next);
    },
    [onBlur, onOpenChange]
  );

  const handleInputBlur = React.useCallback(() => {
    if (!open && onBlur) onBlur();
  }, [open, onBlur]);

  // Keyboard navigation
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
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
        const option = filteredOptions[highlightedIndex];
        if (option) {
          handleValueChange(option.value === value ? "" : option.value);
          ignoreNextFocusRef.current = true;
          setOpen(false);
        }
      } else if (e.key === "Escape") {
        ignoreNextFocusRef.current = true;
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filteredOptions, highlightedIndex, value, handleValueChange]);

  React.useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const el = listRef.current.children[highlightedIndex] as HTMLElement;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  /* For floating label: input uses placeholder=" " so :placeholder-shown drives label position. */
  const inputValue = open ? search : hideValue ? "" : selectedOption?.label ?? "";

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.triggerWrap}>
        <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
          <PopoverPrimitive.Anchor asChild>
            <div className={styles.anchor}>
              <div className={styles.inner}>
                <input
                  ref={inputRef}
                  id={comboboxId}
                  type="text"
                  autoComplete={autoComplete}
                  placeholder=" "
                  value={inputValue}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setHighlightedIndex(-1);
                  if (!open) setOpen(true);
                }}
                onFocus={() => {
                  if (ignoreNextFocusRef.current) {
                    ignoreNextFocusRef.current = false;
                    return;
                  }
                  setOpen(true);
                }}
                onBlur={handleInputBlur}
                onClick={() => setOpen(true)}
                onKeyDown={(e) => {
                  if (["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) e.preventDefault();
                  if (e.key === "Escape") setOpen(false);
                }}
                disabled={disabled}
                aria-describedby={ariaDescribedBy}
                aria-expanded={open}
                aria-autocomplete="list"
                aria-controls={open ? `${comboboxId}-list` : undefined}
                  className={cn(styles.input, error && styles.error)}
                />
                <button
                  type="button"
                  className={styles.button}
                  disabled={disabled}
                  tabIndex={-1}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (open) ignoreNextFocusRef.current = true;
                    setOpen(!open);
                    if (!open) setTimeout(() => inputRef.current?.focus(), 0);
                  }}
                  aria-label={open ? "Close list" : "Open list"}
                >
                  <ChevronsUpDown className={styles.icon} aria-hidden />
                </button>
                <span className={styles.floatingLabel} aria-hidden>
                  {label ?? placeholder}
                </span>
              </div>
            </div>
          </PopoverPrimitive.Anchor>
          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              align="start"
              sideOffset={4}
              onOpenAutoFocus={(e) => e.preventDefault()}
              onCloseAutoFocus={(e) => {
                e.preventDefault();
                ignoreNextFocusRef.current = true;
                inputRef.current?.focus();
              }}
              onInteractOutside={() => closePopover()}
              onEscapeKeyDown={() => closePopover()}
              className={styles.content}
            >
              <div
                className={styles.glassLayer}
                aria-hidden
                style={{
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  transform: "translateZ(0)",
                }}
              />
              <div
              ref={listRef}
              id={`${comboboxId}-list`}
              role="listbox"
              className={styles.list}
            >
              {filteredOptions.length === 0 ? (
                <div className={styles.empty}>{emptyMessage}</div>
              ) : (
                filteredOptions.map((option, index) => (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={value === option.value}
                    data-highlighted={index === highlightedIndex}
                    className={styles.item}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleValueChange(option.value === value ? "" : option.value);
                      ignoreNextFocusRef.current = true;
                      setOpen(false);
                    }}
                  >
                    <span>{option.label}</span>
                    {value === option.value ? (
                      <Check className={styles.icon} aria-hidden />
                    ) : null}
                  </div>
                ))
              )}
            </div>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
      </div>
    </div>
  );
}
