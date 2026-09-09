import { Cloud, Code2, Crosshair, FileText, Search, Wrench, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

const SERVICES = [
  {
    icon: Crosshair,
    title: "Security Testing",
    body: "Penetration testing, vulnerability assessments, and full red team exercises against your production reality — not a sanitized staging clone. Every finding arrives with a reproduction path and a fix your team can merge.",
  },
  {
    icon: Code2,
    title: "Application Security",
    body: "Secure code review, DevSecOps pipeline design, SAST/DAST tuning, and API security testing built into how you already ship. We cut false positives so your engineers trust the gate instead of routing around it.",
  },
  {
    icon: Cloud,
    title: "Cloud Migration & Security",
    body: "Secure lift-and-shift or cloud-native migration to AWS, Azure, or GCP. Includes posture hardening, IAM review, and ongoing monitoring so your cloud isn't your weakest link.",
  },
];

const STEPS = [
  { icon: Search, name: "Discover", copy: "Scope, threat model, asset mapping." },
  { icon: Crosshair, name: "Test", copy: "Manual + automated adversarial testing." },
  { icon: FileText, name: "Report", copy: "Ranked findings with proof and impact." },
  { icon: Wrench, name: "Remediate", copy: "Pairing with your devs, then retest." },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-teal uppercase">What we do</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Three practices. One security partner.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} as="article">
              <div className="glass group h-full rounded-2xl p-7 transition-transform hover:-translate-y-1">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal/12 text-teal ring-1 ring-teal/25">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-teal"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <h3 className="text-2xl font-semibold tracking-tight">How DenverSecure works</h3>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.name} className="relative rounded-xl border border-border p-5">
                <span className="font-mono text-xs text-amber">0{i + 1}</span>
                <span className="mt-3 flex items-center gap-2 text-base font-semibold">
                  <step.icon className="h-4 w-4 text-teal" />
                  {step.name}
                </span>
                <p className="mt-2 text-sm text-muted-foreground">{step.copy}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
