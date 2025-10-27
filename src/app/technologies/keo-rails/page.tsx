import KeoRailsHero from "../../components/keoRailsHero/keo-rails-hero";
import styles from "./page.module.css";
import VideoPlayer from "@/app/components/VideoPlayer/video-player";

export default function KeoRailsPage() {
  return (
    <main className={styles.container}>
      <KeoRailsHero
        heading="Liquidity Without Resistance."
        subheading="T+0. Frictionless capital. Done."
        description="The instant settlement engine built to dissolve latency and risk in B2B finance. It is liquidity without resistance."
        buttonText="Start my T+0 flow"
        buttonHref="/contact/sales"
      >
        {/* You can insert custom HTML, iframe, or other content here */}
        {/* For now, it will use the placeholder content */}
      </KeoRailsHero>
      <VideoPlayer
        posterUrl="/kena-video.jpg"
        videoUrl="https://player.vimeo.com/video/1119375393?badge=0&amp;autoplay=1&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
      ></VideoPlayer>{" "}
    </main>
  );
}
