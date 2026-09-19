import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section id="about" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="grid gap-8 border-y border-border py-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="font-mono text-xs tracking-widest text-teal uppercase">Who We Are</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">About CipherHill</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>CipherHill is a cybersecurity and technology services company helping businesses build, test, and secure modern software and cloud environments.</p>
              <p>Our approach combines software testing, application security, cloud security, risk management, and security automation to help teams reduce security risk without unnecessary complexity.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
