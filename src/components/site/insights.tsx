import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

const POSTS = [
  {
    tag: "MCP Security",
    date: "Aug 2026",
    title: "Prompt injection is an authorization bug",
    excerpt:
      "Why treating agent inputs as untrusted user input — and scoping tool permissions accordingly — beats bolting on a filter.",
  },
  {
    tag: "AppSec",
    date: "Jul 2026",
    title: "Cutting SAST noise by 80% without lowering the bar",
    excerpt:
      "A tuning process we use with Series B teams so security gates stop being the thing engineers route around.",
  },
  {
    tag: "Red Team",
    date: "Jun 2026",
    title: "What a 5-day red team actually finds",
    excerpt:
      "An anonymized walkthrough of one engagement: initial access, lateral movement, and the two controls that stopped us.",
  },
];

export function Insights() {
  return (
    <section id="insights" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-teal uppercase">Insights</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Notes from the engagements.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {POSTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} as="article">
              <a
                href="#insights"
                className="glass group flex h-full flex-col rounded-2xl p-7 transition-transform hover:-translate-y-1"
              >
                <span className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                  <span className="text-teal">{p.tag}</span> · {p.date}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-teal">
                  Read post
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
