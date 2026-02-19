"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./krails-code-animation.module.css";

interface CodeLine {
  content: string;
  indent: number;
  type?: "keyword" | "string" | "function" | "variable" | "comment" | "number";
}

interface CodeSection {
  title: string;
  lines: CodeLine[];
}

interface KRailsCodeAnimationProps {
  sections: CodeSection[];
  typingSpeed?: number;
  lineDelay?: number;
  loop?: boolean;
}

export function KRailsCodeAnimation({
  sections,
  typingSpeed = 30,
  lineDelay = 200,
  loop = true,
}: KRailsCodeAnimationProps) {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typedChars, setTypedChars] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const codeBlockRef = useRef<HTMLDivElement | null>(null);
  const codeContentRef = useRef<HTMLDivElement | null>(null);
  const hasMountedRef = useRef<boolean>(false);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  const userScrolledRef = useRef<boolean>(false);
  const [shouldStartTyping, setShouldStartTyping] = useState<boolean>(false);

  useEffect(() => {
    const mark = () => {
      userScrolledRef.current = true;
      window.removeEventListener("scroll", mark);
      window.removeEventListener("wheel", mark);
      window.removeEventListener("touchstart", mark);
    };
    window.addEventListener("scroll", mark, { passive: true });
    window.addEventListener("wheel", mark, { passive: true });
    window.addEventListener("touchstart", mark, { passive: true });
    return () => {
      window.removeEventListener("scroll", mark);
      window.removeEventListener("wheel", mark);
      window.removeEventListener("touchstart", mark);
    };
  }, []);

  useEffect(() => {
    if (isInView && userScrolledRef.current) {
      setShouldStartTyping(true);
    }
  }, [isInView]);

  const totalLines = sections.reduce(
    (acc, section) => acc + section.lines.length + 1, // +1 for section header
    0
  );

  useEffect(() => {
    if (isInView && isComplete && loop) {
      const resetTimer = setTimeout(() => {
        setCurrentSection(0);
        setVisibleLines(0);
        setTypedChars(0);
        setIsComplete(false);
        if (codeBlockRef.current) {
          codeBlockRef.current.scrollTop = 0;
        }
      }, 2000);
      return () => clearTimeout(resetTimer);
    }
  }, [isInView, isComplete, loop]);

  useEffect(() => {
    if (!isInView || isComplete) return;

    const currentSectionData = sections[currentSection];
    if (!currentSectionData) return;

    const timer = setTimeout(
      () => {
        if (visibleLines < currentSectionData.lines.length) {
          const currentLine = currentSectionData.lines[visibleLines];
          if (typedChars < currentLine.content.length) {
            setTypedChars(typedChars + 1);
          } else {
            setVisibleLines(visibleLines + 1);
            setTypedChars(0);
          }
        } else {
          if (currentSection < sections.length - 1) {
            setTimeout(() => {
              setCurrentSection(currentSection + 1);
              setVisibleLines(0);
              setTypedChars(0);
            }, 500);
          } else {
            setIsComplete(true);
          }
        }
      },
      typedChars === 0 ? lineDelay : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [
    isInView,
    currentSection,
    visibleLines,
    typedChars,
    sections,
    typingSpeed,
    lineDelay,
    isComplete,
  ]);

  useEffect(() => {
    const codeBlock = codeBlockRef.current;
    if (!codeBlock) return;

    // The overlay captures all pointer events, preventing manual scroll of code block
    // while allowing page scroll to work normally

    return () => {
      // Cleanup if needed
    };
  }, []);

  const getColorClass = (type?: string) => {
    switch (type) {
      case "keyword":
        return styles.keyword;
      case "string":
        return styles.string;
      case "function":
        return styles.function;
      case "variable":
        return styles.variable;
      case "comment":
        return styles.comment;
      case "number":
        return styles.number;
      default:
        return styles.default;
    }
  };

  const getTotalLinesBeforeSection = (sectionIndex: number) => {
    return sections
      .slice(0, sectionIndex)
      .reduce((acc, section) => acc + section.lines.length + 1, 0); // +1 for section header
  };

  useEffect(() => {
    if (!shouldStartTyping) return;

    const totalBefore = sections
      .slice(0, currentSection)
      .reduce((acc, section) => acc + section.lines.length + 1, 0); // +1 for section header
    const globalIndex = totalBefore + visibleLines + 1; // +1 to skip the header line
    if (!codeContentRef.current) return;

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const el = codeContentRef.current.querySelector(`[data-line-index="line-${globalIndex}"]`);
    if (el && codeBlockRef.current) {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      (el as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });

      // Restore page scroll position immediately
      window.scrollTo(scrollX, scrollY);
    }
  }, [currentSection, visibleLines, sections, shouldStartTyping]);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.scrollOverlay} />
      <div ref={codeBlockRef} className={styles.codeBlock}>
        <div className={styles.lineNumbers}>
          {Array.from({ length: totalLines }, (_, index) => (
            <div key={index} className={styles.lineNumber}>
              {index + 1}
            </div>
          ))}
        </div>
        <div className={styles.codeContent} ref={codeContentRef}>
          {sections.map((section, sectionIndex) => {
            const shouldShowSection = sectionIndex <= currentSection;
            const startLineNumber = getTotalLinesBeforeSection(sectionIndex);

            return shouldShowSection ? (
              <div key={sectionIndex} className={styles.section}>
                <div className={styles.sectionHeader} data-line-index={`line-${startLineNumber}`}>
                  {section.title}
                </div>
                {section.lines.map((line, lineIndex) => {
                  const isCurrentLine =
                    sectionIndex === currentSection && lineIndex === visibleLines;
                  const isVisible =
                    sectionIndex < currentSection ||
                    (sectionIndex === currentSection &&
                      (lineIndex < visibleLines || isCurrentLine));
                  const displayContent = isCurrentLine
                    ? line.content.slice(0, typedChars)
                    : line.content;

                  return (
                    <motion.div
                      key={`${sectionIndex}-${lineIndex}`}
                      className={styles.codeLine}
                      data-line-index={`line-${startLineNumber + lineIndex + 1}`}
                      style={{ paddingLeft: `${line.indent * 20}px` }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: isVisible ? 1 : 0,
                        x: isVisible ? 0 : -10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className={getColorClass(line.type)}>{displayContent}</span>
                      {isCurrentLine && (
                        <motion.span
                          className={styles.cursor}
                          animate={{ opacity: [1, 0] }}
                          transition={{
                            duration: 0.5,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          |
                        </motion.span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}

export const exampleApiSections: CodeSection[] = [
  {
    title: "REQUEST",
    lines: [
      { content: "import requests", indent: 0, type: "variable" },
      { content: "", indent: 0 },
      {
        content: 'url = "https://staging.krails.com/api/health"',
        indent: 0,
        type: "keyword",
      },
      { content: "", indent: 0 },
      { content: "headers = {", indent: 0, type: "string" },
      { content: '"accept": "application/json"', indent: 1, type: "string" },
      { content: "}", indent: 0 },
      { content: "", indent: 0 },
      {
        content: "response = requests.get(url, headers=headers)",
        indent: 0,
        type: "keyword",
      },
      { content: "", indent: 0 },
      { content: "print(response.text())", indent: 0, type: "function" },
    ],
  },
  {
    title: "RESPONSE",
    lines: [
      { content: "{", indent: 0 },
      { content: '"status": "ok",', indent: 1, type: "string" },
      {
        content: '"onCommitHash": "af3be31b47c81b5e73f435ec139e49",',
        indent: 1,
        type: "string",
      },
      { content: '"name": "string",', indent: 1, type: "string" },
      { content: '"version": "v0.1.0",', indent: 1, type: "string" },
      { content: '"branch": "branch",', indent: 1, type: "string" },
      { content: '"details": {', indent: 1, type: "string" },
      { content: '"redis": {', indent: 2, type: "string" },
      { content: '"status": "up"', indent: 3, type: "string" },
      { content: "}", indent: 2 },
      { content: "}", indent: 1 },
      { content: "}", indent: 0 },
      { content: "", indent: 0 },
    ],
  },
];
