import { ArrowRight, ShieldCheck, Terminal } from "lucide-react";
import heroMountains from "@/assets/hero-mountains.jpg";

const BADGES = ["SOC 2 Compliant", "OWASP Member", "Senior Engineers Only"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
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
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 font-mono text-xs text-teal">
            <ShieldCheck className="h-3.5 w-3.5" /> Penetration Testing · AppSec · Cloud Security
          </span>

          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
            <span className="text-gradient">AlpineRed Security</span>
            <br />
            Secure Your Software. From Code to Cloud.
          </h1>

          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Modern threats move faster than release cycles — supply-chain compromises, exposed
            APIs, and cloud misconfigurations that leak data before anyone notices. We test the way
            attackers actually work, then hand your engineers findings they can ship fixes against.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-amber px-6 py-3.5 text-sm font-semibold text-amber-foreground transition-transform hover:-translate-y-0.5"
            >
              Book a Security Assessment <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-xl border border-teal/40 px-6 py-3.5 text-sm font-semibold text-teal transition-colors hover:bg-teal/10"
            >
              View Services
            </a>
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

        <div className="glass mt-14 max-w-xl overflow-hidden rounded-2xl">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 font-mono text-xs text-muted-foreground">
            <Terminal className="h-3.5 w-3.5 text-teal" /> alpinered — engagement.sh
          </div>
<pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed text-muted-foreground">
            <code>{`$ alpinered scan --target api.yourcompany.com --profile series-b
[✓] recon complete            72 assets mapped
[!] 3 high  · 9 medium findings   (auth, IDOR, SSRF)
[✓] cloud posture review      IAM, encryption, monitoring ready
→ report + remediation pairing scheduled`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
