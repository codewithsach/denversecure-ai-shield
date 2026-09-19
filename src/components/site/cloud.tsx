import { ArrowRight, Bot } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export function CloudMigration() {
  return (
    <section id="ai-security" className="relative overflow-hidden py-8 sm:py-12">
      <div className="mesh-bg pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="glass grid gap-8 rounded-lg p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:p-10">
            <span className="grid h-14 w-14 place-items-center rounded-lg bg-teal/15 text-teal ring-1 ring-teal/30">
              <Bot className="h-7 w-7" />
            </span>
            <div>
              <p className="font-mono text-xs tracking-widest text-amber uppercase">Focused capability</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">AI Security &amp; Automation</h2>
              <p className="mt-4 max-w-3xl text-muted-foreground">
                AI is changing how software is built and operated. We help teams identify security risks in AI-enabled applications and automate repeatable security testing and security processes.
              </p>
            </div>
            <Button asChild variant="outline" className="border-teal/40 text-teal hover:bg-teal/10 hover:text-teal">
              <a href="#contact">Explore AI Security <ArrowRight /></a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
