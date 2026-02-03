"use client";

import { useState, useRef, useEffect } from "react";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  type Selection,
} from "react-aria-components";
import styles from "./NewsView.module.css";

interface MultiSelectProps {
  label: string;
  placeholder: string;
  items: { value: string; label: string }[];
  selectedKeys: Set<string>;
  onSelectionChange: (keys: Set<string>) => void;
}

export default function MultiSelect({
  label,
  placeholder,
  items,
  selectedKeys,
  onSelectionChange,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      const updateWidth = () => {
        setTriggerWidth(triggerRef.current?.offsetWidth);
      };
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  const handleSelectionChange = (selection: Selection) => {
    if (selection === "all") {
      onSelectionChange(new Set(items.map((item) => item.value)));
    } else {
      onSelectionChange(selection as Set<string>);
    }
  };

  const getDisplayValue = () => {
    if (selectedKeys.size === 0) return placeholder;
    if (selectedKeys.size === 1) {
      const selectedItem = items.find((item) => selectedKeys.has(item.value));
      return selectedItem?.label || placeholder;
    }
    return `${selectedKeys.size} selected`;
  };

  return (
    <div className={styles.multiSelectWrapper}>
      <Label className={styles.multiSelectLabel}>{label}</Label>
      <Button
        ref={triggerRef}
        className={styles.multiSelectButton}
        onPress={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.multiSelectValue}>{getDisplayValue()}</span>
        <span aria-hidden="true" className={styles.multiSelectChevron} data-open={isOpen}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Button>
      <Popover
        triggerRef={triggerRef}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className={styles.multiSelectPopover}
        placement="bottom start"
        style={{ minWidth: triggerWidth }}
      >
        <ListBox
          className={styles.multiSelectListBox}
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectionChange}
          aria-label={label}
        >
          {items.map((item) => (
            <ListBoxItem
              key={item.value}
              id={item.value}
              className={styles.multiSelectItem}
              textValue={item.label}
            >
              {({ isSelected }) => (
                <>
                  <span className={styles.multiSelectCheckbox} data-selected={isSelected}>
                    {isSelected && (
                      <svg width="16" height="16" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2 5L4 7L8 3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  {item.label}
                </>
              )}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </div>
  );
}
