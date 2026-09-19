import { ArrowRight, ShieldCheck } from "lucide-react";
import heroMountains from "@/assets/hero-mountains.jpg";
import { Button } from "@/components/ui/button";

const BADGES = ["Security-Focused", "Practical Approach", "Actionable Results"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-22">
      <div className="mesh-bg animate-drift pointer-events-none absolute inset-0 -z-10" />
      <div className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <img
        src={heroMountains}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1080}
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 w-full opacity-50 mix-blend-screen dark:opacity-70"
      />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl py-6 sm:py-10">
          <p className="font-mono text-sm font-medium tracking-widest text-teal uppercase">CipherHill</p>
          <p className="mt-2 text-sm text-muted-foreground">Cybersecurity &amp; Technology Solutions</p>

          <h1 className="mt-7 text-4xl leading-[1.08] font-semibold sm:text-6xl">
            Secure Your Software.<br />
            <span className="text-gradient">From Code to Cloud.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            We help businesses build, test, and secure their software, applications, cloud environments, and security programs.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="bg-amber text-amber-foreground hover:bg-amber/90">
              <a href="#contact">Book a Security Assessment <ArrowRight /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-teal/40 text-teal hover:bg-teal/10 hover:text-teal">
              <a href="#services">View Services</a>
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted-foreground">
            {BADGES.map((b, i) => (
              <li key={b} className="flex items-center gap-3">
                {i > 0 && <span className="text-border">|</span>}
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-teal" />
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
