import { useState, type FormEvent } from "react";
import { CalendarClock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/reveal";

const SERVICES = [
  "Security Testing",
  "Application Security",
  "Cloud Migration & Security",
  "Not sure yet",
];

export function Contact() {
  const [service, setService] = useState(SERVICES[0]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thanks — we'll reply within one business day.");
    e.currentTarget.reset();
    setService(SERVICES[0]);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mesh-bg pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-teal uppercase">Get started</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Book a security assessment.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Tell us what you're shipping and we'll come back with a scope, a timeline, and a fixed
            number — usually within one business day.
          </p>

          <a
            href="#contact"
            className="glass mt-8 flex items-center gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-1"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber/15 text-amber">
              <CalendarClock className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">Book a 30-min call</span>
              <span className="block text-xs text-muted-foreground">
                Pick a slot — Mountain Time, no sales engineer relay
              </span>
            </span>
          </a>

          <ul className="mt-8 grid gap-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-teal" /> 1600 Wynkoop St, Suite 300, Denver, CO 80202
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-teal" /> hello@denversecure.com
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-teal" /> (303) 555-0142
            </li>
          </ul>
        </Reveal>

        <Reveal delay={110}>
          <form onSubmit={onSubmit} className="glass grid gap-5 rounded-3xl p-7 sm:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name">
                <input required name="name" id="name" className={inputClass} placeholder="Jane Doe" />
              </Field>
              <Field label="Company" name="company">
                <input
                  required
                  name="company"
                  id="company"
                  className={inputClass}
                  placeholder="Acme Inc."
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
                placeholder="jane@acme.com"
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
                placeholder="What are you building, and what's driving the timeline?"
              />
            </Field>
            <button
              type="submit"
              className="mt-1 rounded-xl bg-amber px-6 py-3.5 text-sm font-semibold text-amber-foreground transition-transform hover:-translate-y-0.5"
            >
              Request assessment
            </button>
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
