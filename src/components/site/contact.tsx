import { useState, type FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const SERVICES = [
  "Software Testing & Security",
  "Application Security",
  "Cloud Security & Migration",
  "Risk & Compliance",
  "AI Security & Automation",
  "Not sure yet",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Contact() {
  const [service, setService] = useState(SERVICES[0]);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    setStatus("idle");
    setError(null);

    if (!name || !email || !message || !service) {
      setStatus("error");
      setError("Please fill in your name, email, and message.");
      return;
    }
    if (!EMAIL_RE.test(email) || email.length > 255) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const { error: insertError } = await supabase.from("contact_submissions").insert({
        name: name.slice(0, 120),
        company: company ? company.slice(0, 160) : null,
        email,
        service_interest: service,
        message: message.slice(0, 5000),
      });
      if (insertError) throw insertError;
      setStatus("success");
      form.reset();
      setService(SERVICES[0]);
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or email hello@cipherhill.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-10 sm:py-14">
      <div className="mesh-bg pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-teal uppercase">Get Started</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to Secure Your Software?
          </h2>
          <p className="mt-5 text-muted-foreground">
            Whether you're building a new application, moving to the cloud, or strengthening your existing security program, let's talk.
          </p>

          <a
            href="mailto:hello@cipherhill.com"
            className="glass mt-8 flex items-center gap-4 rounded-lg p-5 transition-transform hover:-translate-y-1"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber/15 text-amber">
              <Mail className="h-5 w-5" />
            </span>
            <span className="min-w-0">
               <span className="block text-sm font-semibold">hello@cipherhill.com</span>
               <span className="block text-xs text-muted-foreground">Tell us what you need help securing.</span>
            </span>
          </a>

        </Reveal>

        <Reveal delay={110}>
          <form onSubmit={onSubmit} className="glass grid gap-5 rounded-lg p-7 sm:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name">
                <input required name="name" id="name" autoComplete="name" className={inputClass} placeholder="Your name" />
              </Field>
              <Field label="Company" name="company">
                <input
                  required
                  name="company"
                  id="company"
                  className={inputClass}
                  autoComplete="organization"
                  placeholder="Your company"
                />
              </Field>
            </div>
            <Field label="Work email" name="email">
              <input
                required
                type="email"
                name="email"
                id="email"
                className={inputClass}
                autoComplete="email"
                placeholder="you@company.com"
              />
            </Field>
            <Field label="Service interest" name="service">
              <select
                name="service"
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={inputClass}
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Message" name="message">
              <textarea
                required
                name="message"
                id="message"
                rows={4}
                className={inputClass}
                placeholder="How can CipherHill help?"
              />
            </Field>
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              aria-busy={submitting}
              className="mt-1 bg-amber text-amber-foreground hover:bg-amber/90 disabled:opacity-70"
            >
              {submitting ? "Sending..." : <>Book a Call <ArrowRight /></>}
            </Button>
            {status === "success" && (
              <p role="status" className="text-sm text-teal">
                Thanks! We've received your request. We'll get back to you shortly.
              </p>
            )}
            {status === "error" && error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-teal";

function Field({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="font-mono text-xs tracking-wide text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
