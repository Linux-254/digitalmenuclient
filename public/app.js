/* ═══════════════════════════════════════════════
   SHAMBA HOUSE — Tableside OS & Digital Menu
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

<<<<<<< HEAD
  // ── Juices & Refreshing Drinks ──
=======
  // ── Drinks & Beverages (Refreshing juices, house cocktails, artisan coffees) ──
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
  {
    id: 'mango-passion-cooler',
    name: 'Cold-Pressed Passion Mango',
    desc: 'Pure cold-pressed coastal mango pulp blended with tart wild passion fruit, sparkling water, and fresh garden mint leaves.',
    price: 450,
<<<<<<< HEAD
    category: 'Juices & Drinks',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '5 min',
=======
    category: 'Drinks & Beverages',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '4 min',
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
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
<<<<<<< HEAD
    category: 'Juices & Drinks',
=======
    category: 'Drinks & Beverages',
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
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
<<<<<<< HEAD
    category: 'Juices & Drinks',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '5 min',
=======
    category: 'Drinks & Beverages',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '3 min',
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
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
<<<<<<< HEAD
    category: 'Juices & Drinks',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '5 min',
=======
    category: 'Drinks & Beverages',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '4 min',
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
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
<<<<<<< HEAD
    category: 'Juices & Drinks',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '3 min',
=======
    category: 'Drinks & Beverages',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '2 min',
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
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
<<<<<<< HEAD
    category: 'Juices & Drinks',
=======
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
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '4 min',
    rating: 4.9,
    station: 'bar',
<<<<<<< HEAD
=======
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
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '5 min',
    rating: 4.8,
    station: 'bar',
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
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
<<<<<<< HEAD
  'Juices & Drinks',
=======
  'Drinks & Beverages',
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
  'Desserts'
];

// ── Staff Roster Dataset (Admin Control) ──
let staffRoster = [
  { id: 'st-01', name: 'Amina Mwangi', role: 'Shift Lead / Admin', station: 'Main Dining Floor', pin: '2407', phone: '+254 711 234 567', active: true },
  { id: 'st-02', name: 'Juma Otieno', role: 'Floor Waiter', station: 'Garden Terrace', pin: '1102', phone: '+254 722 345 678', active: true },
  { id: 'st-03', name: 'Faith Wanjiku', role: 'Head Chef', station: 'Hot Kitchen', pin: '3341', phone: '+254 733 456 789', active: true },
  { id: 'st-04', name: 'Kevin Kiprono', role: 'Bartender', station: 'Cocktail Bar', pin: '5520', phone: '+254 744 567 890', active: true },
  { id: 'st-05', name: 'Sarah Nduta', role: 'Floor Waiter', station: 'Main Dining Floor', pin: '4019', phone: '+254 755 678 901', active: true }
];

// ── Application State ──
let activeCategory = 'All';
let guestActiveCategory = 'All';
let cart = []; // Array of { id, name, price, qty, spice, side, notes }
let currentView = 'dashboard'; // 'dashboard' or 'guest'
let currentDashPanel = 'home';
const ADMIN_PIN = '2407';
let selectedDishForCustomization = null;
let currentCustomSpice = 'Medium';
let currentCustomSide = 'Hand-Cut Fries';

// ── Tables OS Dataset (12 Tables across Garden, Terrace, VIP, Indoor, Bar) ──
let tables = [
  { num: '01', zone: 'Garden',  seats: 4, status: 'occupied', waiter: 'Amina Mwangi', ordersCount: 2, currentBill: 3450 },
  { num: '02', zone: 'Garden',  seats: 2, status: 'free',     waiter: 'Unassigned',   ordersCount: 0, currentBill: 0 },
  { num: '03', zone: 'Garden',  seats: 4, status: 'occupied', waiter: 'Brian Kiprop',  ordersCount: 1, currentBill: 1750 },
  { num: '04', zone: 'Terrace', seats: 6, status: 'occupied', waiter: 'Amina Mwangi', ordersCount: 3, currentBill: 5800 },
  { num: '05', zone: 'Terrace', seats: 4, status: 'free',     waiter: 'Unassigned',   ordersCount: 0, currentBill: 0 },
  { num: '06', zone: 'Terrace', seats: 4, status: 'reserved', waiter: 'David Mutua',  ordersCount: 0, currentBill: 0 },
  { num: '07', zone: 'VIP',     seats: 8, status: 'occupied', waiter: 'Grace Wanjiku', ordersCount: 4, currentBill: 12400 },
  { num: '08', zone: 'Indoor',  seats: 4, status: 'free',     waiter: 'Unassigned',   ordersCount: 0, currentBill: 0 },
  { num: '09', zone: 'Indoor',  seats: 4, status: 'occupied', waiter: 'David Mutua',  ordersCount: 2, currentBill: 2900 },
  { num: '10', zone: 'Indoor',  seats: 2, status: 'free',     waiter: 'Unassigned',   ordersCount: 0, currentBill: 0 },
  { num: '11', zone: 'Bar',     seats: 4, status: 'occupied', waiter: 'Grace Wanjiku', ordersCount: 2, currentBill: 2100 },
  { num: '12', zone: 'Bar',     seats: 2, status: 'free',     waiter: 'Unassigned',   ordersCount: 0, currentBill: 0 },
];

let activeTableSession = { num: '04', zone: 'Terrace' };

// ── Table URL & Session Management ──
function getTableMenuUrl(tableNum, zone) {
  const origin = window.location.origin && window.location.origin !== 'null'
    ? window.location.origin
    : 'https://dijimenu.vercel.app';
  return `${origin}/?table=${String(tableNum).padStart(2, '0')}&zone=${encodeURIComponent(zone || 'Terrace')}`;
}

function setActiveTableSession(num, zone, updateUrl = false) {
  const formattedNum = String(num).padStart(2, '0');
  const matchedTable = tables.find(t => String(t.num).padStart(2, '0') === formattedNum);
  const resolvedZone = zone || (matchedTable ? matchedTable.zone : 'Terrace');

  activeTableSession = { num: formattedNum, zone: resolvedZone };
  try {
    localStorage.setItem('shamba_active_table', JSON.stringify(activeTableSession));
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

  if (updateUrl && window.history && window.history.replaceState) {
    const url = new URL(window.location);
    url.searchParams.set('table', activeTableSession.num);
    url.searchParams.set('zone', activeTableSession.zone);
    window.history.replaceState({}, '', url);
  }
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

<<<<<<< HEAD
=======
    const staffNav = $('#staff-bottom-nav');
    if (staffNav) staffNav.style.display = 'none';

>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
    $('#tab-dash-view')?.classList.remove('active');
    $('#tab-guest-view')?.classList.add('active');

    renderGuestCategories();
    renderGuestDishes();
<<<<<<< HEAD
=======
    updateCartUI();
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Tableside Guest Menu Active · Table ${activeTableSession.num} (${activeTableSession.zone})`);
  } else {
    shell.classList.remove('guest-mode');
    if (dashView) dashView.style.display = 'block';
    if (guestView) guestView.style.display = 'none';
    if (dashTopbar) dashTopbar.style.display = 'flex';
    if (guestTopbar) guestTopbar.style.display = 'none';

<<<<<<< HEAD
=======
    const staffNav = $('#staff-bottom-nav');
    if (staffNav) staffNav.style.display = '';

    const floatingOrder = $('#guest-floating-order-container');
    if (floatingOrder) floatingOrder.style.display = 'none';

>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
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

  const cats = categoryNames.map(name => {
    const count = name === 'All' 
      ? menuItems.length 
      : menuItems.filter(i => i.category === name).length;
    let thumb = '/images/hero-banner.jpg';
    if (name === 'Pizzas & Burgers') thumb = '/images/beef-pizza.jpg';
    if (name === 'Grill & Steaks') thumb = '/images/chicken-steak.jpg';
    if (name === 'Pasta & Coastal') thumb = '/images/spaghetti.jpg';
    if (name === 'Starters') thumb = '/images/beef-pizza.jpg';
<<<<<<< HEAD
    if (name === 'Juices & Drinks') thumb = '/images/hero-banner.jpg';
=======
    if (name === 'Drinks & Beverages' || name === 'Juices & Drinks' || name === 'Drinks') thumb = '/images/hero-banner.jpg';
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
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
          <span class="staff-pin-tag">PIN: ${s.pin}</span>
          <span style="display:block;font-size:10px;color:#10b981;font-weight:700;margin-top:4px;">Active</span>
        </div>
      </div>
    `;
  }).join('');
}

// ═══════════════════════════════════════════
<<<<<<< HEAD
//  GUEST MENU & ORDERING FLOW (CLEAN & MINIMALISTIC)
// ═══════════════════════════════════════════

=======
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

>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
function renderGuestCategories() {
  const bar = $('#guest-category-bar');
  if (!bar) return;

  bar.innerHTML = categoryNames.map(catName => {
    const count = catName === 'All'
      ? menuItems.length
      : menuItems.filter(i => i.category === catName).length;
<<<<<<< HEAD

    return `
      <button class="guest-cat-pill ${catName === guestActiveCategory ? 'active' : ''}" data-cat="${catName}" role="tab" aria-selected="${catName === guestActiveCategory}">
        <span>${catName}</span>
        <span class="guest-cat-count">${count}</span>
=======
    const iconSvg = getCategoryIcon(catName);

    return `
      <button class="guest-cat-card ${catName === guestActiveCategory ? 'active' : ''}" data-cat="${catName}" role="tab" aria-selected="${catName === guestActiveCategory}">
        ${iconSvg}
        <span>${catName}</span>
        <span class="guest-cat-count">${count} items</span>
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
      </button>
    `;
  }).join('');

<<<<<<< HEAD
  $$('.guest-cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      guestActiveCategory = pill.getAttribute('data-cat');
      renderGuestCategories();
      renderGuestDishes();
=======
  $$('.guest-cat-card').forEach(card => {
    card.addEventListener('click', () => {
      guestActiveCategory = card.getAttribute('data-cat');
      renderGuestCategories();
      renderGuestDishes();
      // Scroll to category section if specific category selected
      if (guestActiveCategory !== 'All') {
        const sec = $(`#guest-sec-${guestActiveCategory.replace(/[^a-zA-Z0-9]/g, '-')}`);
        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
    });
  });
}

function renderGuestDishes() {
<<<<<<< HEAD
  const grid = $('#guest-dishes-grid');
  if (!grid) return;

  const searchInput = $('#guest-search-input');
  const query = (searchInput?.value || '').toLowerCase();

  const filtered = menuItems.filter(item => {
    const matchesCat = guestActiveCategory === 'All' || item.category === guestActiveCategory;
    const matchesQuery = item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  $('#guest-category-heading').textContent = guestActiveCategory === 'All' ? 'All Dishes & Drinks' : guestActiveCategory;
  $('#guest-items-counter').textContent = `${filtered.length} items`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:48px 20px;background:#ffffff;border-radius:16px;border:1px dashed var(--dash-border);">
        <p style="font-size:16px;font-weight:700;color:var(--dash-ink);">No items found</p>
        <p style="font-size:13px;color:var(--dash-muted);margin-top:4px;">Try searching for a different dish, drink, or category</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const effectivePrice = item.offer_price ? item.offer_price : item.price;
    const cartItem = cart.find(c => c.id === item.id);
    const cartQty = cartItem ? cartItem.qty : 0;

    return `
      <article class="guest-dish-card" data-id="${item.id}">
        <div class="guest-card-media" onclick="openDishCustomization('${item.id}')">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          ${item.offer_label ? `<span class="guest-card-tag offer">${item.offer_label}</span>` : `<span class="guest-card-tag">${item.category}</span>`}
          <div class="guest-card-rating">
            <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${item.rating}</span>
          </div>
        </div>

        <div class="guest-card-body" onclick="openDishCustomization('${item.id}')">
          <h4>${item.name}</h4>
          <p>${item.desc}</p>
          <div class="guest-card-bottom">
            <div class="guest-card-price-box">
              <span class="guest-card-price">KES ${effectivePrice.toLocaleString()}</span>
              <span class="guest-card-prep">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ${item.prep_time}
              </span>
            </div>

            ${item.is_available ? `
              <button class="btn-card-add ${cartQty > 0 ? 'in-cart' : ''}" onclick="event.stopPropagation(); quickAddToCart('${item.id}')" aria-label="Add ${item.name} to order">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>${cartQty > 0 ? `${cartQty} Added` : 'Add'}</span>
              </button>
            ` : `
              <span style="font-size:11px;font-weight:700;color:#ef4444;">Sold Out</span>
            `}
          </div>
        </div>
      </article>
=======
  const column = $('#guest-sections-column');
  if (!column) return;

  const searchInputTop = $('#guest-search-input-top');
  const searchInputBanner = $('#guest-search-input');
  const query = ((searchInputTop?.value || searchInputBanner?.value) || '').toLowerCase().trim();

  // Determine which sections to render based on active category & search
  let sectionsToRender = [];
  const venueCategories = categoryNames.filter(c => c !== 'All');

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
          <p style="font-size:18px;font-family:var(--font-display);color:var(--guest-accent);">No dishes found for "${query}"</p>
          <p style="font-size:13px;color:var(--guest-muted);margin-top:6px;">Try searching for steaks, tilapia, burgers, or refreshing drinks</p>
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
      items: menuItems.filter(m => m.category === cat)
    })).filter(sec => sec.items.length > 0);
  } else {
    // Render only the selected category
    sectionsToRender = [{
      category: guestActiveCategory,
      items: menuItems.filter(m => m.category === guestActiveCategory)
    }];
  }

  column.innerHTML = sectionsToRender.map(sec => {
    const secId = `guest-sec-${sec.category.replace(/[^a-zA-Z0-9]/g, '-')}`;
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
            <span>${sec.items.length} dishes</span>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </span>
        </div>
        <div class="guest-cards-scroll-row">
          ${cardsHtml}
        </div>
      </section>
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
    `;
  }).join('');
}

<<<<<<< HEAD
=======
window.filterToCategory = function(catName) {
  guestActiveCategory = catName;
  renderGuestCategories();
  renderGuestDishes();
  window.scrollTo({ top: 120, behavior: 'smooth' });
};

>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
// ── Quick Add to Cart ──
function quickAddToCart(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item || !item.is_available) return;

<<<<<<< HEAD
=======
  const isDrink = item.category === 'Drinks & Beverages' || item.station === 'bar';
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
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
<<<<<<< HEAD
      spice: 'Medium',
      side: 'Hand-Cut Fries',
=======
      spice: isDrink ? 'Chilled' : 'Medium',
      side: isDrink ? 'Standard' : 'Hand-Cut Fries',
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
      notes: ''
    });
  }

  showToast(`Added ${item.name} to table order`);
  updateCartUI();
  renderGuestDishes();
}

<<<<<<< HEAD
// ── Open Dish Customization Modal ──
=======
// ── Open Dish & Drink Customization Modal ──
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
window.openDishCustomization = function(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item) return;

  selectedDishForCustomization = item;
<<<<<<< HEAD
  currentCustomSpice = 'Medium';
  currentCustomSide = 'Hand-Cut Fries';
=======
  const isDrink = item.category === 'Drinks & Beverages' || item.station === 'bar';
  currentCustomSpice = isDrink ? 'Chilled with Ice' : 'Medium';
  currentCustomSide = isDrink ? 'Natural Cane' : 'Hand-Cut Fries';
  customQty = 1;
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)

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

<<<<<<< HEAD
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

    <!-- Special Dietary or Kitchen Instructions -->
    <div class="form-group">
      <label class="custom-option-label" for="custom-dish-notes">Special Kitchen Notes</label>
      <input type="text" class="form-control" id="custom-dish-notes" placeholder="e.g. No onions, sauce on the side, allergies..." />
=======
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
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
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
<<<<<<< HEAD
  $$('.custom-pill-row button').forEach(b => {
    if (['Mild', 'Medium Spiced', 'Extra Hot & Chili'].includes(b.textContent.trim())) {
      b.classList.toggle('active', b.textContent.includes(level));
    }
  });
=======
  const row = $$('#customization-container .custom-option-group')[0]?.querySelectorAll('.custom-pill-row button');
  if (row) {
    row.forEach(b => {
      b.classList.toggle('active', b.textContent.trim().toLowerCase().includes(level.toLowerCase().split(' ')[0]));
    });
  }
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
};

window.selectSide = function(side) {
  currentCustomSide = side;
<<<<<<< HEAD
  $$('.custom-pill-row button').forEach(b => {
    if (['Hand-Cut Fries', 'Steamed Rice', 'White Ugali', 'Garden Salad'].includes(b.textContent.trim())) {
      b.classList.toggle('active', b.textContent.includes(side.split(' ')[0]));
    }
  });
=======
  const row = $$('#customization-container .custom-option-group')[1]?.querySelectorAll('.custom-pill-row button');
  if (row) {
    row.forEach(b => {
      b.classList.toggle('active', b.textContent.trim().toLowerCase().includes(side.toLowerCase().split(' ')[0]));
    });
  }
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
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

// ── Update Cart UI & Floating Pill ──
function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Topbar badges
  const topCartCount = $('#topbar-cart-count');
  if (topCartCount) topCartCount.textContent = totalCount;

  const guestCartCount = $('#guest-cart-count');
  if (guestCartCount) guestCartCount.textContent = totalCount;

  const guestCartSum = $('#guest-cart-sum');
  if (guestCartSum) guestCartSum.textContent = `KES ${totalPrice.toLocaleString()}`;

<<<<<<< HEAD
  // Floating sticky order pill
  const pill = $('#guest-order-pill');
  if (pill) {
    if (totalCount > 0) {
      pill.style.display = 'flex';
      $('#order-pill-qty').textContent = `${totalCount} item${totalCount > 1 ? 's' : ''}`;
      $('#order-pill-price').textContent = `KES ${totalPrice.toLocaleString()}`;
=======
  // Floating rounded order button (Guest view - only shows when someone has picked items)
  const floatingOrderContainer = $('#guest-floating-order-container');
  if (floatingOrderContainer) {
    if (totalCount > 0 && currentView === 'guest') {
      floatingOrderContainer.style.display = 'flex';
      const qtyEl = $('#guest-order-pill-qty');
      if (qtyEl) qtyEl.textContent = `${totalCount} item${totalCount > 1 ? 's' : ''}`;
      const priceEl = $('#guest-order-pill-price');
      if (priceEl) priceEl.textContent = `KES ${totalPrice.toLocaleString()}`;
    } else {
      floatingOrderContainer.style.display = 'none';
    }
  }

  // Legacy pill support if present
  const pill = $('#guest-order-pill');
  if (pill) {
    if (totalCount > 0 && currentView === 'guest') {
      pill.style.display = 'flex';
      const pQty = $('#order-pill-qty');
      if (pQty) pQty.textContent = `${totalCount} item${totalCount > 1 ? 's' : ''}`;
      const pPrice = $('#order-pill-price');
      if (pPrice) pPrice.textContent = `KES ${totalPrice.toLocaleString()}`;
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
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
      <div style="display:flex;align-items:center;gap:8px;">
        <button type="button" style="width:26px;height:26px;border-radius:6px;background:#eef1f4;font-weight:700;" onclick="changeCartItemQty(${idx}, -1)">-</button>
        <span style="font-weight:800;font-size:13px;width:18px;text-align:center;">${item.qty}</span>
        <button type="button" style="width:26px;height:26px;border-radius:6px;background:#eef1f4;font-weight:700;" onclick="changeCartItemQty(${idx}, 1)">+</button>
        <button type="button" style="color:#ef4444;margin-left:6px;" onclick="removeCartItem(${idx})" aria-label="Remove item">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
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

function submitTableOrder() {
  if (cart.length === 0) {
    showToast('Your order is empty. Please add items.', false);
    return;
  }

  const orderNum = 'SH-' + Math.floor(100 + Math.random() * 900);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const orderSnapshot = [...cart];

  // Close cart modal
  $('#modal-cart')?.classList.remove('active');

<<<<<<< HEAD
  // Populate Live Tracker Modal
  $('#tracker-order-title').textContent = `Order #${orderNum}`;
  $('#tracker-total-amount').textContent = `KES ${totalAmount.toLocaleString()}`;
=======
  // Populate Live Tracker Modal safely
  const orderTitleEl = $('#tracker-order-title');
  if (orderTitleEl) orderTitleEl.textContent = `Order #${orderNum}`;

  const orderIdEl = $('#tracker-order-id');
  if (orderIdEl) orderIdEl.textContent = orderNum;

  const totalAmountEl = $('#tracker-total-amount');
  if (totalAmountEl) totalAmountEl.textContent = `KES ${totalAmount.toLocaleString()}`;

  const tableSubEl = $('#tracker-table-sub');
  if (tableSubEl) tableSubEl.textContent = `Table ${activeTableSession.num} · ${activeTableSession.zone} · Live Order`;
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)

  const listContainer = $('#tracker-items-list');
  if (listContainer) {
    listContainer.innerHTML = orderSnapshot.map(item => `
      <div style="display:flex;justify-content:space-between;font-size:13px;padding:3px 0;">
        <span>${item.qty}x ${item.name}</span>
        <strong>KES ${(item.price * item.qty).toLocaleString()}</strong>
      </div>
    `).join('');
  }

  // Clear cart
  cart = [];
  updateCartUI();
  renderGuestDishes();

  // Open Live Tracker
  $('#modal-order-tracker')?.classList.add('active');
  showToast(`Order #${orderNum} successfully routed to kitchen!`);

  // Simulate progress
  setTimeout(() => {
    $('#step-prep')?.classList.add('active');
    showToast('Kitchen started preparing your dishes');
  }, 4000);
}

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

<<<<<<< HEAD
  // Guest search filter
  $('#guest-search-input')?.addEventListener('input', () => {
=======
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
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
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
    if (pin === ADMIN_PIN) {
      $('#modal-staff-pin')?.classList.remove('active');
      setView('dashboard');
      showToast('Staff Dashboard Unlocked');
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
<<<<<<< HEAD
=======
  $('#btn-desktop-cart-checkout')?.addEventListener('click', submitTableOrder);
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)

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

    if (pin !== ADMIN_PIN) {
      showToast('Invalid Venue PIN (Enter 2407)', false);
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

    if (adminPin !== ADMIN_PIN) {
      showToast('Invalid Admin PIN (Required: 2407)', false);
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

  function switchDashPanel(targetNav) {
    currentDashPanel = targetNav || 'home';
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
    if (currentDashPanel === 'floor') renderFloorMap();
    if (currentDashPanel === 'staff') renderStaffPanel();
    if (currentDashPanel === 'menu') {
      renderMenuCatalogCategories();
      renderMenuCatalogDishes();
    }
    if (currentDashPanel === 'orders') {
      updateKanbanCounts();
    }
  }

  // ── Menu Catalog Panel Renderer ──
  function renderMenuCatalogCategories() {
    const rail = document.getElementById('category-rail-menu');
    if (!rail) return;
    const cats = categoryNames.map(name => {
      const count = name === 'All' ? menuItems.length : menuItems.filter(i => i.category === name).length;
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

  // ── Floor Map & Table QR Code Renderer ──
  function renderFloorMap() {
    const grid = document.getElementById('floor-map-grid');
    if (!grid) return;

    const statusColor = { occupied: '#10b981', free: '#94a3b8', reserved: '#f59e0b' };
    const statusBorder = { occupied: '#059669', free: '#cbd5e1', reserved: '#d97706' };

    grid.innerHTML = tables.map(t => {
      const isCurrentSession = (t.num === activeTableSession.num);
      return `
        <div class="floor-table-cell ${isCurrentSession ? 'floor-table-cell--active' : ''}" style="border-color:${statusBorder[t.status] || '#cbd5e1'};">
          <div class="floor-table-header">
            <div class="floor-table-num">Table ${t.num}</div>
            <div class="floor-table-status-dot" style="background:${statusColor[t.status] || '#cbd5e1'};"></div>
          </div>
          <div class="floor-table-zone">${t.zone} · ${t.seats} seats</div>
          <div class="floor-table-waiter-row">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            <span>${t.waiter || 'Unassigned'}</span>
          </div>
          ${t.status === 'occupied' && t.currentBill > 0 ? `
            <div class="floor-table-bill">Bill: <strong>KES ${t.currentBill.toLocaleString()}</strong></div>
          ` : ''}
          <div class="floor-table-status-label ${t.status}">${t.status.toUpperCase()}</div>
          <div class="floor-table-actions">
            <button class="btn-table-qr" onclick="openTableQrModal('${t.num}')" title="Generate &amp; view table QR flyer">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              QR Code
            </button>
            <button class="btn-table-open" onclick="openTableDirectMenu('${t.num}', '${t.zone}')" title="Test guest view for this table">
              Open Menu
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // ── Open Table QR Modal with Real Scannable QRCode ──
  window.openTableQrModal = function(tableNum) {
    const formattedNum = String(tableNum).padStart(2, '0');
    const table = tables.find(t => String(t.num).padStart(2, '0') === formattedNum);
    if (!table) return;

    $('#qr-modal-zone').textContent = `${table.zone} Area`;
    $('#qr-modal-title').textContent = `Table ${table.num}`;
    $('#qr-modal-meta').textContent = `Capacity: ${table.seats} guests · Waiter: ${table.waiter || 'Unassigned'}`;

    const url = getTableMenuUrl(table.num, table.zone);
    $('#qr-modal-url-text').textContent = url;

    // Render Scannable QR code
    const container = document.getElementById('qr-code-canvas-container');
    if (container) {
      container.innerHTML = '';
      if (typeof QRCode !== 'undefined') {
        new QRCode(container, {
          text: url,
          width: 200,
          height: 200,
          colorDark: '#07382d',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.M
        });
      } else {
        container.innerHTML = `<div style="padding:20px;color:var(--dash-muted);">QR Code for ${url}</div>`;
      }
    }

    // Status button text and dot
    const statusDot = $('#qr-modal-status-dot');
    const statusText = $('#qr-modal-status-btn-text');
    const statusColor = { occupied: '#10b981', free: '#94a3b8', reserved: '#f59e0b' };
    if (statusDot) statusDot.style.background = statusColor[table.status] || '#94a3b8';
    if (statusText) statusText.textContent = `Status: ${table.status.toUpperCase()}`;

    // Wire actions
    $('#btn-qr-open-guest').onclick = () => {
      $('#modal-table-qr')?.classList.remove('active');
      openTableDirectMenu(table.num, table.zone);
    };

    $('#btn-qr-copy-link').onclick = () => {
      navigator.clipboard.writeText(url).then(() => {
        showToast(`Copied QR Link for Table ${table.num}!`);
      }).catch(() => {
        showToast(`Link: ${url}`);
      });
    };

    $('#btn-qr-print-single').onclick = () => {
      window.print();
    };

    $('#btn-qr-toggle-status').onclick = () => {
      const nextStatus = table.status === 'occupied' ? 'free' : (table.status === 'free' ? 'reserved' : 'occupied');
      table.status = nextStatus;
      showToast(`Table ${table.num} status changed to ${nextStatus.toUpperCase()}`);
      openTableQrModal(table.num);
      renderFloorMap();
    };

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
          <div class="print-wifi-pill">Free Wi-Fi: ShambaHouse_Guest</div>
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
    showToast('SHAMBA30 promotional discount active on grill platters');
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
    showToast('Admin PIN is fixed to 2407 in demo environment');
  });

  // Dismiss modal overlay on outside click
  $$('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
<<<<<<< HEAD
=======

  // ── Staff Sidebar Drawer (Mobile & Tablet) ──
  const sidebarEl = $('#main-sidebar');
  $('#btn-toggle-sidebar')?.addEventListener('click', () => {
    sidebarEl?.classList.toggle('drawer-open');
  });
  $('#btn-close-sidebar')?.addEventListener('click', () => {
    sidebarEl?.classList.remove('drawer-open');
  });
  $('#btn-staff-more-nav')?.addEventListener('click', () => {
    sidebarEl?.classList.toggle('drawer-open');
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

  // Event delegation for Kanban ticket progress
  document.addEventListener('click', (e) => {
    const moveBtn = e.target.closest('.btn-ticket-move');
    if (moveBtn) {
      advanceKanbanTicket(moveBtn);
    }
  });
>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
}
