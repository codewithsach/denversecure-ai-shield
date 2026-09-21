import { Fragment, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { LogOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  listSubmissions,
  updateSubmissionStatus,
  type Submission,
  type SubmissionStatus,
} from "@/lib/admin.functions";

const TITLE = "Inquiry Dashboard | CipherHill";
const DESCRIPTION = "Internal CipherHill dashboard for reviewing contact form inquiries.";
const STATUSES: SubmissionStatus[] = ["new", "contacted", "closed"];

export const Route = createFileRoute("/_authenticated/admin")({
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
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchSubmissions = useServerFn(listSubmissions);
  const setStatus = useServerFn(updateSubmissionStatus);
  const [expanded, setExpanded] = useState<string | null>(null);

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["contact-submissions"],
    queryFn: () => fetchSubmissions(),
  });

  const statusMutation = useMutation({
    mutationFn: (vars: { id: string; status: SubmissionStatus }) => setStatus({ data: vars }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact-submissions"] }),
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    queryClient.clear();
    navigate({ to: "/auth" });
  };

  return (
    <main className="min-h-screen bg-background px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-widest text-teal uppercase">CipherHill Admin</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Inquiries</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
              <RefreshCw className={isFetching ? "animate-spin" : ""} /> Refresh
            </Button>
            <Button variant="ghost" onClick={signOut}>
              <LogOut /> Sign out
            </Button>
          </div>
        </header>

        {isLoading && <p className="mt-10 text-sm text-muted-foreground">Loading inquiries...</p>}

        {error && (
          <p role="alert" className="mt-10 text-sm text-destructive">
            {error instanceof Error ? error.message : "Could not load inquiries."}
          </p>
        )}

        {data && data.length === 0 && (
          <p className="mt-10 text-sm text-muted-foreground">No inquiries yet.</p>
        )}

        {data && data.length > 0 && (
          <div className="glass mt-8 overflow-x-auto rounded-lg">
            <table className="w-full min-w-[780px] text-left text-sm">
              <thead className="border-b border-border">
                <tr className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                  <Th>Date</Th>
                  <Th>Name</Th>
                  <Th>Company</Th>
                  <Th>Email</Th>
                  <Th>Service interest</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {data.map((row: Submission) => (
                  <Fragment key={row.id}>
                    <tr
                      onClick={() => setExpanded(expanded === row.id ? null : row.id)}
                      className="cursor-pointer border-b border-border/60 transition-colors hover:bg-foreground/5"
                    >
                      <Td>{new Date(row.created_at).toLocaleString()}</Td>
                      <Td>{row.name}</Td>
                      <Td>{row.company || "—"}</Td>
                      <Td>
                        <a
                          href={`mailto:${row.email}`}
                          className="text-teal hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {row.email}
                        </a>
                      </Td>
                      <Td>{row.service_interest}</Td>
                      <Td>
                        <select
                          value={row.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) =>
                            statusMutation.mutate({
                              id: row.id,
                              status: e.target.value as SubmissionStatus,
                            })
                          }
                          className="rounded-lg border border-border bg-background/60 px-3 py-1.5 text-xs outline-none focus:border-teal"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </Td>
                    </tr>
                    {expanded === row.id && (
                      <tr className="border-b border-border/60">
                        <td colSpan={6} className="px-4 py-4 text-muted-foreground whitespace-pre-wrap">
                          {row.message}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {statusMutation.isError && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            Could not update the status. Please try again.
          </p>
        )}
      </div>
    </main>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-medium">{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 align-middle">{children}</td>;
}
