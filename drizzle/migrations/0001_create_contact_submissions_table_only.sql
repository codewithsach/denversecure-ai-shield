CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  email text NOT NULL,
  service_interest text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_submissions TO anon;
GRANT INSERT, SELECT, UPDATE ON public.contact_submissions TO authenticated;
GRANT ALL ON public.contact_submissions TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit a contact request" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can view submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can update submissions" ON public.contact_submissions;

CREATE POLICY "Anyone can submit a contact request"
ON public.contact_submissions FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view submissions"
ON public.contact_submissions FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update submissions"
ON public.contact_submissions FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));