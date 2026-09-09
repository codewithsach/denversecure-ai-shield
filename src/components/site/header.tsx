import { useEffect, useState } from "react";
import { Menu, ShieldCheck, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#cloud", label: "Cloud Security" },
  { href: "#about", label: "About" },
  { href: "#pricing", label: "Pricing" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "glass" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 lg:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal/15 text-teal ring-1 ring-teal/30">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="truncate text-lg font-semibold tracking-tight">
            Denver<span className="text-teal">Secure</span>
          </span>
        </a>

        <div className="flex items-center gap-2">
          <nav className="mr-2 hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-amber-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Book a Call
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="glass border-t border-border px-5 pb-5 lg:hidden">
          <ul className="grid gap-1 pt-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-lg bg-amber px-4 py-2.5 text-center text-sm font-semibold text-amber-foreground"
              >
                Book a Call
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
