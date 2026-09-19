import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { CloudMigration } from "@/components/site/cloud";
import { About } from "@/components/site/about";
import { Pricing } from "@/components/site/pricing";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { Audience } from "@/components/site/audience";
import { Process } from "@/components/site/process";
import { Legal } from "@/components/site/legal";

const TITLE = "CipherHill | Cybersecurity & Technology Solutions";
const DESCRIPTION =
  "CipherHill provides software testing, application security, cloud security, risk and compliance, and security automation services for modern businesses.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cipherhill.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "keywords",
        content:
          "software testing, application security, cloud security, risk and compliance, security automation",
      },
    ],
    links: [{ rel: "canonical", href: "https://cipherhill.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "CipherHill",
          url: "https://cipherhill.com/",
          description: DESCRIPTION,
          email: "hello@cipherhill.com",
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
         <Audience />
         <Process />
        <About />
        <Pricing />
        <Contact />
         <Legal />
      </main>
      <Footer />
    </div>
  );
}
