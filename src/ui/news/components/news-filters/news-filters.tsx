"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { MultipleSelector } from "@/ui/shared/components/multiple-selector/multiple-selector";
import { translateNewsCategory } from "@/ui/news/utils/news-category";
import styles from "./news-filters.module.css";

interface NewsFiltersProps {
  categories: string[];
  selectedCategories: string[];
  /** When `rtl`, category dropdown list items align to the right (e.g. Arabic on /news). */
  popoverDir?: "ltr" | "rtl";
}

export default function NewsFilters({
  categories,
  selectedCategories,
  popoverDir,
}: NewsFiltersProps) {
  const t = useTranslations("newsPage");
  const tCategory = useTranslations("newsCategories");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryItems = categories.map((cat) => ({
    value: cat,
    label: translateNewsCategory(tCategory, cat),
  }));

  const handleCategoryChange = (keys: Set<string>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.delete("category");
    params.delete("lang");
    keys.forEach((cat) => params.append("category", cat));
    const newUrl = params.toString() ? `?${params.toString()}` : "";
    router.push(newUrl ? `${pathname}${newUrl}` : pathname);
  };

  return (
    <div className={styles.newsFilters}>
      <div className={styles.filtersRow}>
        <MultipleSelector
          id="news-category-filter"
          label={t("filterCategoryLabel")}
          placeholder={t("filterAllCategories")}
          options={categoryItems}
          selectedKeys={new Set(selectedCategories)}
          onSelectionChange={handleCategoryChange}
          minWidth={240}
          maxWidth={480}
          maxHeight={selectedCategories.length === 0 ? undefined : 120}
          popoverDir={popoverDir}
        />
      </div>
    </div>
  );
}
