import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Survey-map style contour lines, generated once.
const CONTOURS = Array.from({ length: 14 }, (_, i) => {
  const r = 60 + i * 55;
  const cx = 1200;
  const cy = 260;
  const pts = Array.from({ length: 49 }, (_, k) => {
    const a = (k / 48) * Math.PI * 2;
    const wobble = 1 + 0.08 * Math.sin(a * 3 + i * 0.7) + 0.05 * Math.cos(a * 5 + i);
    return `${(cx + Math.cos(a) * r * 1.35 * wobble).toFixed(1)},${(cy + Math.sin(a) * r * wobble).toFixed(1)}`;
  });
  return `M${pts.join(" L")}Z`;
});

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        style={{ opacity: "var(--contour-opacity)" }}
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill="none" stroke="var(--contour)" strokeWidth="1.2">
          {CONTOURS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </svg>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl py-5 sm:py-8">
          <p className="font-mono text-xs tracking-wide text-muted-foreground">
            Security testing · Cloud · Compliance · AI
          </p>

          <h1 className="mt-5 text-4xl leading-[1.1] sm:text-6xl">
            Secure Your Software.
            <br />
            From <span className="text-amber">Code to Cloud</span>.
          </h1>

          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            We help businesses build, test, and secure their software, applications, cloud environments, and security programs.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="bg-amber text-amber-foreground hover:bg-amber/90">
              <a href="#contact">Book a security assessment <ArrowRight /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border bg-transparent hover:border-amber hover:bg-transparent">
              <a href="#services">View services</a>
            </Button>
          </div>

          <p className="mt-10 font-mono text-xs text-muted-foreground">
            Manual + automated testing · OWASP-based methodology · Retest included
          </p>
        </div>
      </div>
    </section>
  );
}
