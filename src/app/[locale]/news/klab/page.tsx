import { getTranslations } from "next-intl/server";
import { NewsView } from "@/ui/news/views/NewsView/NewsView";

const ARTICLES_PER_PAGE = 6;

export default async function NewsKlabPage() {
  const t = await getTranslations("newsPage");
  return (
    <NewsView
      articles={[]}
      allCategories={[]}
      selectedCategories={[]}
      articlesPerPage={ARTICLES_PER_PAGE}
      showNewsCards={false}
      heroTitle={t("heroTitleKlab")}
      heroSubtitle=""
      breadcrumbCurrent={t("breadcrumbKlab")}
      emptyStateMessage={t("emptyStateKlab")}
    />
  );
}
