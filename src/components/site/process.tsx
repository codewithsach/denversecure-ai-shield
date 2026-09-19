import { FileText, Search, Wrench } from "lucide-react";
import { Reveal } from "@/components/reveal";

const STEPS = [
  { icon: Search, name: "Understand", copy: "We learn about your software, environment, and security concerns." },
  { icon: FileText, name: "Assess", copy: "We test, review, and identify security risks." },
  { icon: Wrench, name: "Improve", copy: "We provide clear findings and practical recommendations." },
];

export function Process() {
  return (
    <section id="process" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-teal uppercase">How It Works</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">A clear path forward.</h2>
        </Reveal>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <Reveal key={step.name} delay={index * 80} as="li">
              <div className="border-t border-border pt-5">
                <span className="font-mono text-xs text-amber">0{index + 1} —</span>
                <span className="mt-3 flex items-center gap-2 text-base font-semibold">
                  <step.icon className="h-4 w-4 text-teal" /> {step.name}
                </span>
                <p className="mt-2 text-sm text-muted-foreground">{step.copy}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}