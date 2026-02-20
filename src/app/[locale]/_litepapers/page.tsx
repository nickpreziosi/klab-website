import { getTranslations } from "next-intl/server";
import { LitepapersView } from "@/ui/litepapers/views/LitepapersView/LitepapersView";

export default async function LitepaperPage() {
  const t = await getTranslations("litepapers");
  const litepapersTranslations = {
    label: t("label"),
    heading: t("heading"),
    description: t("description"),
    readFullLitepaper: t("readFullLitepaper"),
    english: t("english"),
    spanish: t("spanish"),
    portuguese: t("portuguese"),
  };
  return <LitepapersView litepapersTranslations={litepapersTranslations} />;
}
