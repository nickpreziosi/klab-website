"use client";

import SectionHeader from "../sectionHeader/section-header";
import KenaTwoColumnContent from "../kenaTwoColumnContent/kena-two-column-content";
import styles from "./kena-hero-section.module.css";
import VideoPlayer from "../VideoPlayer/video-player";

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
        <VideoPlayer
          posterUrl="/kena-video.jpg"
          videoUrl="https://player.vimeo.com/video/1119375393?badge=0&amp;autoplay=1&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        ></VideoPlayer>

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
