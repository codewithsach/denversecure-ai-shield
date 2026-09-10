import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { CloudMigration } from "@/components/site/cloud";
import { About } from "@/components/site/about";
import { Pricing } from "@/components/site/pricing";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

const TITLE = "AlpineRed Security — Penetration Testing & Application Security";
const DESCRIPTION =
  "AlpineRed Security delivers penetration testing, application security, and cloud migration security for Series A–C software teams, with clear, developer-friendly reporting.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "keywords",
        content:
          "penetration testing, application security, cloud security, red team, DevSecOps, security assessment",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "AlpineRed Security",
          description: DESCRIPTION,
          areaServed: "United States",
          address: {
            "@type": "PostalAddress",
            streetAddress: "2155 E. Wesley Ave.",
            addressLocality: "Denver",
            addressRegion: "CO",
            postalCode: "80210",
            addressCountry: "US",
          },
          email: "hello@alpineredsecurity.com",
          telephone: "+1-303-555-0142",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <CloudMigration />
        <About />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
