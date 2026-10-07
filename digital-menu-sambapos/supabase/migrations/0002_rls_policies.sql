-- Row Level Security (RLS) Policies for Digital Menu & Tableside OS
-- Principle: Guests get scoped access via table_session_id claim; staff access is bounded by venue_id; service-role owns pos_sync_log and payments state transitions.

alter table menu_items enable row level security;
alter table categories enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table pos_sync_log enable row level security;
alter table pos_connector_config enable row level security;
alter table payments enable row level security;
alter table payment_audit_events enable row level security;

-- 1. menu_items & categories: public select, restricted modification
create policy "Menu items public select"
  on menu_items for select
  using (true);

create policy "Categories public select"
  on categories for select
  using (true);

create policy "Staff menu modify"
  on menu_items for all
  using (
    exists (
      select 1 from staff
      where staff.auth_user_id = auth.uid()
        and staff.venue_id = menu_items.venue_id
        and staff.role in ('chef', 'bar', 'admin')
        and staff.is_active = true
    )
  );

-- 2. orders & order_items: guest session write/read, staff venue read/update
create policy "Guest order session select"
  on orders for select
  using (
    session_id = (auth.jwt() ->> 'table_session_id')::uuid
    or exists (
      select 1 from staff
      join tables on tables.id = orders.table_id
      where staff.auth_user_id = auth.uid()
        and staff.venue_id = tables.venue_id
        and staff.is_active = true
    )
  );

create policy "Guest order session insert"
  on orders for insert
  with check (
    session_id = (auth.jwt() ->> 'table_session_id')::uuid
  );

create policy "Guest order_items session select"
  on order_items for select
  using (
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
        and (
          orders.session_id = (auth.jwt() ->> 'table_session_id')::uuid
          or exists (
            select 1 from staff
            join tables on tables.id = orders.table_id
            where staff.auth_user_id = auth.uid()
              and staff.venue_id = tables.venue_id
              and staff.is_active = true
          )
        )
    )
  );

create policy "Guest order_items session insert"
  on order_items for insert
  with check (
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
        and orders.session_id = (auth.jwt() ->> 'table_session_id')::uuid
    )
  );

create policy "Staff order_items status update"
  on order_items for update
  using (
    exists (
      select 1 from orders
      join tables on tables.id = orders.table_id
      join staff on staff.venue_id = tables.venue_id
      where orders.id = order_items.order_id
        and staff.auth_user_id = auth.uid()
        and staff.is_active = true
    )
  );

-- 3. pos_sync_log & pos_connector_config: service-role only (deny public/authenticated roles)
create policy "pos_sync_log service role only"
  on pos_sync_log for all
  using (auth.jwt() ->> 'role' = 'service_role');

create policy "pos_connector_config service role only"
  on pos_connector_config for all
  using (auth.jwt() ->> 'role' = 'service_role');

-- 4. payments: guests get select only on their own session_id; staff admin can select for reconciliation
create policy "Guest payment session select"
  on payments for select
  using (
    session_id = (auth.jwt() ->> 'table_session_id')::uuid
    or exists (
      select 1 from staff
      join orders on orders.id = payments.order_id
      join tables on tables.id = orders.table_id
      where staff.auth_user_id = auth.uid()
        and staff.venue_id = tables.venue_id
        and staff.role = 'admin'
        and staff.is_active = true
    )
  );

-- 5. payment_audit_events: service-role write, staff admin read-only
create policy "Staff admin payment audit events select"
  on payment_audit_events for select
  using (
    exists (
      select 1 from staff
      where staff.auth_user_id = auth.uid()
        and staff.role = 'admin'
        and staff.is_active = true
    )
  );

create policy "Service role payment audit events write"
  on payment_audit_events for insert
  with check (auth.jwt() ->> 'role' = 'service_role');
