import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="glass grid gap-8 rounded-lg p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
            <div>
              <p className="font-mono text-xs tracking-widest text-teal uppercase">Pricing</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Every engagement is different.</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">Pricing depends on the scope, technology, and security requirements of the project.</p>
            </div>
            <Button asChild size="lg" className="bg-amber text-amber-foreground hover:bg-amber/90">
              <a href="#contact">Request a Quote <ArrowRight /></a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
