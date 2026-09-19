import { Building2, Cloud, Code2, Rocket } from "lucide-react";
import { Reveal } from "@/components/reveal";

const AUDIENCES = [
  { icon: Rocket, label: "Startups" },
  { icon: Building2, label: "Growing Businesses" },
  { icon: Code2, label: "Software Teams" },
  { icon: Cloud, label: "Organizations Moving to the Cloud" },
];

export function Audience() {
  return (
    <section id="who-we-help" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-teal uppercase">Who We Help</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold sm:text-4xl">Security support that grows with you.</h2>
          <p className="mt-5 max-w-3xl text-muted-foreground">
            From early-stage products to growing technology environments, CipherHill helps teams identify and reduce security risk as they build and scale.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((audience, index) => (
            <Reveal key={audience.label} delay={index * 70}>
              <div className="flex min-h-36 h-full flex-col justify-between bg-background p-6">
                <audience.icon className="h-5 w-5 text-teal" />
                <h3 className="mt-8 text-base font-semibold">{audience.label}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}