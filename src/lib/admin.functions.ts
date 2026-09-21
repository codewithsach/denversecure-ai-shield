import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const STATUSES = ["new", "contacted", "closed"] as const;
export type SubmissionStatus = (typeof STATUSES)[number];

export type Submission = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  service_interest: string;
  message: string;
  status: string;
  created_at: string;
};

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", context.userId)
    .eq("role", "admin")
    .maybeSingle();

  if (error) {
    console.error(`[admin] Role lookup failed: ${error.message}`);
    throw new Error("Could not verify your access.");
  }
  if (!data) throw new Error("Forbidden: admin access required.");
}

export const listSubmissions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);

    const { data, error } = await context.supabase
      .from("contact_submissions")
      .select("id, name, company, email, service_interest, message, status, created_at")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) {
      console.error(`[admin] List failed: ${error.message}`);
      throw new Error("Could not load submissions.");
    }
    return (data ?? []) as Submission[];
  });

export const updateSubmissionStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ id: z.string().uuid(), status: z.enum(STATUSES) }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);

    const { error } = await context.supabase
      .from("contact_submissions")
      .update({ status: data.status })
      .eq("id", data.id);

    if (error) {
      console.error(`[admin] Status update failed: ${error.message}`);
      throw new Error("Could not update the status.");
    }
    return { ok: true as const };
  });
