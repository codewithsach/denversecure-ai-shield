import { Reveal } from "@/components/reveal";
import denverOffice from "@/assets/denver-office.jpg";

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <div className="glass overflow-hidden rounded-3xl p-3">
            <img
              src={denverOffice}
              alt="AlpineRed Security workspace overlooking the Front Range"
              loading="lazy"
              width={1280}
              height={960}
              className="w-full rounded-2xl object-cover"
            />
            <p className="px-3 py-3 font-mono text-xs text-muted-foreground">
              Team photo placeholder — Denver
            </p>
          </div>
        </Reveal>
        <Reveal delay={110}>
          <p className="font-mono text-xs tracking-widest text-teal uppercase">Denver roots</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Built by engineers who got tired of unreadable pentest PDFs.
          </h2>
          <p className="mt-5 text-muted-foreground">
            AlpineRed Security is a small, senior team of offensive security engineers and former platform
            developers. We've shipped production code, carried pagers, and broken enough systems to
            know which findings actually matter to a roadmap.
          </p>
          <p className="mt-4 text-muted-foreground">
            We work from Denver, Colorado, in the same time zone as most of our clients' standups —
            close enough to sit in your office for a remediation day, remote-native enough to run
            the whole engagement on Slack.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {[
              ["12+ yrs", "Average engineer tenure"],
              ["OSCP · CISSP", "Team certifications"],
              ["Mountain Time", "Real-time collaboration"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-sm text-amber">{k}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
