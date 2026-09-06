import { useState, type FormEvent } from "react";
import { Github, Linkedin, ShieldCheck, Twitter } from "lucide-react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    toast.success("You're on the list — one email a month, no fluff.");
    setEmail("");
  };

  return (
    <footer className="border-t border-border py-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.2fr_1fr_1fr_1.4fr] lg:px-8">
        <div>
          <span className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal/15 text-teal ring-1 ring-teal/30">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Denver<span className="text-teal">Secure</span>
            </span>
          </span>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Offensive security, application security, and MCP security for software teams. Built in
            Denver, Colorado.
          </p>
          <div className="mt-5 flex gap-2">
            {[Linkedin, Github, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#top"
                aria-label="DenverSecure social profile"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-teal"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title="Services"
          links={[
            ["Security Testing", "#services"],
            ["Application Security", "#services"],
            ["MCP Security", "#mcp"],
            ["Pricing", "#pricing"],
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            ["About", "#about"],
            ["Results", "#results"],
            ["Insights", "#insights"],
            ["Contact", "#contact"],
          ]}
        />

        <div>
          <h3 className="text-sm font-semibold">Security notes, monthly</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Findings, AI agent risks, and practical fixes. No vendor noise.
          </p>
          <form onSubmit={subscribe} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              aria-label="Email address"
              className="min-w-0 flex-1 rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-teal"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-teal-foreground"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-6 text-xs text-muted-foreground">
            1600 Wynkoop St, Suite 300
            <br />
            Denver, CO 80202
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-border px-5 pt-6 lg:px-8">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} DenverSecure · Denver, Colorado
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-4 grid gap-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-sm text-muted-foreground hover:text-teal">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
