"use client";

import SectionHeader from "../sectionHeader/section-header";
import KenaVideoPlayer from "../kenaVideoPlayer/kena-video-player";
import KenaTwoColumnContent from "../kenaTwoColumnContent/kena-two-column-content";
import styles from "./kena-hero-section.module.css";

export default function KenaHeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.overlay} aria-hidden></div>

      <div className={styles.container}>
        {/* Top section with centered header */}
        <div className={styles.headerWrapper}>
          <SectionHeader
            heading="AI that Understands Risk the Way"
            secondHeading="Humans Do — Only Smarter."
            subtitle="KENA is the world's first Risk AI that replicates the decision-making of financial underwriters — analyzing, conversing, and improving in real time."
            align="center"
            animateOnce={true}
          />
        </div>

        {/* Video section */}
        <div className={styles.videoWrapper}>
          <KenaVideoPlayer posterUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KEO_Website-bsYtoQVsObtcLyJB4JxBfFgDcL6BKm.png" />
        </div>

        {/* Two-column content section */}
        <div className={styles.contentWrapper}>
          <KenaTwoColumnContent
            leftContent="KENA is the world's first AI underwriter."
            rightContent="A humanoid Risk Intelligence Engine designed to replicate how financial institutions think, assess, and decide. She communicates naturally with her users, receives data and documents via chat, and continuously self-trains on millions of SME data points worldwide."
          />
        </div>
      </div>
    </section>
  );
}
