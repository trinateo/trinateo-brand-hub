create table if not exists profile (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  full_name text not null default '',
  tagline text not null default '',
  bio text not null default '',
  headshot_url text,
  linkedin_url text,
  expertise_tags text[] default '{}'
);
alter table profile enable row level security;
drop policy if exists "profile_v1_read" on profile;
create policy "profile_v1_read" on profile for select using (true);
drop policy if exists "profile_v1_write" on profile;
create policy "profile_v1_write" on profile for all using (true) with check (true);

create table if not exists service_offers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  title text not null default '',
  slug text unique,
  summary text not null default '',
  description text,
  who_its_for text,
  outcomes text,
  cta_label text default 'Enquire Now',
  sort_order integer default 0,
  published boolean default false
);
alter table service_offers enable row level security;
drop policy if exists "service_offers_v1_read" on service_offers;
create policy "service_offers_v1_read" on service_offers for select using (true);
drop policy if exists "service_offers_v1_write" on service_offers;
create policy "service_offers_v1_write" on service_offers for all using (true) with check (true);

create table if not exists case_studies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  title text not null default '',
  slug text unique,
  client_sector text,
  challenge text,
  approach text,
  outcome text,
  tags text[] default '{}',
  published boolean default false,
  sort_order integer default 0
);
alter table case_studies enable row level security;
drop policy if exists "case_studies_v1_read" on case_studies;
create policy "case_studies_v1_read" on case_studies for select using (true);
drop policy if exists "case_studies_v1_write" on case_studies;
create policy "case_studies_v1_write" on case_studies for all using (true) with check (true);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  author_name text not null default '',
  author_role text,
  author_company text,
  quote text not null default '',
  related_service_id uuid references service_offers(id) on delete set null,
  published boolean default true,
  sort_order integer default 0
);
alter table testimonials enable row level security;
drop policy if exists "testimonials_v1_read" on testimonials;
create policy "testimonials_v1_read" on testimonials for select using (true);
drop policy if exists "testimonials_v1_write" on testimonials;
create policy "testimonials_v1_write" on testimonials for all using (true) with check (true);

create table if not exists speaking_engagements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  event_name text not null default '',
  event_date date,
  location text,
  topic text,
  audience_type text,
  event_url text,
  is_upcoming boolean default false,
  published boolean default true
);
alter table speaking_engagements enable row level security;
drop policy if exists "speaking_engagements_v1_read" on speaking_engagements;
create policy "speaking_engagements_v1_read" on speaking_engagements for select using (true);
drop policy if exists "speaking_engagements_v1_write" on speaking_engagements;
create policy "speaking_engagements_v1_write" on speaking_engagements for all using (true) with check (true);

create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  title text not null default '',
  description text,
  resource_type text default 'guide',
  file_url text,
  external_url text,
  published boolean default false,
  sort_order integer default 0
);
alter table resources enable row level security;
drop policy if exists "resources_v1_read" on resources;
create policy "resources_v1_read" on resources for select using (true);
drop policy if exists "resources_v1_write" on resources;
create policy "resources_v1_write" on resources for all using (true) with check (true);

create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  visitor_name text not null default '',
  visitor_email text not null default '',
  visitor_company text,
  visitor_role text,
  message text not null default '',
  how_can_i_help text,
  referral_source text,
  status text not null default 'new',
  admin_notes text,
  enquiry_summary text,
  enquiry_summary_source text,
  enquiry_summary_confidence numeric,
  enquiry_summary_review_status text default 'unreviewed'
);
alter table enquiries enable row level security;
drop policy if exists "enquiries_v1_read" on enquiries;
create policy "enquiries_v1_read" on enquiries for select using (true);
drop policy if exists "enquiries_v1_write" on enquiries;
create policy "enquiries_v1_write" on enquiries for all using (true) with check (true);

insert into profile (full_name, tagline, bio, expertise_tags) values (
  'Trina Teo',
  'Executive coach and leadership strategist helping CEOs and HR leaders build thriving organisations.',
  'Trina Teo is a trusted advisor to C-suite leaders and HR decision-makers across Asia-Pacific. With 15+ years of experience spanning organisational transformation, leadership development, and executive coaching, she partners with leaders navigating complexity and high-stakes change. Trina combines strategic rigour with human-centred practice to deliver measurable outcomes.',
  '{"Executive Coaching","Leadership Development","Organisational Transformation","HR Strategy","C-Suite Advisory"}'
) on conflict do nothing;

insert into service_offers (title, slug, summary, who_its_for, outcomes, published, sort_order) values
  ('Executive Coaching', 'executive-coaching', 'One-to-one coaching for senior leaders navigating career transitions, team dynamics, or strategic inflection points.', 'CEOs, C-suite executives, senior leaders stepping into new roles or facing complex decisions.', 'Greater clarity on leadership identity; stronger decision-making; measurable improvement in team performance.', true, 1),
  ('Leadership Team Facilitation', 'leadership-team-facilitation', 'Structured offsite and workshop facilitation to align leadership teams around strategy, culture, and priorities.', 'Leadership teams preparing for a new strategy cycle, post-merger integration, or culture reset.', 'Aligned leadership team; clear priorities; actionable roadmap with shared ownership.', true, 2),
  ('HR Strategy Advisory', 'hr-strategy-advisory', 'Strategic counsel for HR leaders and people functions building capability for the future of work.', 'CHROs, HR Directors, and People leaders shaping the people agenda for their organisations.', 'A coherent people strategy; board-ready business cases; stronger HR-to-business partnership.', true, 3)
on conflict do nothing;

insert into case_studies (title, slug, client_sector, challenge, approach, outcome, tags, published, sort_order) values
  ('Aligning a Fractured Leadership Team Post-Merger', 'post-merger-alignment', 'Financial Services', 'A regional bank''s leadership team was deeply misaligned following a cross-border merger, resulting in stalled decisions and rising attrition.', 'Trina conducted individual leader assessments, facilitated a two-day leadership alignment offsite, and coached the CEO through a 90-day re-contracting process with the team.', 'Within six months, executive attrition dropped by 40% and the team delivered its first joint strategic plan on time.', '{"Leadership Alignment","Post-Merger","Executive Coaching"}', true, 1),
  ('Building a Future-Ready HR Function', 'future-ready-hr', 'Technology', 'A fast-scaling tech company''s HR team was reactive and under-resourced, unable to support rapid headcount growth or retain top talent.', 'Trina partnered with the CHRO to redesign the HR operating model, prioritise capability gaps, and build a 12-month people strategy roadmap.', 'HR business partnering scores improved by 30 points; time-to-hire fell by 25%; the CHRO secured board approval for a 20% team investment.', '{"HR Strategy","Organisational Design","Talent"}', true, 2)
on conflict do nothing;

insert into testimonials (author_name, author_role, author_company, quote, published, sort_order) values
  ('James Lim', 'CEO', 'Apex Financial Group', 'Trina helped me see my leadership blind spots with clarity and compassion. The work we did together directly shaped how I led our merger — I cannot recommend her highly enough.', true, 1),
  ('Priya Sharma', 'CHRO', 'NovaTech Asia', 'Working with Trina transformed how our HR team operates. She doesn''t just advise — she challenges, supports, and delivers real results.', true, 2),
  ('David Chen', 'Managing Director', 'Meridian Consulting', 'The leadership offsite Trina facilitated was the turning point for our team. We left with alignment we had been chasing for two years.', true, 3)
on conflict do nothing;

insert into speaking_engagements (event_name, event_date, location, topic, audience_type, is_upcoming, published) values
  ('HR Leaders Summit Asia 2024', '2024-09-12', 'Singapore', 'From Seat at the Table to Voice in the Room: Elevating the CHRO Role', 'HR Directors and CHROs', false, true),
  ('CEO Institute Leadership Forum', '2024-11-05', 'Sydney, Australia', 'Leading Through Ambiguity: What the Best CEOs Do Differently', 'CEOs and Managing Directors', false, true),
  ('Future of Work Conference 2025', '2025-06-18', 'Singapore', 'People Strategy in the Age of AI: What HR Leaders Must Get Right', 'HR and Business Leaders', true, true)
on conflict do nothing;

insert into resources (title, description, resource_type, published, sort_order) values
  ('The Executive Transition Playbook', 'A practical guide for senior leaders moving into new executive roles — covering the first 90 days, stakeholder mapping, and early wins.', 'guide', true, 1)
on conflict do nothing;

insert into enquiries (visitor_name, visitor_email, visitor_company, visitor_role, message, how_can_i_help, status) values
  ('Sample Visitor', 'sample@example.com', 'Acme Corp', 'CEO', 'I am looking for executive coaching support as I step into a new CEO role. Would love to explore working with Trina.', 'Executive Coaching', 'new')
on conflict do nothing;