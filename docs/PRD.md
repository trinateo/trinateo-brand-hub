# PRD — TrinaTeo Brand Hub

## Problem
Trina Teo has no central web presence. Potential clients — SME CEOs, HR leaders, executives, and collaboration partners — cannot easily understand her expertise, services, or proof of impact, and have no structured way to reach her.

## Target User
- **Visitor (primary):** SME CEOs, CHROs, business leaders, and potential partners researching Trina's expertise and services — anonymous, no login.
- **Owner (Trina):** Publishes and edits all content; reviews enquiries — authenticated in later sprint.

## Core Objects
| Object | Purpose |
|---|---|
| `profile` | Trina's bio, tagline, headshot, expertise tags |
| `service_offers` | Coaching and advisory services with outcomes and CTAs |
| `case_studies` | Anonymised client impact stories |
| `testimonials` | Client quotes with attribution |
| `speaking_engagements` | Past and upcoming speaking events |
| `resources` | Guides and downloads |
| `enquiries` | Visitor contact form submissions |

## MVP Must-Haves
- [ ] Homepage with clear positioning, services preview, testimonials
- [ ] `/services` page listing all published service offers
- [ ] `/about` page with bio, headshot, and expertise tags
- [ ] `/proof` page with case studies and testimonials
- [ ] `/speaking` page with event list
- [ ] `/resources` page with downloadable/linked resources
- [ ] `/contact` enquiry form that writes to `enquiries` table
- [ ] Admin interface to create/edit/publish all content types and view enquiries
- [ ] Live on TrinaTeo.com domain

## Non-Goals (v1)
Full CRM, membership portal, online course platform, payment system, marketing automation, client dashboard, AI chatbot, multilingual content, analytics, newsletter integration.

## Definition of Done
A visitor lands on TrinaTeo.com, reads the Executive Coaching service page, submits an enquiry with their name, email, company, role, and message, and sees a confirmation. Trina opens `/admin`, sees the enquiry listed with status "new", and can mark it "reviewed". All data persists after a page refresh.
