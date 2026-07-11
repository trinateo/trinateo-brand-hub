# Agentic Layer — TrinaTeo Brand Hub

## Risk Tiers

### Low Risk — Auto-execute (no approval needed)
- Summarise enquiry message → write to `enquiry_summary` + `confidence` + set `review_status = 'draft'`
- Tag a new case study with suggested tags from existing vocabulary
- Flag an enquiry as `seniority = 'executive'` based on role field

### Medium Risk — Show draft, Trina approves before saving
- Draft a reply to an enquiry based on the message and matched service
- Suggest updated `who_its_for` copy for a service offer based on recent enquiry patterns

### High Risk — Trina explicitly triggers, confirms before send
- Send an email reply to a visitor enquiry (uses named tool: `send_email_via_resend`)
- Publish a content item that is currently in draft

### Human-Only — No agent, ever
- Delete any content item or enquiry record
- Change domain or hosting configuration
- Access or export full enquiry list (privacy-sensitive)

## Named Tools (v1 approved set)
| Tool | Action | Risk |
|---|---|---|
| `insert_enquiry` | Write visitor form submission to DB | Low |
| `update_enquiry_status` | Change status field | Medium |
| `generate_enquiry_summary` | LLM summarise → draft field | Low |
| `send_email_via_resend` | Send email via Resend API | High |

## Audit Log Fields (on `enquiries`)
- `status` change: old value, new value, timestamp, actor
- `enquiry_summary` generation: source model, confidence, review_status

## v1 vs Later
- **v1:** No agentic actions; all tools are stubs; enquiry summary field exists but is null.
- **Next:** Auto-summarise on insert (low risk, background job).
- **Later:** Draft reply suggestions; send email with approval gate.
