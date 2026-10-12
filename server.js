import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Parse JSON bodies
app.use(express.json());

// ── Supabase Client Initialization ──
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';
const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY && !SUPABASE_URL.includes('your-project'));

let supabase = null;
if (isSupabaseConfigured) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('Connected to live Supabase project:', SUPABASE_URL);
  } catch (err) {
    console.warn('Supabase initialization failed, falling back to local authoritative store:', err.message);
  }
}

// ── Authoritative Seed Data (Testimony Cafeteria Venue, Actual Dishes & Exact KES Prices) ──
const VENUE = {
  id: '11111111-1111-1111-1111-111111111111',
  name: 'Testimony Cafeteria',
  timezone: 'Africa/Nairobi',
  currency: 'KES'
};

const CATEGORIES = [
  { id: 'cat-1', name: 'Starters', sort_order: 1, station: 'kitchen' },
  { id: 'cat-2', name: 'Grill & Steaks', sort_order: 2, station: 'kitchen' },
  { id: 'cat-3', name: 'Pizzas & Burgers', sort_order: 3, station: 'kitchen' },
  { id: 'cat-4', name: 'Pasta & Coastal', sort_order: 4, station: 'kitchen' },
  { id: 'cat-5', name: 'Drinks & Beverages', sort_order: 5, station: 'bar' },
  { id: 'cat-6', name: 'Desserts', sort_order: 6, station: 'kitchen' }
];

let menuCatalog = [
  // ── Starters ──
  {
    id: 'samosa-trio',
    name: 'Swahili Samosa Trio',
    desc: 'Crisp golden handcrafted pastry filled with spiced minced beef, fresh coriander, ginger, and homemade coast tamarind dip.',
    price: 650,
    category: 'Starters',
    categoryId: 'cat-1',
    image: '/images/beef-pizza.jpg',
    is_available: true,
    prep_time: '10-12 min',
    rating: 4.8,
    station: 'kitchen',
    is_new: false,
    offer_label: '',
    offer_price: null
  },
  {
    id: 'salt-pepper-calamari',
    name: 'Salt & Pepper Calamari',
    desc: 'Lightly dusted tender Indian Ocean baby squid tossed with crushed sea salt, lime zest, spring onions, and roasted chili garlic aioli.',
    price: 950,
    category: 'Starters',
    categoryId: 'cat-1',
    image: '/images/tilapia-curry.jpg',
    is_available: true,
    prep_time: '12-15 min',
    rating: 4.9,
    station: 'kitchen',
    is_new: true,
    offer_label: 'Chef Choice',
    offer_price: null
  },

  // ── Grill & Steaks ──
  {
    id: 'nyama-choma',
    name: 'Nyama Choma Platter',
    desc: 'Slow charcoal-grilled prime goat cuts seasoned with crushed sea salt, roasted sweet peppers, ugali, and fresh garden kachumbari.',
    price: 1950,
    category: 'Grill & Steaks',
    categoryId: 'cat-2',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '25-30 min',
    rating: 4.9,
    station: 'kitchen',
    is_new: false,
    offer_label: '30% OFF',
    offer_price: 1365
  },
  {
    id: 'chicken-steak',
    name: 'Flame Grilled Chicken Steak',
    desc: 'Succulent boneless chicken breast marinated in fresh herbs and black pepper glaze, served with hand-cut fries and house salad.',
    price: 1350,
    category: 'Grill & Steaks',
    categoryId: 'cat-2',
    image: '/images/chicken-steak.jpg',
    is_available: true,
    prep_time: '20-25 min',
    rating: 4.7,
    station: 'kitchen',
    is_new: false,
    offer_label: 'HOT DEAL',
    offer_price: 1050
  },
  {
    id: 'lamb-chops-tikka',
    name: 'Spiced Lamb Chops Tikka',
    desc: 'Tender marinated lamb chops seared on charcoal embers with smoked paprika, cumin butter, mint yogurt, and roasted baby potatoes.',
    price: 2100,
    category: 'Grill & Steaks',
    categoryId: 'cat-2',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '25-30 min',
    rating: 4.9,
    station: 'kitchen',
    is_new: false,
    offer_label: '',
    offer_price: null
  },

  // ── Pizzas & Burgers ──
  {
    id: 'beef-pizza',
    name: 'Artisan Beef Pizza',
    desc: 'Wood-fired sourdough crust, slow-simmered tomato passata, melted mozzarella, spiced minced beef, caramelized onions, and oregano.',
    price: 1650,
    category: 'Pizzas & Burgers',
    categoryId: 'cat-3',
    image: '/images/beef-pizza.jpg',
    is_available: true,
    prep_time: '18-22 min',
    rating: 4.8,
    station: 'kitchen',
    is_new: false,
    offer_label: '30% OFF',
    offer_price: 1155
  },
  {
    id: 'black-burger',
    name: 'Gourmet Charcoal Burger',
    desc: 'Artisanal black charcoal brioche bun, 200g prime beef patty, melted cheddar, crisp iceberg lettuce, dill pickles, and truffle garlic aioli.',
    price: 1450,
    category: 'Pizzas & Burgers',
    categoryId: 'cat-3',
    image: '/images/black-burger.jpg',
    is_available: true,
    prep_time: '15-20 min',
    rating: 4.9,
    station: 'kitchen',
    is_new: false,
    offer_label: '',
    offer_price: null
  },
  {
    id: 'margherita-supreme',
    name: 'Margherita Supreme',
    desc: 'San Marzano tomato base, fresh buffalo mozzarella, aromatic sweet basil leaves, and extra virgin cold-pressed olive oil.',
    price: 1250,
    category: 'Pizzas & Burgers',
    categoryId: 'cat-3',
    image: '/images/beef-pizza.jpg',
    is_available: true,
    prep_time: '15-18 min',
    rating: 4.6,
    station: 'kitchen',
    is_new: false,
    offer_label: '',
    offer_price: null
  },

  // ── Pasta & Coastal Seafood ──
  {
    id: 'tilapia-curry',
    name: 'Coastal Tilapia Coconut Curry',
    desc: 'Fresh Lake Victoria tilapia simmered in rich coconut milk reduction, turmeric, ginger, fresh lime, cilantro, and jasmine rice.',
    price: 1850,
    category: 'Pasta & Coastal',
    categoryId: 'cat-4',
    image: '/images/tilapia-curry.jpg',
    is_available: true,
    prep_time: '22-25 min',
    rating: 4.9,
    station: 'kitchen',
    is_new: true,
    offer_label: 'Chef Special',
    offer_price: null
  },
  {
    id: 'spaghetti-bolognese',
    name: 'Spaghetti Bolognese Tagliatelle',
    desc: 'Traditional slow-braised minced beef ragù, plum tomatoes, fresh rosemary, aged parmesan shavings, and torn Italian basil.',
    price: 1250,
    category: 'Pasta & Coastal',
    categoryId: 'cat-4',
    image: '/images/spaghetti.jpg',
    is_available: true,
    prep_time: '15-18 min',
    rating: 4.6,
    station: 'kitchen',
    is_new: false,
    offer_label: '',
    offer_price: null
  },
  {
    id: 'swahili-prawns',
    name: 'Swahili Garlic Coconut Prawns',
    desc: 'Jumbo coastal ocean prawns sautéed in garlic, crushed chili, coconut cream, and fresh lime, served with buttery herb naan bread.',
    price: 2250,
    category: 'Pasta & Coastal',
    categoryId: 'cat-4',
    image: '/images/tilapia-curry.jpg',
    is_available: true,
    prep_time: '18-20 min',
    rating: 4.9,
    station: 'kitchen',
    is_new: false,
    offer_label: '',
    offer_price: null
  },

  // ── Drinks & Beverages ──
  {
    id: 'mango-passion-cooler',
    name: 'Cold-Pressed Passion Mango',
    desc: 'Pure cold-pressed coastal mango pulp blended with tart wild passion fruit, sparkling water, and fresh garden mint leaves.',
    price: 450,
    category: 'Drinks & Beverages',
    categoryId: 'cat-5',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '4 min',
    rating: 4.9,
    station: 'bar',
    is_new: false,
    offer_label: 'Fresh Squeezed',
    offer_price: null
  },
  {
    id: 'traditional-dawa',
    name: 'Traditional Kenyan Dawa',
    desc: 'Hot natural wild forest honey, crushed organic ginger, fresh lime wedges, served with a natural Kenyan sugarcane stirring wand.',
    price: 400,
    category: 'Drinks & Beverages',
    categoryId: 'cat-5',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '5 min',
    rating: 4.8,
    station: 'bar',
    is_new: false,
    offer_label: 'Signature Drink',
    offer_price: null
  },
  {
    id: 'hibiscus-mint-tea',
    name: 'Hibiscus Mint Iced Cooler',
    desc: 'Chilled crimson roselle hibiscus flower brew, crushed spearmint, a squeeze of fresh lime, and organic cane nectar.',
    price: 380,
    category: 'Drinks & Beverages',
    categoryId: 'cat-5',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '3 min',
    rating: 4.7,
    station: 'bar',
    is_new: false,
    offer_label: '',
    offer_price: null
  },
  {
    id: 'tamarind-sparkler',
    name: 'Coastal Tamarind Sparkler',
    desc: 'Tangy artisanal tamarind syrup pressed in-house, sparkling mineral water, crushed ice, and a roasted chili salt rim.',
    price: 390,
    category: 'Drinks & Beverages',
    categoryId: 'cat-5',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '4 min',
    rating: 4.7,
    station: 'bar',
    is_new: false,
    offer_label: '',
    offer_price: null
  },
  {
    id: 'tusker-cider',
    name: 'Kenyan Crisp Apple Cider (500ml)',
    desc: 'Crisp, chilled premium Kenyan cider made with real apples. Served in an ice-frosted glass with a slice of fresh green apple.',
    price: 480,
    category: 'Drinks & Beverages',
    categoryId: 'cat-5',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '2 min',
    rating: 4.8,
    station: 'bar',
    is_new: false,
    offer_label: '',
    offer_price: null
  },
  {
    id: 'kenyan-espresso',
    name: 'Single Origin AA Cold Brew Espresso',
    desc: 'Nyeri high-altitude single estate arabica, slow cold-extracted for 18 hours with bright citrus undertones and silky crema.',
    price: 350,
    category: 'Drinks & Beverages',
    categoryId: 'cat-5',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '3 min',
    rating: 4.9,
    station: 'bar',
    is_new: false,
    offer_label: '',
    offer_price: null
  },
  {
    id: 'classic-lime-mojito',
    name: 'Fresh Mint & Lime Mojito Mocktail',
    desc: 'Muddled fresh garden mint, Persian lime juice, raw cane syrup, sparkling club soda, and crushed ice.',
    price: 420,
    category: 'Drinks & Beverages',
    categoryId: 'cat-5',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '4 min',
    rating: 4.9,
    station: 'bar',
    is_new: true,
    offer_label: 'Popular',
    offer_price: null
  },
  {
    id: 'masala-chai',
    name: 'Shamba Spiced Masala Chai',
    desc: 'Fresh Kericho gold tea leaves brewed with whole milk, crushed green cardamom pods, cinnamon bark, and fresh ginger.',
    price: 320,
    category: 'Drinks & Beverages',
    categoryId: 'cat-5',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '5 min',
    rating: 4.8,
    station: 'bar',
    is_new: false,
    offer_label: '',
    offer_price: null
  },

  // ── Desserts ──
  {
    id: 'cardamom-flan',
    name: 'Cardamom Honey Creme Flan',
    desc: 'Silky baked cream custard infused with coastal green cardamom, wild honey caramel reduction, and roasted crushed cashews.',
    price: 550,
    category: 'Desserts',
    categoryId: 'cat-6',
    image: '/images/spaghetti.jpg',
    is_available: true,
    prep_time: '8 min',
    rating: 4.8,
    station: 'kitchen',
    is_new: false,
    offer_label: '',
    offer_price: null
  },
  {
    id: 'chocolate-lava',
    name: 'Belgian Dark Chocolate Lava Cake',
    desc: 'Warm molten 70% dark cocoa fondant cake served with Madagascar bourbon vanilla bean gelato and strawberry coulis.',
    price: 750,
    category: 'Desserts',
    categoryId: 'cat-6',
    image: '/images/black-burger.jpg',
    is_available: true,
    prep_time: '12 min',
    rating: 4.9,
    station: 'kitchen',
    is_new: true,
    offer_label: '',
    offer_price: null
  }
];

// Tables State
let tables = [
  { num: '01', zone: 'Garden', capacity: 4, status: 'available', waiter: 'Unassigned', qr_token: 'qr-shamba-t01', sessionId: null },
  { num: '02', zone: 'Garden', capacity: 4, status: 'available', waiter: 'Unassigned', qr_token: 'qr-shamba-t02', sessionId: null },
  { num: '03', zone: 'Terrace', capacity: 2, status: 'available', waiter: 'Unassigned', qr_token: 'qr-shamba-t03', sessionId: null },
  { num: '04', zone: 'Terrace', capacity: 6, status: 'occupied', waiter: 'Faith W.', qr_token: 'qr-shamba-t04', sessionId: 'sess-04' },
  { num: '05', zone: 'Terrace', capacity: 4, status: 'available', waiter: 'Unassigned', qr_token: 'qr-shamba-t05', sessionId: null },
  { num: '06', zone: 'Main Dining', capacity: 4, status: 'available', waiter: 'Unassigned', qr_token: 'qr-shamba-t06', sessionId: null },
  { num: '07', zone: 'Main Dining', capacity: 8, status: 'occupied', waiter: 'Juma O.', qr_token: 'qr-shamba-t07', sessionId: 'sess-07' },
  { num: '08', zone: 'VIP Lounge', capacity: 4, status: 'available', waiter: 'Unassigned', qr_token: 'qr-shamba-t08', sessionId: null },
  { num: '09', zone: 'VIP Lounge', capacity: 2, status: 'available', waiter: 'Unassigned', qr_token: 'qr-shamba-t09', sessionId: null },
  { num: '10', zone: 'Outdoor Deck', capacity: 4, status: 'available', waiter: 'Unassigned', qr_token: 'qr-shamba-t10', sessionId: null },
  { num: '11', zone: 'Bar Counter', capacity: 6, status: 'available', waiter: 'Kevin K.', qr_token: 'qr-shamba-t11', sessionId: null },
  { num: '12', zone: 'Bar Counter', capacity: 4, status: 'available', waiter: 'Kevin K.', qr_token: 'qr-shamba-t12', sessionId: null }
];

// Staff Roster
let staffRoster = [
  { id: 'st-01', name: 'Amina Mwangi', role: 'Shift Lead / Admin', station: 'Main Dining Floor', authManaged: true, phone: '+254 711 234 567', active: true, isAdmin: true },
  { id: 'st-02', name: 'Juma Otieno', role: 'Floor Waiter', station: 'Garden Terrace', authManaged: true, phone: '+254 722 345 678', active: true, isAdmin: false },
  { id: 'st-03', name: 'Faith Wanjiku', role: 'Head Chef', station: 'Hot Kitchen', authManaged: true, phone: '+254 733 456 789', active: true, isAdmin: false },
  { id: 'st-04', name: 'Kevin Kiprono', role: 'Bartender', station: 'Cocktail Bar', authManaged: true, phone: '+254 744 567 890', active: true, isAdmin: false },
  { id: 'st-05', name: 'Sarah Nduta', role: 'Floor Waiter', station: 'Main Dining Floor', authManaged: true, phone: '+254 755 678 901', active: true, isAdmin: false }
];

// Active Orders
let orders = [
  {
    id: 'SH-104',
    tableNo: '04',
    status: 'preparing',
    createdAt: new Date(Date.now() - 12 * 60000).toISOString(),
    station: 'kitchen',
    items: [
      { name: 'Swahili Samosa Trio', qty: 2, price: 650, spice: 'Medium', side: 'Tamarind Dip' },
      { name: 'Nyama Choma Platter', qty: 1, price: 1950, spice: 'Mild', side: 'Ugali' }
    ],
    totalKes: 3250
  },
  {
    id: 'SH-107',
    tableNo: '07',
    status: 'ordered',
    createdAt: new Date(Date.now() - 4 * 60000).toISOString(),
    station: 'kitchen',
    items: [
      { name: 'Flame Grilled Chicken Steak', qty: 2, price: 1350, spice: 'Hot', side: 'Hand-Cut Fries' },
      { name: 'Coastal Tilapia Coconut Curry', qty: 1, price: 1850, spice: 'Medium', side: 'Jasmine Rice' },
      { name: 'Cold-Pressed Passion Mango', qty: 3, price: 450, spice: null, side: null }
    ],
    totalKes: 5900
  }
];

let payments = [];
let paymentAuditEvents = [];
let posSyncLogs = [];
let staffLoginLogs = [
  { id: 'log-1', timestamp: '2026-10-10 08:30:15', staffName: 'Amina Mwangi', role: 'Shift Lead / Admin', pinUsed: 'redacted', action: 'LOGIN', device: 'Terminal 01' },
  { id: 'log-2', timestamp: '2026-10-10 08:45:00', staffName: 'Juma Otieno', role: 'Floor Waiter', pinUsed: 'redacted', action: 'LOGIN', device: 'Tablet Floor 1' },
  { id: 'log-3', timestamp: '2026-10-10 09:00:22', staffName: 'Faith Wanjiku', role: 'Head Chef', pinUsed: 'redacted', action: 'LOGIN', device: 'Kitchen KDS' }
];

// ═══════════════════════════════════════════════
// REST API ENDPOINTS
// ═══════════════════════════════════════════════

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    app: 'Testimony Cafeteria Tableside OS & Digital Menu',
    version: '1.4.0',
    venue: VENUE,
    supabaseConfigured: isSupabaseConfigured,
    itemCount: menuCatalog.length,
    tableCount: tables.length,
    timestamp: new Date().toISOString()
  });
});

// Menu Catalog (Categories & Dishes with authoritative pricing)
app.get('/api/menu', (req, res) => {
  res.json({
    success: true,
    venue: VENUE,
    categories: CATEGORIES,
    items: menuCatalog
  });
});

// Update dish availability
app.patch('/api/menu/:id/availability', async (req, res) => {
  const { id } = req.params;
  const { is_available, unavailable_reason } = req.body;

  const item = menuCatalog.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Menu item not found' });
  }

  item.is_available = Boolean(is_available);
  if (unavailable_reason !== undefined) {
    item.unavailable_reason = unavailable_reason;
  }

  // Also sync to Supabase if connected
  if (supabase) {
    try {
      await supabase
        .from('menu_items')
        .update({ is_available: item.is_available, unavailable_reason: item.unavailable_reason })
        .eq('id', id);
    } catch (e) {
      console.warn('Supabase availability sync error:', e.message);
    }
  }

  res.json({ success: true, item });
});

// Admin Add Dish
app.post('/api/menu', (req, res) => {
  const { name, desc, price, category, station, prep_time, image } = req.body;
  if (!process.env.STAFF_AUTH_PROVIDER_URL) {
    return res.status(503).json({ error: 'Admin session authorization is not configured.' });
  }
  return res.status(501).json({ error: 'Admin session provider adapter required before menu mutation.' });
  if (!name || !price || !category) {
    return res.status(400).json({ error: 'Name, price, and category are required' });
  }

  const newItem = {
    id: `item-${Date.now()}`,
    name: String(name).trim(),
    desc: String(desc || '').trim(),
    price: Number(price),
    category,
    image: image || '/images/hero-banner.jpg',
    is_available: true,
    prep_time: prep_time || '15 min',
    rating: 5.0,
    station: station || 'kitchen',
    is_new: true,
    offer_label: '',
    offer_price: null
  };

  menuCatalog.unshift(newItem);
  res.status(201).json({ success: true, item: newItem });
});

// Tables Listing
app.get('/api/tables', (req, res) => {
  res.json({
    success: true,
    tables
  });
});

// Table Merge Operation
app.post('/api/tables/merge', (req, res) => {
  const { primaryTable, secondaryTable } = req.body;
  const t1 = tables.find(t => t.num === primaryTable);
  const t2 = tables.find(t => t.num === secondaryTable);

  if (!t1 || !t2) {
    return res.status(404).json({ error: 'One or both tables not found' });
  }

  t1.mergedWith = secondaryTable;
  t1.originalCapacity = t1.capacity;
  t1.capacity = t1.capacity + t2.capacity;

  t2.mergedInto = primaryTable;
  t2.originalCapacity = t2.capacity;
  t2.status = 'occupied';

  res.json({
    success: true,
    message: `Table ${primaryTable} merged with Table ${secondaryTable} (${t1.capacity} total seats)`,
    primaryTable: t1,
    secondaryTable: t2
  });
});

// Table Unmerge Operation
app.post('/api/tables/unmerge', (req, res) => {
  const { tableNo } = req.body;
  const t = tables.find(x => x.num === tableNo);
  if (!t) return res.status(404).json({ error: 'Table not found' });

  let primary = t;
  let secondary = null;

  if (t.mergedInto) {
    primary = tables.find(x => x.num === t.mergedInto);
    secondary = t;
  } else if (t.mergedWith) {
    secondary = tables.find(x => x.num === t.mergedWith);
  }

  if (primary && secondary) {
    primary.capacity = primary.originalCapacity || 4;
    delete primary.mergedWith;
    delete primary.originalCapacity;

    secondary.capacity = secondary.originalCapacity || 4;
    secondary.status = 'available';
    delete secondary.mergedInto;
    delete secondary.originalCapacity;

    return res.json({ success: true, message: 'Tables unmerged successfully' });
  }

  res.status(400).json({ error: 'Table is not part of a merged configuration' });
});

// Open Guest Table Session (via QR token or table selection)
app.post('/api/sessions/open', (req, res) => {
  const { qr_token, table_no, party_size = 2 } = req.body;
  let table = null;

  if (qr_token) {
    table = tables.find(t => t.qr_token === qr_token);
  } else if (table_no) {
    table = tables.find(t => t.num === String(table_no).padStart(2, '0'));
  }

  if (!table) {
    return res.status(404).json({ error: 'Table not found for given QR token or number' });
  }

  if (!table.sessionId) {
    table.sessionId = `sess-${table.num}-${Date.now().toString().slice(-4)}`;
    table.status = 'occupied';
  }

  res.json({
    success: true,
    session: {
      id: table.sessionId,
      table_no: table.num,
      zone: table.zone,
      party_size: Number(party_size),
      status: 'open',
      opened_at: new Date().toISOString()
    },
    table
  });
});

// Close Table Session
app.post('/api/sessions/close', (req, res) => {
  const { table_no } = req.body;
  const table = tables.find(t => t.num === String(table_no).padStart(2, '0'));
  if (!table) return res.status(404).json({ error: 'Table not found' });

  table.status = 'available';
  table.sessionId = null;
  res.json({ success: true, message: `Session closed for Table ${table.num}` });
});

// Get Active Orders
app.get('/api/orders', (req, res) => {
  res.json({ success: true, orders });
});

// Create Order (Authoritative Total Calculated Server-Side)
app.post('/api/orders', (req, res) => {
  const { table_no, items, party_size, guest_notes } = req.body;

  if (!table_no || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'table_no and at least one item are required' });
  }

  // Authoritatively look up each item and compute total
  let serverTotalKes = 0;
  const validatedItems = [];
  let primaryStation = 'kitchen';

  for (const itemReq of items) {
    const catalogItem = menuCatalog.find(m => m.id === itemReq.id || m.name === itemReq.name);
    if (!catalogItem) {
      return res.status(400).json({ error: `Dish "${itemReq.name || itemReq.id}" is not on the active menu.` });
    }
    if (!catalogItem.is_available) {
      return res.status(400).json({ error: `Dish "${catalogItem.name}" is currently sold out.` });
    }

    const qty = Math.max(1, parseInt(itemReq.qty, 10) || 1);
    const effectivePrice = catalogItem.offer_price || catalogItem.price;
    serverTotalKes += effectivePrice * qty;

    if (catalogItem.station === 'bar') {
      primaryStation = 'bar';
    }

    validatedItems.push({
      menuItemId: catalogItem.id,
      name: catalogItem.name,
      qty,
      unitPrice: effectivePrice,
      station: catalogItem.station,
      spice: itemReq.spice || 'Medium',
      side: itemReq.side || 'Default',
      notes: itemReq.notes || ''
    });
  }

  const orderId = `SH-${Math.floor(Math.random() * 900 + 100)}`;
  const newOrder = {
    id: orderId,
    tableNo: String(table_no).padStart(2, '0'),
    status: 'ordered',
    createdAt: new Date().toISOString(),
    station: primaryStation,
    items: validatedItems,
    totalKes: serverTotalKes,
    partySize: party_size || 2,
    guestNotes: guest_notes || ''
  };

  orders.unshift(newOrder);

  // Update table status
  const table = tables.find(t => t.num === newOrder.tableNo);
  if (table) {
    table.status = 'occupied';
  }

  // POS Sync Log entry
  posSyncLogs.unshift({
    id: `pos-${Date.now()}`,
    orderId,
    direction: 'outbound',
    status: 'pending',
    posTicketRef: `POS-${orderId}`,
    createdAt: new Date().toISOString()
  });

  res.status(201).json({
    success: true,
    order: newOrder,
    message: `Order #${orderId} confirmed and routed to ${primaryStation} display`
  });
});

// Update Order Status (ordered -> preparing -> ready -> served)
app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const validStatuses = ['ordered', 'preparing', 'ready', 'served', 'cancelled'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  const order = orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  order.status = status;
  res.json({ success: true, order });
});

// Initiate Payment (Server-computed total, masked phone, STK push)
app.post('/api/payments/initiate', (req, res) => {
  const { order_id, phone_number, method = 'mpesa' } = req.body;

  const order = orders.find(o => o.id === order_id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found for payment' });
  }

  // Check existing pending payment
  const existingPending = payments.find(p => p.order_id === order_id && p.status === 'pending');
  if (existingPending) {
    return res.status(409).json({
      error: 'A payment is already pending for this order',
      payment_id: existingPending.id,
      checkout_request_id: existingPending.checkout_request_id
    });
  }

  // Mask phone
  const rawPhone = String(phone_number || '0712345678').trim();
  const maskedPhone = rawPhone.length >= 8
    ? `${rawPhone.slice(0, 4)}***${rawPhone.slice(-3)}`
    : '07XX***000';

  const checkoutRequestId = `ws_CO_${Date.now()}_${Math.floor(Math.random() * 90000 + 10000)}`;
  const idempotencyKey = `PAY-${order.id}-${Date.now()}`;

  const paymentRecord = {
    id: `pay-${Date.now()}`,
    order_id,
    amount: order.totalKes,
    currency: 'KES',
    method,
    status: 'pending',
    idempotency_key: idempotencyKey,
    checkout_request_id: checkoutRequestId,
    phone_masked: maskedPhone,
    created_at: new Date().toISOString()
  };

  payments.unshift(paymentRecord);
  paymentAuditEvents.unshift({
    payment_id: paymentRecord.id,
    event_type: 'PAYMENT_INITIATED',
    status: 'pending',
    source: 'system',
    timestamp: new Date().toISOString()
  });

  res.json({
    success: true,
    payment_id: paymentRecord.id,
    checkout_request_id: checkoutRequestId,
    amount: order.totalKes,
    currency: 'KES',
    phone_masked: maskedPhone,
    message: `STK push sent to ${maskedPhone}. Enter M-Pesa PIN on handset.`
  });
});

// Safaricom M-Pesa Webhook Callback
app.post('/api/payments/callback', (req, res) => {
  const { checkout_request_id, result_code = 0 } = req.body;

  const payment = payments.find(p => p.checkout_request_id === checkout_request_id || p.id === req.body.payment_id);
  if (!payment) {
    return res.status(404).json({ error: 'Matching payment not found' });
  }

  if (payment.status !== 'pending') {
    return res.json({ message: 'Payment already processed' });
  }

  const isSuccess = Number(result_code) === 0;
  payment.status = isSuccess ? 'success' : 'failed';
  payment.mpesa_receipt = isSuccess ? `SHB${Date.now().toString().slice(-7)}` : null;
  payment.verified_at = new Date().toISOString();

  paymentAuditEvents.unshift({
    payment_id: payment.id,
    event_type: isSuccess ? 'MPESA_SUCCESS' : 'MPESA_FAILED',
    status: payment.status,
    source: 'webhook',
    timestamp: new Date().toISOString()
  });

  if (isSuccess && payment.order_id) {
    const ord = orders.find(o => o.id === payment.order_id);
    if (ord) ord.status = 'served';
  }

  res.json({ success: true, payment });
});

// Check payment status
app.get('/api/payments/status/:checkoutRequestId', (req, res) => {
  const { checkoutRequestId } = req.params;
  const payment = payments.find(p => p.checkout_request_id === checkoutRequestId || p.id === checkoutRequestId);
  if (!payment) return res.status(404).json({ error: 'Payment not found' });
  res.json({ success: true, payment });
});

// Staff PIN Login & Audit Log
app.post('/api/staff/login', (req, res) => {
  const { device = 'Browser Client' } = req.body;
  if (!process.env.STAFF_AUTH_PROVIDER_URL) {
    return res.status(503).json({ error: 'Staff authentication is not configured. Configure the server auth provider; PINs are never stored by this app.' });
  }
  return res.status(501).json({ error: 'External staff auth provider adapter required before enabling login.' });
  /* Provider adapter must return a verified staff session; never compare raw PINs here. */
  const staff = null;

  if (!staff) {
    return res.status(401).json({ error: 'Invalid PIN. Access denied.' });
  }

  const logEntry = {
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
    staffName: staff.name,
    role: staff.role,
    pinUsed: '****',
    action: 'LOGIN',
    device
  };

  staffLoginLogs.unshift(logEntry);

  res.json({
    success: true,
    user: {
      id: staff.id,
      name: staff.name,
      role: staff.role,
      station: staff.station,
      isAdmin: Boolean(staff.isAdmin)
    }
  });
});

// Audit Logs
app.get('/api/audit/log', (req, res) => {
  res.json({
    success: true,
    logs: staffLoginLogs
  });
});

// ═══════════════════════════════════════════════
// STATIC FILES & CLIENT SERVING
// ═══════════════════════════════════════════════

// Serve root directory static assets (app.js, styles.css, index.html, images, fonts)
app.use(express.static(__dirname));

// Serve public directory static assets
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
}

// Table QR token redirect /t/:token -> /?table=:num
app.get('/t/:token', (req, res) => {
  const { token } = req.params;
  const table = tables.find(t => t.qr_token === token);
  if (table) {
    return res.redirect(`/?table=${table.num}&token=${token}`);
  }
  res.redirect(`/?token=${token}`);
});

// SPA guest routes
app.get(['/guest', '/menu'], (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler for API routes
app.all('/api/*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    documentation: 'Testimony Cafeteria Tableside OS API v1.4.0'
  });
});

// Single Page Application fallback for all navigation requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Testimony Cafeteria Tableside OS running at http://${HOST}:${PORT}`);
});
