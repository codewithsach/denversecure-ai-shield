import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Code2, KeyRound, LockKeyhole, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

const TITLE = "Application Security Services | CipherHill";
const DESCRIPTION = "Application security for web applications, APIs, authentication, access control, and the software development lifecycle. Discuss your testing scope with CipherHill.";
const SCOPE = [
  { icon: Code2, title: "Web applications & APIs", body: "Review how your application handles requests, data, and interactions between services. Define the web application and API endpoints that need security testing." },
  { icon: KeyRound, title: "Authentication", body: "Assess how users sign in and how the application manages their sessions. Identify weaknesses in the controls that establish and maintain a user’s identity." },
  { icon: LockKeyhole, title: "Access control", body: "Examine which users can reach particular features and data. Assess whether permission checks enforce the intended boundaries between accounts and roles." },
  { icon: Workflow, title: "Software development lifecycle", body: "Review where security fits into your development and release process. Identify practical opportunities to address risks as software changes, not only before launch." },
];

export const Route = createFileRoute("/application-security")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cipherhill.com/application-security" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://cipherhill.com/application-security" }],
  }),
  component: ApplicationSecurityPage,
});

function ApplicationSecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header homeLinks />
      <main className="mx-auto max-w-7xl px-5 pt-28 pb-12 sm:pt-36 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to CipherHill
        </Link>
        <section className="pt-8 pb-10 sm:pb-12">
          <p className="font-mono text-xs uppercase text-primary">CipherHill · Security Testing</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Application Security</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Identify and reduce risk across web applications, APIs, authentication, access control, and the software development lifecycle.
          </p>
          <Button asChild size="lg" className="mt-6">
            <a href="/#contact">Discuss your application <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          </Button>
        </section>
        <section className="border-t border-border py-8 sm:py-12" aria-labelledby="scope-heading">
          <h2 id="scope-heading" className="text-2xl font-semibold sm:text-3xl">What we assess</h2>
          <div className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {SCOPE.map(({ icon: Icon, title, body }) => (
              <article key={title}>
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-xl font-semibold">{title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="border-t border-border py-8 sm:py-12" aria-labelledby="approach-heading">
          <h2 id="approach-heading" className="text-2xl font-semibold sm:text-3xl">A scope that fits your software</h2>
          <div className="mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>Start with the application you want assessed, who uses it, and how it handles data. Together, we define the relevant features, API endpoints, user roles, and development context.</p>
            <p>The focus is on understanding risks and identifying practical improvements. Testing scope depends on your application and the concerns you want to address.</p>
          </div>
          <h3 className="mt-8 text-xl font-semibold">Request a quote</h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Every engagement is different. Share what your application does and whether you are preparing for launch, making changes, or reviewing existing security controls.</p>
          <Button asChild className="mt-5">
            <a href="/#contact">Request an application security quote <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          </Button>
        </section>
      </main>
      <Footer homeLinks />
    </div>
  );
}