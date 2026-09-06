import { Reveal } from "@/components/reveal";

const STATS = [
  {
    value: "94%",
    label: "of vulnerabilities remediated within 30 days",
    note: "Series B fintech · 6-month retainer",
  },
  {
    value: "$2.3M",
    label: "saved in potential breach costs",
    note: "Healthcare SaaS · pre-audit assessment",
  },
  {
    value: "50+",
    label: "engagements with zero critical findings missed",
    note: "Verified against client re-tests",
  },
];

export function Results() {
  return (
    <section id="results" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-teal uppercase">Results</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Outcomes our clients can take to the board.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.value} delay={i * 90}>
              <div className="glass h-full rounded-2xl p-8">
                <p className="font-mono text-5xl font-semibold tracking-tight text-teal">
                  {s.value}
                </p>
                <p className="mt-4 text-base font-medium">{s.label}</p>
                <p className="mt-3 text-xs text-muted-foreground">{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
