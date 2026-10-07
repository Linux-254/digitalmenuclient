<<<<<<< HEAD
-- Supabase/Postgres schema scaffold. Production migration should create venues, staff, tables, table_sessions, categories, menu_items, availability_events, orders, order_items, pos_sync_log, pos_connector_config, payments, and payment_audit_events.
=======
-- Supabase/Postgres schema for Digital Menu & Tableside OS
-- Core Tables: venues, staff, tables, table_sessions, categories, menu_items, availability_events, orders, order_items, pos_sync_log, pos_connector_config, payments, payment_audit_events

-- venues, staff, tables
create table if not exists venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  timezone text default 'Africa/Nairobi',
  currency text default 'KES'
);

create table if not exists staff (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venues(id),
  auth_user_id uuid references auth.users(id),
  name text,
  role text check (role in ('waiter','chef','bar','admin')),
  is_active boolean default true
);

create table if not exists tables (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venues(id),
  table_no text not null,
  seat_capacity int,
  qr_token text unique not null,
  status text default 'available' check (status in ('available','occupied','billing'))
);

create table if not exists table_sessions (
  id uuid primary key default gen_random_uuid(),
  table_id uuid references tables(id),
  party_size int,
  opened_at timestamptz default now(),
  closed_at timestamptz,
  status text default 'open' check (status in ('open','billing','closed'))
);

-- menu
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venues(id),
  name text,
  sort_order int default 0,
  station text check (station in ('kitchen','bar'))
);

create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venues(id),
  category_id uuid references categories(id),
  name text not null,
  description text,
  price numeric(10,2) not null,
  image_url text,
  is_available boolean default true,
  unavailable_reason text,
  unavailable_until timestamptz,
  station text check (station in ('kitchen','bar')),
  is_batchable boolean default false,
  batch_qty_remaining int
);

create table if not exists availability_events (
  id uuid primary key default gen_random_uuid(),
  menu_item_id uuid references menu_items(id),
  changed_by uuid references staff(id),
  previous_state boolean,
  new_state boolean,
  reason text,
  created_at timestamptz default now()
);

-- orders
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references table_sessions(id),
  table_id uuid references tables(id),
  status text default 'open',
  created_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  menu_item_id uuid references menu_items(id),
  qty int not null,
  unit_price numeric(10,2),
  status text default 'ordered' check (status in ('ordered','preparing','ready','served','cancelled')),
  notes text
);

-- POS sync
create table if not exists pos_sync_log (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  direction text default 'outbound',
  payload jsonb,
  status text default 'pending' check (status in ('pending','success','failed')),
  pos_ticket_ref text,
  error text,
  created_at timestamptz default now()
);

create table if not exists pos_connector_config (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venues(id),
  connector_type text default 'mock',
  config jsonb,
  is_active boolean default true
);

-- payments
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  session_id uuid references table_sessions(id),
  amount numeric(10,2) not null,            -- always server-computed, never client-supplied
  currency text default 'KES',
  method text check (method in ('mpesa','cash','card')) default 'mpesa',
  status text default 'pending' check (status in ('pending','success','failed','cancelled','refunded')),
  idempotency_key text unique not null,
  mpesa_checkout_request_id text unique,
  mpesa_merchant_request_id text,
  mpesa_receipt_number text,
  phone_number_masked text,                  -- store masked (e.g. 07XX***456); avoid full number where not operationally required
  raw_callback_payload jsonb,                 -- retained for reconciliation/audit, never displayed to guest
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  verified_at timestamptz
);

create table if not exists payment_audit_events (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid references payments(id),
  event_type text,
  previous_status text,
  new_status text,
  source text check (source in ('webhook','staff_override','system')),
  actor_staff_id uuid references staff(id),
  created_at timestamptz default now()
);
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
