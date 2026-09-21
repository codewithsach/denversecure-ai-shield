import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const NOTIFY_TO = "hello@cipherhill.com";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(160).optional().nullable(),
  email: z.string().trim().email().max(255),
  service_interest: z.string().trim().min(1).max(120),
  message: z.string().trim().min(1).max(5000),
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendNotification(submission: {
  name: string;
  company: string | null;
  email: string;
  service_interest: string;
  message: string;
  created_at: string;
}) {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const resendKey = process.env["RESEND_API_KEY"];
  if (!lovableKey || !resendKey) {
    console.error("[contact] Resend credentials are not configured; skipping notification email.");
    return;
  }

  const submittedAt = new Date(submission.created_at).toUTCString();
  const rows: Array<[string, string]> = [
    ["Name", submission.name],
    ["Company", submission.company || "—"],
    ["Email", submission.email],
    ["Service interest", submission.service_interest],
    ["Submitted", submittedAt],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111">
      <h2 style="margin:0 0 16px">New CipherHill inquiry</h2>
      <table style="border-collapse:collapse;margin-bottom:16px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:4px 12px 4px 0;color:#555">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <div style="padding:12px 16px;background:#f5f5f5;border-radius:8px;white-space:pre-wrap">${escapeHtml(
        submission.message,
      )}</div>
    </div>`;

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    submission.message,
  ].join("\n");

  const response = await fetch(`${GATEWAY_URL}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": resendKey,
    },
    body: JSON.stringify({
      from: "CipherHill <onboarding@resend.dev>",
      to: [NOTIFY_TO],
      reply_to: submission.email,
      subject: `New CipherHill Inquiry — ${submission.service_interest}`,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`[contact] Resend request failed [${response.status}]: ${errorBody}`);
  }
}

export const submitContactRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabase = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const submittedAt = new Date().toISOString();

    const { error } = await supabase
      .from("contact_submissions")
      .insert({
        name: data.name,
        company: data.company ? data.company : null,
        email: data.email,
        service_interest: data.service_interest,
        message: data.message,
      });

    if (error) {
      console.error(`[contact] Insert failed: ${error.message}`);
      throw new Error("Could not save your request.");
    }

    // Email failures must never lose the stored submission.
    try {
      await sendNotification({
        name: data.name,
        company: data.company ?? null,
        email: data.email,
        service_interest: data.service_interest,
        message: data.message,
        created_at: submittedAt,
      });
    } catch (emailError) {
      console.error("[contact] Notification email failed:", emailError);
    }

    return { ok: true as const };
  });
