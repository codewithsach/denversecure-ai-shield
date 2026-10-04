import { User } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section id="about" className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="grid gap-8 border-y border-border py-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Who We Are</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">About CipherHill</h2>
              <div className="mt-5 space-y-4 text-muted-foreground">
                <p>CipherHill is a cybersecurity and technology services company helping businesses build, test, and secure modern software and cloud environments.</p>
                <p>Our approach combines software testing, application security, cloud security, risk management, and security automation to help teams reduce security risk without unnecessary complexity.</p>
              </div>
            </div>

            {/* Founder block — all bracketed values are placeholders to replace */}
            <div className="glass flex gap-5 rounded-lg p-6">
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-md border border-dashed border-border bg-background grayscale" aria-label="Founder photo placeholder">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg">[Founder name]</h3>
                <p className="text-sm text-muted-foreground">[Role]</p>
                <ul className="mt-3 grid gap-1 font-mono text-xs text-muted-foreground">
                  <li>[Years of experience]</li>
                  <li>[Certifications]</li>
                </ul>
                <p className="mt-3 text-sm italic text-foreground/85">"[Why I started CipherHill]"</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
