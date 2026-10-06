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

  // ── Juices & Refreshing Drinks ──
  {
    id: 'mango-passion-cooler',
    name: 'Cold-Pressed Passion Mango',
    desc: 'Pure cold-pressed coastal mango pulp blended with tart wild passion fruit, sparkling water, and fresh garden mint leaves.',
    price: 450,
    category: 'Juices & Drinks',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '5 min',
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
    category: 'Juices & Drinks',
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
    category: 'Juices & Drinks',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '5 min',
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
    category: 'Juices & Drinks',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '5 min',
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
    category: 'Juices & Drinks',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '3 min',
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
    category: 'Juices & Drinks',
    image: '/images/hero-banner.jpg',
    is_available: true,
    prep_time: '4 min',
    rating: 4.9,
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
  'Juices & Drinks',
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
const ADMIN_PIN = '2407';
let selectedDishForCustomization = null;
let currentCustomSpice = 'Medium';
let currentCustomSide = 'Hand-Cut Fries';

// ── Initialize App ──
document.addEventListener('DOMContentLoaded', () => {
  renderDashboardCategories();
  renderDashboardDishes();
  renderStaffRoster();
  renderGuestCategories();
  renderGuestDishes();
  setupEventListeners();
  updateCartUI();

  // Check URL query for direct guest mode
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('mode') === 'guest' || urlParams.get('view') === 'guest') {
    setView('guest');
  } else {
    setView('dashboard');
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

    $('#tab-dash-view')?.classList.remove('active');
    $('#tab-guest-view')?.classList.add('active');

    renderGuestCategories();
    renderGuestDishes();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Tableside Guest Menu Active · Table 04');
  } else {
    shell.classList.remove('guest-mode');
    if (dashView) dashView.style.display = 'block';
    if (guestView) guestView.style.display = 'none';
    if (dashTopbar) dashTopbar.style.display = 'flex';
    if (guestTopbar) guestTopbar.style.display = 'none';

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
    if (name === 'Juices & Drinks') thumb = '/images/hero-banner.jpg';
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
//  GUEST MENU & ORDERING FLOW (CLEAN & MINIMALISTIC)
// ═══════════════════════════════════════════

function renderGuestCategories() {
  const bar = $('#guest-category-bar');
  if (!bar) return;

  bar.innerHTML = categoryNames.map(catName => {
    const count = catName === 'All'
      ? menuItems.length
      : menuItems.filter(i => i.category === catName).length;

    return `
      <button class="guest-cat-pill ${catName === guestActiveCategory ? 'active' : ''}" data-cat="${catName}" role="tab" aria-selected="${catName === guestActiveCategory}">
        <span>${catName}</span>
        <span class="guest-cat-count">${count}</span>
      </button>
    `;
  }).join('');

  $$('.guest-cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      guestActiveCategory = pill.getAttribute('data-cat');
      renderGuestCategories();
      renderGuestDishes();
    });
  });
}

function renderGuestDishes() {
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
    `;
  }).join('');
}

// ── Quick Add to Cart ──
function quickAddToCart(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item || !item.is_available) return;

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
      spice: 'Medium',
      side: 'Hand-Cut Fries',
      notes: ''
    });
  }

  showToast(`Added ${item.name} to table order`);
  updateCartUI();
  renderGuestDishes();
}

// ── Open Dish Customization Modal ──
window.openDishCustomization = function(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item) return;

  selectedDishForCustomization = item;
  currentCustomSpice = 'Medium';
  currentCustomSide = 'Hand-Cut Fries';

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
  $$('.custom-pill-row button').forEach(b => {
    if (['Mild', 'Medium Spiced', 'Extra Hot & Chili'].includes(b.textContent.trim())) {
      b.classList.toggle('active', b.textContent.includes(level));
    }
  });
};

window.selectSide = function(side) {
  currentCustomSide = side;
  $$('.custom-pill-row button').forEach(b => {
    if (['Hand-Cut Fries', 'Steamed Rice', 'White Ugali', 'Garden Salad'].includes(b.textContent.trim())) {
      b.classList.toggle('active', b.textContent.includes(side.split(' ')[0]));
    }
  });
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

  // Floating sticky order pill
  const pill = $('#guest-order-pill');
  if (pill) {
    if (totalCount > 0) {
      pill.style.display = 'flex';
      $('#order-pill-qty').textContent = `${totalCount} item${totalCount > 1 ? 's' : ''}`;
      $('#order-pill-price').textContent = `KES ${totalPrice.toLocaleString()}`;
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

  // Populate Live Tracker Modal
  $('#tracker-order-title').textContent = `Order #${orderNum}`;
  $('#tracker-total-amount').textContent = `KES ${totalAmount.toLocaleString()}`;

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

  // Guest search filter
  $('#guest-search-input')?.addEventListener('input', () => {
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

  // Call Attendant actions
  const callAttendant = () => {
    showToast('Attendant alerted for Table 04 (Garden Terrace)');
  };
  $('#btn-guest-call-attendant')?.addEventListener('click', callAttendant);
  $('#btn-tracker-call-waiter')?.addEventListener('click', callAttendant);

  // Bill Request
  $('#btn-guest-request-bill')?.addEventListener('click', () => {
    showToast('Bill request sent to cashier for Table 04');
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

  // Sidebar navigation handling
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      $$('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const targetNav = link.getAttribute('data-dash-nav');
      if (targetNav === 'staff') {
        const staffSec = $('#section-staff-team');
        if (staffSec) {
          staffSec.scrollIntoView({ behavior: 'smooth' });
          staffSec.style.outline = '2px solid var(--forest)';
          setTimeout(() => { staffSec.style.outline = 'none'; }, 2000);
        }
      } else if (targetNav === 'menu') {
        setView('dashboard');
      }
    });
  });

  // Dismiss modal overlay on outside click
  $$('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
}
