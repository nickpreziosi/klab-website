"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/ui/shared/providers/locale-context/locale-context";
import { MultipleSelector } from "@/ui/shared/components/multiple-selector/multiple-selector";
import styles from "./NewsView.module.css";

interface NewsFiltersProps {
  categories: string[];
  selectedCategories: string[];
}

export default function NewsFilters({ categories, selectedCategories }: NewsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { localePath } = useLocale();

  const categoryItems = categories.map((cat) => ({
    value: cat,
    label: cat,
  }));

  const handleCategoryChange = (keys: Set<string>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.delete("category");
    keys.forEach((cat) => params.append("category", cat));
    const newUrl = params.toString() ? `?${params.toString()}` : "";
    router.push(newUrl ? `${localePath("/news")}${newUrl}` : localePath("/news"));
  };

  return (
    <div className={styles.newsFilters}>
      <div className={styles.filtersRow}>
        <MultipleSelector
          label="Category"
          placeholder="All Categories"
          options={categoryItems}
          selectedKeys={new Set(selectedCategories)}
          onSelectionChange={handleCategoryChange}
          minWidth={240}
          maxWidth={480}
          maxHeight={120}
        />
      </div>
    </div>
  );
}
