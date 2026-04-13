import Button from "@/ui/shared/components/button/button";
import styles from "./LitepapersView.module.css";

export type LitepapersTranslations = {
  label: string;
  heading: string;
  description: string;
  readFullLitepaper: string;
  english: string;
  spanish: string;
  portuguese: string;
};

type LitepapersViewProps = {
  litepapersTranslations?: LitepapersTranslations;
};

const LANGUAGE_KEYS = ["english", "spanish", "portuguese"] as const;
const LANGUAGE_HREFS = ["#", "#", "#"];

export function LitepapersView({ litepapersTranslations }: LitepapersViewProps = {}) {
  if (!litepapersTranslations) {
    return null;
  }
  const t = litepapersTranslations;
  const languages = LANGUAGE_KEYS.map((key, i) => ({
    name: t[key],
    href: LANGUAGE_HREFS[i],
  }));
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.label}>{t.label}</p>
          <h1 className={styles.heading}>{t.heading}</h1>
          <p className={styles.description}>{t.description}</p>
          <div className={styles.linksSection}>
            <p className={styles.linksHeading}>{t.readFullLitepaper}</p>
            <div className={styles.languageLinks}>
              {languages.map((language) => (
                <Button
                  key={language.name}
                  variant="outline"
                  icon={
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                  iconPosition="end"
                  href={language.href}
                >
                  {language.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
