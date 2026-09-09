import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import cloudShield from "@/assets/cloud-shield.jpg";

const POINTS = [
  "Secure migration planning for AWS, Azure, and GCP",
  "Identity and access hardening before go-live",
  "Data encryption in transit and at rest",
  "Post-migration monitoring and threat detection",
];

export function CloudMigration() {
  return (
    <section id="cloud" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mesh-bg pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-amber uppercase">
            Our differentiator
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Move to the Cloud Without the Risk
          </h2>
          <p className="mt-5 text-muted-foreground">
            Most Denver businesses move to the cloud for speed and cost — but skip the security step. We migrate and harden in the same engagement: secure architecture review, identity lockdown, data encryption, and continuous monitoring.
          </p>
          <ul className="mt-8 grid gap-3">
            {POINTS.map((p) => (
              <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                {p}
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="mt-9 inline-flex rounded-xl bg-amber px-6 py-3.5 text-sm font-semibold text-amber-foreground transition-transform hover:-translate-y-0.5"
          >
            Plan Your Secure Migration
          </a>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass glow-teal rounded-3xl p-4">
            <img
              src={cloudShield}
              alt="Geometric cloud and shield security illustration"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full rounded-2xl"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
