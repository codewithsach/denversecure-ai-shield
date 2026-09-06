import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import mcpShield from "@/assets/mcp-shield.jpg";

const POINTS = [
  "Tool and permission audits across every MCP server your agents can reach",
  "Prompt injection testing — direct, indirect, and via poisoned tool output",
  "LLM vulnerability assessments: data exfiltration, over-scoped credentials, unsafe autonomy",
  "Guardrail and logging design so agent actions stay reviewable after we leave",
];

export function McpSection() {
  return (
    <section id="mcp" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mesh-bg pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-amber uppercase">
            Our differentiator
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            MCP Security by DenverSecure
          </h2>
          <p className="mt-5 text-muted-foreground">
            Model Context Protocol lets AI agents call your tools, read your data, and act on your
            systems. That's a new attack surface with old consequences: an agent that can be talked
            into running a query is a privileged user without a password policy.
          </p>
          <p className="mt-4 text-muted-foreground">
            We assess the whole chain — model, protocol, tool servers, and the humans who approve
            actions — and give your team concrete controls, not AI-risk theater.
          </p>
          <ul className="mt-8 grid gap-3">
            {POINTS.map((p) => (
              <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                {p}
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="mt-9 inline-flex rounded-xl bg-amber px-6 py-3.5 text-sm font-semibold text-amber-foreground transition-transform hover:-translate-y-0.5"
          >
            Scope an AI security review
          </a>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass glow-teal rounded-3xl p-4">
            <img
              src={mcpShield}
              alt="AI agent node protected by a shield, connected to surrounding tool integrations"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full rounded-2xl"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
