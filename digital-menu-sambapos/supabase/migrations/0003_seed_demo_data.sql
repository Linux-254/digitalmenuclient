-- Seed Demo Data for Shamba House Venue & Tableside OS

-- 1. Venue
insert into venues (id, name, timezone, currency)
values ('11111111-1111-1111-1111-111111111111', 'Shamba House', 'Africa/Nairobi', 'KES')
on conflict (id) do nothing;

-- 2. Staff
insert into staff (id, venue_id, name, role, is_active)
values
  ('22222222-2222-2222-2222-222222222221', '11111111-1111-1111-1111-111111111111', 'Amina Mwangi', 'admin', true),
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Peter Otieno', 'chef', true),
  ('22222222-2222-2222-2222-222222222223', '11111111-1111-1111-1111-111111111111', 'Faith Wanjiku', 'waiter', true),
  ('22222222-2222-2222-2222-222222222224', '11111111-1111-1111-1111-111111111111', 'Kevin Kiprono', 'bar', true)
on conflict (id) do nothing;

-- 3. Tables (12 tables with QR tokens)
insert into tables (id, venue_id, table_no, seat_capacity, qr_token, status)
values
  ('33333333-3333-3333-3333-333333333301', '11111111-1111-1111-1111-111111111111', '01', 4, 'qr-shamba-t01', 'available'),
  ('33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111111', '02', 4, 'qr-shamba-t02', 'available'),
  ('33333333-3333-3333-3333-333333333303', '11111111-1111-1111-1111-111111111111', '03', 2, 'qr-shamba-t03', 'available'),
  ('33333333-3333-3333-3333-333333333304', '11111111-1111-1111-1111-111111111111', '04', 6, 'qr-shamba-t04', 'occupied'),
  ('33333333-3333-3333-3333-333333333305', '11111111-1111-1111-1111-111111111111', '05', 4, 'qr-shamba-t05', 'available'),
  ('33333333-3333-3333-3333-333333333306', '11111111-1111-1111-1111-111111111111', '06', 4, 'qr-shamba-t06', 'available'),
  ('33333333-3333-3333-3333-333333333307', '11111111-1111-1111-1111-111111111111', '07', 8, 'qr-shamba-t07', 'occupied'),
  ('33333333-3333-3333-3333-333333333308', '11111111-1111-1111-1111-111111111111', '08', 4, 'qr-shamba-t08', 'available'),
  ('33333333-3333-3333-3333-333333333309', '11111111-1111-1111-1111-111111111111', '09', 2, 'qr-shamba-t09', 'available'),
  ('33333333-3333-3333-3333-333333333310', '11111111-1111-1111-1111-111111111111', '10', 4, 'qr-shamba-t10', 'available'),
  ('33333333-3333-3333-3333-333333333311', '11111111-1111-1111-1111-111111111111', '11', 6, 'qr-shamba-t11', 'available'),
  ('33333333-3333-3333-3333-333333333312', '11111111-1111-1111-1111-111111111111', '12', 4, 'qr-shamba-t12', 'available')
on conflict (id) do nothing;

-- 4. Categories
insert into categories (id, venue_id, name, sort_order, station)
values
  ('44444444-4444-4444-4444-444444444401', '11111111-1111-1111-1111-111111111111', 'Starters', 1, 'kitchen'),
  ('44444444-4444-4444-4444-444444444402', '11111111-1111-1111-1111-111111111111', 'Grill & Steaks', 2, 'kitchen'),
  ('44444444-4444-4444-4444-444444444403', '11111111-1111-1111-1111-111111111111', 'Pizzas & Burgers', 3, 'kitchen'),
  ('44444444-4444-4444-4444-444444444404', '11111111-1111-1111-1111-111111111111', 'Pasta & Coastal', 4, 'kitchen'),
  ('44444444-4444-4444-4444-444444444405', '11111111-1111-1111-1111-111111111111', 'Juices & Drinks', 5, 'bar'),
  ('44444444-4444-4444-4444-444444444406', '11111111-1111-1111-1111-111111111111', 'Desserts', 6, 'kitchen')
on conflict (id) do nothing;

-- 5. Menu Items
insert into menu_items (id, venue_id, category_id, name, description, price, image_url, is_available, station)
values
  ('55555555-5555-5555-5555-555555555501', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444401', 'Swahili Samosa Trio', 'Crispy spiced beef and vegetarian samosas served with sweet tamarind chutney.', 650.00, '/images/beef-pizza.jpg', true, 'kitchen'),
  ('55555555-5555-5555-5555-555555555502', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444402', 'Signature Nyama Choma Platter', 'Slow-charred prime goat cuts with kachumbari, charred chilies, and ugali.', 1950.00, '/images/chicken-steak.jpg', true, 'kitchen'),
  ('55555555-5555-5555-5555-555555555503', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444402', 'Charcoal Herb Chicken Steak', 'Deboned half-chicken marinated in garlic, rosemary, and lemon, with hand-cut fries.', 1450.00, '/images/chicken-steak.jpg', true, 'kitchen'),
  ('55555555-5555-5555-5555-555555555504', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444403', 'Woodfire Beef & Mozzarella Pizza', 'Thin crust, slow-simmered tomato sugo, spiced beef, fresh oregano, and mozzarella.', 1350.00, '/images/beef-pizza.jpg', true, 'kitchen'),
  ('55555555-5555-5555-5555-555555555505', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444403', 'Black Brioche Angus Burger', 'Juicy Angus beef patty, smoked cheddar, caramelized onions on charcoal brioche.', 1150.00, '/images/black-burger.jpg', true, 'kitchen'),
  ('55555555-5555-5555-5555-555555555506', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444404', 'Coastal Tilapia Coconut Curry', 'Fresh Lake Victoria tilapia simmered in rich coconut milk, turmeric, and lime.', 1850.00, '/images/tilapia-curry.jpg', true, 'kitchen'),
  ('55555555-5555-5555-5555-555555555507', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444404', 'Spaghetti Bolognese Tagliatelle', 'Slow-braised beef ragù, plum tomatoes, fresh rosemary, and aged parmesan.', 1250.00, '/images/spaghetti.jpg', true, 'kitchen'),
  ('55555555-5555-5555-5555-555555555508', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444405', 'Cold-Pressed Passion Mango Cooler', 'Fresh coastal mango pulp blended with tart wild passion fruit and sparkling water.', 450.00, '/images/hero-banner.jpg', true, 'bar'),
  ('55555555-5555-5555-5555-555555555509', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444405', 'Traditional Kenyan Dawa', 'Hot natural wild forest honey, organic crushed ginger, and fresh lime wedges.', 400.00, '/images/hero-banner.jpg', true, 'bar')
on conflict (id) do nothing;