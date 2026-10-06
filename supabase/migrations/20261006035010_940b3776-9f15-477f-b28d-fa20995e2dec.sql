DROP POLICY "Anyone can submit a contact request" ON public.contact_submissions;

CREATE POLICY "Anyone can submit a contact request"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'new'
  AND length(btrim(name)) > 0
  AND length(btrim(email)) > 0
  AND position('@' in email) > 1
  AND length(btrim(service_interest)) > 0
  AND length(btrim(message)) > 0
);