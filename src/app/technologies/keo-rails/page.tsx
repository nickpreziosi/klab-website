import KeoRailsHero from "../../components/keoRailsHero/keo-rails-hero";

export default function KeoRailsPage() {
  return (
    <main>
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
    </main>
  );
}
