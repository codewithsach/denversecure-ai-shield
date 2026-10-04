import { Mail, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <span className="flex items-center gap-2.5">
            <ShieldCheck className="h-6 w-6 shrink-0 text-foreground" aria-hidden="true" />
            <span className="text-lg font-semibold tracking-tight">
              Cipher<span className="text-amber">Hill</span>
            </span>
          </span>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Cybersecurity &amp; Technology Solutions
          </p>
          <a href="mailto:hello@cipherhill.com" className="mt-5 inline-flex items-center gap-2 text-sm text-amber hover:text-foreground">
            <Mail className="h-4 w-4" /> hello@cipherhill.com
          </a>
        </div>

        <FooterCol
          title="Services"
          links={[
            ["Software Testing & Security", "#services"],
            ["Application Security", "#services"],
            ["Cloud Security & Migration", "#services"],
            ["Risk & Compliance", "#services"],
            ["AI Security & Automation", "#services"],
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            ["About", "#about"],
            ["Contact", "#contact"],
            ["Pricing", "#pricing"],
            ["FAQ", "#faq"],
          ]}
        />
        <FooterCol title="Legal" links={[["Privacy Policy", "#privacy"], ["Terms of Service", "#terms"]]} />
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-border px-5 pt-6 lg:px-8">
        <p className="font-mono text-xs text-muted-foreground">
          © 2026 CipherHill. All rights reserved.
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
            <a href={href} className="text-sm text-muted-foreground hover:text-amber">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
