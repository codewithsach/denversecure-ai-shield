import { Reveal } from "@/components/reveal";

export function Legal() {
  return (
    <section className="border-t border-border py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-2 lg:px-8">
        <Reveal as="article">
          <div id="privacy" className="scroll-mt-28">
            <p className="font-mono text-xs tracking-widest text-teal uppercase">Legal</p>
            <h2 className="mt-3 text-2xl font-semibold">Privacy Policy</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Information submitted through this website is used only to respond to inquiries and provide requested services. CipherHill does not sell personal information.
            </p>
          </div>
        </Reveal>
        <Reveal as="article" delay={80}>
          <div id="terms" className="scroll-mt-28">
            <p className="font-mono text-xs tracking-widest text-teal uppercase">Legal</p>
            <h2 className="mt-3 text-2xl font-semibold">Terms of Service</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Website content is provided for general information. Engagement scope, deliverables, timelines, and terms are defined in a written agreement with CipherHill.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}