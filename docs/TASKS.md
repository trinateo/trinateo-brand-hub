# Tasks — TrinaTeo Brand Hub

## Sprint 1 — Database, seed data, and public site scaffold
**Goal:** TrinaTeo.com renders with real content for anonymous visitors. No login required.

- [ ] Run migration SQL — all tables created, RLS v1 policies active, seed data inserted
- [ ] Scaffold Next.js 14 app (App Router) with Supabase client (anon key, client-side safe)
- [ ] Homepage: hero with tagline, services preview grid (reads `service_offers`), testimonials strip (reads `testimonials`)
- [ ] `/services` page: list all `published = true` service offers; loading / empty / error states
- [ ] `/about` page: reads `profile` table; bio, headshot, expertise tags
- [ ] `/proof` page: reads `case_studies` + `testimonials`; tabbed or sectioned layout
- [ ] `/speaking` page: reads `speaking_engagements`; upcoming flagged separately
- [ ] `/resources` page: reads `resources`; download/external link buttons
- [ ] `/contact` page: enquiry form (name, email, company, role, message, how_can_i_help); server action validates + inserts to `enquiries`; success confirmation; error handling
- [ ] Deploy to Vercel; configure TrinaTeo.com custom domain
- [ ] Smoke test: all pages load with seed data; enquiry form submits and row appears in Supabase table viewer

**Definition of Done:** A visitor can open TrinaTeo.com on a mobile browser, read the Executive Coaching service, submit an enquiry, and see a confirmation — all without logging in. The enquiry row exists in Supabase.

**→ v1 FUNCTIONAL MILESTONE**

---

## Sprint 2 — Admin content management (core engine)
**Goal:** Trina can create, edit, and publish all content types and view enquiries without touching code.

- [ ] `/admin` route — gated by `ADMIN_PASSPHRASE` env var checked server-side; redirect to `/admin/login` if missing
- [ ] `/admin/enquiries` — table of all enquiries, sorted new-first; status badge; "Mark Reviewed" / "Mark Responded" buttons → update DB
- [ ] `/admin/services` — list, create, edit, toggle published, reorder (sort_order)
- [ ] `/admin/case-studies` — list, create, edit, publish/unpublish
- [ ] `/admin/testimonials` — list, create, edit, delete
- [ ] `/admin/speaking` — list, create, edit, delete
- [ ] `/admin/resources` — list, create, edit, toggle published
- [ ] `/admin/profile` — edit bio, tagline, headshot URL, LinkedIn URL, expertise tags
- [ ] All admin forms: loading state during save; success toast; error message on failure; empty state when no rows
- [ ] No dead buttons — every action persists to DB and UI reflects it

**Definition of Done:** Trina logs into `/admin`, creates a new service offer titled "Board Advisory", publishes it, and it appears on `/services` after a hard refresh. She also marks the demo enquiry "reviewed" and sees the status badge update.

---

## Sprint 3 — Enquiry polish and notifications
**Goal:** Enquiry flow feels professional; Trina is notified of new submissions.

- [ ] Post-submit confirmation page with personalised message (visitor name shown)
- [ ] Server action sends email to Trina on new enquiry via Resend (`send_email_via_resend` tool)
- [ ] Enquiry admin: `admin_notes` text field Trina can save per enquiry
- [ ] SEO metadata: `<title>`, `<meta description>`, `og:image` fields on service offers and case studies; rendered in Next.js `generateMetadata`
- [ ] `sitemap.xml` and `robots.txt` generated from published content slugs

**Definition of Done:** Trina submits a test enquiry; within 60 seconds she receives an email with the visitor's name, company, and message. The `/services/executive-coaching` page has a correct `<title>` tag visible in browser tab.

---

## Sprint 4 — Lock it down
**Goal:** Real Supabase Auth replaces passphrase gate; all writes are owner-scoped; public reads unaffected.

- [ ] Enable Supabase Auth; create Trina's owner account
- [ ] `/admin/login` → Supabase email+password sign-in; session stored in cookie
- [ ] Replace `ADMIN_PASSPHRASE` check with `supabase.auth.getSession()` — reject if no session
- [ ] Backfill `user_id` on all rows to Trina's `auth.uid()`
- [ ] Replace v1 write policies: `using (auth.uid() = user_id) with check (auth.uid() = user_id)` on all tables
- [ ] `enquiries` read policy: `using (auth.uid() = user_id)` (owner only); insert remains open for visitors
- [ ] Verify: public pages still render for anonymous users
- [ ] Verify: unauthenticated POST to any admin action returns 403
- [ ] Remove `ADMIN_PASSPHRASE` from Vercel env vars
- [ ] Confirm no service role key is present in any client bundle (check network tab)

**Definition of Done:** Opening `/admin` in an incognito window redirects to `/admin/login`. After signing in as Trina, all CRUD works. Public pages load without session. Supabase logs show RLS rejecting an unauthenticated write attempt.

---

## Gantt (Sprint → Feature)
```
Sprint 1  [DB + seed + all public pages + enquiry form + deploy]  ← v1 functional
Sprint 2  [Admin CRUD for all content types + enquiry inbox]
Sprint 3  [Email notification + SEO + sitemap]
Sprint 4  [Supabase Auth + RLS lock-down]
```
