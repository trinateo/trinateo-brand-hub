# Data Model — TrinaTeo Brand Hub

## profile
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | gen_random_uuid() |
| user_id | uuid | nullable; owner-scoped at lock-down |
| full_name | text | |
| tagline | text | |
| bio | text | |
| headshot_url | text | |
| linkedin_url | text | |
| expertise_tags | text[] | e.g. ["Executive Coaching"] |
| created_at | timestamptz | |

## service_offers
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid | |
| title | text | |
| slug | text unique | URL-safe identifier |
| summary | text | Short card copy |
| description | text | Long-form |
| who_its_for | text | |
| outcomes | text | |
| cta_label | text | default 'Enquire Now' |
| sort_order | integer | |
| published | boolean | |
| created_at | timestamptz | |

## case_studies
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid | |
| title | text | |
| slug | text unique | |
| client_sector | text | |
| challenge | text | |
| approach | text | |
| outcome | text | |
| tags | text[] | |
| published | boolean | |
| sort_order | integer | |
| created_at | timestamptz | |

## testimonials
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid | |
| author_name | text | |
| author_role | text | |
| author_company | text | |
| quote | text | |
| related_service_id | uuid FK → service_offers | nullable |
| published | boolean | |
| sort_order | integer | |
| created_at | timestamptz | |

## speaking_engagements
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid | |
| event_name | text | |
| event_date | date | |
| location | text | |
| topic | text | |
| audience_type | text | |
| event_url | text | |
| is_upcoming | boolean | |
| published | boolean | |
| created_at | timestamptz | |

## resources
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid | |
| title | text | |
| description | text | |
| resource_type | text | guide / template / video |
| file_url | text | |
| external_url | text | |
| published | boolean | |
| sort_order | integer | |
| created_at | timestamptz | |

## enquiries
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid | nullable |
| visitor_name | text | |
| visitor_email | text | |
| visitor_company | text | |
| visitor_role | text | |
| message | text | |
| how_can_i_help | text | which service they're interested in |
| referral_source | text | |
| status | text | new / reviewed / responded |
| admin_notes | text | |
| enquiry_summary | text | **AI field** |
| enquiry_summary_source | text | AI model identifier |
| enquiry_summary_confidence | numeric | 0.0–1.0 |
| enquiry_summary_review_status | text | default 'unreviewed' |
| created_at | timestamptz | |

## RLS
- v1: all tables have permissive read + write policies (demo-first).
- Sprint 4 "Lock it down": write policies replaced with `auth.uid() = user_id`; read stays open for public tables; `enquiries` read locked to owner.
