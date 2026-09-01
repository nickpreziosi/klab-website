/**
 * Serializable nav and drawer translations for SSR.
 * Passed from layout (getTranslations) to Navbar and Drawer.
 */

export type NavTranslations = {
  whatWeDo: string;
  kRails: string;
  whoWeServe: string;
  company: string;
  resources: string;
  news: string;
  contact: string;
  signIn: string;
  comingSoon: string;
  goToHomepage: string;
  kRailsMenuLabel: string;
  mainNav: string;
};

export type DrawerTranslations = {
  openMenu: string;
  closeMenu: string;
  dialogTitle: string;
  dialogDescription: string;
  home: string;
};

export function buildNavTranslations(t: (key: string) => string): NavTranslations {
  return {
    whatWeDo: t("whatWeDo"),
    kRails: t("kRails"),
    whoWeServe: t("whoWeServe"),
    company: t("company"),
    resources: t("resources"),
    news: t("news"),
    contact: t("contact"),
    signIn: t("signIn"),
    comingSoon: t("comingSoon"),
    goToHomepage: t("goToHomepage"),
    kRailsMenuLabel: t("kRailsMenuLabel"),
    mainNav: t("mainNav"),
  };
}

export function buildDrawerTranslations(t: (key: string) => string): DrawerTranslations {
  return {
    openMenu: t("openMenu"),
    closeMenu: t("closeMenu"),
    dialogTitle: t("dialogTitle"),
    dialogDescription: t("dialogDescription"),
    home: t("home"),
  };
}
