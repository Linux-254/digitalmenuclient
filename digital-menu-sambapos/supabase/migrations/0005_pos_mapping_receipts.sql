-- 0005_pos_mapping_receipts.sql — SambaPOS mapping, resilient sync queue, receipts, QR token rotation.
-- Run after 0004. Test on a Supabase branch first.

-- Which SambaPOS menu item/portion each of our variants maps to (the #1 integration risk: names must match exactly).
create table if not exists pos_item_map (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id),
  variant_id uuid not null references menu_item_variants(id) on delete cascade,
  pos_menu_item_name text not null,
  pos_portion_name text,                       -- null = default portion
  pos_product_id text,                         -- optional, if the API exposes ids
  verified_at timestamptz,                     -- set when a test ticket proved the mapping
  unique (venue_id, variant_id)
);
-- Which SambaPOS entity (table) each of our tables maps to.
create table if not exists pos_entity_map (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id),
  table_id uuid not null references tables(id) on delete cascade,
  pos_entity_type text default 'Tables',
  pos_entity_name text not null,
  unique (venue_id, table_id)
);

-- Sync queue upgrades: two kinds of events, retries with backoff, dead-letter.
alter table pos_sync_log
  add column if not exists kind text default 'ticket_open'
    check (kind in ('ticket_open','ticket_append','payment_applied','ticket_close','void')),
  add column if not exists session_id uuid references table_sessions(id),
  add column if not exists attempt_count int default 0,
  add column if not exists next_attempt_at timestamptz default now(),
  add column if not exists dedupe_key text,                       -- e.g. orderUUID:kind ; stored on the POS ticket as a tag/note
  add column if not exists locked_by text, add column if not exists locked_at timestamptz;
alter table pos_sync_log drop constraint if exists pos_sync_log_status_check;
alter table pos_sync_log add constraint pos_sync_log_status_check
  check (status in ('pending','sending','success','failed','dead'));
create unique index if not exists uq_pos_sync_dedupe on pos_sync_log(dedupe_key) where dedupe_key is not null;

-- Bridge liveness so admin sees "POS offline" within a minute.
create table if not exists bridge_heartbeats (
  venue_id uuid primary key references venues(id),
  last_seen_at timestamptz not null default now(),
  samba_reachable boolean, samba_version text, bridge_version text, queue_depth int
);

-- Receipts: one per session (party). Gap-free per-venue numbering.
create table if not exists receipt_counters (venue_id uuid primary key references venues(id), last_no int not null default 0);
create table if not exists receipts (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id),
  session_id uuid not null unique references table_sessions(id),
  receipt_no text not null,                      -- e.g. TC-261010-0042
  issued_at timestamptz default now(),
  payment_method text check (payment_method in ('mpesa','cash','card')),
  payment_ref text,                              -- M-Pesa receipt number or null for cash
  subtotal numeric(10,2) not null, total numeric(10,2) not null,
  served_by uuid references staff(id),
  document_type text not null default 'order_summary'
    check (document_type in ('order_summary','tax_invoice')),   -- 'tax_invoice' only if an eTIMS/fiscal integration exists
  snapshot jsonb not null,                       -- frozen lines (name, variant, qty, unit price) so later menu edits never alter old receipts
  unique (venue_id, receipt_no)
);
create or replace function next_receipt_no(p_venue uuid) returns text language plpgsql as $$
declare n int;
begin
  insert into receipt_counters(venue_id,last_no) values (p_venue,1)
  on conflict (venue_id) do update set last_no = receipt_counters.last_no + 1 returning last_no into n;
  return 'TC-' || to_char(now() at time zone 'Africa/Nairobi','YYMMDD') || '-' || lpad(n::text,4,'0');
end $$;

-- QR token rotation (reprint invalidates the old sticker).
alter table tables add column if not exists qr_token_rotated_at timestamptz, add column if not exists qr_token_prev text;

alter table pos_item_map enable row level security;
alter table pos_entity_map enable row level security;
alter table bridge_heartbeats enable row level security;
alter table receipt_counters enable row level security;
alter table receipts enable row level security;
