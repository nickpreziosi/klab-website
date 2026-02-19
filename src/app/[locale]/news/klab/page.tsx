import { NewsView } from "@/ui/news/views/NewsView/NewsView";

const ARTICLES_PER_PAGE = 6;

export default async function NewsKlabPage() {
  return (
    <NewsView
      articles={[]}
      allCategories={[]}
      selectedCategories={[]}
      articlesPerPage={ARTICLES_PER_PAGE}
      showNewsCards={false}
      heroTitle="KLab News"
      heroSubtitle=""
      breadcrumbCurrent="KLab News"
      emptyStateMessage="No news available. Check back again soon."
    />
  );
}
