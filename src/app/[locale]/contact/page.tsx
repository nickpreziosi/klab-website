import { getTranslations } from "next-intl/server";
import { ContactView } from "@/ui/contact/views/ContactView/ContactView";

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const contactTranslations = {
    heading: t("heading"),
    subtitle: t("subtitle"),
    salesTitle: t("salesTitle"),
    salesDescription: t("salesDescription"),
    salesButton: t("salesButton"),
    supportTitle: t("supportTitle"),
    supportDescription: t("supportDescription"),
    supportButton: t("supportButton"),
    careersTitle: t("careersTitle"),
    careersDescription: t("careersDescription"),
    careersButton: t("careersButton"),
  };
  return <ContactView contactTranslations={contactTranslations} />;
}
