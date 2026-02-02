"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import MultiSelect from "./multi-select";
import styles from "./page.module.css";

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

interface NewsFiltersProps {
  categories: string[];
  selectedCategories: string[];
  selectedLanguages: string[];
}

export default function NewsFilters({
  categories,
  selectedCategories,
  selectedLanguages,
}: NewsFiltersProps) {
  const router = useRouter();
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

    const newUrl = params.toString() ? `/news?${params.toString()}` : "/news";
    router.push(newUrl);
  };

  const handleLanguageChange = (keys: Set<string>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.delete("language");

    keys.forEach((lang) => params.append("language", lang));

    const newUrl = params.toString() ? `/news?${params.toString()}` : "/news";
    router.push(newUrl);
  };

  const hasFilters = selectedCategories.length > 0 || selectedLanguages.length > 0;

  const handleClearAll = () => {
    router.push("/news");
  };

  return (
    <motion.div
      className={styles.newsFilters}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className={styles.filtersRow}>
        <MultiSelect
          label="Language"
          placeholder="All Languages"
          items={LANGUAGES}
          selectedKeys={new Set(selectedLanguages)}
          onSelectionChange={handleLanguageChange}
        />
        <MultiSelect
          label="Category"
          placeholder="All Categories"
          items={categoryItems}
          selectedKeys={new Set(selectedCategories)}
          onSelectionChange={handleCategoryChange}
        />
        {hasFilters && (
          <button
            className={styles.clearFiltersButton}
            onClick={handleClearAll}
          >
            Clear filters
          </button>
        )}
      </div>
    </motion.div>
  );
}

