import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const TITLE = "Admin Sign In | CipherHill";
const DESCRIPTION = "Secure sign in for the CipherHill inquiry dashboard.";

export const Route = createFileRoute("/auth")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    setError(null);
    setNotice(null);
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (signUpError) throw signUpError;
        setNotice("Account created. You can sign in once an admin role is granted to it.");
        setMode("signin");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        navigate({ to: "/admin" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-background px-5 py-16">
      <div className="mesh-bg pointer-events-none fixed inset-0 -z-10 opacity-70" />
      <form onSubmit={onSubmit} className="glass grid w-full max-w-md gap-5 rounded-lg p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal/15 text-teal">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold">CipherHill Admin</p>
            <p className="font-mono text-xs text-muted-foreground">Inquiry dashboard</p>
          </div>
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="font-mono text-xs tracking-wide text-muted-foreground">
            Email
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            placeholder="you@cipherhill.com"
          />
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="password"
            className="font-mono text-xs tracking-wide text-muted-foreground"
          >
            Password
          </label>
          <input
            required
            id="password"
            name="password"
            type="password"
            minLength={8}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            className={inputClass}
            placeholder="••••••••"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          aria-busy={submitting}
          className="bg-amber text-amber-foreground hover:bg-amber/90 disabled:opacity-70"
        >
          {submitting ? "Please wait..." : mode === "signup" ? "Create account" : "Sign in"}
        </Button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signup" ? "signin" : "signup");
            setError(null);
            setNotice(null);
          }}
          className="text-xs text-muted-foreground underline-offset-4 hover:underline"
        >
          {mode === "signup" ? "Already have an account? Sign in" : "Need an account? Create one"}
        </button>

        {notice && (
          <p role="status" className="text-sm text-teal">
            {notice}
          </p>
        )}
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
      </form>
    </main>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-teal";
