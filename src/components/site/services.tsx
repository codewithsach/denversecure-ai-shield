import { ArrowRight, Cloud, Code2, Crosshair, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";

const SERVICES = [
  {
    icon: Crosshair,
    title: "Software Testing & Security",
    body: "Functional and security testing for software and applications before they reach your users. Whether your software is built traditionally or with AI-assisted development tools, we test it for functionality, security, and real-world weaknesses.",
  },
  {
    icon: Code2,
    title: "Application Security",
    body: "Identify and reduce risk across web applications, APIs, authentication, access control, and the software development lifecycle.",
  },
  {
    icon: Cloud,
    title: "Cloud Security & Migration",
    body: "Secure cloud environments and move applications and infrastructure to AWS, Azure, or GCP with security built in.",
  },
  {
    icon: ShieldCheck,
    title: "Risk & Compliance",
    body: "Understand security risks, identify gaps, and build practical security controls and compliance readiness.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-teal uppercase">What We Do</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Four security practices. One partner.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} as="article">
              <div className="glass group h-full rounded-lg p-7 transition-transform hover:-translate-y-1">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal/12 text-teal ring-1 ring-teal/25">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-teal"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
