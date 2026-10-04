import { Reveal } from "@/components/reveal";

const STEPS = [
  { name: "Scope", copy: "We agree on exactly what to test, in writing.", get: "scoping call + written agreement" },
  { name: "Test", copy: "Manual and automated testing of the agreed scope.", get: "same-day alert for anything critical" },
  { name: "Report", copy: "Clear findings, ranked by risk, with fix guidance.", get: "executive summary + technical report" },
  { name: "Retest", copy: "We verify every fix before marking it closed.", get: "retest letter for customers and auditors" },
];

export function Process() {
  return (
    <section id="process" className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">How It Works</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">A clear path forward.</h2>
        </Reveal>
        <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <Reveal key={step.name} delay={index * 80} as="li">
              <div className="h-full border-t border-border pt-5">
                <span className="font-mono text-xs text-amber">0{index + 1}</span>
                <h3 className="mt-2 text-lg">{step.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.copy}</p>
                <p className="mt-4 font-mono text-xs text-foreground/85">
                  <span className="text-muted-foreground">You get:</span> {step.get}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
