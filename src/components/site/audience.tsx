import { Building2, Cloud, Code2, Rocket } from "lucide-react";
import { Reveal } from "@/components/reveal";

const AUDIENCES = [
  { icon: Rocket, label: "Startups", copy: "A customer asked for a pentest report? We'll get you one you can actually share." },
  { icon: Building2, label: "Growing Businesses", copy: "Security work sized to your team, not a Fortune 500 budget." },
  { icon: Code2, label: "Software Teams", copy: "Testing that fits your release cycle, with findings developers can act on." },
  { icon: Cloud, label: "Organizations Moving to the Cloud", copy: "Move to AWS, Azure, or GCP without carrying old risks with you." },
];

export function Audience() {
  return (
    <section id="who-we-help" className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Who We Help</p>
          <h2 className="mt-3 max-w-3xl text-3xl sm:text-4xl">Security support that grows with you.</h2>
          <p className="mt-5 max-w-3xl text-muted-foreground">
            From early-stage products to growing technology environments, CipherHill helps teams identify and reduce security risk as they build and scale.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((a, index) => (
            <Reveal key={a.label} delay={index * 70}>
              <div className="flex h-full flex-col bg-background p-6">
                <a.icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                <h3 className="mt-6 text-lg">{a.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
