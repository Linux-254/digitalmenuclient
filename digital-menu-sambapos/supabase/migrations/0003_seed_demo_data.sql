-- Seed Demo Data for Testimony Cafeteria Venue & Tableside OS
-- Synchronized with brand catalog, actual dishes, exact KES pricing, and staff credentials

-- 1. Venue
insert into venues (id, name, timezone, currency)
values ('11111111-1111-1111-1111-111111111111', 'Testimony Cafeteria', 'Africa/Nairobi', 'KES')
on conflict (id) do nothing;

-- 2. Staff Roster: authentication is managed outside the seed; no PINs are seeded.
insert into staff (id, venue_id, name, role, is_active)
values
  ('22222222-2222-2222-2222-222222222221', '11111111-1111-1111-1111-111111111111', 'Amina Mwangi', 'admin', true),
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Juma Otieno', 'waiter', true),
  ('22222222-2222-2222-2222-222222222223', '11111111-1111-1111-1111-111111111111', 'Faith Wanjiku', 'chef', true),
  ('22222222-2222-2222-2222-222222222224', '11111111-1111-1111-1111-111111111111', 'Kevin Kiprono', 'bar', true),
  ('22222222-2222-2222-2222-222222222225', '11111111-1111-1111-1111-111111111111', 'Sarah Nduta', 'waiter', true)
on conflict (id) do nothing;

-- 3. Tables (12 tables across Garden, Terrace, VIP, Indoor, Bar with QR tokens)
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

-- 4. Categories (Aligned with horizontal category rail)
insert into categories (id, venue_id, name, sort_order, station)
values
  ('44444444-4444-4444-4444-444444444401', '11111111-1111-1111-1111-111111111111', 'Starters', 1, 'kitchen'),
  ('44444444-4444-4444-4444-444444444402', '11111111-1111-1111-1111-111111111111', 'Grill & Steaks', 2, 'kitchen'),
  ('44444444-4444-4444-4444-444444444403', '11111111-1111-1111-1111-111111111111', 'Pizzas & Burgers', 3, 'kitchen'),
  ('44444444-4444-4444-4444-444444444404', '11111111-1111-1111-1111-111111111111', 'Pasta & Coastal', 4, 'kitchen'),
  ('44444444-4444-4444-4444-444444444405', '11111111-1111-1111-1111-111111111111', 'Drinks & Beverages', 5, 'bar'),
  ('44444444-4444-4444-4444-444444444406', '11111111-1111-1111-1111-111111111111', 'Desserts', 6, 'kitchen')
on conflict (id) do nothing;

-- 5. Complete Menu Items & Actual Dish Prices (KES)
insert into menu_items (id, venue_id, category_id, name, description, price, image_url, is_available, station)
values
  -- Starters
  ('55555555-5555-5555-5555-555555555501', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444401', 'Swahili Samosa Trio', 'Crisp golden handcrafted pastry filled with spiced minced beef, fresh coriander, ginger, and homemade coast tamarind dip.', 650.00, '/images/beef-pizza.jpg', true, 'kitchen'),
  ('55555555-5555-5555-5555-555555555502', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444401', 'Salt & Pepper Calamari', 'Lightly dusted tender Indian Ocean baby squid tossed with crushed sea salt, lime zest, spring onions, and roasted chili garlic aioli.', 950.00, '/images/tilapia-curry.jpg', true, 'kitchen'),

  -- Grill & Steaks
  ('55555555-5555-5555-5555-555555555503', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444402', 'Signature Nyama Choma Platter', 'Slow charcoal-grilled prime goat cuts seasoned with crushed sea salt, roasted sweet peppers, ugali, and fresh garden kachumbari.', 1950.00, '/images/hero-banner.jpg', true, 'kitchen'),
  ('55555555-5555-5555-5555-555555555504', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444402', 'Flame Grilled Chicken Steak', 'Succulent boneless chicken breast marinated in fresh herbs and black pepper glaze, served with hand-cut fries and house salad.', 1350.00, '/images/chicken-steak.jpg', true, 'kitchen'),
  ('55555555-5555-5555-5555-555555555505', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444402', 'Spiced Lamb Chops Tikka', 'Tender marinated lamb chops seared on charcoal embers with smoked paprika, cumin butter, mint yogurt, and roasted baby potatoes.', 2100.00, '/images/hero-banner.jpg', true, 'kitchen'),

  -- Pizzas & Burgers
  ('55555555-5555-5555-5555-555555555506', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444403', 'Artisan Beef Pizza', 'Wood-fired sourdough crust, slow-simmered tomato passata, melted mozzarella, spiced minced beef, caramelized onions, and oregano.', 1650.00, '/images/beef-pizza.jpg', true, 'kitchen'),
  ('55555555-5555-5555-5555-555555555507', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444403', 'Gourmet Charcoal Burger', 'Artisanal black charcoal brioche bun, 200g prime beef patty, melted cheddar, crisp iceberg lettuce, dill pickles, and truffle garlic aioli.', 1450.00, '/images/black-burger.jpg', true, 'kitchen'),
  ('55555555-5555-5555-5555-555555555508', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444403', 'Margherita Supreme', 'San Marzano tomato base, fresh buffalo mozzarella, aromatic sweet basil leaves, and extra virgin cold-pressed olive oil.', 1250.00, '/images/beef-pizza.jpg', true, 'kitchen'),

  -- Pasta & Coastal
  ('55555555-5555-5555-5555-555555555509', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444404', 'Coastal Tilapia Coconut Curry', 'Fresh Lake Victoria tilapia simmered in rich coconut milk reduction, turmeric, ginger, fresh lime, cilantro, and jasmine rice.', 1850.00, '/images/tilapia-curry.jpg', true, 'kitchen'),
  ('55555555-5555-5555-5555-555555555510', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444404', 'Spaghetti Bolognese Tagliatelle', 'Traditional slow-braised minced beef ragù, plum tomatoes, fresh rosemary, aged parmesan shavings, and torn Italian basil.', 1250.00, '/images/spaghetti.jpg', true, 'kitchen'),
  ('55555555-5555-5555-5555-555555555511', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444404', 'Swahili Garlic Coconut Prawns', 'Jumbo coastal ocean prawns sautéed in garlic, crushed chili, coconut cream, and fresh lime, served with buttery herb naan bread.', 2250.00, '/images/tilapia-curry.jpg', true, 'kitchen'),

  -- Drinks & Beverages
  ('55555555-5555-5555-5555-555555555512', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444405', 'Cold-Pressed Passion Mango', 'Pure cold-pressed coastal mango pulp blended with tart wild passion fruit, sparkling water, and fresh garden mint leaves.', 450.00, '/images/hero-banner.jpg', true, 'bar'),
  ('55555555-5555-5555-5555-555555555513', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444405', 'Traditional Kenyan Dawa', 'Hot natural wild forest honey, crushed organic ginger, fresh lime wedges, served with a natural Kenyan sugarcane stirring wand.', 400.00, '/images/hero-banner.jpg', true, 'bar'),
  ('55555555-5555-5555-5555-555555555514', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444405', 'Hibiscus Mint Iced Cooler', 'Chilled crimson roselle hibiscus flower brew, crushed spearmint, a squeeze of fresh lime, and organic cane nectar.', 380.00, '/images/hero-banner.jpg', true, 'bar'),
  ('55555555-5555-5555-5555-555555555515', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444405', 'Coastal Tamarind Sparkler', 'Tangy artisanal tamarind syrup pressed in-house, sparkling mineral water, crushed ice, and a roasted chili salt rim.', 390.00, '/images/hero-banner.jpg', true, 'bar'),
  ('55555555-5555-5555-5555-555555555516', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444405', 'Kenyan Crisp Apple Cider (500ml)', 'Crisp, chilled premium Kenyan cider made with real apples. Served in an ice-frosted glass with a slice of fresh green apple.', 480.00, '/images/hero-banner.jpg', true, 'bar'),
  ('55555555-5555-5555-5555-555555555517', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444405', 'Single Origin AA Cold Brew Espresso', 'Nyeri high-altitude single estate arabica, slow cold-extracted for 18 hours with bright citrus undertones and silky crema.', 350.00, '/images/hero-banner.jpg', true, 'bar'),
  ('55555555-5555-5555-5555-555555555518', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444405', 'Fresh Mint & Lime Mojito Mocktail', 'Muddled fresh garden mint, Persian lime juice, raw cane syrup, sparkling club soda, and crushed ice.', 420.00, '/images/hero-banner.jpg', true, 'bar'),
  ('55555555-5555-5555-5555-555555555519', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444405', 'Shamba Spiced Masala Chai', 'Fresh Kericho gold tea leaves brewed with whole milk, crushed green cardamom pods, cinnamon bark, and fresh ginger.', 320.00, '/images/hero-banner.jpg', true, 'bar'),

  -- Desserts
  ('55555555-5555-5555-5555-555555555520', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444406', 'Cardamom Honey Creme Flan', 'Silky baked cream custard infused with coastal green cardamom, wild honey caramel reduction, and roasted crushed cashews.', 550.00, '/images/spaghetti.jpg', true, 'kitchen'),
  ('55555555-5555-5555-5555-555555555521', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444406', 'Belgian Dark Chocolate Lava Cake', 'Warm molten 70% dark cocoa fondant cake served with Madagascar bourbon vanilla bean gelato and strawberry coulis.', 750.00, '/images/black-burger.jpg', true, 'kitchen')
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  image_url = excluded.image_url,
  station = excluded.station;
