import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";

const TIERS = [
  {
    name: "Point-in-Time Assessment",
    price: "Fixed fee",
    cadence: "per engagement",
    copy: "A scoped penetration test or code review with a hard start and end date.",
    features: [
      "Scoped pentest or secure code review",
      "Ranked findings with reproduction steps",
      "Executive summary + engineer debrief",
      "One free retest within 60 days",
    ],
    featured: false,
  },
  {
    name: "AlpineRed Security Retainer",
    price: "Monthly",
    cadence: "ongoing partnership",
    copy: "Continuous coverage for teams shipping every week, not every quarter.",
    features: [
      "Rolling testing across releases",
      "DevSecOps pipeline tuning",
      "Slack channel with your engineers",
      "Quarterly board-ready reporting",
    ],
    featured: true,
  },
  {
    name: "Cloud Migration Security",
    price: "Quarterly",
    cadence: "cloud-focused",
    copy: "For teams moving infrastructure to AWS, Azure, or GCP without leaving security behind.",
    features: [
      "Cloud architecture and IAM review",
      "Secure migration planning",
      "Encryption and network hardening",
      "Ongoing monitoring and threat detection",
    ],
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-teal uppercase">Engagement models</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Pick the cadence that matches how you ship.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <div
                className={`glass flex h-full flex-col rounded-2xl p-8 ${
                  t.featured ? "ring-1 ring-teal/40" : ""
                }`}
              >
                {t.featured && (
                  <span className="mb-4 inline-flex w-fit rounded-full bg-amber/15 px-3 py-1 font-mono text-[11px] text-amber">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold tracking-tight">{t.name}</h3>
                <p className="mt-4 font-mono text-3xl text-teal">{t.price}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.cadence}</p>
                <p className="mt-4 text-sm text-muted-foreground">{t.copy}</p>
                <ul className="mt-6 grid flex-1 content-start gap-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-8 inline-flex justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                    t.featured
                      ? "bg-amber text-amber-foreground"
                      : "border border-teal/40 text-teal hover:bg-teal/10"
                  }`}
                >
                  Talk to us
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
