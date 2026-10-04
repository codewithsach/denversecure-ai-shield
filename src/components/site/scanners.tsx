import { Reveal } from "@/components/reveal";

const TOOLS = ["Known vulnerable packages", "Leaked secrets", "Common misconfigurations", "Missing security headers"];
const PEOPLE = [
  "Broken access control (can user A see user B's data?)",
  "Business logic abuse",
  "Account takeover paths",
  "Flaws in AI-generated code",
];

export function Scanners() {
  return (
    <section id="scanners" className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <h2 className="text-3xl tracking-tight sm:text-4xl">What scanners catch vs. what we catch</h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="glass mt-8 grid rounded-lg md:grid-cols-2">
            <Column title="Automated tools" items={TOOLS} />
            <div className="border-t border-border md:border-t-0 md:border-l">
              <Column title="CipherHill testers" items={PEOPLE} accent />
            </div>
          </div>
          <p className="mt-6 text-muted-foreground">
            We run both. Scanners find the obvious. <span className="text-foreground">People find what attackers actually use.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Column({ title, items, accent }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <div className="p-7">
      <h3 className={`font-mono text-xs tracking-widest uppercase ${accent ? "text-teal" : "text-muted-foreground"}`}>{title}</h3>
      <ul className="mt-4 grid gap-2.5 text-sm">
        {items.map((i) => (
          <li key={i} className="flex gap-2.5">
            <span className={accent ? "text-teal" : "text-muted-foreground"}>—</span>
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
