import Button from "@/app/components/ui/button/button";
import styles from "./page.module.css";
import Link from "next/link";

export default function LitepaperPage() {
  const languages = [
    {
      name: "English",
      href: "/litepapers/keo-litepaper-en.pdf",
    },
    {
      name: "Spanish",
      href: "/litepapers/keo-litepaper-es.pdf",
    },
    {
      name: "Portuguese",
      href: "/litepapers/keo-litepaper-pt.pdf",
    },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.label}>KLab LITEPAPER</p>

          <h1 className={styles.heading}>
            Explore how KLab reimagines blockchain payments with stability and
            predictability at its core
          </h1>

          <p className={styles.description}>
            KLab is a purpose-built, EVM-compatible Layer-1 blockchain advancing
            the frontier of stablecoin finance and tokenization. It features
            USDC as native gas, deterministic settlement finality, opt-in
            privacy, and a stable transaction fee architecture. Optimized for
            stablecoin-native use cases, such as global payments, FX, and
            capital markets, KLab serves as a foundational settlement layer for
            programmable money on the internet.
          </p>

          <div className={styles.linksSection}>
            <p className={styles.linksHeading}>READ THE FULL LITEPAPER</p>

            <div className={styles.languageLinks}>
              {languages.map((language) => (
                <>
                  <Button
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
                        ></path>
                      </svg>
                    }
                    iconPosition="end"
                    key={language.name}
                    text={language.name}
                    href={language.href}
                  />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
