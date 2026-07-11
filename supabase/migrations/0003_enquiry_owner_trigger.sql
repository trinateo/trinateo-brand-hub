-- Anonymous visitors insert enquiries without a user_id (they have no
-- session). Without this trigger, those rows would have user_id = null
-- forever, and the Sprint 4 owner-only read policy (auth.uid() = user_id)
-- can never match null, so Trina would never see new enquiries again.
-- This auto-assigns every new enquiry to the single owner account.

create or replace function public.set_enquiry_owner()
returns trigger as $$
begin
  if new.user_id is null then
    select id into new.user_id from auth.users where email = 'trinateoinc@gmail.com' limit 1;
  end if;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists trg_set_enquiry_owner on enquiries;
create trigger trg_set_enquiry_owner
  before insert on enquiries
  for each row execute function public.set_enquiry_owner();

-- Backfill any rows that slipped in with a null user_id before this trigger existed.
update enquiries
set user_id = (select id from auth.users where email = 'trinateoinc@gmail.com' limit 1)
where user_id is null;
