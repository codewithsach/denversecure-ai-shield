# CipherHill

Marketing site and inquiry backend for **CipherHill — Cybersecurity & Technology Solutions**.

## Architecture

| Layer     | Technology                                                                   |
| --------- | ---------------------------------------------------------------------------- |
| Frontend  | React 19 + TanStack Start (Vite 7), Tailwind CSS v4, shadcn/ui, Lucide icons  |
| Routing   | TanStack Router (file-based routes in `src/routes`)                          |
| Server    | TanStack **server functions** (`createServerFn`), running on the edge runtime |
| Database  | Supabase Postgres (own/external project)                                      |
| Auth      | Supabase Auth (email + password)                                              |
| Email     | Resend, called server-side through the Lovable connector gateway              |

This stack runs its own server runtime, so there are **no Supabase Edge Functions**.
The email notification lives in a server function (`src/lib/contact.functions.ts`)
that runs in the same request as the database insert — the equivalent of an
edge function, deployed automatically with the app.

### Key files

```
src/lib/contact.functions.ts          public server fn: validate → insert → notify
src/lib/admin.functions.ts            admin-only server fns: list + update status
src/routes/index.tsx                  public landing page
src/routes/auth.tsx                   /auth  — admin sign in
src/routes/_authenticated/route.tsx   auth gate for everything below it
src/routes/_authenticated/admin.tsx   /admin — inquiry dashboard
src/components/site/contact.tsx       public contact form
```

## Database schema

`public.contact_submissions`

| Column             | Type          | Notes                        |
| ------------------ | ------------- | ---------------------------- |
| `id`               | `uuid`        | PK, `gen_random_uuid()`      |
| `name`             | `text`        | required                     |
| `company`          | `text`        | optional                     |
| `email`            | `text`        | required                     |
| `service_interest` | `text`        | required                     |
| `message`          | `text`        | required                     |
| `status`           | `text`        | required, default `'new'`    |
| `created_at`       | `timestamptz` | required, default `now()`    |

`public.user_roles` — `(id, user_id, role, created_at)`, unique on `(user_id, role)`,
where `role` is the enum `public.app_role` (`admin | moderator | user`).

`private.has_role(uuid, app_role)` — `SECURITY DEFINER` helper used by the policies.
It lives in the `private` schema so it is not callable through the public API.

### Row Level Security

RLS is enabled on both tables.

**contact_submissions**

| Policy                             | Role                 | Rule                                   |
| ---------------------------------- | -------------------- | -------------------------------------- |
| `Anyone can submit a contact request` | `anon`, `authenticated` | INSERT allowed (`with check true`) |
| `Admins can view submissions`      | `authenticated`      | SELECT when `private.has_role(auth.uid(), 'admin')` |
| `Admins can update submissions`    | `authenticated`      | UPDATE when `private.has_role(auth.uid(), 'admin')` |

No DELETE policy exists, so nobody can delete through the API.
Grants: `INSERT` to `anon`; `INSERT, SELECT, UPDATE` to `authenticated`; `ALL` to `service_role`.

**user_roles** — users may read only their own role rows; writes go through
the Supabase dashboard or `service_role`.

## Secrets and environment variables

Client-visible (written to `.env` automatically by the Supabase connection):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY` (anon key — safe in the browser)
- `VITE_SUPABASE_PROJECT_ID`

Server-only (never referenced from client code):

- `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY` — the Resend connection key
- `LOVABLE_API_KEY` — authenticates the connector gateway call

Secrets are managed in project settings / the connectors panel; they are never
committed and never reach the browser bundle.

## Email notifications

On a successful insert, `submitContactRequest` POSTs to
`https://connector-gateway.lovable.dev/resend/emails` with
`Authorization: Bearer $LOVABLE_API_KEY` and `X-Connection-Api-Key: $RESEND_API_KEY`.

- **To:** `hello@cipherhill.com`
- **Reply-To:** the person who submitted the form
- **Subject:** `New CipherHill Inquiry — {service_interest}`
- **Body:** Name, Company, Email, Service Interest, Submission date/time, Message

The send is wrapped in `try/catch` and any non-OK response is logged only, so a
mail failure never rolls back or loses the stored submission.

> The `from` address is `onboarding@resend.dev`, which Resend only delivers to the
> Resend account owner. To send to `hello@cipherhill.com` from any account, verify
> `cipherhill.com` in Resend and change `from` in `src/lib/contact.functions.ts`
> to e.g. `CipherHill <notifications@cipherhill.com>`.

### Deploying and testing

The server functions deploy with the app — publishing the project is the deploy step.
To test:

1. Open the site, scroll to **Ready to Secure Your Software?**, and submit the form.
2. Confirm the success message appears.
3. Check the row in Supabase → Table Editor → `contact_submissions`, or in `/admin`.
4. Check the Resend dashboard (Emails → Logs) for the outgoing message.

Locally: `bun install && bun run dev`, then the same steps against
`http://localhost:8080`.

