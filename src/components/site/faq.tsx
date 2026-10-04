import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";

const FAQS = [
  ["Will testing break our production system?", "We agree on rules first. Most testing runs against staging, and anything risky is scheduled with you."],
  ["What's the difference between a pentest and a vulnerability scan?", "A scan is automated and finds known issues. A pentest adds a person trying to break your app the way an attacker would."],
  ["Do you sign NDAs?", "Yes, before we see anything."],
  ["What do you need from us to start?", "A scoping call, a test account or staging environment, and written permission for the agreed scope."],
  ["Can you help with SOC 2 or ISO 27001?", "Yes. We assess gaps, help build controls, and provide the pentest evidence auditors ask for."],
  ["Do you test AI features?", "Yes: prompt injection, data leakage through AI features, and review of AI-generated code."],
  ["What if you find something critical?", "You hear about it the same day, in plain language."],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">FAQ</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Common questions</h2>
        </Reveal>
        <div className="mt-8 border-t border-border">
          {FAQS.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} className="border-b border-border">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium hover:text-amber"
                >
                  {q}
                  <Plus className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-45 text-amber" : "text-muted-foreground"}`} />
                </button>
                {isOpen && (
                  <p id={`faq-${i}`} className="pb-5 text-sm text-muted-foreground">{a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
