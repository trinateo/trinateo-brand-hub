# Security — TrinaTeo Brand Hub

## Secret Handling
- `SUPABASE_SERVICE_ROLE_KEY` — server-side only; never in client bundle or `.env.local` committed to repo.
- `SUPABASE_ANON_KEY` — safe for client; only used for public reads.
- `RESEND_API_KEY` — server-side only, used in Next.js server actions.
- `ADMIN_PASSPHRASE` (Sprint 2 gate) — env var, checked server-side only; never returned to client.
- All secrets stored in Vercel environment variables, not in code.

## Permission Model
| Actor | Can Read | Can Write |
|---|---|---|
| Anonymous visitor | All published content | `enquiries` (insert only via server action) |
| Admin (Sprint 2, passphrase) | All tables incl. unpublished | All tables |
| Owner (Sprint 4, Supabase Auth) | All tables | Own rows only (`auth.uid() = user_id`) |

## RLS Progression
- **v1–Sprint 3:** Permissive policies — open read + write (demo-first).
- **Sprint 4:** Write policies replaced: `using (auth.uid() = user_id)`. Public content remains readable. `enquiries` read locked to owner.

## Approved Tools Rule
No agent or server action may call arbitrary shell commands or raw database operations. Only the named tools in `AGENTIC_LAYER.md` are permitted. Any new tool requires explicit addition to that list before use.

## Audit Principle
Every status change on `enquiries` logs the old value, new value, timestamp, and actor (system or authenticated user). Logs are append-only.

## Stop and Get a Human
If any task involves bulk deletion of visitor data, payment handling, or legal compliance (PDPA/GDPR), stop and involve a qualified human — do not automate.
