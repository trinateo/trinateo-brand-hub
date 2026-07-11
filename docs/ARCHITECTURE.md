# Architecture — TrinaTeo Brand Hub

## Stack
- **Frontend:** Next.js 14 (App Router) — public pages + admin routes
- **Database:** Supabase (Postgres + RLS)
- **Hosting:** Vercel — domain pointed to TrinaTeo.com
- **Email (Sprint 3):** Resend via Next.js server action
- **Auth (Sprint 4):** Supabase Auth

## Now vs Later
| Now | Later |
|---|---|
| Public brand pages (read from DB) | Blog/article publishing |
| Enquiry form → DB | Email notification on enquiry |
| Admin CRUD for all content | Full Supabase Auth + RLS lock-down |
| Seed data live on domain | Analytics, newsletter, resource gating |

## Key Action Flow — Visitor Submits Enquiry
1. Visitor fills `/contact` form in browser
2. Next.js server action validates fields (name, email, message required)
3. Server action inserts row into `enquiries` table via Supabase service-role client
4. Success → visitor sees confirmation message; error → inline field errors shown
5. Trina opens `/admin/enquiries` → reads `enquiries` table, ordered by `created_at` desc
6. Trina clicks "Mark Reviewed" → server action updates `status` field → UI reflects new status

## Layer Plan
1. **Data layer first** — all tables, RLS policies, seed data
2. **Public pages** — read from DB, all five UI states handled
3. **Enquiry form** — write to DB, the core engine
4. **Admin CRUD** — manage content without code
5. **Notifications + SEO** — email alerts, metadata
6. **Auth + RLS lock-down** — owner-scoped writes
7. **AI features** — enquiry summarisation, content tagging (non-blocking)

## Core Without AI
Every page reads directly from Postgres. Enquiry form writes directly to Postgres. AI fields (`enquiry_summary`, `confidence`, `review_status`) are nullable — the app functions fully without them.
