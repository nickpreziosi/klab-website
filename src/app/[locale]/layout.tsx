import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ScrollToTopOnRouteChange } from "@/ui/shared/components/scroll-to-top-on-route-change/scroll-to-top-on-route-change";
import { ConditionalShell } from "@/ui/shared/containers/conditional-shell/conditional-shell";
import { buildNavTranslations, buildDrawerTranslations } from "@/ui/shared/types/translations";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const [messages, currentLocale, tNav, tDrawer] = await Promise.all([
    getMessages(),
    getLocale(),
    getTranslations("nav"),
    getTranslations("drawer"),
  ]);

  const navTranslations = buildNavTranslations(tNav);
  const drawerTranslations = buildDrawerTranslations(tDrawer);

  return (
    <NextIntlClientProvider locale={currentLocale} messages={messages}>
      <ScrollToTopOnRouteChange />
      <ConditionalShell
        navTranslations={navTranslations}
        drawerTranslations={drawerTranslations}
      >
        {children}
      </ConditionalShell>
    </NextIntlClientProvider>
  );
}
