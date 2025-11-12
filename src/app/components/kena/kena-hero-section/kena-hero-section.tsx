"use client";

import SectionHeader from "@/app/components/ui/section-header/section-header";
import KenaTwoColumnContent from "../kena-two-column-content/kena-two-column-content";
import styles from "./kena-hero-section.module.css";
import VideoPlayer from "@/app/components/ui/video-player/video-player";

export default function KenaHeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Top section with centered header */}
        <div className={styles.headerWrapper}>
          <SectionHeader
            maxWidth={900}
            heading="AI that Understands Risk the Way"
            secondHeading="Humans Do — Only Smarter."
            subtitle="Kena is the world's first risk AI that replicates the decision-making of financial underwriters — analyzing, conversing, and improving in real time."
            align="center"
            animateOnce={true}
          />
        </div>

        {/* Video section */}
        <VideoPlayer posterUrl="/kena.jpg" videoUrl="/kena.mp4"></VideoPlayer>

        {/* Two-column content section */}
        <div className={styles.contentWrapper}>
          <KenaTwoColumnContent
            leftContent="Kena is the world's first financial intelligence AI agent."
            rightContent="A finance expert that understands, analyzes, and predicts financial risk in real time with human-level reasoning and machine precision. From credit assessment and financial modeling to predictive analytics and pattern detection, Kena continuously evolves through millions of SME data points — driving intelligent and fast, data-driven decision-making."
          />
        </div>
      </div>
    </section>
  );
}
