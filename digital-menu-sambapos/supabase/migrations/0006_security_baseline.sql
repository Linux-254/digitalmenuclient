-- Security baseline: apply after the clean schema is reviewed on a Supabase branch.
-- This migration intentionally does not create or seed a client-side PIN.
create or replace function public.current_venue_id() returns uuid
language sql stable security definer set search_path = public
as $$ select nullif((auth.jwt() ->> 'venue_id'),'')::uuid $$;

alter table if exists public.venues enable row level security;
alter table if exists public.staff enable row level security;
alter table if exists public.tables enable row level security;
alter table if exists public.categories enable row level security;
alter table if exists public.menu_items enable row level security;
alter table if exists public.table_sessions enable row level security;
alter table if exists public.orders enable row level security;
alter table if exists public.order_items enable row level security;
alter table if exists public.payments enable row level security;
alter table if exists public.pos_sync_log enable row level security;

-- Replace/extend these policies against the final baseline names during migration review.
drop policy if exists venue_isolation_menu on public.menu_items;
create policy venue_isolation_menu on public.menu_items
for all using (venue_id = public.current_venue_id()) with check (venue_id = public.current_venue_id());
drop policy if exists venue_isolation_categories on public.categories;
create policy venue_isolation_categories on public.categories
for all using (venue_id = public.current_venue_id()) with check (venue_id = public.current_venue_id());
drop policy if exists venue_isolation_orders on public.orders;
create policy venue_isolation_orders on public.orders
for all using (venue_id = public.current_venue_id()) with check (venue_id = public.current_venue_id());
drop policy if exists venue_isolation_tables on public.tables;
create policy venue_isolation_tables on public.tables
for all using (venue_id = public.current_venue_id()) with check (venue_id = public.current_venue_id());

-- Payment success and POS sync must be service-role Edge Function transitions only.
revoke all on table public.payments from anon, authenticated;
revoke all on table public.pos_sync_log from anon, authenticated;
