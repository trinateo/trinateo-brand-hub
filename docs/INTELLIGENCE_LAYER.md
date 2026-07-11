# Intelligence Layer — TrinaTeo Brand Hub

## v1 (Rule-Based, No AI Required)

### Enquiry Triage
When a new enquiry arrives, classify urgency by simple rules:
- `how_can_i_help` matches a published service → tag with that service slug
- Message length > 200 chars → mark `detail_level = 'high'`
- Visitor role contains "CEO" / "CHRO" / "Director" → flag `seniority = 'executive'`

All rule outputs stored as structured fields; no AI needed for the app to function.

### Auto-Structure Schema (Enquiry)
```json
{
  "visitor_name": "James Lim",
  "visitor_email": "james@apexfg.com",
  "visitor_company": "Apex Financial Group",
  "visitor_role": "CEO",
  "how_can_i_help": "executive-coaching",
  "seniority_flag": "executive",
  "detail_level": "high",
  "status": "new",
  "enquiry_summary": null,
  "enquiry_summary_source": null,
  "enquiry_summary_confidence": null,
  "enquiry_summary_review_status": "unreviewed"
}
```

## Events to Track
- Enquiry submitted (service interested in, referral source)
- Enquiry status changed (new → reviewed → responded)
- Content item published / unpublished

## Later (AI Features)
- Auto-summarise enquiry message → `enquiry_summary` (confidence stored; Trina reviews before acting)
- Suggest tags for new case studies based on existing tag vocabulary
- Surface "similar past enquiries" when Trina opens a new one

## Ranking Rule (v1)
Admin enquiries list ordered by: `status = 'new'` first, then `created_at desc`. No ML required.
