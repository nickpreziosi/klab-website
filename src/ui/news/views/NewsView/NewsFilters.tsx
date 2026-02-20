"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { MultipleSelector } from "@/ui/shared/components/multiple-selector/multiple-selector";
import styles from "./NewsView.module.css";

interface NewsFiltersProps {
  categories: string[];
  selectedCategories: string[];
}

export default function NewsFilters({ categories, selectedCategories }: NewsFiltersProps) {
  const t = useTranslations("newsPage");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    router.push(newUrl ? `${pathname}${newUrl}` : pathname);
  };

  return (
    <div className={styles.newsFilters}>
      <div className={styles.filtersRow}>
        <MultipleSelector
          label={t("filterCategoryLabel")}
          placeholder={t("filterAllCategories")}
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
