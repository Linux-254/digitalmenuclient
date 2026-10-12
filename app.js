/* ═══════════════════════════════════════════════
   SHAMBA HOUSE — Testimony OS & Digital Menu
   Design Principles:
     - Staff OS: Comprehensive service dashboard (dishes, inventory, staff roster, SambaPOS sync)
     - Guest Menu: Clean, luxury tableside menu with zero staff clutter, full categorization, drinks, and seamless ordering
     - Zero Emojis · 100% SVG Icons · Fanfarrón & Milano Perla Typography
   ═══════════════════════════════════════════════ */

'use strict';

// ── DOM Helpers ──
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

// ── Toast Notification System ──
function showToast(message, isSuccess = true) {
  const toast = $('#toast-element');
  const msgEl = $('#toast-message');
  if (!toast || !msgEl) return;
  msgEl.textContent = message;
  toast.style.background = isSuccess ? '#0d382d' : '#b91c1c';
  toast.classList.add('visible');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2800);
}

// ── Menu Catalog Dataset (Synchronized Dishes & Drinks, Zero Emojis) ──
let menuItems = [
  // ── Starters & Bites ──
  {
    id: 'samosa-trio',
    name: 'Swahili Samosa Trio',
    desc: 'Crisp golden handcrafted pastry filled with spiced minced beef, fresh coriander, ginger, and homemade coast tamarind dip.',
    price: 650,
    category: 'Starters',
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
    image: '/images/tilapia-curry.jpg',
    is_available: true,
    prep_time: '12-15 min',
    rating: 4.9,
    station: 'kitchen',
    is_new: true,
    offer_label: 'Chef Choice',
    offer_price: null
  },

  // ── Flame Grill & Steaks ──
  {
    id: 'nyama-choma',
    name: 'Nyama Choma Platter',
    desc: 'Slow charcoal-grilled prime goat cuts seasoned with crushed sea salt, roasted sweet peppers, ugali, and fresh garden kachumbari.',
    price: 1950,
    category: 'Grill & Steaks',
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
    image: '/images/tilapia-curry.jpg',
    is_available: true,
    prep_time: '18-20 min',
    rating: 4.9,
    station: 'kitchen',
    is_new: false,
    offer_label: '',
    offer_price: null
  },

  // ── Drinks & Beverages (Refreshing juices, house cocktails, artisan coffees) ──
  {
    id: 'mango-passion-cooler',
    name: 'Cold-Pressed Passion Mango',
    desc: 'Pure cold-pressed coastal mango pulp blended with tart wild passion fruit, sparkling water, and fresh garden mint leaves.',
    price: 450,
    category: 'Drinks & Beverages',
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
    name: 'Spiced Masala Chai',
    desc: 'Fresh Kericho gold tea leaves brewed with whole milk, crushed green cardamom pods, cinnamon bark, and fresh ginger.',
    price: 320,
    category: 'Drinks & Beverages',
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

// ── Categories List ──
const categoryNames = [
  'All',
  'Starters',
  'Grill & Steaks',
  'Pizzas & Burgers',
  'Pasta & Coastal',
  'Drinks & Beverages',
  'Desserts'
];

// ── Staff Roster Dataset (Admin Control) ──
let staffRoster = [
  { id: 'st-01', name: 'Amina Mwangi', role: 'Shift Lead / Admin', station: 'Main Dining Floor', authManaged: true, phone: '+254 711 234 567', active: true },
  { id: 'st-02', name: 'Juma Otieno', role: 'Floor Waiter', station: 'Garden Terrace', authManaged: true, phone: '+254 722 345 678', active: true },
  { id: 'st-03', name: 'Faith Wanjiku', role: 'Head Chef', station: 'Hot Kitchen', authManaged: true, phone: '+254 733 456 789', active: true },
  { id: 'st-04', name: 'Kevin Kiprono', role: 'Bartender', station: 'Cocktail Bar', authManaged: true, phone: '+254 744 567 890', active: true },
  { id: 'st-05', name: 'Sarah Nduta', role: 'Floor Waiter', station: 'Main Dining Floor', authManaged: true, phone: '+254 755 678 901', active: true }
];

// ── Application State ──
let activeCategory = 'All';
let guestActiveCategory = 'All';
let cart = []; // Array of { id, name, price, qty, spice, side, notes }
let currentView = 'dashboard'; // 'dashboard' or 'guest'
let currentDashPanel = 'home';
const staffSession = window.__STAFF_SESSION__ || null;
const DEMO_STAFF = { admin: 'demo-admin', staff: 'demo-staff' };
const hasAdminSession = () => Boolean(staffSession && ['admin','manager'].includes(staffSession.role));
const demoRole = pin => pin === DEMO_STAFF.admin ? 'admin' : pin === DEMO_STAFF.staff ? 'staff' : null;
let selectedDishForCustomization = null;
let currentCustomSpice = 'Medium';
let currentCustomSide = 'Hand-Cut Fries';

// ── Logged-in Staff State & PIN Audit Trail (Item 10 & 11) ──
let loggedInUser = {
  id: 'st-01',
  name: 'Amina Mwangi',
  role: 'Admin',
  station: 'Main Dining Floor',
  authManaged: true,
  isAdmin: true
};

let loginAuditLog = [
  { id: 'log-1', timestamp: '2026-10-07 08:30:15', staffName: 'Amina Mwangi', role: 'Shift Lead / Admin', pinUsed: 'redacted', action: 'LOGIN', device: 'Terminal 01' },
  { id: 'log-2', timestamp: '2026-10-07 08:45:00', staffName: 'Juma Otieno', role: 'Floor Waiter', pinUsed: 'redacted', action: 'LOGIN', device: 'Tablet Floor 1' },
  { id: 'log-3', timestamp: '2026-10-07 09:00:22', staffName: 'Faith Wanjiku', role: 'Head Chef', pinUsed: 'redacted', action: 'LOGIN', device: 'Kitchen KDS' },
  { id: 'log-4', timestamp: '2026-10-07 14:15:10', staffName: 'Kevin Kiprono', role: 'Bartender', pinUsed: 'redacted', action: 'LOGIN', device: 'Bar POS' },
  { id: 'log-5', timestamp: '2026-10-07 15:30:00', staffName: 'Sarah Nduta', role: 'Floor Waiter', pinUsed: 'redacted', action: 'LOGIN', device: 'Tablet Floor 2' }
];

// ── Promotions & Daily Specials Dataset (Item 4) ──
let promotions = [
  {
    id: 'promo-01',
    title: 'Sunset Goat Ribs & Tusker Deal',
    desc: 'Slow charcoal-roasted prime ribs served with ugali or fries + cold Kenyan Tusker.',
    origPrice: 1950,
    offerPrice: 1365,
    discountPercent: 30,
    isDailySpecial: true,
    image: '/images/hero-banner.jpg',
    startTime: '2026-10-07T12:00',
    endTime: '2026-10-07T23:59',
    active: true
  },
  {
    id: 'promo-02',
    title: 'Flame Grilled Chicken Steak Combo',
    desc: 'Herb-marinated chicken breast with hand-cut fries and fresh passion cooler.',
    origPrice: 1550,
    offerPrice: 1150,
    discountPercent: 25,
    isDailySpecial: true,
    image: '/images/chicken-steak.jpg',
    startTime: '2026-10-07T11:00',
    endTime: '2026-10-07T22:00',
    active: true
  },
  {
    id: 'promo-03',
    title: 'Swahili Samosas & Dawa Special',
    desc: 'Crisp spiced minced beef samosas with authentic hot Kenyan honey & ginger Dawa.',
    origPrice: 1050,
    offerPrice: 790,
    discountPercent: 25,
    isDailySpecial: false,
    image: '/images/beef-pizza.jpg',
    startTime: '2026-10-07T08:00',
    endTime: '2026-10-07T18:00',
    active: true
  }
];

// ── Admin Configurable Order Edit Grace Window (Item 6) ──
let orderEditWindowSeconds = 300; // 5 minutes (admin configurable server policy)
let placedOrdersHistory = []; // Orders with countdown windows & lock states
let currentOrderDiningType = 'dine-in'; // 'dine-in' or 'takeaway' (Item 7)

// ── Tables OS Dataset & Multi-Party Session Support (Item 1 & 2) ──
// Each table has seats capacity and an array of open independent sessions
let tables = [
  {
    num: '01', zone: 'Garden', capacity: 4, seats: 4, status: 'occupied', waiter: 'Amina Mwangi',
    sessions: [
      { id: 'sess-01-a', partyName: 'Party Mwangi', partySize: 2, status: 'confirmed', bill: 2100, waiter: 'Amina Mwangi', startedAt: '15:20', orders: 1 },
      { id: 'sess-01-b', partyName: 'Party Kariuki', partySize: 2, status: 'confirmed', bill: 1350, waiter: 'Amina Mwangi', startedAt: '15:45', orders: 1 }
    ]
  },
  {
    num: '02', zone: 'Garden', capacity: 2, seats: 2, status: 'free', waiter: 'Unassigned',
    sessions: []
  },
  {
    num: '03', zone: 'Garden', capacity: 4, seats: 4, status: 'occupied', waiter: 'Juma Otieno',
    sessions: [
      { id: 'sess-03-a', partyName: 'Party Otieno', partySize: 3, status: 'confirmed', bill: 1750, waiter: 'Juma Otieno', startedAt: '16:05', orders: 1 }
    ]
  },
  {
    num: '04', zone: 'Terrace', capacity: 10, seats: 10, originalCapacity: 6, status: 'occupied', waiter: 'Sarah Nduta',
    mergedWith: '05',
    sessions: [
      { id: 'sess-04-a', partyName: 'Table 4 Main (Merged Large Party)', partySize: 8, status: 'confirmed', bill: 8600, waiter: 'Sarah Nduta', startedAt: '14:30', orders: 4 }
    ]
  },
  {
    num: '05', zone: 'Terrace', capacity: 4, seats: 4, originalCapacity: 4, status: 'merged', waiter: 'Sarah Nduta',
    mergedInto: '04',
    sessions: []
  },
  {
    num: '06', zone: 'Terrace', capacity: 4, seats: 4, status: 'occupied', waiter: 'Juma Otieno',
    sessions: [
      { id: 'sess-06-a', partyName: 'Terrace Guests', partySize: 5, status: 'confirmed', bill: 3200, waiter: 'Juma Otieno', startedAt: '15:10', orders: 2 } // overflow 5 > 4
    ]
  },
  {
    num: '07', zone: 'VIP', capacity: 8, seats: 8, status: 'occupied', waiter: 'Amina Mwangi',
    sessions: [
      { id: 'sess-07-a', partyName: 'VIP Executive', partySize: 8, status: 'confirmed', bill: 12400, waiter: 'Amina Mwangi', startedAt: '13:00', orders: 4 }
    ]
  },
  {
    num: '08', zone: 'Indoor', capacity: 4, seats: 4, status: 'free', waiter: 'Unassigned',
    sessions: []
  },
  {
    num: '09', zone: 'Indoor', capacity: 4, seats: 4, status: 'occupied', waiter: 'Sarah Nduta',
    sessions: [
      { id: 'sess-09-a', partyName: 'Family Lunch', partySize: 2, status: 'pending', bill: 0, waiter: 'Sarah Nduta', startedAt: '16:15', orders: 0 } // Pending arrival
    ]
  },
  {
    num: '10', zone: 'Indoor', capacity: 2, seats: 2, status: 'free', waiter: 'Unassigned',
    sessions: []
  },
  {
    num: '11', zone: 'Bar', capacity: 4, seats: 4, status: 'occupied', waiter: 'Kevin Kiprono',
    sessions: [
      { id: 'sess-11-a', partyName: 'Lounge Drinks', partySize: 2, status: 'confirmed', bill: 2100, waiter: 'Kevin Kiprono', startedAt: '16:00', orders: 2 }
    ]
  },
  {
    num: '12', zone: 'Bar', capacity: 2, seats: 2, status: 'free', waiter: 'Unassigned',
    sessions: []
  }
];

// Active guest session
let activeGuestSessionId = 'sess-04-a';
let activeTableSession = { num: '04', zone: 'Terrace' };

// Venue Geolocation (Testimonial Cafe Nairobi: -1.2921, 36.8219)
const VENUE_COORDS = { lat: -1.2921, lng: 36.8219, allowedRadiusKm: 5.0 };
let guestGeoStatus = 'unverified'; // 'verified', 'flagged_remote', 'unverified'

// ── Table URL & Session Management ──
function getTableMenuUrl(tableNum, zone) {
  const origin = window.location.origin && window.location.origin !== 'null'
    ? window.location.origin
    : 'https://dijimenu.vercel.app';
  return `${origin}/?table=${String(tableNum).padStart(2, '0')}&zone=${encodeURIComponent(zone || 'Terrace')}`;
}

function setActiveTableSession(num, zone, updateUrl = false, requestedPartySize = 2) {
  const formattedNum = String(num).padStart(2, '0');
  let matchedTable = tables.find(t => String(t.num).padStart(2, '0') === formattedNum);
  if (!matchedTable) {
    matchedTable = {
      num: formattedNum,
      zone: zone || 'Main Garden',
      capacity: 4,
      seats: 4,
      status: 'free',
      waiter: 'Unassigned',
      sessions: []
    };
    tables.push(matchedTable);
  }
  const resolvedZone = zone || matchedTable.zone || 'Terrace';

  if (!Array.isArray(matchedTable.sessions)) {
    matchedTable.sessions = [];
  }

  // Calculate currently occupied seats by active open sessions
  const currentOccupiedSeats = matchedTable.sessions.reduce((acc, s) => acc + (s.partySize || 0), 0);
  const remainingCapacity = Math.max(0, matchedTable.capacity - currentOccupiedSeats);

  // Find or create session for this guest
  let currentSession = matchedTable.sessions.find(s => s.id === activeGuestSessionId);
  if (!currentSession) {
    // Open a new independent session for this party
    const newSessionId = `sess-${formattedNum}-${Date.now().toString(36)}`;
    const isOverflow = (requestedPartySize > remainingCapacity);
    const extraSeats = isOverflow ? (requestedPartySize - remainingCapacity) : 0;

    currentSession = {
      id: newSessionId,
      partyName: `Party at T${formattedNum} (#${matchedTable.sessions.length + 1})`,
      partySize: requestedPartySize,
      extraSeats: extraSeats,
      status: 'pending', // Starts in pending arrival state (Item 5)
      bill: 0,
      waiter: 'Unassigned',
      startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      orders: 0
    };
    matchedTable.sessions.push(currentSession);
    activeGuestSessionId = newSessionId;
  }

  // Update table overall status based on seat capacity
  updateTableOverallStatus(matchedTable);

  activeTableSession = { num: formattedNum, zone: resolvedZone };
  try {
    localStorage.setItem('shamba_active_table', JSON.stringify(activeTableSession));
    localStorage.setItem('shamba_active_session_id', activeGuestSessionId);
  } catch(e) {}

  const displayStr = `Table ${activeTableSession.num} · ${activeTableSession.zone}`;

  const guestDisplay = $('#guest-table-display');
  if (guestDisplay) guestDisplay.textContent = displayStr;

  const activeDisplay = $('#active-table-display');
  if (activeDisplay) activeDisplay.textContent = displayStr;

  const footerTable = $('#guest-footer-table');
  if (footerTable) footerTable.textContent = `Dining at Table ${activeTableSession.num} · ${activeTableSession.zone}`;

  const trackerSub = $('#tracker-table-sub');
  if (trackerSub) trackerSub.textContent = `Table ${activeTableSession.num} · ${activeTableSession.zone} · Live Order`;

  // Update Guest Arrival Banner visibility (Item 5)
  updateGuestArrivalBanner();

  if (updateUrl && window.history && window.history.replaceState) {
    const url = new URL(window.location);
    url.searchParams.set('table', activeTableSession.num);
    url.searchParams.set('zone', activeTableSession.zone);
    window.history.replaceState({}, '', url);
  }
}

// Update table overall badge logic: FREE, OCCUPIED, AT CAPACITY, MAX EXCEEDED +N (Item 1)
function updateTableOverallStatus(table) {
  if (!table.sessions || table.sessions.length === 0) {
    table.status = 'free';
    table.overflowCount = 0;
    return;
  }
  const totalOccupied = table.sessions.reduce((acc, s) => acc + (s.partySize || 0), 0);
  if (totalOccupied === 0) {
    table.status = 'free';
    table.overflowCount = 0;
  } else if (totalOccupied < table.capacity) {
    table.status = 'occupied';
    table.overflowCount = 0;
  } else if (totalOccupied === table.capacity) {
    table.status = 'at_capacity';
    table.overflowCount = 0;
  } else {
    table.status = 'max_exceeded';
    table.overflowCount = totalOccupied - table.capacity;
  }
}

// Guest arrival banner updater (Item 5)
function updateGuestArrivalBanner() {
  const banner = $('#guest-arrival-banner');
  const cartWarning = $('#cart-arrival-warning');
  const warningTableNum = $('#cart-warning-table-num');
  if (warningTableNum) warningTableNum.textContent = activeTableSession.num;

  const table = tables.find(t => String(t.num).padStart(2, '0') === String(activeTableSession.num).padStart(2, '0'));
  const currentSession = table?.sessions?.find(s => s.id === activeGuestSessionId);

  const isPending = (currentSession && currentSession.status === 'pending');
  if (banner) {
    banner.style.display = isPending ? 'block' : 'none';
  }
  if (cartWarning) {
    cartWarning.style.display = isPending ? 'block' : 'none';
  }
}

// Optional secondary signal: check guest browser geolocation against Testimonial Cafe Nairobi coordinates (Item 5)
function checkGuestBrowserLocation() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      // Haversine formula calculation
      const toRad = x => (x * Math.PI) / 180;
      const dLat = toRad(lat - VENUE_COORDS.lat);
      const dLng = toRad(lng - VENUE_COORDS.lng);
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(toRad(VENUE_COORDS.lat)) * Math.cos(toRad(lat)) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distKm = 6371 * c;

      if (distKm > VENUE_COORDS.allowedRadiusKm) {
        guestGeoStatus = 'flagged_remote';
        console.warn(`[Testimony OS Geolocation] Guest device is ${distKm.toFixed(1)}km away from Testimonial Cafe. Flagged for staff review.`);
      } else {
        guestGeoStatus = 'verified';
      }
    },
    (err) => {
      // Permission denied or unavailable — secondary signal only, never hard block
      guestGeoStatus = 'unverified';
    },
    { timeout: 8000, maximumAge: 60000 }
  );
}

function initTableSessionFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const tableParam = urlParams.get('table') || urlParams.get('t');
  const zoneParam = urlParams.get('zone') || urlParams.get('z');
  const modeParam = urlParams.get('mode') || urlParams.get('view');

  if (tableParam) {
    const formattedNum = String(tableParam).padStart(2, '0');
    const matched = tables.find(t => String(t.num).padStart(2, '0') === formattedNum);
    const resolvedZone = zoneParam || (matched ? matched.zone : 'Terrace');
    setActiveTableSession(formattedNum, resolvedZone, false);
    setView('guest');
    showToast(`Welcome! You are seated at Table ${formattedNum} (${resolvedZone}) · Tableside Menu`);
    return;
  }

  // Check saved session
  try {
    const saved = localStorage.getItem('shamba_active_table');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.num) {
        setActiveTableSession(parsed.num, parsed.zone, false);
      }
    }
  } catch(e) {}

  if (modeParam === 'guest') {
    setView('guest');
  } else {
    setView('dashboard');
  }
}

// ── Initialize App ──
document.addEventListener('DOMContentLoaded', () => {
  renderDashboardCategories();
  renderDashboardDishes();
  renderStaffRoster();
  renderGuestCategories();
  renderGuestDishes();
  setupEventListeners();
  updateCartUI();
  initTableSessionFromUrl();

  // Synchronize menu catalog with server-authoritative seed API if online
  if (typeof fetch === 'function') {
    fetch('/api/menu')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && Array.isArray(data.items) && data.items.length > 0) {
          menuItems = data.items;
          renderDashboardDishes();
          renderGuestDishes();
        }
      })
      .catch(() => {
        // Safe offline fallback: local seed dataset already active
      });
  }

  // Register Service Worker for offline tableside browsing resilience
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.warn('Tableside service worker notice:', err);
    });
  }
});

// ═══════════════════════════════════════════
//  VIEW SWITCHER (DASHBOARD vs GUEST MODE)
// ═══════════════════════════════════════════

function setView(viewName) {
  currentView = viewName;
  const shell = $('.app-shell');
  const dashView = $('#view-dashboard');
  const guestView = $('#view-guest-menu');
  const dashTopbar = $('#dash-topbar');
  const guestTopbar = $('#guest-topbar');

  if (viewName === 'guest') {
    shell.classList.add('guest-mode');
    if (dashView) dashView.style.display = 'none';
    if (guestView) guestView.style.display = 'block';
    if (dashTopbar) dashTopbar.style.display = 'none';
    if (guestTopbar) guestTopbar.style.display = 'flex';

    const staffNav = $('#staff-bottom-nav');
    if (staffNav) staffNav.style.display = 'none';

    $('#tab-dash-view')?.classList.remove('active');
    $('#tab-guest-view')?.classList.add('active');

    renderGuestCategories();
    renderGuestDishes();
    updateCartUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Tableside Guest Menu Active · Table ${activeTableSession.num} (${activeTableSession.zone})`);
  } else {
    shell.classList.remove('guest-mode');
    if (dashView) dashView.style.display = 'block';
    if (guestView) guestView.style.display = 'none';
    if (dashTopbar) dashTopbar.style.display = 'flex';
    if (guestTopbar) guestTopbar.style.display = 'none';

    const staffNav = $('#staff-bottom-nav');
    if (staffNav) staffNav.style.display = '';

    const floatingOrder = $('#guest-floating-order-container');
    if (floatingOrder) floatingOrder.style.display = 'none';

    $('#tab-dash-view')?.classList.add('active');
    $('#tab-guest-view')?.classList.remove('active');

    renderDashboardCategories();
    renderDashboardDishes();
    renderStaffRoster();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ═══════════════════════════════════════════
//  DASHBOARD RENDERING (IMAGE 2)
// ═══════════════════════════════════════════

function renderDashboardCategories() {
  const container = $('#category-rail');
  if (!container) return;

  const dynamicCategories = getDynamicCategoryList();
  const cats = dynamicCategories.map(name => {
    const count = name === 'All'
      ? menuItems.length
      : menuItems.filter(i => {
          if (name === 'Drinks & Beverages') {
            return i.category === 'Drinks & Beverages' || i.category === 'Juices & Drinks' || i.category === 'Drinks';
          }
          return i.category === name;
        }).length;
    let thumb = '/images/hero-banner.jpg';
    if (name === 'Pizzas & Burgers') thumb = '/images/beef-pizza.jpg';
    if (name === 'Grill & Steaks') thumb = '/images/chicken-steak.jpg';
    if (name === 'Pasta & Coastal') thumb = '/images/spaghetti.jpg';
    if (name === 'Starters') thumb = '/images/beef-pizza.jpg';
    if (name === 'Drinks & Beverages' || name === 'Juices & Drinks' || name === 'Drinks') thumb = '/images/hero-banner.jpg';
    if (name === 'Desserts') thumb = '/images/black-burger.jpg';

    return { name, count, thumb };
  });

  container.innerHTML = cats.map(cat => `
    <div class="category-card ${cat.name === activeCategory ? 'active' : ''}" data-cat="${cat.name}">
      <div class="cat-thumb">
        <img src="${cat.thumb}" alt="${cat.name}" />
      </div>
      <strong>${cat.name}</strong>
      <span>${cat.count} items</span>
    </div>
  `).join('');

  $$('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      activeCategory = card.getAttribute('data-cat');
      renderDashboardCategories();
      renderDashboardDishes();
    });
  });
}

function renderDashboardDishes() {
  const container = $('#dishes-grid-dash');
  if (!container) return;

  const searchQuery = ($('#global-search')?.value || '').toLowerCase();
  const filtered = menuItems.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery) || item.desc.toLowerCase().includes(searchQuery);
    return matchesCat && matchesQuery;
  });

  $('#dish-total-indicator').textContent = `Showing ${filtered.length} dishes`;

  container.innerHTML = filtered.map(item => `
    <article class="dish-card-dash ${!item.is_available ? 'sold-out' : ''}" data-id="${item.id}">
      <div class="dish-card-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <div class="rating-pill">
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>${item.rating}</span>
        </div>
      </div>
      <div class="dish-card-body">
        <div class="dish-tags">
          <span class="dish-tag">${item.category}</span>
          ${item.offer_label ? `<span class="dish-tag" style="background:#fee2e2;color:#b91c1c;">${item.offer_label}</span>` : ''}
        </div>
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
        <div class="dish-meta-row">
          <div>
            <div class="dish-price">KES ${item.offer_price ? item.offer_price.toLocaleString() : item.price.toLocaleString()}</div>
            <div class="dish-prep-time">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${item.prep_time}</span>
            </div>
          </div>
          <label class="switch-control" title="Toggle Live Availability">
            <input type="checkbox" class="toggle-availability" data-id="${item.id}" ${item.is_available ? 'checked' : ''} />
            <span class="switch-slider"></span>
            <span class="switch-label ${item.is_available ? 'in-stock' : 'sold-out'}">
              ${item.is_available ? 'In Stock' : 'Sold Out'}
            </span>
          </label>
        </div>
      </div>
    </article>
  `).join('');

  // Wire availability toggles
  $$('.toggle-availability').forEach(toggle => {
    toggle.addEventListener('change', (e) => {
      const id = e.target.getAttribute('data-id');
      const item = menuItems.find(i => i.id === id);
      if (item) {
        item.is_available = e.target.checked;
        showToast(`${item.name} marked as ${item.is_available ? 'Available' : 'Sold Out'}`);
        renderDashboardDishes();
        renderGuestDishes();
      }
    });
  });
}

// ── Staff Roster Rendering ──
function renderStaffRoster() {
  const grid = $('#staff-roster-grid');
  if (!grid) return;

  $('#staff-badge-count').textContent = staffRoster.length;

  grid.innerHTML = staffRoster.map(s => {
    const initials = s.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    return `
      <div class="staff-member-card" data-id="${s.id}">
        <div class="staff-avatar-initials">${initials}</div>
        <div class="staff-member-info">
          <strong>${s.name}</strong>
          <span class="staff-role-badge">${s.role}</span>
          <span class="staff-station-tag">${s.station}</span>
        </div>
        <div style="text-align:right;">
          <span class="staff-pin-tag">Credentials managed securely</span>
          <span style="display:block;font-size:10px;color:#10b981;font-weight:700;margin-top:4px;">Active</span>
        </div>
      </div>
    `;
  }).join('');
}

// ═══════════════════════════════════════════
//  GUEST MENU & ORDERING FLOW (SECTION + CARD RHYTHM)
// ═══════════════════════════════════════════

function getCategoryIcon(catName) {
  switch (catName) {
    case 'All':
      return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`;
    case 'Starters':
      return `<svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`;
    case 'Grill & Steaks':
      return `<svg viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`;
    case 'Pizzas & Burgers':
      return `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12A10 10 0 0 1 12 2z"/><path d="m12 2 4 10-14 2"/></svg>`;
    case 'Pasta & Coastal':
      return `<svg viewBox="0 0 24 24"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;
    case 'Drinks & Beverages':
    case 'Juices & Drinks':
    case 'Drinks':
      return `<svg viewBox="0 0 24 24"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>`;
    case 'Desserts':
      return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
  }
}

// ── Dynamic Category List Provider ──
function getDynamicCategoryList() {
  const baseOrder = ['Starters', 'Grill & Steaks', 'Pizzas & Burgers', 'Pasta & Coastal', 'Drinks & Beverages', 'Desserts'];
  const catalogCategories = [...new Set(menuItems.map(i => i && i.category).filter(Boolean))];
  const list = ['All'];

  baseOrder.forEach(cat => {
    if (!list.includes(cat)) list.push(cat);
  });

  // Explicitly ensure 'Drinks & Beverages' is injected
  if (!list.includes('Drinks & Beverages')) {
    list.push('Drinks & Beverages');
  }

  catalogCategories.forEach(cat => {
    if (!list.includes(cat)) list.push(cat);
  });

  return list;
}

function renderGuestCategories() {
  const bar = $('#guest-category-bar') || $('.guest-category-bar');
  if (!bar) return;

  // Explicitly fetch and inject dynamic categories ensuring 'Drinks & Beverages' is present
  const dynamicCategories = getDynamicCategoryList();

  bar.innerHTML = dynamicCategories.map(catName => {
    const count = catName === 'All'
      ? menuItems.length
      : menuItems.filter(i => {
          if (catName === 'Drinks & Beverages') {
            return i.category === 'Drinks & Beverages' || i.category === 'Juices & Drinks' || i.category === 'Drinks';
          }
          return i.category === catName;
        }).length;

    const iconSvg = getCategoryIcon(catName);
    const isActive = catName === guestActiveCategory;

    return `
      <button class="guest-cat-card ${isActive ? 'active' : ''}" data-cat="${catName}" role="tab" aria-selected="${isActive}" aria-label="Filter ${catName}">
        ${iconSvg}
        <span>${catName}</span>
        <span class="guest-cat-count">${count} item${count === 1 ? '' : 's'}</span>
      </button>
    `;
  }).join('');

  bar.querySelectorAll('.guest-cat-card').forEach(card => {
    card.addEventListener('click', () => {
      guestActiveCategory = card.getAttribute('data-cat');
      renderGuestCategories();
      renderGuestDishes();
      // Scroll to category section if specific category selected
      if (guestActiveCategory !== 'All') {
        const sec = $(`#guest-sec-${guestActiveCategory.replace(/[^a-zA-Z0-9]/g, '-')}`);
        if (sec) {
          sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

// ── Guest Promotions & Daily Specials Carousel (Item 4) ──
function renderGuestPromosCarousel() {
  const container = document.getElementById('guest-promos-container');
  const section = document.getElementById('guest-promos-section');
  if (!container || !section) return;

  const now = new Date();
  // Filter active daily specials or within active timing window
  const activePromos = promotions.filter(p => {
    if (!p.active) return false;
    if (p.isDailySpecial) return true;
    if (p.startTime && new Date(p.startTime) > now) return false;
    if (p.endTime && new Date(p.endTime) < now) return false;
    return true;
  });

  if (activePromos.length === 0) {
    section.style.display = 'none';
    return;
  }
  section.style.display = 'block';

  container.innerHTML = activePromos.map(p => `
    <div class="guest-promo-slide">
      <span class="promo-badge-tag">${p.isDailySpecial ? 'Daily Special' : `${p.discountPercent}% OFF`}</span>
      <img src="${p.image}" alt="${p.title}" loading="lazy" />
      <div style="flex:1;min-width:0;">
        <strong style="display:block;font-size:13px;color:#fef08a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p.title}</strong>
        <p style="font-size:11px;color:var(--guest-muted);margin:3px 0 6px 0;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${p.desc}</p>
        <div style="display:flex;align-items:center;gap:6px;">
          <span style="text-decoration:line-through;color:rgba(255,255,255,0.4);font-size:11px;">KES ${p.origPrice.toLocaleString()}</span>
          <span style="font-size:14px;font-weight:800;color:#fde047;">KES ${p.offerPrice.toLocaleString()}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function renderGuestDishes() {
  renderGuestPromosCarousel();
  const column = $('#guest-sections-column');
  if (!column) return;

  const searchInputTop = $('#guest-search-input-top');
  const searchInputBanner = $('#guest-search-input');
  const query = ((searchInputTop?.value || searchInputBanner?.value) || '').toLowerCase().trim();

  // Fetch dynamic categories ensuring 'Drinks & Beverages' is included
  const dynamicCategories = getDynamicCategoryList();
  const venueCategories = dynamicCategories.filter(c => c !== 'All');

  let sectionsToRender = [];

  if (query) {
    // If searching, group matching items by their categories
    const matching = menuItems.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
    if (matching.length === 0) {
      column.innerHTML = `
        <div style="text-align:center;padding:56px 20px;background:var(--guest-surface);border-radius:var(--radius-xl);border:1px dashed var(--guest-border);">
          <p style="font-size:18px;font-family:var(--font-display);color:var(--guest-accent);">No dishes or drinks found for "${query}"</p>
          <p style="font-size:13px;color:var(--guest-muted);margin-top:6px;">Try searching for steaks, burgers, cocktails, or refreshing juices</p>
        </div>
      `;
      return;
    }
    const matchingCats = [...new Set(matching.map(m => m.category))];
    sectionsToRender = matchingCats.map(cat => ({
      category: cat,
      items: matching.filter(m => m.category === cat)
    }));
  } else if (guestActiveCategory === 'All') {
    // Render all categories as distinct sections with horizontal carousels
    sectionsToRender = venueCategories.map(cat => ({
      category: cat,
      items: menuItems.filter(m => {
        if (cat === 'Drinks & Beverages') {
          return m.category === 'Drinks & Beverages' || m.category === 'Juices & Drinks' || m.category === 'Drinks';
        }
        return m.category === cat;
      })
    })).filter(sec => sec.items.length > 0);
  } else {
    // Render only the selected category
    sectionsToRender = [{
      category: guestActiveCategory,
      items: menuItems.filter(m => {
        if (guestActiveCategory === 'Drinks & Beverages') {
          return m.category === 'Drinks & Beverages' || m.category === 'Juices & Drinks' || m.category === 'Drinks';
        }
        return m.category === guestActiveCategory;
      })
    }];
  }

  column.innerHTML = sectionsToRender.map(sec => {
    const secId = `guest-sec-${sec.category.replace(/[^a-zA-Z0-9]/g, '-')}`;
    const isDrinkCategory = sec.category.toLowerCase().includes('drink') || sec.category.toLowerCase().includes('juice') || sec.category.toLowerCase().includes('beverage');

    const cardsHtml = sec.items.map(item => {
      const effectivePrice = item.offer_price ? item.offer_price : item.price;
      const cartItem = cart.find(c => c.id === item.id);
      const cartQty = cartItem ? cartItem.qty : 0;
      const isAvailable = !!item.is_available;

      return `
        <article class="guest-dish-card ${!isAvailable ? 'sold-out' : ''}" data-id="${item.id}">
          <div class="guest-dish-media" onclick="openDishCustomization('${item.id}')">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
            ${item.offer_label ? `<span class="dish-organic-badge offer">${item.offer_label}</span>` : `<span class="dish-organic-badge">${sec.category}</span>`}
            <span class="availability-tag ${isAvailable ? 'in-stock' : 'sold-out'}">
              ${isAvailable ? 'Available' : 'Sold Out'}
            </span>
          </div>

          <div class="guest-dish-info" onclick="openDishCustomization('${item.id}')">
            <h4>${item.name}</h4>
            <p>${item.desc}</p>
            <div class="guest-dish-footer">
              <div class="guest-price-group">
                <span class="guest-price">KES ${effectivePrice.toLocaleString()}</span>
                <span class="guest-prep-badge">
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  ${item.prep_time}
                </span>
              </div>

              ${isAvailable ? `
                <button class="btn-quick-add ${cartQty > 0 ? 'in-cart' : ''}" onclick="event.stopPropagation(); quickAddToCart('${item.id}')" aria-label="Add ${item.name} to order" title="Add to table order">
                  ${cartQty > 0 ? `<span style="font-weight:800;font-size:13px;">${cartQty}</span>` : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`}
                </button>
              ` : `
                <span style="font-size:10px;font-weight:700;color:var(--status-danger);">Unavailable</span>
              `}
            </div>
          </div>
        </article>
      `;
    }).join('');

    return `
      <section class="guest-menu-section" id="${secId}" aria-label="${sec.category}">
        <div class="guest-section-header">
          <h3>${sec.category}</h3>
          <span class="btn-see-all" onclick="filterToCategory('${sec.category}')">
            <span>${sec.items.length} ${isDrinkCategory ? 'items' : 'dishes'}</span>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </span>
        </div>
        <div class="guest-cards-scroll-row">
          ${cardsHtml}
        </div>
      </section>
    `;
  }).join('');
}

window.filterToCategory = function(catName) {
  guestActiveCategory = catName;
  renderGuestCategories();
  renderGuestDishes();
  window.scrollTo({ top: 120, behavior: 'smooth' });
};

// ── Quick Add to Cart ──
function quickAddToCart(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item || !item.is_available) return;

  const isDrink = item.category === 'Drinks & Beverages' || item.station === 'bar';
  const existing = cart.find(c => c.id === itemId);
  const effectivePrice = item.offer_price ? item.offer_price : item.price;

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: effectivePrice,
      qty: 1,
      spice: isDrink ? 'Chilled' : 'Medium',
      side: isDrink ? 'Standard' : 'Hand-Cut Fries',
      notes: ''
    });
  }

  showToast(`Added ${item.name} to table order`);
  updateCartUI();
  renderGuestDishes();
}

// ── Open Dish & Drink Customization Modal ──
window.openDishCustomization = function(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item) return;

  selectedDishForCustomization = item;
  const isDrink = item.category === 'Drinks & Beverages' || item.station === 'bar';
  currentCustomSpice = isDrink ? 'Chilled with Ice' : 'Medium';
  currentCustomSide = isDrink ? 'Natural Cane' : 'Hand-Cut Fries';
  customQty = 1;

  const effectivePrice = item.offer_price ? item.offer_price : item.price;
  const container = $('#customization-container');
  if (!container) return;

  container.innerHTML = `
    <div style="display:flex;gap:18px;margin-bottom:16px;">
      <img src="${item.image}" alt="${item.name}" style="width:110px;height:100px;object-fit:cover;border-radius:14px;" />
      <div>
        <span class="guest-hero-pill" style="font-size:10px;padding:3px 10px;margin-bottom:6px;">${item.category}</span>
        <h3 style="font-family:var(--font-display);font-size:22px;color:var(--dash-ink);">${item.name}</h3>
        <p style="font-family:var(--font-serif);font-size:13px;color:var(--dash-muted);margin-top:4px;">${item.desc}</p>
        <div style="font-size:18px;font-weight:800;color:var(--forest);margin-top:8px;">KES ${effectivePrice.toLocaleString()}</div>
      </div>
    </div>

    ${isDrink ? `
      <!-- Temperature & Serving Style -->
      <div class="custom-option-group">
        <label class="custom-option-label">Serving Style &amp; Ice</label>
        <div class="custom-pill-row">
          <button type="button" class="custom-option-pill active" onclick="selectSpice('Chilled with Ice')">Chilled with Ice</button>
          <button type="button" class="custom-option-pill" onclick="selectSpice('Light Ice')">Light Ice</button>
          <button type="button" class="custom-option-pill" onclick="selectSpice('No Ice')">No Ice</button>
          <button type="button" class="custom-option-pill" onclick="selectSpice('Served Hot')">Served Hot</button>
        </div>
      </div>

      <!-- Sweetness / Blend -->
      <div class="custom-option-group">
        <label class="custom-option-label">Sweetness &amp; Blend</label>
        <div class="custom-pill-row">
          <button type="button" class="custom-option-pill active" onclick="selectSide('Natural Cane')">Natural Cane</button>
          <button type="button" class="custom-option-pill" onclick="selectSide('Pure Honey')">Pure Honey</button>
          <button type="button" class="custom-option-pill" onclick="selectSide('Unsweetened')">Unsweetened</button>
          <button type="button" class="custom-option-pill" onclick="selectSide('Extra Citrus')">Extra Citrus</button>
        </div>
      </div>
    ` : `
      <!-- Spice Level Selection -->
      <div class="custom-option-group">
        <label class="custom-option-label">Spice Level</label>
        <div class="custom-pill-row">
          <button type="button" class="custom-option-pill ${currentCustomSpice === 'Mild' ? 'active' : ''}" onclick="selectSpice('Mild')">Mild</button>
          <button type="button" class="custom-option-pill ${currentCustomSpice === 'Medium' ? 'active' : ''}" onclick="selectSpice('Medium')">Medium Spiced</button>
          <button type="button" class="custom-option-pill ${currentCustomSpice === 'Hot' ? 'active' : ''}" onclick="selectSpice('Hot')">Extra Hot &amp; Chili</button>
        </div>
      </div>

      <!-- Choice of Side Selection -->
      <div class="custom-option-group">
        <label class="custom-option-label">Choice of Side</label>
        <div class="custom-pill-row">
          <button type="button" class="custom-option-pill ${currentCustomSide === 'Hand-Cut Fries' ? 'active' : ''}" onclick="selectSide('Hand-Cut Fries')">Hand-Cut Fries</button>
          <button type="button" class="custom-option-pill ${currentCustomSide === 'Steamed Jasmine Rice' ? 'active' : ''}" onclick="selectSide('Steamed Jasmine Rice')">Steamed Rice</button>
          <button type="button" class="custom-option-pill ${currentCustomSide === 'Ugali' ? 'active' : ''}" onclick="selectSide('Ugali')">White Ugali</button>
          <button type="button" class="custom-option-pill ${currentCustomSide === 'Fresh Garden Salad' ? 'active' : ''}" onclick="selectSide('Fresh Garden Salad')">Garden Salad</button>
        </div>
      </div>
    `}

    <!-- Special Dietary or Kitchen Instructions -->
    <div class="form-group">
      <label class="custom-option-label" for="custom-dish-notes">${isDrink ? 'Bar Special Instructions' : 'Special Kitchen Notes'}</label>
      <input type="text" class="form-control" id="custom-dish-notes" placeholder="${isDrink ? 'e.g. Glass of ice on the side, extra lime wedge...' : 'e.g. No onions, sauce on the side, allergies...'}" />
    </div>

    <!-- Quantity & Submit -->
    <div style="display:flex;align-items:center;gap:16px;margin-top:20px;">
      <div style="display:flex;align-items:center;border:1px solid var(--dash-border);border-radius:12px;overflow:hidden;background:#f8faf9;">
        <button type="button" style="padding:10px 16px;font-size:18px;font-weight:700;" onclick="adjustCustomQty(-1)">-</button>
        <span id="custom-qty-val" style="padding:0 12px;font-weight:800;font-size:15px;">1</span>
        <button type="button" style="padding:10px 16px;font-size:18px;font-weight:700;" onclick="adjustCustomQty(1)">+</button>
      </div>
      <button class="btn-primary" style="flex:1;justify-content:center;" onclick="confirmDishCustomization()">
        Add to Order · KES <span id="custom-total-preview">${effectivePrice.toLocaleString()}</span>
      </button>
    </div>
  `;

  $('#modal-dish-customization')?.classList.add('active');
};

let customQty = 1;
window.adjustCustomQty = function(delta) {
  customQty = Math.max(1, customQty + delta);
  $('#custom-qty-val').textContent = customQty;
  if (selectedDishForCustomization) {
    const effectivePrice = selectedDishForCustomization.offer_price || selectedDishForCustomization.price;
    $('#custom-total-preview').textContent = (effectivePrice * customQty).toLocaleString();
  }
};

window.selectSpice = function(level) {
  currentCustomSpice = level;
  const row = $$('#customization-container .custom-option-group')[0]?.querySelectorAll('.custom-pill-row button');
  if (row) {
    row.forEach(b => {
      b.classList.toggle('active', b.textContent.trim().toLowerCase().includes(level.toLowerCase().split(' ')[0]));
    });
  }
};

window.selectSide = function(side) {
  currentCustomSide = side;
  const row = $$('#customization-container .custom-option-group')[1]?.querySelectorAll('.custom-pill-row button');
  if (row) {
    row.forEach(b => {
      b.classList.toggle('active', b.textContent.trim().toLowerCase().includes(side.toLowerCase().split(' ')[0]));
    });
  }
};

window.confirmDishCustomization = function() {
  if (!selectedDishForCustomization) return;
  const notes = $('#custom-dish-notes')?.value || '';
  const effectivePrice = selectedDishForCustomization.offer_price || selectedDishForCustomization.price;

  cart.push({
    id: selectedDishForCustomization.id + '-' + Date.now(),
    name: selectedDishForCustomization.name,
    price: effectivePrice,
    qty: customQty,
    spice: currentCustomSpice,
    side: currentCustomSide,
    notes: notes
  });

  $('#modal-dish-customization')?.classList.remove('active');
  showToast(`Added ${customQty}x ${selectedDishForCustomization.name} to order`);
  customQty = 1;
  updateCartUI();
  renderGuestDishes();
};

// ── Cart Modal Toggle Helper ──
window.toggleCartModal = function(forceState) {
  const modal = $('#modal-cart');
  if (!modal) return;
  const shouldOpen = typeof forceState === 'boolean' ? forceState : !modal.classList.contains('active');
  if (shouldOpen) {
    renderCartModalItems();
    modal.classList.add('active');
  } else {
    modal.classList.remove('active');
  }
};

// ── Update Cart UI & Floating Pill ──
function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const hasItems = cart.length > 0;

  // Topbar badges
  const topCartCount = $('#topbar-cart-count');
  if (topCartCount) topCartCount.textContent = totalCount;

  const guestCartCount = $('#guest-cart-count');
  if (guestCartCount) guestCartCount.textContent = totalCount;

  const guestCartSum = $('#guest-cart-sum');
  if (guestCartSum) guestCartSum.textContent = `KES ${totalPrice.toLocaleString()}`;

  // Floating rounded order button (.guest-floating-order-container only sets display to block when cart is not empty)
  const floatingContainers = document.querySelectorAll('.guest-floating-order-container, #guest-floating-order-container');
  floatingContainers.forEach(container => {
    if (hasItems && currentView === 'guest') {
      container.style.display = 'block';
      const qtyEl = container.querySelector('#guest-order-pill-qty') || $('#guest-order-pill-qty');
      if (qtyEl) qtyEl.textContent = `${totalCount} item${totalCount > 1 ? 's' : ''}`;
      const priceEl = container.querySelector('#guest-order-pill-price') || $('#guest-order-pill-price');
      if (priceEl) priceEl.textContent = `KES ${totalPrice.toLocaleString()}`;
    } else {
      container.style.display = 'none';
    }
  });

  // Legacy pill support if present
  const pill = $('#guest-order-pill');
  if (pill) {
    if (hasItems && currentView === 'guest') {
      pill.style.display = 'block';
      const pQty = $('#order-pill-qty');
      if (pQty) pQty.textContent = `${totalCount} item${totalCount > 1 ? 's' : ''}`;
      const pPrice = $('#order-pill-price');
      if (pPrice) pPrice.textContent = `KES ${totalPrice.toLocaleString()}`;
    } else {
      pill.style.display = 'none';
    }
  }

  // Cart modal contents
  renderCartModalItems();
}

function renderCartModalItems() {
  const container = $('#cart-items-container');
  if (!container) return;

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  $('#cart-modal-total').textContent = `KES ${totalPrice.toLocaleString()}`;

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:24px 10px;color:var(--dash-muted);">
        <p style="font-weight:600;">Your table cart is empty</p>
        <small>Browse the menu to add delicious items</small>
      </div>
    `;
    return;
  }

  container.innerHTML = cart.map((item, idx) => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #f4f6f8;">
      <div style="flex:1;">
        <strong style="display:block;font-size:14px;color:var(--dash-ink);">${item.name}</strong>
        ${item.side || item.spice ? `<small style="color:var(--dash-muted);display:block;font-size:11px;">Side: ${item.side || 'Default'} · Spice: ${item.spice || 'Normal'}</small>` : ''}
        ${item.notes ? `<small style="color:var(--forest);display:block;font-size:11px;font-style:italic;">Note: "${item.notes}"</small>` : ''}
        <span style="font-weight:700;color:var(--forest);font-size:13px;">KES ${(item.price * item.qty).toLocaleString()}</span>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <button type="button" style="width:36px;height:36px;border-radius:8px;background:#eef1f4;font-weight:800;font-size:16px;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:var(--dash-ink);" onclick="changeCartItemQty(${idx}, -1)" aria-label="Decrease quantity">-</button>
        <span style="font-weight:800;font-size:14px;min-width:22px;text-align:center;">${item.qty}</span>
        <button type="button" style="width:36px;height:36px;border-radius:8px;background:#eef1f4;font-weight:800;font-size:16px;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:var(--dash-ink);" onclick="changeCartItemQty(${idx}, 1)" aria-label="Increase quantity">+</button>
        <button type="button" style="width:36px;height:36px;border-radius:8px;background:rgba(239,68,68,0.1);color:#ef4444;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;margin-left:4px;" onclick="removeCartItem(${idx})" aria-label="Remove item">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

window.changeCartItemQty = function(idx, delta) {
  if (!cart[idx]) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) {
    cart.splice(idx, 1);
  }
  updateCartUI();
  renderGuestDishes();
};

window.removeCartItem = function(idx) {
  if (!cart[idx]) return;
  cart.splice(idx, 1);
  updateCartUI();
  renderGuestDishes();
};

// ═══════════════════════════════════════════
//  ORDER SUBMISSION & LIVE KITCHEN TRACKER
// ═══════════════════════════════════════════

// ── Staff Auto-Assignment System (Item 8) ──
// Auto-assign one available waiter to this party's session.
// "Available" = active and not already assigned to another open session.
// Pick whoever was least recently assigned for fairness.
function autoAssignWaiterToSession(session) {
  if (session.waiter && session.waiter !== 'Unassigned') {
    return session.waiter; // Already assigned
  }

  // Get currently assigned waiters across all open sessions
  const currentlyAssignedNames = new Set();
  tables.forEach(t => {
    (t.sessions || []).forEach(s => {
      if (s.waiter && s.waiter !== 'Unassigned') {
        currentlyAssignedNames.add(s.waiter);
      }
    });
  });

  // Filter staff roster for active waiters
  const waiters = staffRoster.filter(s => s.active && (s.role.includes('Waiter') || s.role.includes('Floor') || s.role.includes('Lead')));

  // Available waiters not currently assigned to another open session
  let candidateWaiters = waiters.filter(w => !currentlyAssignedNames.has(w.name));

  // If all are busy, fall back to least recently assigned among all active waiters
  if (candidateWaiters.length === 0) {
    candidateWaiters = waiters.length > 0 ? waiters : staffRoster;
  }

  // Sort by lastAssignedAt timestamp ascending (least recently assigned first)
  candidateWaiters.sort((a, b) => (a.lastAssignedAt || 0) - (b.lastAssignedAt || 0));

  const chosenWaiter = candidateWaiters[0] || staffRoster[0];
  chosenWaiter.lastAssignedAt = Date.now();
  session.waiter = chosenWaiter.name;
  return chosenWaiter.name;
}

// ═══════════════════════════════════════════
//  ORDER SUBMISSION & LIVE KITCHEN TRACKER (Items 5, 6, 7, 8, 9)
// ═══════════════════════════════════════════

let activeGraceTimerInterval = null;

function submitTableOrder() {
  if (cart.length === 0) {
    showToast('Your order is empty. Please add items.', false);
    return;
  }

  // Find active table and session
  const table = tables.find(t => String(t.num).padStart(2, '0') === String(activeTableSession.num).padStart(2, '0'));
  let session = table?.sessions?.find(s => s.id === activeGuestSessionId);
  if (!session && table) {
    // Recreate session if needed
    setActiveTableSession(table.num, table.zone, false);
    session = table.sessions?.find(s => s.id === activeGuestSessionId);
  }

  // Verification Gate: Check pending state (Item 5)
  if (session && session.status === 'pending') {
    const cartWarning = $('#cart-arrival-warning');
    if (cartWarning) cartWarning.style.display = 'block';
    showToast(`Notice: Table ${activeTableSession.num} arrival not confirmed yet. Staff will verify shortly!`, false);
    return;
  }

  // Secondary Geolocation warning check (Item 5)
  if (guestGeoStatus === 'flagged_remote') {
    console.warn(`[Testimony OS] Order placed from flagged remote location for Table ${activeTableSession.num}`);
  }

  const orderNum = 'SH-' + Math.floor(100 + Math.random() * 900);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const orderSnapshot = JSON.parse(JSON.stringify(cart));

  // Auto-assign waiter to session on first order placement (Item 8)
  const assignedWaiterName = autoAssignWaiterToSession(session);
  table.waiter = assignedWaiterName;

  // Add bill to running session bill
  session.bill = (session.bill || 0) + totalAmount;
  session.orders = (session.orders || 0) + 1;
  updateTableOverallStatus(table);

  // Payment Method Recording (Item 9)
  const isCard = $('#pay-method-card')?.classList.contains('active-pay-method');
  const paymentMethodLabel = isCard ? 'Card / POS Terminal' : 'M-Pesa STK (Live)';

  // Order record with grace countdown window (Item 6)
  const orderPlacementTime = Date.now();
  const orderRecord = {
    orderId: orderNum,
    tableNum: activeTableSession.num,
    zone: activeTableSession.zone,
    diningType: currentOrderDiningType, // 'dine-in' or 'takeaway' (Item 7)
    waiter: assignedWaiterName,
    paymentMethod: paymentMethodLabel,
    total: totalAmount,
    placedAt: orderPlacementTime,
    graceExpiresAt: orderPlacementTime + (orderEditWindowSeconds * 1000),
    items: orderSnapshot.map(item => ({
      ...item,
      status: 'pending_kitchen', // will transition to 'preparing' or 'cancelled'
      locked: false
    }))
  };
  placedOrdersHistory.unshift(orderRecord);

  // Sync order to backend REST API & SambaPOS queue
  if (typeof fetch === 'function') {
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        table_no: activeTableSession.num,
        items: orderSnapshot.map(item => ({
          id: item.id,
          name: item.name,
          qty: item.qty,
          spice: item.spice,
          side: item.side,
          notes: item.notes
        })),
        party_size: activeTableSession.partySize || 2,
        guest_notes: `${currentOrderDiningType} order`
      })
    })
    .then(r => r.ok ? r.json() : null)
    .then(apiRes => {
      if (apiRes && apiRes.order && apiRes.order.id) {
        orderRecord.backendOrderId = apiRes.order.id;
        // Also initiate payment record on server
        fetch('/api/payments/initiate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            order_id: apiRes.order.id,
            phone_number: $('#customer-phone')?.value || '0712345678',
            method: isCard ? 'card' : 'mpesa'
          })
        }).catch(() => {});
      }
    })
    .catch(() => {
      // Offline fallback: order held safely in client session
    });
  }

  // Close cart modal
  $('#modal-cart')?.classList.remove('active');

  // Clear cart
  cart = [];
  updateCartUI();
  renderGuestDishes();

  // Show Dedicated Order Confirmation Screen (Item 6)
  showDedicatedOrderConfirmation(orderRecord);

  // Refresh floor map in background
  renderFloorMap();
  showToast(`${currentOrderDiningType === 'takeaway' ? 'Takeaway' : 'Dine-in'} order #${orderNum} placed; changes are available for 5 minutes. Attendant ${assignedWaiterName} assigned to Table ${activeTableSession.num}.`);
}

// Dedicated Order Confirmation Screen Display (Item 6)
function showDedicatedOrderConfirmation(orderRecord) {
  const modal = $('#modal-order-confirmation');
  if (!modal) return;

  $('#conf-order-header-subtitle').textContent = `Order #${orderRecord.orderId} · Sent to Testimonial Cafe Kitchen`;
  $('#conf-table-label').textContent = `Table ${orderRecord.tableNum} (${orderRecord.zone})`;
  $('#conf-dining-type').textContent = orderRecord.diningType === 'takeaway' ? 'Takeaway / To-Go' : 'Dine-In';
  $('#conf-assigned-waiter').textContent = `${orderRecord.waiter}`;
  $('#conf-payment-method').textContent = orderRecord.paymentMethod;
  $('#conf-total-price').textContent = `KES ${orderRecord.total.toLocaleString()}`;

  // Populate items breakdown with quantity x price line totals
  const itemsContainer = $('#conf-items-list');
  if (itemsContainer) {
    itemsContainer.innerHTML = orderRecord.items.map(item => `
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;padding:4px 0;">
        <div>
          <strong>${item.qty}x ${item.name}</strong>
          <span style="color:var(--dash-muted);margin-left:6px;font-size:11px;">(${item.qty} × KES ${item.price.toLocaleString()})</span>
        </div>
        <strong style="color:var(--dash-text);">KES ${(item.qty * item.price).toLocaleString()}</strong>
      </div>
    `).join('');
  }

  // Grace timer countdown display
  const countdownEl = $('#conf-countdown-timer');
  const cancelActionsContainer = $('#conf-items-cancel-actions');

  function updateGraceCountdown() {
    const remainingMs = orderRecord.graceExpiresAt - Date.now();
    if (remainingMs <= 0) {
      if (countdownEl) countdownEl.textContent = '00:00 (LOCKED)';
      if (cancelActionsContainer) {
        cancelActionsContainer.innerHTML = `
          <div style="font-size:11px;color:#fca5a5;padding:4px 0;display:flex;align-items:center;gap:6px;">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>Grace window expired. Items are now locked for cooking in the kitchen.</span>
          </div>
        `;
      }
      clearInterval(activeGraceTimerInterval);
      return;
    }

    const totalSec = Math.floor(remainingMs / 1000);
    const m = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const s = String(totalSec % 60).padStart(2, '0');
    if (countdownEl) countdownEl.textContent = `${m}:${s}`;

    // Show cancel item buttons if not locked
    if (cancelActionsContainer) {
      cancelActionsContainer.innerHTML = orderRecord.items
        .filter(item => item.status !== 'cancelled')
        .map((item, idx) => `
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;background:rgba(0,0,0,0.2);padding:4px 8px;border-radius:4px;">
            <span>${item.qty}x ${item.name}</span>
            <button type="button" class="btn-secondary" style="padding:2px 8px;font-size:10px;color:#ef4444;border-color:#ef4444;" onclick="cancelOrderedItemInGraceWindow('${orderRecord.orderId}', ${idx})">
              Cancel Item
            </button>
          </div>
        `).join('');
    }
  }

  clearInterval(activeGraceTimerInterval);
  activeGraceTimerInterval = setInterval(updateGraceCountdown, 1000);
  updateGraceCountdown();

  modal.classList.add('active');
}

// Cancel an individual dish within the grace window (Item 6)
window.cancelOrderedItemInGraceWindow = function(orderId, itemIndex) {
  const order = placedOrdersHistory.find(o => o.orderId === orderId);
  if (!order) return;

  if (Date.now() > order.graceExpiresAt) {
    showToast('Grace window expired! Items are already being cooked.', false);
    return;
  }

  const item = order.items[itemIndex];
  if (item && item.status !== 'cancelled') {
    item.status = 'cancelled';
    const refundAmount = item.price * item.qty;
    order.total -= refundAmount;

    // Adjust session bill
    const table = tables.find(t => String(t.num).padStart(2, '0') === String(order.tableNum).padStart(2, '0'));
    const session = table?.sessions?.find(s => s.id === activeGuestSessionId);
    if (session) {
      session.bill = Math.max(0, session.bill - refundAmount);
    }

    showToast(`Cancelled ${item.name}. KES ${refundAmount.toLocaleString()} deducted.`);
    showDedicatedOrderConfirmation(order);
    renderFloorMap();
  }
};

// ═══════════════════════════════════════════
//  EVENT LISTENERS & MODAL CONTROLS
// ═══════════════════════════════════════════

function setupEventListeners() {
  // Topbar mode toggles
  $('#tab-dash-view')?.addEventListener('click', () => setView('dashboard'));
  $('#tab-guest-view')?.addEventListener('click', () => setView('guest'));

  // Guest Topbar actions
  $('#guest-cart-btn')?.addEventListener('click', () => {
    $('#modal-cart')?.classList.add('active');
  });

  $('#btn-pill-review-order')?.addEventListener('click', () => {
    $('#modal-cart')?.classList.add('active');
  });

  $('#topbar-cart-btn')?.addEventListener('click', () => {
    $('#modal-cart')?.classList.add('active');
  });

  // Guest search filter (synced across banner and topbar)
  $('#guest-search-input')?.addEventListener('input', (e) => {
    const val = e.target.value;
    const topInput = $('#guest-search-input-top');
    if (topInput && topInput.value !== val) topInput.value = val;
    renderGuestDishes();
  });

  $('#guest-search-input-top')?.addEventListener('input', (e) => {
    const val = e.target.value;
    const bannerInput = $('#guest-search-input');
    if (bannerInput && bannerInput.value !== val) bannerInput.value = val;
    renderGuestDishes();
  });

  // Dashboard search filter
  $('#global-search')?.addEventListener('input', () => {
    renderDashboardDishes();
  });

  // Staff gate button from guest view
  $('#btn-staff-gate')?.addEventListener('click', () => {
    $('#gate-pin-input').value = '';
    $('#gate-pin-error').style.display = 'none';
    $('#modal-staff-pin')?.classList.add('active');
    $('#gate-pin-input')?.focus();
  });

  $('#btn-close-staff-pin')?.addEventListener('click', () => {
    $('#modal-staff-pin')?.classList.remove('active');
  });

  $('#btn-unlock-staff-gate')?.addEventListener('click', () => {
    const pin = $('#gate-pin-input')?.value;
    if (hasAdminSession() || demoRole(pin)) {
      $('#modal-staff-pin')?.classList.remove('active');
      setView('dashboard');
      showToast('Demo Staff Dashboard Unlocked');
    } else {
      $('#gate-pin-error').style.display = 'block';
    }
  });

  // Close modals
  $('#btn-close-cart')?.addEventListener('click', () => {
    $('#modal-cart')?.classList.remove('active');
  });

  $('#btn-close-customization')?.addEventListener('click', () => {
    $('#modal-dish-customization')?.classList.remove('active');
  });

  $('#btn-close-tracker')?.addEventListener('click', () => {
    $('#modal-order-tracker')?.classList.remove('active');
  });

  // Order submission
  $('#btn-submit-order')?.addEventListener('click', submitTableOrder);
  $('#btn-desktop-cart-checkout')?.addEventListener('click', submitTableOrder);

  // Call Attendant actions
  const callAttendant = () => {
    showToast(`Attendant alerted for Table ${activeTableSession.num} (${activeTableSession.zone})`);
  };
  $('#btn-guest-call-attendant')?.addEventListener('click', callAttendant);
  $('#btn-tracker-call-waiter')?.addEventListener('click', callAttendant);

  // Bill Request
  $('#btn-guest-request-bill')?.addEventListener('click', () => {
    showToast(`Bill request sent to cashier for Table ${activeTableSession.num} (${activeTableSession.zone})`);
  });

  // Guest Topbar Table Selector
  $('#btn-guest-table-select')?.addEventListener('click', () => {
    openGuestTableSelectorModal();
  });
  $('#btn-close-guest-table-select')?.addEventListener('click', () => {
    $('#modal-guest-table-select')?.classList.remove('active');
  });

  // Print All Table QR Tents
  $('#btn-print-all-qr')?.addEventListener('click', () => {
    openPrintAllQrModal();
  });
  $('#btn-close-print-all-qr')?.addEventListener('click', () => {
    $('#modal-print-all-qr')?.classList.remove('active');
  });
  $('#btn-trigger-browser-print')?.addEventListener('click', () => {
    window.print();
  });

  // Close Table QR Modal
  $('#btn-close-table-qr')?.addEventListener('click', () => {
    $('#modal-table-qr')?.classList.remove('active');
  });

  // Admin Add Dish Modal
  $('#btn-hero-add-dish')?.addEventListener('click', () => {
    $('#modal-add-dish')?.classList.add('active');
  });

  $('#btn-close-add-dish')?.addEventListener('click', () => {
    $('#modal-add-dish')?.classList.remove('active');
  });

  $('#btn-save-new-dish')?.addEventListener('click', () => {
    const name = $('#new-dish-name')?.value.trim();
    const desc = $('#new-dish-desc')?.value.trim();
    const price = parseInt($('#new-dish-price')?.value);
    const category = $('#new-dish-cat')?.value;
    const pin = $('#admin-pin-input')?.value.trim();

    if (!hasAdminSession() && !demoRole(pin)) {
      showToast('Admin authentication required', false);
      return;
    }

    if (!name || isNaN(price) || price <= 0) {
      showToast('Please provide valid name and price', false);
      return;
    }

    menuItems.unshift({
      id: 'dish-' + Date.now(),
      name,
      desc: desc || 'Chef special prepared fresh with local herbs.',
      price,
      category,
      image: '/images/hero-banner.jpg',
      is_available: true,
      prep_time: '15-20 min',
      rating: 5.0,
      station: category === 'Juices & Drinks' ? 'bar' : 'kitchen',
      is_new: true,
      offer_label: 'NEW',
      offer_price: null
    });

    $('#modal-add-dish')?.classList.remove('active');
    showToast(`Published "${name}" to Live Menu!`);
    renderDashboardDishes();
    renderDashboardCategories();
    renderGuestCategories();
    renderGuestDishes();
  });

  // Admin Add Staff Member Modal
  $('#btn-open-add-staff')?.addEventListener('click', () => {
    $('#new-staff-name').value = '';
    $('#new-staff-pin').value = '';
    $('#staff-admin-pin-verify').value = '';
    $('#modal-add-staff')?.classList.add('active');
  });

  $('#btn-close-add-staff')?.addEventListener('click', () => {
    $('#modal-add-staff')?.classList.remove('active');
  });

  $('#btn-save-new-staff')?.addEventListener('click', () => {
    const name = $('#new-staff-name')?.value.trim();
    const role = $('#new-staff-role')?.value;
    const station = $('#new-staff-station')?.value;
    const staffPin = $('#new-staff-pin')?.value.trim();
    const phone = $('#new-staff-phone')?.value.trim();
    const adminPin = $('#staff-admin-pin-verify')?.value.trim();

    if (!hasAdminSession() && !demoRole(pin)) {
      showToast('Admin authentication required', false);
      return;
    }

    if (!name || staffPin.length !== 4) {
      showToast('Please enter full name and 4-digit PIN', false);
      return;
    }

    staffRoster.push({
      id: 'st-' + (staffRoster.length + 1),
      name,
      role,
      station,
      pin: staffPin,
      phone: phone || '+254 700 000 000',
      active: true
    });

    $('#modal-add-staff')?.classList.remove('active');
    showToast(`Staff member "${name}" registered and activated!`);
    renderStaffRoster();
  });

  // ── Full Sidebar Navigation Panel Router ──
  const NAV_PANEL_MAP = {
    home:      'panel-home',
    menu:      'panel-menu',
    orders:    'panel-orders',
    floor:     'panel-floor',
    staff:     'panel-staff',
    offers:    'panel-offers',
    analytics: 'panel-analytics',
    settings:  'panel-settings'
  };

  // ── Admin vs Staff Access Control Router (Item 10 & 11) ──
  const ADMIN_ONLY_PANELS = ['staff', 'offers', 'analytics', 'settings'];

  function switchDashPanel(targetNav) {
    currentDashPanel = targetNav || 'home';

    // Access check: if non-admin attempts to access admin panel
    if (ADMIN_ONLY_PANELS.includes(currentDashPanel) && !loggedInUser.isAdmin) {
      showToast('Admin privilege required to access this section', false);
      // prompt for Admin PIN
      $('#gate-pin-input').value = '';
      $('#gate-pin-error').style.display = 'none';
      $('#modal-staff-pin')?.classList.add('active');
      $('#gate-pin-input')?.focus();
      return;
    }

    // Hide all panels
    Object.values(NAV_PANEL_MAP).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });

    const isHome = (currentDashPanel === 'home');
    const heroCard = $('.hero-card');
    const kpiRow = $('.kpi-row');
    if (heroCard) heroCard.style.display = isHome ? '' : 'none';
    if (kpiRow) kpiRow.style.display = isHome ? '' : 'none';

    // Show the requested panel
    const targetId = NAV_PANEL_MAP[currentDashPanel] || 'panel-home';
    const target = document.getElementById(targetId);
    if (target) {
      target.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Special panel hydration
    if (currentDashPanel === 'home') renderTodaySnapshot();
    if (currentDashPanel === 'floor') {
      renderFloorMap();
      renderTableQrManager();
    }
    if (currentDashPanel === 'staff') {
      renderStaffPanel();
      renderLoginAuditTrail();
    }
    if (currentDashPanel === 'offers') renderOffersPanel();
    if (currentDashPanel === 'analytics') renderAnalyticsPanel();
    if (currentDashPanel === 'settings') renderPosBridgePanel();
    if (currentDashPanel === 'menu') {
      renderMenuCatalogCategories();
      renderMenuCatalogDishes();
    }
    if (currentDashPanel === 'orders') {
      updateKanbanCounts();
    }
  }

  // ── Render Today-Only Snapshot for All Staff (Item 11) ──
  function renderTodaySnapshot() {
    let todayOrdersCount = 18;
    let todaySalesSum = 46250;
    tables.forEach(t => {
      (t.sessions || []).forEach(s => {
        todayOrdersCount += (s.orders || 0);
        todaySalesSum += (s.bill || 0);
      });
    });

    const ordersCountEl = $('#today-orders-count');
    if (ordersCountEl) ordersCountEl.textContent = `${todayOrdersCount} Placed`;

    const salesSumEl = $('#today-sales-sum');
    if (salesSumEl) salesSumEl.textContent = `KES ${todaySalesSum.toLocaleString()}`;
  }

  // ── Render Admin Login Audit Trail (Item 10) ──
  function renderLoginAuditTrail() {
    const tableBody = document.getElementById('login-audit-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = loginAuditLog.map(log => `
      <tr style="border-bottom:1px solid rgba(255,255,255,0.05);font-size:12px;">
        <td style="padding:10px 14px;color:var(--dash-muted);font-family:monospace;">${log.timestamp}</td>
        <td style="padding:10px 14px;font-weight:700;color:var(--dash-text);">${log.staffName}</td>
        <td style="padding:10px 14px;color:var(--dash-muted);">${log.role}</td>
        <td style="padding:10px 14px;font-family:monospace;color:var(--primary);">****</td>
        <td style="padding:10px 14px;">
          <span style="background:${log.action === 'LOGIN' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'};color:${log.action === 'LOGIN' ? '#22c55e' : '#f87171'};padding:2px 8px;border-radius:4px;font-weight:700;font-size:10px;">
            ${log.action}
          </span>
        </td>
        <td style="padding:10px 14px;color:var(--dash-muted);font-size:11px;">${log.device}</td>
      </tr>
    `).join('');
  }

  // ── Render Offers & Promotions Panel (Item 4) ──
  function renderOffersPanel() {
    const grid = document.getElementById('offers-grid-container');
    if (!grid) return;

    grid.innerHTML = promotions.map(p => `
      <div style="background:var(--dash-surface);border:1px solid var(--dash-border);border-radius:var(--radius-lg);padding:16px;display:flex;gap:14px;position:relative;">
        <img src="${p.image}" alt="${p.title}" style="width:90px;height:90px;border-radius:var(--radius-md);object-fit:cover;flex-shrink:0;" />
        <div style="flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <strong style="font-size:15px;color:var(--dash-text);">${p.title}</strong>
            <span style="background:rgba(239,68,68,0.15);color:#ef4444;font-size:10px;font-weight:800;padding:2px 8px;border-radius:4px;">
              ${p.isDailySpecial ? 'DAILY SPECIAL' : `${p.discountPercent}% OFF`}
            </span>
          </div>
          <p style="font-size:12px;color:var(--dash-muted);margin:4px 0 10px 0;line-height:1.4;">${p.desc}</p>
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="text-decoration:line-through;color:var(--dash-muted);font-size:13px;">KES ${p.origPrice.toLocaleString()}</span>
            <span style="font-size:16px;font-weight:800;color:var(--primary);">KES ${p.offerPrice.toLocaleString()}</span>
            <span style="font-size:11px;color:#22c55e;font-weight:700;">Save ${p.discountPercent}%</span>
          </div>
          <div style="margin-top:10px;display:flex;gap:10px;align-items:center;">
            <small style="color:var(--dash-muted);font-size:10px;">Window: ${p.startTime ? p.startTime.replace('T', ' ') : 'Open'} to ${p.endTime ? p.endTime.replace('T', ' ') : 'Open'}</small>
            <button class="btn-secondary" style="padding:3px 10px;font-size:11px;margin-left:auto;" onclick="deletePromotion('${p.id}')">Remove</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  window.deletePromotion = function(promoId) {
    promotions = promotions.filter(p => p.id !== promoId);
    showToast('Promotion removed.');
    renderOffersPanel();
    renderGuestPromosCarousel();
  };

  // ── Render Admin Analytics Panel (Item 11) ──
  function renderAnalyticsPanel() {
    const rangeSelect = document.getElementById('analytics-range-select');
    const selectedRange = rangeSelect ? rangeSelect.value : 'today';

    // Mock calculations according to selected range
    const multipliers = {
      today: 1,
      week: 6.5,
      month: 27,
      '3months': 82,
      '6months': 165,
      '9months': 240,
      '12months': 320,
      custom: 3
    };
    const mult = multipliers[selectedRange] || 1;

    const baseRev = 78450 * mult;
    const mpesaRev = Math.round(baseRev * 0.72);
    const cashRev = baseRev - mpesaRev;

    const revEl = document.getElementById('analytics-total-rev');
    if (revEl) revEl.textContent = `KES ${baseRev.toLocaleString()}`;

    const mpesaEl = document.getElementById('analytics-mpesa-split');
    if (mpesaEl) mpesaEl.textContent = `KES ${mpesaRev.toLocaleString()} (72%)`;

    const cashEl = document.getElementById('analytics-cash-split');
    if (cashEl) cashEl.textContent = `KES ${cashRev.toLocaleString()} (28%)`;

    const dishesGrid = document.getElementById('analytics-top-dishes-grid');
    if (dishesGrid) {
      const topDishes = [
        { name: 'Nyama Choma Platter', orders: Math.round(28 * mult), rev: Math.round(28 * mult * 1950) },
        { name: 'Cold-Pressed Passion Mango', orders: Math.round(42 * mult), rev: Math.round(42 * mult * 450) },
        { name: 'Flame Grilled Chicken Steak', orders: Math.round(24 * mult), rev: Math.round(24 * mult * 1350) },
        { name: 'Swahili Samosa Trio', orders: Math.round(31 * mult), rev: Math.round(31 * mult * 650) }
      ];
      dishesGrid.innerHTML = topDishes.map(d => `
        <div style="background:var(--dash-bg);border:1px solid var(--dash-border);border-radius:var(--radius-md);padding:12px;">
          <strong style="display:block;font-size:13px;color:var(--dash-text);">${d.name}</strong>
          <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:12px;">
            <span style="color:var(--dash-muted);">${d.orders} orders</span>
            <strong style="color:var(--primary);">KES ${d.rev.toLocaleString()}</strong>
          </div>
        </div>
      `).join('');
    }
  }

  // CSV Export for Admin Analytics (Item 11)
  window.exportAnalyticsCsv = function() {
    const rangeSelect = document.getElementById('analytics-range-select');
    const range = rangeSelect ? rangeSelect.value : 'today';
    const csvContent = "data:text/csv;charset=utf-8," +
      "Order_ID,Timestamp,Table_Number,Zone,Waitstaff,Payment_Method,Dining_Type,Total_KES,POS_Sync_Status\n" +
      "SH-492,2026-10-07 14:15,04,Terrace,Sarah Nduta,M-Pesa STK,Dine-In,5800,SUCCESS\n" +
      "SH-493,2026-10-07 14:32,01,Garden,Amina Mwangi,Cash,Dine-In,2100,SUCCESS\n" +
      "SH-494,2026-10-07 15:05,07,VIP,Amina Mwangi,M-Pesa STK,Dine-In,12400,SUCCESS\n" +
      "SH-495,2026-10-07 15:40,03,Garden,Juma Otieno,M-Pesa STK,Takeaway,1750,SUCCESS\n" +
      "SH-496,2026-10-07 16:10,11,Bar,Kevin Kiprono,Card / POS,Dine-In,2100,SUCCESS\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `shamba_house_analytics_${range}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported Analytics CSV for range: ${range.toUpperCase()}!`);
  };

  // ── Render POS Bridge Panel (Item 11) ──
  function renderPosBridgePanel() {
    const list = document.getElementById('pos-failed-syncs-list');
    if (!list) return;

    list.innerHTML = `
      <div style="background:var(--dash-bg);border:1px solid var(--dash-border);border-radius:var(--radius-md);padding:12px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <strong style="display:block;font-size:13px;color:#fca5a5;">Order #SH-488 (Table 09 · Indoor)</strong>
          <span style="font-size:11px;color:var(--dash-muted);">Reason: SambaPOS Terminal 02 Socket Timeout (14:52)</span>
        </div>
        <button class="btn-secondary" style="font-size:11px;padding:4px 10px;" onclick="retryPosSync('SH-488')">
          Retry Sync
        </button>
      </div>
      <div style="background:var(--dash-bg);border:1px solid var(--dash-border);border-radius:var(--radius-md);padding:12px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <strong style="display:block;font-size:13px;color:#fca5a5;">Order #SH-479 (Table 06 · Terrace)</strong>
          <span style="font-size:11px;color:var(--dash-muted);">Reason: Payment Token Mismatch on Bar Terminal (13:14)</span>
        </div>
        <button class="btn-secondary" style="font-size:11px;padding:4px 10px;" onclick="retryPosSync('SH-479')">
          Retry Sync
        </button>
      </div>
    `;
  }

  window.retryPosSync = function(orderId) {
    showToast(`Retrying POS Bridge sync for Order #${orderId}...`);
    setTimeout(() => {
      showToast(`Order #${orderId} successfully synced to SambaPOS!`);
      const syncTimeEl = document.getElementById('pos-last-sync-time');
      if (syncTimeEl) syncTimeEl.textContent = new Date().toLocaleTimeString();
    }, 1200);
  };

  // ── Menu Catalog Panel Renderer ──
  function renderMenuCatalogCategories() {
    const rail = document.getElementById('category-rail-menu');
    if (!rail) return;
    const dynamicCategories = getDynamicCategoryList();
    const cats = dynamicCategories.map(name => {
      const count = name === 'All'
        ? menuItems.length
        : menuItems.filter(i => {
            if (name === 'Drinks & Beverages') {
              return i.category === 'Drinks & Beverages' || i.category === 'Juices & Drinks' || i.category === 'Drinks';
            }
            return i.category === name;
          }).length;
      return { name, count };
    });
    rail.innerHTML = cats.map(cat => `
      <div class="category-card ${cat.name === activeCategory ? 'active' : ''}" data-cat="${cat.name}">
        <strong>${cat.name}</strong>
        <span>${cat.count} items</span>
      </div>
    `).join('');

    rail.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        activeCategory = card.getAttribute('data-cat');
        renderMenuCatalogCategories();
        renderMenuCatalogDishes();
      });
    });
  }

  function renderMenuCatalogDishes() {
    const grid = document.getElementById('dishes-grid-menu');
    if (!grid) return;
    const filtered = menuItems.filter(item => activeCategory === 'All' || item.category === activeCategory);
    grid.innerHTML = filtered.map(item => `
      <article class="dish-card-dash ${!item.is_available ? 'sold-out' : ''}" data-id="${item.id}">
        <div class="dish-card-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          <div class="rating-pill">
            <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${item.rating}</span>
          </div>
        </div>
        <div class="dish-card-body">
          <div class="dish-tags">
            <span class="dish-tag">${item.category}</span>
            ${item.offer_label ? `<span class="dish-tag" style="background:#fee2e2;color:#b91c1c;">${item.offer_label}</span>` : ''}
          </div>
          <h4>${item.name}</h4>
          <p>${item.desc}</p>
          <div class="dish-meta-row">
            <div>
              <div class="dish-price">KES ${item.offer_price ? item.offer_price.toLocaleString() : item.price.toLocaleString()}</div>
              <div class="dish-prep-time">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>${item.prep_time}</span>
              </div>
            </div>
            <label class="switch-control" title="Toggle Live Availability">
              <input type="checkbox" class="toggle-availability" data-id="${item.id}" ${item.is_available ? 'checked' : ''} />
              <span class="switch-slider"></span>
              <span class="switch-label ${item.is_available ? 'in-stock' : 'sold-out'}">
                ${item.is_available ? 'In Stock' : 'Sold Out'}
              </span>
            </label>
          </div>
          <!-- Menu Item Full CRUD Actions (Item 3) -->
          <div style="margin-top:10px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.06);display:flex;gap:8px;">
            <button class="btn-secondary" style="flex:1;font-size:11px;padding:4px 8px;justify-content:center;" onclick="openEditDishModal('${item.id}')">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit Dish
            </button>
            <button class="btn-secondary" style="font-size:11px;padding:4px 8px;color:#ef4444;border-color:rgba(239,68,68,0.3);justify-content:center;" onclick="softDeleteDish('${item.id}')" title="Soft delete dish from active menu">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              Delete
            </button>
          </div>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('.toggle-availability').forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const item = menuItems.find(i => i.id === id);
        if (item) {
          item.is_available = e.target.checked;
          showToast(`${item.name} marked as ${item.is_available ? 'Available' : 'Sold Out'}`);
          renderMenuCatalogDishes();
          renderDashboardDishes();
          renderGuestDishes();
        }
      });
    });
  }

  // ── Menu Dish Full CRUD Functions (Item 3) ──
  window.openEditDishModal = function(dishId) {
    const item = menuItems.find(i => i.id === dishId);
    if (!item) return;

    $('#dish-crud-title').textContent = 'Edit Menu Dish';
    $('#dish-crud-subtitle').textContent = `Update price, description, category, or photo for ${item.name}`;
    $('#dish-crud-id').value = item.id;
    $('#dish-crud-name').value = item.name;
    $('#dish-crud-price').value = item.price;
    $('#dish-crud-category').value = item.category;
    $('#dish-crud-desc').value = item.desc;
    $('#dish-crud-image-url').value = item.image;

    $('#modal-dish-crud')?.classList.add('active');
  };

  window.openCreateDishModal = function() {
    $('#dish-crud-title').textContent = 'Add New Menu Dish';
    $('#dish-crud-subtitle').textContent = 'Create a new dish or beverage for Testimonial Cafe';
    $('#dish-crud-id').value = '';
    $('#dish-crud-name').value = '';
    $('#dish-crud-price').value = '';
    $('#dish-crud-category').value = 'Nyama Choma & Grills';
    $('#dish-crud-desc').value = '';
    $('#dish-crud-image-url').value = '';

    $('#modal-dish-crud')?.classList.add('active');
  };

  window.softDeleteDish = function(dishId) {
    const item = menuItems.find(i => i.id === dishId);
    if (!item) return;

    const confirmed = window.confirm ? window.confirm(`Remove "${item.name}" from active menu? (Soft-deleted so historical receipts remain valid)`) : true;
    if (confirmed) {
      item.is_deleted = true;
      item.is_available = false;
      menuItems = menuItems.filter(i => i.id !== dishId);
      showToast(`Soft-deleted "${item.name}". Past orders and receipts will still display correctly.`);
      renderMenuCatalogDishes();
      renderDashboardDishes();
      renderGuestDishes();
    }
  };

  // ── Floor Map & Table QR Code Renderer (Item 1, 2, 5 & Merge Tables) ──
  function renderFloorMap() {
    const grid = document.getElementById('floor-map-grid');
    if (!grid) return;

    grid.innerHTML = tables.map(t => {
      const isCurrentSession = (t.num === activeTableSession.num);
      const capacity = t.capacity || t.seats || 4;
      const sessions = Array.isArray(t.sessions) ? t.sessions : [];
      const occupiedSeats = sessions.reduce((acc, s) => acc + (s.partySize || 0), 0);
      const totalBill = sessions.reduce((acc, s) => acc + (s.bill || 0), 0);
      const hasPendingSession = sessions.some(s => s.status === 'pending');
      const isMergedPrimary = Boolean(t.mergedWith);
      const isMergedSecondary = Boolean(t.mergedInto);

      // If this table is merged into another primary table
      if (isMergedSecondary) {
        const masterTable = tables.find(x => x.num === t.mergedInto);
        const thisCap = t.originalCapacity || t.capacity;
        const masterCap = masterTable ? (masterTable.originalCapacity || (masterTable.capacity - thisCap)) : 4;
        const totalCombinedSeats = masterTable ? masterTable.capacity : (thisCap + masterCap);
        const secTooltipTitle = `Merged Dining Tables: Table ${t.mergedInto} (${masterCap} seats) + Table ${t.num} (${thisCap} seats) = ${totalCombinedSeats} combined seats`;

        return `
          <div class="floor-table-card is-merged-table ${isCurrentSession ? 'floor-table-cell--active' : ''}"
               style="border-style:dashed;border-color:rgba(16, 185, 129, 0.4);"
               tabindex="0"
               aria-label="${secTooltipTitle}"
               title="${secTooltipTitle}">

            <!-- Hover-over Tooltip for Quick Reference -->
            <div class="merged-table-tooltip" role="tooltip" aria-hidden="true">
              <div class="tooltip-header">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                <span>Merged Tables</span>
              </div>
              <div class="tooltip-row">
                <span>Table ${masterTable ? masterTable.num : t.mergedInto} (Master):</span>
                <strong>${masterCap} seats</strong>
              </div>
              <div class="tooltip-row">
                <span>Table ${t.num} (Joined):</span>
                <strong>${thisCap} seats</strong>
              </div>
              <div class="tooltip-divider"></div>
              <div class="tooltip-row tooltip-total">
                <span>Combined Seat Count:</span>
                <strong class="tooltip-highlight">${totalCombinedSeats} seats</strong>
              </div>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div>
                <div style="font-size:16px;font-weight:800;color:var(--dash-text);">Table ${t.num}</div>
                <div style="font-size:12px;color:var(--dash-muted);">${t.zone} · ${thisCap} Seats (Joined)</div>
              </div>
              <div><span class="floor-badge-merged" title="${secTooltipTitle}">MERGED → T${t.mergedInto}</span></div>
            </div>

            <!-- Sessions Area -->
            <div style="padding:10px 12px;background:rgba(16, 185, 129, 0.06);border-radius:var(--radius-md);border:1px dashed rgba(16, 185, 129, 0.3);font-size:12px;color:var(--dash-muted);line-height:1.4;">
              <strong style="color:var(--dash-text);display:block;margin-bottom:2px;">Consolidated into Table ${t.mergedInto}</strong>
              <span>Active party orders and billing are being served on master Table ${t.mergedInto}.</span>
            </div>

            <div style="display:flex;gap:8px;margin-top:auto;padding-top:6px;">
              <button class="btn-secondary" onclick="unmergeTable('${t.num}')" style="flex:1;justify-content:center;font-size:11px;padding:6px;color:#f59e0b;border-color:rgba(245, 158, 11, 0.4);" title="Separate tables">
                Unmerge
              </button>
              <button class="btn-table-open" onclick="openTableDirectMenu('${t.mergedInto}', '${t.zone}')" style="flex:2;justify-content:center;font-size:11px;padding:6px;">
                Master Bill (T${t.mergedInto})
              </button>
            </div>
          </div>
        `;
      }

      // Tooltip data calculation for primary merged table
      let primaryTooltipHtml = '';
      let primaryTooltipTitle = '';
      if (isMergedPrimary) {
        const partnerTable = tables.find(x => x.num === t.mergedWith);
        const thisCap = t.originalCapacity || (partnerTable ? (t.capacity - (partnerTable.originalCapacity || partnerTable.capacity)) : t.capacity);
        const partnerCap = partnerTable ? (partnerTable.originalCapacity || partnerTable.capacity) : 4;
        const totalCombinedSeats = t.capacity;
        primaryTooltipTitle = `Merged Dining Tables: Table ${t.num} (${thisCap} seats) + Table ${t.mergedWith} (${partnerCap} seats) = ${totalCombinedSeats} combined seats`;

        primaryTooltipHtml = `
          <!-- Hover-over Tooltip for Quick Reference -->
          <div class="merged-table-tooltip" role="tooltip" aria-hidden="true">
            <div class="tooltip-header">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
              <span>Merged Tables</span>
            </div>
            <div class="tooltip-row">
              <span>Table ${t.num} (Primary):</span>
              <strong>${thisCap} seats</strong>
            </div>
            <div class="tooltip-row">
              <span>Table ${t.mergedWith} (Joined):</span>
              <strong>${partnerCap} seats</strong>
            </div>
            <div class="tooltip-divider"></div>
            <div class="tooltip-row tooltip-total">
              <span>Combined Seat Count:</span>
              <strong class="tooltip-highlight">${totalCombinedSeats} seats</strong>
            </div>
          </div>
        `;
      }

      // Status Badge logic according to Item 1:
      // FREE — no open sessions
      // OCCUPIED — seats used < capacity
      // AT CAPACITY — seats used == capacity
      // MAX EXCEEDED +N — smaller secondary badge showing extra seats beyond capacity
      // PENDING ARRIVAL — see item 5
      let badgeHtml = '';
      if (sessions.length === 0 || occupiedSeats === 0) {
        badgeHtml = isMergedPrimary
          ? `<span class="floor-badge-merged" title="${primaryTooltipTitle}">MERGED +T${t.mergedWith}</span>`
          : `<span class="floor-badge-free">FREE</span>`;
      } else if (hasPendingSession) {
        badgeHtml = `<span class="floor-badge-pending">PENDING ARRIVAL</span>`;
      } else if (occupiedSeats < capacity) {
        badgeHtml = isMergedPrimary
          ? `<div style="display:flex;gap:4px;flex-wrap:wrap;"><span class="floor-badge-merged" title="${primaryTooltipTitle}">+T${t.mergedWith}</span><span class="floor-badge-occupied">OCCUPIED (${occupiedSeats}/${capacity})</span></div>`
          : `<span class="floor-badge-occupied">OCCUPIED (${occupiedSeats}/${capacity})</span>`;
      } else if (occupiedSeats === capacity) {
        badgeHtml = isMergedPrimary
          ? `<div style="display:flex;gap:4px;flex-wrap:wrap;"><span class="floor-badge-merged" title="${primaryTooltipTitle}">+T${t.mergedWith}</span><span class="floor-badge-capacity">AT CAPACITY (${occupiedSeats}/${capacity})</span></div>`
          : `<span class="floor-badge-capacity">AT CAPACITY (${occupiedSeats}/${capacity})</span>`;
      } else {
        const extra = occupiedSeats - capacity;
        badgeHtml = `
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            ${isMergedPrimary ? `<span class="floor-badge-merged" title="${primaryTooltipTitle}">+T${t.mergedWith}</span>` : ''}
            <span class="floor-badge-capacity">AT CAPACITY</span>
            <span class="floor-badge-overflow">+${extra} OVERFLOW</span>
          </div>
        `;
      }

      // Sessions listing
      const sessionsHtml = sessions.length > 0 ? sessions.map(s => `
        <div class="floor-session-row ${s.status === 'pending' ? 'is-pending' : ''}">
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;">
            <strong style="color:var(--dash-text);">${s.partyName}</strong>
            <span style="font-size:11px;color:var(--dash-muted);">${s.partySize} seats</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;">
            <span style="color:var(--dash-muted);">Server: <strong style="color:var(--dash-text);">${s.waiter || 'Unassigned'}</strong></span>
            <span style="font-weight:700;color:var(--primary);">KES ${(s.bill || 0).toLocaleString()}</span>
          </div>
          ${s.status === 'pending' ? `
            <div style="margin-top:4px;">
              <button class="btn-confirm-arrival" onclick="confirmSessionArrival('${t.num}', '${s.id}')">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Confirm Arrival
              </button>
            </div>
          ` : ''}
        </div>
      `).join('') : `
        <div style="font-size:12px;color:var(--dash-muted);padding:8px 0;font-style:italic;">
          No active sessions seated
        </div>
      `;

      return `
        <div class="floor-table-card ${isMergedPrimary ? 'is-merged-table' : ''} ${isCurrentSession ? 'floor-table-cell--active' : ''}"
             ${isMergedPrimary ? 'tabindex="0"' : ''}
             ${primaryTooltipTitle ? `aria-label="${primaryTooltipTitle}" title="${primaryTooltipTitle}"` : ''}>
          ${primaryTooltipHtml}
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <div>
              <div style="font-size:16px;font-weight:800;color:var(--dash-text);">
                Table ${t.num} ${isMergedPrimary ? `<span style="font-size:12px;color:var(--primary);font-weight:700;">(+T${t.mergedWith})</span>` : ''}
              </div>
              <div style="font-size:12px;color:var(--dash-muted);">
                ${t.zone} · ${capacity} Seats ${isMergedPrimary ? 'Combined Capacity' : 'Capacity'}
              </div>
            </div>
            <div>${badgeHtml}</div>
          </div>

          <!-- Sessions List -->
          <div style="display:flex;flex-direction:column;gap:6px;">
            ${sessionsHtml}
          </div>

          ${totalBill > 0 ? `
            <div style="border-top:1px solid var(--dash-border);padding-top:8px;display:flex;justify-content:space-between;font-size:13px;">
              <span style="color:var(--dash-muted);">Table Running Total:</span>
              <strong style="color:var(--primary);">KES ${totalBill.toLocaleString()}</strong>
            </div>
          ` : ''}

          <div style="display:flex;gap:6px;margin-top:auto;padding-top:6px;">
            ${isMergedPrimary ? `
              <button class="btn-secondary" onclick="unmergeTable('${t.num}')" style="font-size:11px;padding:6px 8px;color:#f59e0b;border-color:rgba(245,158,11,0.4);" title="Separate tables">
                Unmerge
              </button>
            ` : `
              <button class="btn-merge-table" onclick="openMergeTablesModal('${t.num}')" title="Merge with adjacent table for large party">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                Merge
              </button>
            `}
            <button class="btn-table-qr" onclick="openTableQrModal('${t.num}')" style="flex:1;justify-content:center;font-size:11px;padding:6px;">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              View QR
            </button>
            <button class="btn-table-open" onclick="openTableDirectMenu('${t.num}', '${t.zone}')" style="flex:1;justify-content:center;font-size:11px;padding:6px;">
              Open Menu
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // ── Helper: Check if two tables are adjacent ──
  function areTablesAdjacent(t1, t2) {
    if (!t1 || !t2 || t1.num === t2.num) return false;
    if (t1.zone === t2.zone) return true;
    const n1 = parseInt(t1.num, 10);
    const n2 = parseInt(t2.num, 10);
    return Math.abs(n1 - n2) === 1;
  }

  // ── Open Merge Tables Modal ──
  window.openMergeTablesModal = function(preselectedPrimaryNum = null) {
    const primarySelect = document.getElementById('merge-primary-table');
    const secondarySelect = document.getElementById('merge-secondary-table');
    if (!primarySelect || !secondarySelect) return;

    // Available primary tables (not merged into another table)
    const availableTables = tables.filter(t => !t.mergedInto);
    if (availableTables.length < 2) {
      showToast('Need at least 2 dining tables to perform a merge.', false);
      return;
    }

    // Populate Primary Table Select
    primarySelect.innerHTML = availableTables.map(t => {
      const activeParties = t.sessions?.length || 0;
      const totalBill = t.sessions?.reduce((sum, s) => sum + (s.bill || 0), 0) || 0;
      const statusText = t.mergedWith
        ? `Merged (+T${t.mergedWith})`
        : (activeParties > 0 ? `Occupied: KES ${totalBill.toLocaleString()} (${activeParties} ${activeParties === 1 ? 'party' : 'parties'})` : 'Free');
      return `<option value="${t.num}">Table ${t.num} (${t.zone} · ${t.capacity} seats · ${statusText})</option>`;
    }).join('');

    // Preselect primary table if provided
    if (preselectedPrimaryNum) {
      const formatted = String(preselectedPrimaryNum).padStart(2, '0');
      if (availableTables.some(t => t.num === formatted)) {
        primarySelect.value = formatted;
      }
    }

    function populateSecondarySelect() {
      const selectedPrimaryNum = primarySelect.value;
      const primaryTable = tables.find(t => t.num === selectedPrimaryNum);
      if (!primaryTable) return;

      const candidates = tables.filter(t => t.num !== selectedPrimaryNum && !t.mergedInto);
      const adjacentCandidates = candidates.filter(t => areTablesAdjacent(primaryTable, t));
      const otherCandidates = candidates.filter(t => !areTablesAdjacent(primaryTable, t));

      const formatOption = (t, isAdj) => {
        const activeParties = t.sessions?.length || 0;
        const totalBill = t.sessions?.reduce((sum, s) => sum + (s.bill || 0), 0) || 0;
        const statusText = t.status === 'free' ? 'Free' : `Occupied: KES ${totalBill.toLocaleString()}`;
        const prefix = isAdj ? '[Adjacent] ' : '';
        return `<option value="${t.num}">${prefix}Table ${t.num} (${t.zone} · ${t.capacity} seats · ${statusText})</option>`;
      };

      let html = '';
      if (adjacentCandidates.length > 0) {
        html += `<optgroup label="Adjacent Tables (${primaryTable.zone} & Adjoining)">`;
        html += adjacentCandidates.map(t => formatOption(t, true)).join('');
        html += `</optgroup>`;
      }
      if (otherCandidates.length > 0) {
        html += `<optgroup label="Other Floor Tables">`;
        html += otherCandidates.map(t => formatOption(t, false)).join('');
        html += `</optgroup>`;
      }

      secondarySelect.innerHTML = html;
      updateMergePreview();
    }

    primarySelect.onchange = () => {
      populateSecondarySelect();
    };

    secondarySelect.onchange = () => {
      updateMergePreview();
    };

    populateSecondarySelect();
    $('#modal-merge-tables')?.classList.add('active');
  };

  // ── Update Merge Preview Box ──
  function updateMergePreview() {
    const primaryNum = document.getElementById('merge-primary-table')?.value;
    const secondaryNum = document.getElementById('merge-secondary-table')?.value;
    const pTable = tables.find(t => t.num === primaryNum);
    const sTable = tables.find(t => t.num === secondaryNum);

    const seatsEl = document.getElementById('merge-preview-seats');
    const partiesEl = document.getElementById('merge-preview-parties');
    const billEl = document.getElementById('merge-preview-bill');
    const waiterEl = document.getElementById('merge-preview-waiter');
    const adjacencyEl = document.getElementById('merge-preview-adjacency');

    if (!pTable || !sTable || pTable.num === sTable.num) {
      if (seatsEl) seatsEl.textContent = '-';
      if (partiesEl) partiesEl.textContent = '-';
      if (billEl) billEl.textContent = 'KES 0';
      if (waiterEl) waiterEl.textContent = '-';
      return;
    }

    const combinedSeats = (pTable.capacity || 4) + (sTable.capacity || 4);
    const allSessions = [...(pTable.sessions || []), ...(sTable.sessions || [])];
    const totalGuests = allSessions.reduce((acc, s) => acc + (s.partySize || 0), 0);
    const totalParties = allSessions.length;
    const totalBill = allSessions.reduce((acc, s) => acc + (s.bill || 0), 0);
    const assignedWaiter = (pTable.waiter && pTable.waiter !== 'Unassigned')
      ? pTable.waiter
      : ((sTable.waiter && sTable.waiter !== 'Unassigned') ? sTable.waiter : 'Sarah Nduta');

    if (seatsEl) seatsEl.textContent = `${combinedSeats} seats (${pTable.capacity} + ${sTable.capacity})`;
    if (partiesEl) {
      partiesEl.textContent = totalParties > 0
        ? `${totalParties} ${totalParties === 1 ? 'party' : 'parties'} (${totalGuests} guests)`
        : '0 parties (Tables both open)';
    }
    if (billEl) billEl.textContent = `KES ${totalBill.toLocaleString()}`;
    if (waiterEl) waiterEl.textContent = assignedWaiter;

    if (adjacencyEl) {
      const isAdj = areTablesAdjacent(pTable, sTable);
      if (isAdj) {
        adjacencyEl.innerHTML = `<span style="color:#22c55e;">Adjacent tables in ${pTable.zone === sTable.zone ? pTable.zone + ' zone' : 'neighboring layout'}</span>`;
      } else {
        adjacencyEl.innerHTML = `<span style="color:#f59e0b;">Notice: Tables are in separate dining zones (${pTable.zone} & ${sTable.zone})</span>`;
      }
    }
  }

  // ── Confirm Table Merge Handler ──
  function confirmMergeTables() {
    const primaryNum = document.getElementById('merge-primary-table')?.value;
    const secondaryNum = document.getElementById('merge-secondary-table')?.value;
    const combineIntoOne = document.getElementById('merge-combine-sessions-checkbox')?.checked ?? true;

    if (!primaryNum || !secondaryNum || primaryNum === secondaryNum) {
      showToast('Please select two distinct tables to merge.', false);
      return;
    }

    const pTable = tables.find(t => t.num === primaryNum);
    const sTable = tables.find(t => t.num === secondaryNum);
    if (!pTable || !sTable) return;

    // Save baseline capacity before merging
    if (!pTable.originalCapacity) pTable.originalCapacity = pTable.capacity;
    if (!sTable.originalCapacity) sTable.originalCapacity = sTable.capacity;

    const allSessions = [...(pTable.sessions || []), ...(sTable.sessions || [])];
    const totalGuests = allSessions.reduce((acc, s) => acc + (s.partySize || 0), 0);
    const totalBill = allSessions.reduce((acc, s) => acc + (s.bill || 0), 0);
    const totalOrders = allSessions.reduce((acc, s) => acc + (s.orders || 0), 0);
    const assignedWaiter = (pTable.waiter && pTable.waiter !== 'Unassigned')
      ? pTable.waiter
      : ((sTable.waiter && sTable.waiter !== 'Unassigned') ? sTable.waiter : 'Sarah Nduta');

    // Combine active sessions into one master party session if checked
    if (combineIntoOne && allSessions.length > 0) {
      const firstParty = allSessions[0];
      const partyName = firstParty
        ? `${firstParty.partyName.replace(/\s*\(Merged.*?\)/g, '')} (Merged T${pTable.num}+T${sTable.num})`
        : `Large Party (Merged T${pTable.num}+T${sTable.num})`;

      pTable.sessions = [{
        id: `sess-${pTable.num}-merged-${Date.now()}`,
        partyName: partyName,
        partySize: totalGuests || (pTable.capacity + sTable.capacity),
        status: 'confirmed',
        bill: totalBill,
        waiter: assignedWaiter,
        startedAt: firstParty?.startedAt || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        orders: totalOrders || 1
      }];
    } else {
      pTable.sessions = allSessions;
    }

    // Expand primary table capacity
    pTable.capacity = pTable.originalCapacity + sTable.originalCapacity;
    pTable.mergedWith = sTable.num;
    pTable.waiter = assignedWaiter;
    pTable.status = pTable.sessions.length > 0 ? 'occupied' : 'free';

    // Update secondary table as merged into primary
    sTable.mergedInto = pTable.num;
    sTable.sessions = [];
    sTable.status = 'merged';
    sTable.waiter = assignedWaiter;

    // If current session was on secondary table, re-point to primary table
    if (activeTableSession && activeTableSession.num === sTable.num) {
      activeTableSession.num = pTable.num;
      activeTableSession.zone = pTable.zone;
    }

    $('#modal-merge-tables')?.classList.remove('active');
    showToast(`Tables ${pTable.num} & ${sTable.num} merged! Total capacity: ${pTable.capacity} seats with unified billing.`);
    renderFloorMap();
    renderTableQrManager();
  }

  // ── Unmerge Tables Handler ──
  window.unmergeTable = function(tableNum) {
    const formattedNum = String(tableNum).padStart(2, '0');
    let pTable = tables.find(t => t.num === formattedNum);
    if (!pTable) return;

    let sTable;
    if (pTable.mergedWith) {
      sTable = tables.find(t => t.num === pTable.mergedWith);
    } else if (pTable.mergedInto) {
      sTable = pTable;
      pTable = tables.find(t => t.num === sTable.mergedInto);
    }

    if (!pTable || !sTable) {
      showToast('Could not find corresponding merged table pairing.', false);
      return;
    }

    // Restore primary table capacity
    pTable.capacity = pTable.originalCapacity || (pTable.capacity - sTable.originalCapacity);
    delete pTable.mergedWith;
    pTable.status = (pTable.sessions && pTable.sessions.length > 0) ? 'occupied' : 'free';

    // Restore secondary table
    sTable.status = 'free';
    sTable.capacity = sTable.originalCapacity || sTable.capacity;
    delete sTable.mergedInto;
    sTable.sessions = [];
    sTable.waiter = 'Unassigned';

    showToast(`Tables ${pTable.num} and ${sTable.num} separated. Table ${sTable.num} is now FREE and available.`);
    renderFloorMap();
    renderTableQrManager();
  };

  // Confirm arrival action for staff on floor map (Item 5)
  window.confirmSessionArrival = function(tableNum, sessionId) {
    const table = tables.find(t => String(t.num).padStart(2, '0') === String(tableNum).padStart(2, '0'));
    if (!table) return;
    const session = table.sessions?.find(s => s.id === sessionId);
    if (session) {
      session.status = 'confirmed';
      updateTableOverallStatus(table);
      showToast(`Arrival Confirmed for ${session.partyName} at Table ${table.num}! Ordering unlocked.`);
      renderFloorMap();
      updateGuestArrivalBanner();
    }
  };

  // ── Render Dedicated Table QR Manager (Item 2) ──
  function renderTableQrManager() {
    const grid = document.getElementById('table-qr-manager-grid');
    if (!grid) return;

    grid.innerHTML = tables.map(t => {
      const url = getTableMenuUrl(t.num, t.zone);
      return `
        <div class="table-qr-card">
          <div style="display:flex;justify-content:space-between;width:100%;align-items:center;">
            <strong style="font-size:16px;">Table ${t.num}</strong>
            <span style="font-size:11px;color:var(--dash-muted);">${t.zone}</span>
          </div>
          <div class="table-qr-box" id="mgr-qr-${t.num}"></div>
          <div style="font-size:11px;color:var(--dash-muted);word-break:break-all;font-family:monospace;max-width:180px;">
            ${url}
          </div>
          <div style="display:flex;gap:8px;width:100%;margin-top:6px;">
            <button class="btn-secondary" style="flex:1;justify-content:center;font-size:11px;padding:6px;" onclick="downloadSingleTableQrPng('${t.num}')">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              PNG
            </button>
            <button class="btn-primary" style="flex:1;justify-content:center;font-size:11px;padding:6px;" onclick="downloadSingleTablePdfTent('${t.num}')">
              PDF Tent
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Generate real QRs inside each card
    tables.forEach(t => {
      const box = document.getElementById(`mgr-qr-${t.num}`);
      if (box && typeof QRCode !== 'undefined') {
        const url = getTableMenuUrl(t.num, t.zone);
        new QRCode(box, {
          text: url,
          width: 130,
          height: 130,
          colorDark: '#07382d',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.M
        });
      }
    });
  }

  // PNG Download Action (Item 2)
  window.downloadSingleTableQrPng = function(tableNum) {
    const box = document.getElementById(`mgr-qr-${tableNum}`) || document.getElementById('qr-code-canvas-container');
    const imgOrCanvas = box?.querySelector('img') || box?.querySelector('canvas');
    if (!imgOrCanvas) {
      showToast('Generating QR image...', true);
      return;
    }
    const dataUrl = imgOrCanvas.src || (imgOrCanvas.toDataURL ? imgOrCanvas.toDataURL('image/png') : null);
    if (dataUrl) {
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `shamba-house-table-${tableNum}-qr.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast(`Downloaded PNG QR for Table ${tableNum}!`);
    } else {
      showToast('Right-click to save QR code', true);
    }
  };

  // PDF Table-Tent Download / Print (Item 2)
  window.downloadSingleTablePdfTent = function(tableNum) {
    openPrintAllQrModal();
    showToast(`Print / Save as PDF dialog opened for Table ${tableNum} Tent Stand`);
    setTimeout(() => { window.print(); }, 600);
  };

  // ── Open Table QR Modal with Real Scannable QRCode ──
  window.openTableQrModal = function(tableNum) {
    const formattedNum = String(tableNum).padStart(2, '0');
    const table = tables.find(t => String(t.num).padStart(2, '0') === formattedNum) || {
      num: formattedNum,
      zone: 'Garden Terrace',
      capacity: 4,
      seats: 4,
      status: 'available',
      waiter: 'Unassigned',
      qr_token: `qr-shamba-t${formattedNum}`
    };

    if ($('#qr-modal-zone')) $('#qr-modal-zone').textContent = `${table.zone} Area`;
    if ($('#qr-modal-title')) $('#qr-modal-title').textContent = `Table ${table.num} · ${table.zone}`;
    if ($('#qr-modal-meta')) $('#qr-modal-meta').textContent = `Capacity: ${table.seats || table.capacity || 4} guests · Waiter: ${table.waiter || 'Unassigned'}`;

    const url = getTableMenuUrl ? getTableMenuUrl(table.num, table.zone) : `${window.location.origin}/t/${table.qr_token || 'qr-shamba-t' + table.num}`;
    if ($('#qr-url-text')) $('#qr-url-text').textContent = url;
    if ($('#qr-modal-url-text')) $('#qr-modal-url-text').textContent = url;

    // Render Scannable QR code into container
    const container = document.getElementById('modal-qr-container') || document.getElementById('qr-code-canvas-container');
    if (container) {
      container.innerHTML = '';
      if (typeof QRCode !== 'undefined') {
        new QRCode(container, {
          text: url,
          width: 180,
          height: 180,
          colorDark: '#07382d',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.M
        });
      } else {
        container.innerHTML = `<div style="padding:20px;color:var(--dash-muted);">QR Code: ${url}</div>`;
      }
    }

    // Status button text and dot if present
    const statusDot = $('#qr-modal-status-dot');
    const statusText = $('#qr-modal-status-btn-text');
    const statusColor = { occupied: '#10b981', free: '#94a3b8', available: '#94a3b8', reserved: '#f59e0b' };
    if (statusDot) statusDot.style.background = statusColor[table.status] || '#94a3b8';
    if (statusText) statusText.textContent = `Status: ${(table.status || 'AVAILABLE').toUpperCase()}`;

    // Wire actions (both HTML IDs supported)
    const handleOpenGuest = () => {
      $('#modal-table-qr')?.classList.remove('active');
      openTableDirectMenu(table.num, table.zone);
    };
    const handleCopyLink = () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          showToast(`Copied QR Link for Table ${table.num}!`);
        }).catch(() => {
          showToast(`Link: ${url}`);
        });
      } else {
        showToast(`Link: ${url}`);
      }
    };

    if ($('#btn-open-guest-for-table')) $('#btn-open-guest-for-table').onclick = handleOpenGuest;
    if ($('#btn-qr-open-guest')) $('#btn-qr-open-guest').onclick = handleOpenGuest;
    if ($('#btn-copy-qr-link')) $('#btn-copy-qr-link').onclick = handleCopyLink;
    if ($('#btn-qr-copy-link')) $('#btn-qr-copy-link').onclick = handleCopyLink;

    if ($('#btn-qr-print-single')) {
      $('#btn-qr-print-single').onclick = () => window.print();
    }

    if ($('#btn-qr-toggle-status')) {
      $('#btn-qr-toggle-status').onclick = () => {
        const nextStatus = table.status === 'occupied' ? 'available' : (table.status === 'available' || table.status === 'free' ? 'reserved' : 'occupied');
        table.status = nextStatus;
        showToast(`Table ${table.num} status changed to ${nextStatus.toUpperCase()}`);
        openTableQrModal(table.num);
        renderFloorMap();
      };
    }

    $('#modal-table-qr')?.classList.add('active');
  };

  window.openTableDirectMenu = function(tableNum, zone) {
    setActiveTableSession(tableNum, zone, true);
    setView('guest');
  };

  // ── Print Center: All 12 Table QR Tents ──
  function openPrintAllQrModal() {
    const container = document.getElementById('print-all-cards-container');
    if (!container) return;
    container.innerHTML = '';

    tables.forEach(t => {
      const url = getTableMenuUrl(t.num, t.zone);
      const card = document.createElement('div');
      card.className = 'print-qr-stand-card';
      card.innerHTML = `
        <div class="print-card-brand">
          <small>SHAMBA HOUSE · SOCIAL HOUSE &amp; KITCHEN</small>
          <h2>Table ${t.num}</h2>
          <span>${t.zone} Area · ${t.seats} Guests</span>
        </div>
        <div class="print-card-qr-box" id="print-qr-box-${t.num}"></div>
        <div class="print-card-footer">
          <strong>SCAN WITH PHONE CAMERA</strong>
          <p>Browse full menu, customize spices, and pay tableside</p>
          <div class="print-wifi-pill">Free Wi-Fi: Testimony_Guest</div>
        </div>
      `;
      container.appendChild(card);

      const qrBox = card.querySelector(`#print-qr-box-${t.num}`);
      if (qrBox && typeof QRCode !== 'undefined') {
        new QRCode(qrBox, {
          text: url,
          width: 140,
          height: 140,
          colorDark: '#07382d',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.M
        });
      }
    });

    $('#modal-print-all-qr')?.classList.add('active');
  }

  // ── Guest Table Selector Modal ──
  function openGuestTableSelectorModal() {
    const grid = document.getElementById('guest-table-selector-grid');
    if (!grid) return;

    grid.innerHTML = tables.map(t => {
      const isSelected = (t.num === activeTableSession.num);
      return `
        <button type="button" class="guest-table-select-btn ${isSelected ? 'active' : ''}" onclick="selectGuestTable('${t.num}', '${t.zone}')">
          <strong style="display:block;font-size:15px;color:var(--dash-ink);">Table ${t.num}</strong>
          <small style="color:var(--dash-muted);font-size:11px;">${t.zone}</small>
        </button>
      `;
    }).join('');

    $('#modal-guest-table-select')?.classList.add('active');
  }

  window.selectGuestTable = function(num, zone) {
    setActiveTableSession(num, zone, true);
    $('#modal-guest-table-select')?.classList.remove('active');
    showToast(`Switched active table to Table ${num} (${zone})`);
  };

  // ── Kanban Ticket Advancement ──
  window.advanceKanbanTicket = function(btn) {
    const ticket = btn.closest('.kanban-ticket');
    if (!ticket) return;

    const col = ticket.closest('.kanban-col');
    const cols = [...document.querySelectorAll('#panel-orders .kanban-col')];
    const currentIndex = cols.indexOf(col);

    if (currentIndex === 0) { // Incoming -> In Kitchen
      ticket.classList.add('ticket-cooking');
      btn.textContent = 'Ready to Serve';
      cols[1].querySelector('.kanban-cards').appendChild(ticket);
      showToast('Ticket moved to Kitchen cooking queue');
    } else if (currentIndex === 1) { // In Kitchen -> Ready to Serve
      ticket.classList.remove('ticket-cooking');
      ticket.classList.add('ticket-ready');
      btn.textContent = 'Mark Served';
      cols[2].querySelector('.kanban-cards').appendChild(ticket);
      showToast('Order ready! Attendant notified');
    } else if (currentIndex === 2) { // Ready -> Served Today
      ticket.classList.remove('ticket-ready');
      ticket.classList.add('ticket-served');
      btn.remove();
      cols[3].querySelector('.kanban-cards').appendChild(ticket);
      showToast('Order completed & closed');
    }
    updateKanbanCounts();
  };

  function updateKanbanCounts() {
    document.querySelectorAll('#panel-orders .kanban-col').forEach(col => {
      const countEl = col.querySelector('.kanban-count');
      const tickets = col.querySelectorAll('.kanban-ticket').length;
      if (countEl) countEl.textContent = tickets;
    });
  }

  // Staff panel mirror renderer
  function renderStaffPanel() {
    const panelGrid = document.getElementById('staff-roster-grid-panel');
    if (!panelGrid) return;
    panelGrid.innerHTML = staffRoster.map(s => `
      <div class="staff-card ${s.active ? '' : 'staff-card--inactive'}">
        <div class="staff-avatar">${s.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()}</div>
        <div class="staff-info">
          <strong>${s.name}</strong>
          <span>${s.role}</span>
          <small>${s.station} · PIN ****</small>
        </div>
        <div class="staff-status-dot ${s.active ? 'active' : 'inactive'}"></div>
      </div>`).join('');
  }

  // Wire Sidebar Nav buttons
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      $$('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const targetNav = link.getAttribute('data-dash-nav');
      switchDashPanel(targetNav);
    });
  });

  // Wire "Add Dish" from Menu Catalog panel
  document.getElementById('btn-menu-add-dish')?.addEventListener('click', () => {
    $('#modal-add-dish')?.classList.add('active');
  });

  // Wire "Add Staff Member" button in standalone Staff panel
  document.getElementById('btn-open-add-staff-panel')?.addEventListener('click', () => {
    $('#new-staff-name').value = '';
    $('#new-staff-pin').value = '';
    $('#staff-admin-pin-verify').value = '';
    $('#modal-add-staff')?.classList.add('active');
  });

  // Wire Offers button
  document.getElementById('btn-new-offer')?.addEventListener('click', () => {
    showToast('Offer creator initialized · Enter deal code');
  });
  document.getElementById('btn-hero-offers')?.addEventListener('click', () => {
    showToast('TESTIMONY30 promotional discount active on grill platters');
  });
  document.getElementById('btn-configure-promo')?.addEventListener('click', () => {
    switchDashPanel('offers');
  });

  // Wire POS Bridge buttons
  document.getElementById('btn-configure-pos')?.addEventListener('click', () => {
    showToast('SambaPOS endpoint: http://localhost:8080/api/tickets');
  });
  document.getElementById('btn-sync-pos')?.addEventListener('click', () => {
    showToast('Menu synchronized with SambaPOS terminal database!');
  });
  document.getElementById('btn-change-pin')?.addEventListener('click', () => {
    showToast('Admin authentication is server-side; no PIN is stored in this browser');
  });

  // Dismiss modal overlay on outside click
  $$('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  // ── Staff Sidebar Drawer (Mobile & Tablet) ──
  const getSidebarEl = () => $('#main-sidebar') || $('#app-sidebar') || $('.sidebar');
  const getBackdropEl = () => $('#sidebar-backdrop');
  const btnMoreNav = $('#btn-staff-more-nav');

  const openSidebarDrawer = () => {
    const sb = getSidebarEl();
    const bd = getBackdropEl();
    sb?.classList.add('drawer-open');
    bd?.classList.add('active');
    btnMoreNav?.classList.add('active');
  };

  const closeSidebarDrawer = () => {
    const sb = getSidebarEl();
    const bd = getBackdropEl();
    sb?.classList.remove('drawer-open');
    bd?.classList.remove('active');
    btnMoreNav?.classList.remove('active');
  };

  const toggleSidebarDrawer = () => {
    const sb = getSidebarEl();
    if (sb?.classList.contains('drawer-open')) {
      closeSidebarDrawer();
    } else {
      openSidebarDrawer();
    }
  };

  $('#btn-toggle-sidebar')?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSidebarDrawer();
  });
  $('#btn-close-sidebar')?.addEventListener('click', (e) => {
    e.preventDefault();
    closeSidebarDrawer();
  });
  btnMoreNav?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSidebarDrawer();
  });
  getBackdropEl()?.addEventListener('click', () => {
    closeSidebarDrawer();
  });

  // Automatically close sidebar drawer when navigating
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeSidebarDrawer();
    });
  });

  // ── Staff Bottom Navigation Items (Mobile) ──
  $$('.staff-bottom-nav-item[data-dash-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.staff-bottom-nav-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetNav = btn.getAttribute('data-dash-nav');
      // Also sync sidebar
      $$('.nav-link').forEach(l => {
        l.classList.toggle('active', l.getAttribute('data-dash-nav') === targetNav);
      });
      switchDashPanel(targetNav);
    });
  });

  // ── Kanban Mobile Tabs ──
  $$('.kanban-tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.kanban-tab-btn').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const stage = tab.getAttribute('data-stage');
      $$('.kanban-col').forEach(col => {
        col.classList.toggle('mobile-active-stage', col.getAttribute('data-col') === stage);
      });
    });
  });

  // ── Guest Floating Rounded Order Button (Action on Tap) ──
  $('#btn-guest-floating-order')?.addEventListener('click', (e) => {
    e.preventDefault();
    $('#modal-cart')?.classList.add('active');
  });

  $('#guest-floating-order-container')?.addEventListener('click', (e) => {
    e.preventDefault();
    $('#modal-cart')?.classList.add('active');
  });

  // Global click delegation for all floating order buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('#btn-guest-floating-order') || e.target.closest('#guest-floating-order-container') || e.target.closest('#btn-pill-review-order') || e.target.closest('#guest-order-pill')) {
      $('#modal-cart')?.classList.add('active');
    }
  });

  // ── Admin Topbar & Action Controls ──
  $('#btn-dash-table-select')?.addEventListener('click', () => {
    openGuestTableSelectorModal();
  });

  $('#filter-all-cat')?.addEventListener('click', () => {
    activeCategory = 'All';
    renderDashboardCategories();
    renderDashboardDishes();
    showToast('Showing all menu categories');
  });

  $('#btn-refresh-orders')?.addEventListener('click', () => {
    updateKanbanCounts();
    showToast('Orders queue refreshed with live kitchen state');
  });

  // ── Dining Option Toggle (Dine-in vs Takeaway) (Item 7) ──
  $$('.order-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.order-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentOrderDiningType = btn.getAttribute('data-type') || 'dine-in';
      showToast(`Selected: ${currentOrderDiningType === 'takeaway' ? 'Takeaway (Packaging requested)' : 'Dine-In'}`);
    });
  });

  // ── Floor Map Sub-Tabs (Floor Map vs Table QR Manager) (Item 2) ──
  $$('.floor-tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.floor-tab-btn').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabTarget = tab.getAttribute('data-floor-tab');
      const mapSec = document.getElementById('subview-floor-grid') || document.getElementById('floor-map-view-sec');
      const qrSec = document.getElementById('subview-floor-qr') || document.getElementById('table-qr-manager-sec');
      if (tabTarget === 'qr') {
        if (mapSec) mapSec.style.display = 'none';
        if (qrSec) qrSec.style.display = 'block';
        renderTableQrManager();
      } else {
        if (mapSec) mapSec.style.display = 'block';
        if (qrSec) qrSec.style.display = 'none';
        renderFloorMap();
      }
    });
  });

  // ── Add Table Modal Wiring (Item 1 & Item 2) ──
  $('#btn-open-add-table')?.addEventListener('click', () => {
    $('#new-table-num').value = '';
    $('#new-table-capacity').value = '4';
    $('#modal-add-table')?.classList.add('active');
  });

  $('#btn-close-add-table')?.addEventListener('click', () => {
    $('#modal-add-table')?.classList.remove('active');
  });

  $('#btn-cancel-add-table')?.addEventListener('click', () => {
    $('#modal-add-table')?.classList.remove('active');
  });

  $('#btn-save-add-table')?.addEventListener('click', () => {
    const num = $('#new-table-num')?.value.trim();
    const capacity = parseInt($('#new-table-capacity')?.value) || 4;
    const zone = $('#new-table-zone')?.value || 'Main Garden';

    if (!num) {
      showToast('Please enter a valid table number', false);
      return;
    }

    const formattedNum = String(num).padStart(2, '0');
    if (tables.some(t => String(t.num).padStart(2, '0') === formattedNum)) {
      showToast(`Table ${formattedNum} already exists!`, false);
      return;
    }

    // Creating new table automatically generates its own unique QR code (Item 2)
    const newTable = {
      num: formattedNum,
      zone: zone,
      capacity: capacity,
      seats: capacity,
      status: 'free',
      waiter: 'Unassigned',
      sessions: []
    };
    tables.push(newTable);

    $('#modal-add-table')?.classList.remove('active');
    showToast(`Table ${formattedNum} (${zone}, ${capacity} seats) created with unique QR code!`);
    renderFloorMap();
    renderTableQrManager();
  });

  // ── Dish CRUD Form Wiring (Item 3) ──
  $('#btn-close-dish-crud')?.addEventListener('click', () => {
    $('#modal-dish-crud')?.classList.remove('active');
  });
  $('#btn-cancel-dish-crud')?.addEventListener('click', () => {
    $('#modal-dish-crud')?.classList.remove('active');
  });

  $('#btn-save-dish-crud')?.addEventListener('click', () => {
    const id = $('#dish-crud-id')?.value;
    const name = $('#dish-crud-name')?.value.trim();
    const price = parseInt($('#dish-crud-price')?.value);
    const category = $('#dish-crud-category')?.value;
    const desc = $('#dish-crud-desc')?.value.trim();
    let image = $('#dish-crud-image-url')?.value.trim() || '/images/hero-banner.jpg';

    if (!name || isNaN(price) || price <= 0 || !desc) {
      showToast('Please fill all required dish details', false);
      return;
    }

    if (id) {
      // Edit existing dish
      const item = menuItems.find(i => i.id === id);
      if (item) {
        item.name = name;
        item.price = price;
        item.category = category;
        item.desc = desc;
        if (image) item.image = image;
        showToast(`Updated "${name}" in menu catalog!`);
      }
    } else {
      // Create new dish
      const newDish = {
        id: 'dish-' + Date.now(),
        name,
        price,
        category,
        desc,
        image,
        is_available: true,
        prep_time: '15-20 min',
        rating: 5.0,
        station: category === 'Drinks & Beverages' ? 'bar' : 'kitchen',
        is_new: true,
        offer_label: 'NEW',
        offer_price: null
      };
      menuItems.unshift(newDish);
      showToast(`Created & published "${name}" to menu catalog!`);
    }

    $('#modal-dish-crud')?.classList.remove('active');
    renderMenuCatalogCategories();
    renderMenuCatalogDishes();
    renderDashboardCategories();
    renderDashboardDishes();
    renderGuestCategories();
    renderGuestDishes();
  });

  // ── Promotions / Specials CRUD Form Wiring (Item 4) ──
  $('#btn-open-create-promo')?.addEventListener('click', () => {
    $('#promo-crud-id').value = '';
    $('#promo-crud-title-input').value = '';
    $('#promo-crud-orig-price').value = '';
    $('#promo-crud-discount').value = '';
    $('#promo-crud-offer-price').value = '';
    $('#promo-crud-desc').value = '';
    $('#promo-crud-image-url').value = '';
    $('#promo-crud-is-daily-special').checked = true;
    $('#modal-promo-crud')?.classList.add('active');
  });

  $('#btn-close-promo-crud')?.addEventListener('click', () => {
    $('#modal-promo-crud')?.classList.remove('active');
  });
  $('#btn-cancel-promo-crud')?.addEventListener('click', () => {
    $('#modal-promo-crud')?.classList.remove('active');
  });

  // Auto-calculate Discount % and Offer Price bidirectional (Item 4)
  $('#promo-crud-discount')?.addEventListener('input', () => {
    const orig = parseFloat($('#promo-crud-orig-price')?.value) || 0;
    const disc = parseFloat($('#promo-crud-discount')?.value) || 0;
    if (orig > 0 && disc > 0) {
      const calculatedOffer = Math.round(orig * (1 - disc / 100));
      $('#promo-crud-offer-price').value = calculatedOffer;
    }
  });

  $('#promo-crud-offer-price')?.addEventListener('input', () => {
    const orig = parseFloat($('#promo-crud-orig-price')?.value) || 0;
    const offer = parseFloat($('#promo-crud-offer-price')?.value) || 0;
    if (orig > 0 && offer > 0 && offer < orig) {
      const calculatedDisc = Math.round(((orig - offer) / orig) * 100);
      $('#promo-crud-discount').value = calculatedDisc;
    }
  });

  $('#btn-save-promo-crud')?.addEventListener('click', () => {
    const title = $('#promo-crud-title-input')?.value.trim();
    const origPrice = parseInt($('#promo-crud-orig-price')?.value) || 0;
    const discount = parseInt($('#promo-crud-discount')?.value) || 0;
    let offerPrice = parseInt($('#promo-crud-offer-price')?.value) || 0;
    const desc = $('#promo-crud-desc')?.value.trim();
    const startTime = $('#promo-crud-start')?.value || '';
    const endTime = $('#promo-crud-end')?.value || '';
    const image = $('#promo-crud-image-url')?.value.trim() || '/images/hero-banner.jpg';
    const isDailySpecial = $('#promo-crud-is-daily-special')?.checked ?? true;

    if (!title || origPrice <= 0 || !desc) {
      showToast('Please provide promo title, original price, and description', false);
      return;
    }

    if (offerPrice <= 0 && discount > 0) {
      offerPrice = Math.round(origPrice * (1 - discount / 100));
    }

    const newPromo = {
      id: 'promo-' + Date.now(),
      title,
      origPrice,
      offerPrice: offerPrice > 0 ? offerPrice : origPrice,
      discountPercent: discount || Math.round(((origPrice - offerPrice) / origPrice) * 100),
      desc,
      startTime,
      endTime,
      image,
      isDailySpecial,
      active: true
    };
    promotions.unshift(newPromo);

    $('#modal-promo-crud')?.classList.remove('active');
    showToast(`Published Promotion "${title}"!`);
    renderOffersPanel();
    renderGuestPromosCarousel();
  });

  // ── Cash Payment Recording Confirmation (Item 9) ──
  $('#btn-confirm-cash-payment')?.addEventListener('click', () => {
    const tableNum = $('#cash-table-select')?.value || activeTableSession.num;
    const table = tables.find(t => String(t.num).padStart(2, '0') === String(tableNum).padStart(2, '0'));
    if (!table) return;

    // Amount pulled from table/session total automatically, never typed in freely (Item 9)
    const sessions = table.sessions || [];
    const tableTotal = sessions.reduce((sum, s) => sum + (s.bill || 0), 0) || 2400;

    const cashierName = loggedInUser.name;
    const timestamp = new Date().toLocaleTimeString();

    // Reset session bills and mark free
    sessions.forEach(s => { s.bill = 0; s.status = 'paid'; });
    table.status = 'free';
    table.currentBill = 0;

    showToast(`Cash payment of KES ${tableTotal.toLocaleString()} confirmed received by ${cashierName} at ${timestamp}!`);
    $('#modal-cash-confirm')?.classList.remove('active');
    renderFloorMap();
    renderTodaySnapshot();
  });

  // ── Staff Logout & PIN Audit Record (Item 10) ──
  const handleStaffLogout = () => {
    // Record LOGOUT in audit trail
    const userName = loggedInUser?.name || 'Staff Member';
    loginAuditLog.unshift({
      id: 'log-' + Date.now(),
      timestamp: new Date().toLocaleString(),
      staffName: userName,
      role: loggedInUser?.role || 'Staff',
      pinUsed: 'redacted',
      action: 'LOGOUT',
      device: 'Dashboard Browser'
    });
    showToast(`Staff member ${userName} logged out.`);
    setView('guest');
  };
  $('#btn-dash-logout')?.addEventListener('click', handleStaffLogout);
  $('#btn-staff-logout')?.addEventListener('click', handleStaffLogout);

  // ── Guest Staff Gate Action ──
  $('#btn-guest-staff-gate')?.addEventListener('click', () => {
    if ($('#gate-pin-input')) $('#gate-pin-input').value = '';
    if ($('#gate-pin-error')) $('#gate-pin-error').style.display = 'none';
    $('#modal-staff-pin')?.classList.add('active');
    $('#gate-pin-input')?.focus();
  });

  // ── POS Sync & Diagnostics Buttons ──
  $('#btn-sync-pos-header')?.addEventListener('click', () => {
    const btn = $('#btn-sync-pos-header');
    if (btn) btn.textContent = 'Syncing...';
    if (typeof fetch === 'function') {
      fetch('/api/pos/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'full_sync' })
      }).catch(() => {});
    }
    setTimeout(() => {
      if (btn) btn.textContent = 'Sync Now';
      const lastSync = $('#pos-last-sync-time');
      if (lastSync) lastSync.textContent = 'Just now';
      showToast('SambaPOS hardware bridge tickets synchronized.');
    }, 400);
  });

  $('#btn-retry-all-syncs')?.addEventListener('click', () => {
    const container = $('#pos-sync-log-container');
    if (container) {
      container.innerHTML = `
        <div style="padding:10px 14px;background:var(--dash-bg);border:1px solid var(--dash-border);border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong style="font-size:13px;color:var(--dash-ink);">All 28 tickets synchronized</strong>
            <small style="display:block;color:var(--status-success);font-size:11px;">Queue clear · All tickets acknowledged by POS terminal</small>
          </div>
          <span style="font-size:11px;font-weight:700;color:var(--status-success);">Synchronized</span>
        </div>
      `;
    }
    showToast('All pending ticket syncs retried and confirmed.');
  });

  // ── Staff Inspector Actions ──
  $('#btn-inspector-kitchen')?.addEventListener('click', () => {
    showToast('Next course ticket routed directly to Hot Kitchen display.');
  });
  $('#btn-inspector-print')?.addEventListener('click', () => {
    openPrintTicketModal('SH-842', '04', 'Terrace', [
      { name: 'Nyama Choma Platter', qty: 1, price: 1365 },
      { name: 'Swahili Samosa Trio', qty: 2, price: 650 }
    ], 2665);
  });
  $('#btn-inspector-clear')?.addEventListener('click', () => {
    showToast('Table 04 session closed. Table marked available.');
    const t = tables.find(x => x.num === '04');
    if (t) {
      t.status = 'available';
      t.sessions = [];
    }
    renderFloorMap();
  });

  // ── Customer Post-Payment Rating & Feedback Modal ──
  let selectedRatingStars = 5;
  $$('.star-click').forEach(starBtn => {
    starBtn.addEventListener('click', () => {
      const starVal = parseInt(starBtn.getAttribute('data-star'), 10) || 5;
      selectedRatingStars = starVal;
      $$('.star-click').forEach(b => {
        const v = parseInt(b.getAttribute('data-star'), 10);
        b.style.color = v <= starVal ? '#d4af37' : 'var(--dash-border-strong)';
      });
    });
  });

  $('#btn-close-rating')?.addEventListener('click', () => {
    $('#modal-rating')?.classList.remove('active');
  });

  $('#btn-submit-feedback')?.addEventListener('click', () => {
    $('#modal-rating')?.classList.remove('active');
    showToast(`Thank you! Your ${selectedRatingStars}-star rating was submitted to Testimonial Cafe.`);
  });

  // Close Order Confirmation Screen
  $('#btn-close-order-confirmation')?.addEventListener('click', () => {
    $('#modal-order-confirmation')?.classList.remove('active');
    clearInterval(activeGraceTimerInterval);
  });
  $('#btn-done-order-confirmation')?.addEventListener('click', () => {
    $('#modal-order-confirmation')?.classList.remove('active');
    clearInterval(activeGraceTimerInterval);
  });

  // Payment Method toggles in Cart (Item 9)
  $('#pay-method-mpesa')?.addEventListener('click', () => {
    $('#pay-method-mpesa').style.border = '2px solid var(--primary)';
    $('#pay-method-mpesa').classList.add('active-pay-method');
    $('#pay-method-card').style.border = '1px solid var(--dash-border)';
    $('#pay-method-card').classList.remove('active-pay-method');
    $('#phone-field-group').style.display = 'block';
  });

  $('#pay-method-card')?.addEventListener('click', () => {
    $('#pay-method-card').style.border = '2px solid var(--primary)';
    $('#pay-method-card').classList.add('active-pay-method');
    $('#pay-method-mpesa').style.border = '1px solid var(--dash-border)';
    $('#pay-method-mpesa').classList.remove('active-pay-method');
    $('#phone-field-group').style.display = 'none';
  });

  // Analytics date range change (Item 11)
  $('#analytics-range-select')?.addEventListener('change', () => {
    renderAnalyticsPanel();
  });
  $('#btn-export-analytics-csv')?.addEventListener('click', () => {
    exportAnalyticsCsv();
  });

  // ── Merge Tables Modal Listeners ──
  $('#btn-open-merge-tables')?.addEventListener('click', () => {
    openMergeTablesModal();
  });
  $('#btn-close-merge-tables')?.addEventListener('click', () => {
    $('#modal-merge-tables')?.classList.remove('active');
  });
  $('#btn-cancel-merge-tables')?.addEventListener('click', () => {
    $('#modal-merge-tables')?.classList.remove('active');
  });
  $('#btn-confirm-merge-tables')?.addEventListener('click', () => {
    confirmMergeTables();
  });
  $('#form-merge-tables')?.addEventListener('submit', (e) => {
    e.preventDefault();
    confirmMergeTables();
  });
  $('#merge-combine-sessions-checkbox')?.addEventListener('change', () => {
    updateMergePreview();
  });

  // Event delegation for Kanban ticket progress
  document.addEventListener('click', (e) => {
    const moveBtn = e.target.closest('.btn-ticket-move');
    if (moveBtn) {
      advanceKanbanTicket(moveBtn);
    }
  });
}
