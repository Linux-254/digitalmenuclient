-- 0004_menu_item_variants.sql — Support for multi-variant dishes (e.g. Minji Beef, Plain, Ugali; Chicken portions 1/4, 1/2, Full; Juice Large/Small)

create table if not exists menu_item_variants (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id),
  menu_item_id uuid not null references menu_items(id) on delete cascade,
  label text not null,                       -- e.g. 'Beef', 'Rice', 'Ugali', '1/4', 'Large'
  price numeric(10,2),                       -- nullable for unconfirmed/unknown items
  price_status text default 'confirmed' check (price_status in ('confirmed', 'working', 'unknown')),
  price_basis text,
  is_available boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table menu_item_variants enable row level security;
create policy "Allow public read on variants" on menu_item_variants for select using (true);
create policy "Allow staff manage variants" on menu_item_variants for all using (auth.role() = 'authenticated');
