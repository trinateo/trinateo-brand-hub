-- Sprint 4: Lock it down.
-- Public content stays readable by anyone; all writes become owner-scoped.
-- Prerequisite: Trina's Supabase Auth account must already exist with the
-- email below before the backfill block runs, or it will no-op silently.

drop policy if exists "profile_v1_write" on profile;
create policy "profile_owner_write" on profile
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "service_offers_v1_write" on service_offers;
create policy "service_offers_owner_write" on service_offers
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "case_studies_v1_write" on case_studies;
create policy "case_studies_owner_write" on case_studies
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "testimonials_v1_write" on testimonials;
create policy "testimonials_owner_write" on testimonials
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "speaking_engagements_v1_write" on speaking_engagements;
create policy "speaking_engagements_owner_write" on speaking_engagements
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "resources_v1_write" on resources;
create policy "resources_owner_write" on resources
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- enquiries: insert stays open for anonymous visitors; read/update/delete owner-only
drop policy if exists "enquiries_v1_read" on enquiries;
drop policy if exists "enquiries_v1_write" on enquiries;

create policy "enquiries_public_insert" on enquiries
  for insert with check (true);

create policy "enquiries_owner_select" on enquiries
  for select using (auth.uid() = user_id);

create policy "enquiries_owner_update" on enquiries
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "enquiries_owner_delete" on enquiries
  for delete using (auth.uid() = user_id);

-- Backfill existing rows to the owner account. Safe to re-run.
do $$
declare
  owner_id uuid;
begin
  select id into owner_id from auth.users where email = 'trinateoinc@gmail.com' limit 1;
  if owner_id is not null then
    update profile set user_id = owner_id where user_id is null;
    update service_offers set user_id = owner_id where user_id is null;
    update case_studies set user_id = owner_id where user_id is null;
    update testimonials set user_id = owner_id where user_id is null;
    update speaking_engagements set user_id = owner_id where user_id is null;
    update resources set user_id = owner_id where user_id is null;
    update enquiries set user_id = owner_id where user_id is null;
  end if;
end $$;
