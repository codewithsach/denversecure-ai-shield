import { ArrowRight, Bot, Cloud, Code2, Crosshair, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";

const SERVICES = [
  {
    icon: Crosshair,
    title: "Software Testing & Security",
    cta: "Explore software testing & security",
    body: "Functional and security testing for software and applications before they reach your users — whether built traditionally or with AI-assisted development tools.",
    gets: ["Functional + security test report", "AI-generated code review"],
  },
  {
    icon: Code2,
    title: "Application Security",
    cta: "Explore application security",
    body: "Identify and reduce risk across web applications, APIs, authentication, access control, and the software development lifecycle.",
    gets: ["Web app + API pentest", "Access control testing", "Fix guidance"],
  },
  {
    icon: Cloud,
    title: "Cloud Security & Migration",
    cta: "Explore cloud security & migration",
    body: "Secure cloud environments and move applications and infrastructure to AWS, Azure, or GCP with security built in.",
    gets: ["AWS / Azure / GCP config review", "Secure migration plan"],
  },
  {
    icon: ShieldCheck,
    title: "Risk & Compliance",
    cta: "Explore risk & compliance",
    body: "Understand security risks, identify gaps, and build practical security controls and compliance readiness.",
    gets: ["Gap assessment", "SOC 2 / ISO 27001 readiness"],
  },
  {
    icon: Bot,
    title: "AI Security & Automation",
    cta: "Explore AI security & automation",
    body: "Identify security risks in AI-enabled applications and automate repeatable security testing and processes.",
    gets: ["Prompt injection + data leakage testing", "Automated security checks in CI"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">What We Do</p>
          <h2 className="mt-3 max-w-2xl text-3xl tracking-tight sm:text-4xl">Five security practices. One partner.</h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 80} as="article">
              <div className="glass group flex h-full flex-col rounded-lg p-7 transition-colors hover:border-amber">
                <s.icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                <h3 className="mt-4 text-xl tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <ul className="mt-5 grid gap-1.5 border-t border-border pt-4 font-mono text-xs text-foreground/85">
                  <li className="text-muted-foreground">You get:</li>
                  {s.gets.map((g) => (
                    <li key={g} className="flex gap-2"><span className="text-success">+</span>{g}</li>
                  ))}
                </ul>
                <a href="#contact" className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-teal">
                  {s.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
