/**
 * Serializable nav and drawer translations for SSR.
 * Passed from layout (getTranslations) to Navbar and Drawer.
 */

export type NavTranslations = {
  about: string;
  technologies: string;
  company: string;
  news: string;
  contact: string;
  goToHomepage: string;
  technologiesMenuLabel: string;
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
    about: t("about"),
    technologies: t("technologies"),
    company: t("company"),
    news: t("news"),
    contact: t("contact"),
    goToHomepage: t("goToHomepage"),
    technologiesMenuLabel: t("technologiesMenuLabel"),
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
