"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { MultipleSelector } from "@/ui/shared/components/multiple-selector/multiple-selector";
import styles from "./news-filters.module.css";

const LANGUAGE_OPTIONS = [
  { label: "English", value: "en" },
  { label: "Español", value: "es" },
  { label: "Português", value: "pt" },
  { label: "العربية", value: "ar" },
];

interface NewsFiltersProps {
  categories: string[];
  selectedCategories: string[];
  showLanguageFilter?: boolean;
  selectedLanguages?: string[];
}

export default function NewsFilters({
  categories,
  selectedCategories,
  showLanguageFilter = false,
  selectedLanguages = [],
}: NewsFiltersProps) {
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

  const handleLanguageChange = (keys: Set<string>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.delete("lang");
    keys.forEach((lang) => params.append("lang", lang));
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
          maxHeight={120}
        />
        {showLanguageFilter && (
          <MultipleSelector
            id="news-language-filter"
            label={t("filterLanguageLabel")}
            placeholder={t("filterAllLanguages")}
            options={LANGUAGE_OPTIONS}
            selectedKeys={new Set(selectedLanguages)}
            onSelectionChange={handleLanguageChange}
            minWidth={240}
            maxWidth={480}
            maxHeight={120}
          />
        )}
      </div>
    </div>
  );
}
