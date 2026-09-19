import { ArrowRight, Cloud, Code2, Crosshair, FileText, Search, ShieldCheck, Wrench } from "lucide-react";
import { Reveal } from "@/components/reveal";

const SERVICES = [
  {
    icon: Crosshair,
    title: "Software Testing & Security",
    body: "Whether built traditionally or with AI-assisted development tools, we test software for functionality, security, and real-world weaknesses.",
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

const STEPS = [
  { icon: Search, name: "Understand", copy: "We learn about your software, environment, and security concerns." },
  { icon: FileText, name: "Assess", copy: "We test, review, and identify security risks." },
  { icon: Wrench, name: "Improve", copy: "We provide clear findings and practical recommendations." },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-teal uppercase">What We Do</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Four security practices. One partner.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
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
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24" as="section">
          <p className="font-mono text-xs tracking-widest text-teal uppercase">How It Works</p>
          <h3 className="mt-3 text-3xl font-semibold sm:text-4xl">A clear path forward.</h3>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.name} className="relative border-t border-border pt-5">
                <span className="font-mono text-xs text-amber">0{i + 1} —</span>
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
