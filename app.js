/* ═══════════════════════════════════════════
   SHAMBA HOUSE — Digital Menu App
   Static demo. Target: Next.js + Supabase.
   PIN: 2407 (demo only — server-verified in prod)
   ═══════════════════════════════════════════ */

'use strict';

// ── Helpers ──────────────────────────────────
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

// ── Toast ─────────────────────────────────────
function toast(msg, type = 'info') {
  const t = $('#toast');
  t.textContent = msg;
  t.style.background = type === 'error' ? '#c0392b'
    : type === 'success' ? '#16684f' : 'var(--ink)';
  t.classList.add('show');
  clearTimeout(t._to);
  t._to = setTimeout(() => t.classList.remove('show'), 2800);
}

// ── Clock ─────────────────────────────────────
function updateClock() {
  const now = new Date();
  const hhmm = now.toLocaleTimeString('en-KE', {
    hour: '2-digit', minute: '2-digit',
    timeZone: 'Africa/Nairobi'
  });
  const dateStr = now.toLocaleDateString('en-KE', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
    timeZone: 'Africa/Nairobi'
  }).toUpperCase();
  const c = $('#clock');
  const d = $('#date-label');
  if (c) c.textContent = hhmm + ' EAT';
  if (d) d.textContent = dateStr + ' · EAT';
}
updateClock();
setInterval(updateClock, 30000);

// ═══════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════

const tables = [
  ['01','Available','available'],
  ['02','Occupied · 2','occupied'],
  ['03','Billing · 4','billing'],
  ['04','Occupied · 6','occupied'],
  ['05','Available','available'],
  ['06','Attention','attention'],
  ['07','Occupied · 4','occupied'],
  ['08','Available','available'],
  ['09','Occupied · 2','occupied'],
  ['10','Available','available'],
  ['11','Billing · 3','billing'],
  ['12','Occupied · 4','occupied'],
];

const tickets = [
  ['#1048','Table 07','2 × Nyama choma platter · 1 × Kachumbari','Kitchen','8m','fresh'],
  ['#1047','Table 03','4 × Tusker Lager · 2 × Passion spritz','Bar','14m','aging'],
  ['#1046','Table 12','1 × Tilapia coconut curry · 2 × Ugali','Kitchen','19m','urgent'],
  ['#1045','Table 04','2 × Dawa · 1 × Samosa trio','Bar','5m','fresh'],
  ['#1044','Table 09','3 × Pilau beef bowl','Kitchen','12m','aging'],
  ['#1043','Table 06','1 × Espresso tonic','Bar','22m','urgent'],
];

const availability = [
  ['Nyama choma platter','Grilled goat · rosemary salt','🍖',true,''],
  ['Tilapia coconut curry','Coconut · lime · greens','🐟',false,'Sold out until 14:00'],
  ['Passion spritz','Passion fruit · lime · soda','🍹',true,''],
  ['Kachumbari','Tomato · onion · coriander','🥗',true,''],
  ['Pilau beef bowl','Spiced beef, pilau rice','🍛',true,''],
];

// [name, desc, price_num, emoji, category, is_available, station, is_new, offer_label, offer_price]
let menu = [
  ['Nyama choma platter','Grilled goat, rosemary salt & kachumbari',1480,'🍖','Popular',true,'kitchen',false,'',''],
  ['Tilapia coconut curry','Coastal coconut sauce, greens & rice',1260,'🐟','Mains',false,'kitchen',false,'',''],
  ['Samosa trio','Beef, vegetable & tamarind dip',620,'🥟','Smallplates',true,'kitchen',false,'',''],
  ['Passion spritz','Passion fruit, lime & soda',540,'🍹','Drinks',true,'bar',false,'',''],
  ['Pilau beef bowl','Spiced beef, pilau rice & kachumbari',980,'🍛','Mains',true,'kitchen',false,'',''],
  ['Dawa cocktail','Honey, lemon, ginger & vodka',620,'🍸','Drinks',true,'bar',false,'',''],
  ['Ugali & sukuma','Stone-ground maize & stir-fried greens',480,'🌽','Mains',true,'kitchen',false,'',''],
  ['Mango madafu','Fresh mango & coconut water blend',380,'🥭','Juices',true,'bar',true,'',''],
  ['Tamarind lemonade','House tamarind, lime & cane sugar',340,'🍋','Juices',true,'bar',false,'',''],
  ['Chapati & stew','Soft layered chapati with slow-cooked beef',560,'🫓','Mains',true,'kitchen',false,'',''],
  ['Bhajia plate','Crispy potato fritters with coconut chutney',420,'🧆','Smallplates',true,'kitchen',false,'',''],
  ['Espresso tonic','Single origin espresso over premium tonic',480,'☕','Drinks',true,'bar',false,'',''],
];

let categories = [
  ['Popular','Featured plates','4 dishes','🔥'],
  ['Mains','From the fire & coast','8 dishes','🍽️'],
  ['Smallplates','Share something','6 dishes','🥟'],
  ['Drinks','Bar · coffee',  '6 dishes','🍹'],
  ['Juices','Freshly blended','4 dishes','🥤'],
];

let offers = []; // {dishIndex, label, offerPrice}

let ratings = [
  { stars: 5, comment: 'Amazing nyama choma!', table: 'T07', time: '12:14' },
  { stars: 4, comment: 'Quick service, loved the dawa.', table: 'T03', time: '11:52' },
  { stars: 5, comment: '', table: 'T12', time: '11:30' },
];

const payments = [
  { table:'07', order:'#1048', method:'M-Pesa', last4:'3481', amount:4860, status:'pending' },
  { table:'12', order:'#1044', method:'Card', last4:'', amount:3240, status:'success' },
  { table:'03', order:'#1042', method:'M-Pesa', last4:'9002', amount:4590, status:'pending' },
];

// ═══════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════
let activeQueue = 'all';
let activeCategory = 'Popular';
let partySize = 4;
let cartItems = []; // {index, name, price}
let studioTab = 'dishes';
let currentRating = 0;
let orderMode = 'dine-in';
let activePerson = 'A';
let paymentTiming = 'after';
let changeWindow = 10;
let adminUnlocked = false;

const VENUE_PIN = '2407';

// ═══════════════════════════════════════════
//  RENDER — STAFF
// ═══════════════════════════════════════════

function renderTables() {
  $('#floor-grid').innerHTML = tables.map(t => `
    <div class="table-tile ${t[2]}" role="button" tabindex="0" aria-label="Table ${t[0]}, ${t[1]}">
      <strong>Table ${t[0]}</strong>
      <small>${t[1]}</small>
      <span class="table-status">
        <i class="${t[2]}" aria-hidden="true"></i>
        ${t[2] === 'available' ? 'Ready' : t[2] === 'attention' ? 'Needs help' : 'In service'}
      </span>
    </div>`).join('');
}

function renderTickets() {
  const data = activeQueue === 'all' ? tickets
    : tickets.filter(t => t[3].toLowerCase() === activeQueue);
  $('#ticket-list').innerHTML = data.map(t => `
    <article class="ticket ${t[5]}">
      <div class="ticket-rail" aria-hidden="true"></div>
      <div class="ticket-main">
        <strong>${t[0]} · ${t[1]}</strong>
        <small>${t[2]}</small>
      </div>
      <div class="ticket-meta">
        <strong>${t[3]}</strong>
        <span>${t[4]} ago</span>
      </div>
    </article>`).join('');
}

function renderAvailability() {
  $('#availability-list').innerHTML = availability.map((x, i) => `
    <div class="availability-row">
      <div class="food-thumb">${x[2]}</div>
      <div>
        <strong>${x[0]}</strong>
        <small>${x[1]}${x[4] ? ` · <span class="unavailable-label">${x[4]}</span>` : ''}</small>
      </div>
      <button class="toggle ${x[3] ? 'on' : ''}" data-avail="${i}"
              aria-label="${x[3] ? 'Mark unavailable' : 'Mark available'}: ${x[0]}"
              aria-pressed="${x[3]}">
      </button>
    </div>`).join('');
}

function renderPaymentList() {
  const el = $('#payment-list');
  if (!el) return;
  el.innerHTML = payments.map(p => `
    <div class="payment-row">
      <div class="payment-icon ${p.method === 'M-Pesa' ? 'teal' : 'blue'}">
        ${p.method === 'M-Pesa' ? 'M' : 'C'}
      </div>
      <div>
        <strong>Table ${p.table} · Order ${p.order}</strong>
        <small>${p.method}${p.last4 ? ` · •••• ${p.last4}` : ' · hosted checkout'}</small>
      </div>
      <div class="payment-value">
        <strong>KES ${p.amount.toLocaleString()}</strong>
        <span class="status ${p.status}">${p.status.charAt(0).toUpperCase() + p.status.slice(1)}</span>
      </div>
    </div>`).join('');
}

// ═══════════════════════════════════════════
//  RENDER — ANALYTICS
// ═══════════════════════════════════════════
function renderAnalytics() {
  const sorted = [...menu].sort((a,b) => b[2] - a[2]).slice(0,5);
  const el1 = $('#analytics-top-dishes');
  if (el1) el1.innerHTML = sorted.map((m,i) => `
    <div class="availability-row">
      <div class="food-thumb">${m[3]}</div>
      <div>
        <strong>${m[0]}</strong>
        <small>KES ${m[2].toLocaleString()} · ${m[6] === 'bar' ? 'Bar' : 'Kitchen'}</small>
      </div>
      <strong style="font-size:13px">#${i+1}</strong>
    </div>`).join('');

  const el2 = $('#analytics-ratings');
  if (el2) el2.innerHTML = ratings.map(r => `
    <div class="availability-row">
      <div class="food-thumb" style="font-size:14px">${'⭐'.repeat(r.stars)}</div>
      <div>
        <strong>${r.comment || 'No comment'}</strong>
        <small>Table ${r.table} · ${r.time}</small>
      </div>
    </div>`).join('');
}

// ═══════════════════════════════════════════
//  RENDER — GUEST MENU
// ═══════════════════════════════════════════
function priceOf(m, idx) {
  const offer = offers.find(o => o.dishIndex === idx);
  return offer ? offer.offerPrice : m[2];
}
function fmtKES(n) { return 'KES ' + Number(n).toLocaleString(); }

function renderMenu() {
  const data = activeCategory === 'Popular'
    ? menu.map((m,i) => ({m,i})).filter(({m}) => m[5]).slice(0,6)
    : menu.map((m,i) => ({m,i})).filter(({m}) => m[4] === activeCategory);

  $('#guest-menu').innerHTML = data.map(({m, i}) => {
    const offer = offers.find(o => o.dishIndex === i);
    const displayPrice = offer ? offer.offerPrice : m[2];
    return `
    <article class="menu-card ${m[5] ? '' : 'unavailable'} ${m[7] ? 'is-new' : ''} ${offer ? 'has-offer' : ''}"
             ${offer ? `data-offer="${offer.label}"` : ''}
             role="listitem">
      <div class="menu-art" aria-hidden="true">${m[3]}</div>
      <div class="menu-info">
        <span class="menu-station">${m[6] === 'bar' ? 'BAR' : 'KITCHEN'}</span>
        <strong>${m[0]}</strong>
        <p>${m[1]}</p>
        <div class="menu-price">
          <div>
            <b>${fmtKES(displayPrice)}</b>
            ${offer ? `<span class="original-price">${fmtKES(m[2])}</span>` : ''}
            ${!m[5] ? '<span class="unavailable-label">Unavailable</span>' : ''}
          </div>
          <button class="add-btn"
                  ${m[5] ? '' : 'disabled aria-disabled="true"'}
                  data-add="${i}"
                  aria-label="Add ${m[0]} to order">
            ${m[5] ? '+' : '−'}
          </button>
        </div>
      </div>
    </article>`;
  }).join('');
}

// ═══════════════════════════════════════════
//  RENDER — STUDIO
// ═══════════════════════════════════════════
function renderDishes() {
  const query = ($('#dish-search')?.value || '').toLowerCase().trim();
  const station = $('#station-filter')?.value || 'all';
  const data = menu.map((m,i) => ({m,i})).filter(({m}) =>
    (!query || m[0].toLowerCase().includes(query) || m[1].toLowerCase().includes(query)) &&
    (station === 'all' || m[6] === station)
  );
  const el = $('#dish-table');
  if (!el) return;
  el.innerHTML = data.map(({m,i}) => {
    const offer = offers.find(o => o.dishIndex === i);
    return `
    <article class="dish-row ${m[7] ? 'is-new-row' : ''}">
      <div class="dish-art">${m[3]}</div>
      <div class="dish-copy">
        <strong>${m[0]}${m[7] ? ' <span class="offer-badge-inline">NEW</span>' : ''}</strong>
        <small>${m[1]}</small>
        <span>${m[4]} · ${m[6] === 'bar' ? 'Bar' : 'Kitchen'}</span>
        ${offer ? `<span class="offer-badge-inline">${offer.label} → KES ${Number(offer.offerPrice).toLocaleString()}</span>` : ''}
      </div>
      <strong class="dish-price">${fmtKES(m[2])}</strong>
      <button class="availability-chip ${m[5] ? 'is-live' : 'is-off'}"
              data-dish="${i}" aria-pressed="${m[5]}">
        ${m[5] ? 'Live' : 'Off menu'}
      </button>
      <button class="edit-btn" data-edit="${i}" aria-label="Edit ${m[0]}">Edit</button>
    </article>`;
  }).join('');

  const ct = $('#dish-count-tab');
  if (ct) ct.textContent = menu.length;
}

function renderCategories() {
  $('#category-list').innerHTML = categories.map((c,i) => `
    <div class="category-row">
      <div class="category-icon">${c[3]}</div>
      <div>
        <strong>${c[0]}</strong>
        <small>${c[1]}</small>
      </div>
      <span>${c[2]}</span>
      <button class="edit-btn" data-cat="${i}">Edit</button>
    </div>`).join('');
}

function renderMedia() {
  $('#media-grid').innerHTML = menu.map(m => `
    <div class="media-card">
      <div class="media-art">${m[3]}</div>
      <strong>${m[0]}</strong>
      <small>WebP · edge cached</small>
    </div>`).join('');
}

function populateOfferSelects() {
  const opts = menu.map((m,i) => `<option value="${i}">${m[0]}</option>`).join('');
  ['offer-dish-select','admin-offer-dish'].forEach(id => {
    const s = $(`#${id}`);
    if (s) s.innerHTML = '<option value="">Select dish…</option>' + opts;
  });
}

function renderOffers(listId = 'offer-list') {
  const el = $(`#${listId}`);
  if (!el) return;
  if (!offers.length) { el.innerHTML = '<p style="color:var(--muted);font-size:12px;padding:12px 0">No active offers.</p>'; return; }
  el.innerHTML = offers.map((o,idx) => `
    <div class="offer-row">
      <div class="offer-row-left">
        <strong>${menu[o.dishIndex]?.[0] ?? '—'}</strong>
        <small>Was KES ${menu[o.dishIndex]?.[2]?.toLocaleString() ?? '—'} → Now KES ${Number(o.offerPrice).toLocaleString()}</small>
      </div>
      <span class="offer-tag">${o.label}</span>
      <button class="danger-btn" data-remove-offer="${idx}" aria-label="Remove offer">✕</button>
    </div>`).join('');
  const ct = $('#offer-count-tab');
  if (ct) ct.textContent = offers.length;
}

function addOffer(dishIdxStr, label, price) {
  if (!adminUnlocked) { openAdmin(); return; }
  const dishIndex = Number(dishIdxStr);
  if (isNaN(dishIndex) || !label || !price) { toast('Fill all offer fields', 'error'); return; }
  const p = Number(price);
  if (p <= 0 || p >= menu[dishIndex]?.[2]) { toast('Offer price must be less than original', 'error'); return; }
  const existing = offers.findIndex(o => o.dishIndex === dishIndex);
  if (existing > -1) offers.splice(existing, 1);
  offers.push({ dishIndex, label, offerPrice: p });
  renderOffers('offer-list');
  renderOffers('admin-offer-list');
  renderDishes(); renderMenu();
  populateOfferSelects();
  toast(`${menu[dishIndex][0]} — "${label}" offer applied ✓`, 'success');
}

// ═══════════════════════════════════════════
//  RENDER — ADMIN DISH LIST
// ═══════════════════════════════════════════
function renderAdminDishes() {
  const el = $('#admin-dish-list');
  if (!el) return;
  el.innerHTML = menu.map((m,i) => `
    <div class="admin-list-row ${m[7] ? 'is-new-row' : ''}">
      <div>
        <strong>${m[0]}${m[7] ? ' 🆕' : ''}</strong>
        <small>${fmtKES(m[2])} · ${m[4]} · ${m[6] === 'bar' ? 'Bar' : 'Kitchen'}</small>
      </div>
      <button class="edit-btn" data-price-edit="${i}">Edit price</button>
      <button class="danger-btn" data-delete-dish="${i}" aria-label="Delete ${m[0]}">Delete</button>
    </div>`).join('');
}

// ═══════════════════════════════════════════
//  VIEW SWITCHING
// ═══════════════════════════════════════════
function switchView(view) {
  const views = ['staff','guest','studio','analytics'];
  views.forEach(v => {
    const el = $(`#${v}-view`);
    if (el) el.classList.toggle('hidden', v !== view);
  });
  $('#page-title').textContent =
    view === 'staff'     ? 'Service overview'
    : view === 'guest'   ? 'Guest menu'
    : view === 'studio'  ? 'Menu studio'
    : 'Analytics';

  $$('.nav-item[data-view]').forEach(n => {
    const active = n.dataset.view === view;
    n.classList.toggle('active', active);
    n.setAttribute('aria-current', active ? 'page' : 'false');
  });

  if (view === 'analytics') renderAnalytics();
  if (view === 'studio') switchStudioTab(studioTab);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchStudioTab(tab) {
  studioTab = tab;
  $$('.studio-tab').forEach(b => b.classList.toggle('active', b.dataset.studioTab === tab));
  ['dishes','categories','offers','media'].forEach(x => {
    const p = $(`#${x}-panel`);
    if (p) p.classList.toggle('hidden', x !== tab);
  });
  if (tab === 'dishes')     { renderDishes(); }
  if (tab === 'categories') { renderCategories(); }
  if (tab === 'media')      { renderMedia(); }
  if (tab === 'offers')     { renderOffers('offer-list'); populateOfferSelects(); }
}

// ═══════════════════════════════════════════
//  CART
// ═══════════════════════════════════════════
function cartTotal() { return cartItems.reduce((s,x) => s + x.price, 0); }
function updateCartBar() {
  const count = cartItems.length;
  const total = cartTotal();
  $('#cart-count').textContent = count;
  $('#cart-total').textContent = fmtKES(total);
  $('#cart-item-label').textContent = `${count} item${count !== 1 ? 's' : ''} · server-priced`;
}

// ═══════════════════════════════════════════
//  RATING
// ═══════════════════════════════════════════
const ratingLabels = ['','Poor','Could be better','Good','Really good','Excellent!'];

function setRating(stars) {
  currentRating = stars;
  $$('.star-btn').forEach(b => {
    b.classList.toggle('active', Number(b.dataset.star) <= stars);
  });
  $('#rating-label').textContent = ratingLabels[stars] || '';
}

function showRatingPanel() {
  const rp = $('#rating-section');
  if (rp) {
    rp.classList.remove('hidden');
    rp.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ═══════════════════════════════════════════
//  ADMIN / PIN
// ═══════════════════════════════════════════
function openAdmin() {
  $('#admin-modal').classList.remove('hidden');
  setTimeout(() => $('#venue-pin').focus(), 100);
}

function unlockAdmin() {
  const raw = ($('#venue-pin').value || '').replace(/\D/g, '').trim();
  if (raw !== VENUE_PIN) {
    $('#pin-error').textContent = 'PIN rejected — high-impact controls remain locked.';
    $('#venue-pin').value = '';
    $('#venue-pin').focus();
    return;
  }
  adminUnlocked = true;
  $('#pin-gate').classList.add('hidden');
  $('#admin-tools').classList.remove('hidden');
  renderAdminDishes();
  renderOffers('admin-offer-list');
  populateOfferSelects();
  toast('Protected admin controls unlocked for this session ✓', 'success');
}

// ═══════════════════════════════════════════
//  PAYMENT SIMULATION
// ═══════════════════════════════════════════
function simPayment() {
  const statusEl = $('#pay-status');
  const textEl   = $('#pay-status-text');
  if (!statusEl) return;
  statusEl.style.display = 'flex';
  statusEl.className = 'pay-status-indicator processing';
  textEl.textContent = 'STK push sent — awaiting confirmation…';
  toast('M-Pesa STK push initiated (demo) — server verifies amount before success');
  setTimeout(() => {
    statusEl.className = 'pay-status-indicator success';
    textEl.textContent = 'Payment confirmed by Daraja callback ✓';
    toast('Payment server-confirmed — POS sync queued', 'success');
    setTimeout(() => showRatingPanel(), 1200);
  }, 3500);
}

// ═══════════════════════════════════════════
//  QR FLYER DOWNLOAD (opens standalone page)
// ═══════════════════════════════════════════
function downloadQRFlyer() {
  window.open('/qr-flyer.html', '_blank');
  toast('QR flyer opened in new tab — print or share');
}

// ═══════════════════════════════════════════
//  INITIALISE
// ═══════════════════════════════════════════
renderTables();
renderTickets();
renderAvailability();
renderMenu();
renderDishes();
renderCategories();
renderMedia();
renderPaymentList();
populateOfferSelects();
updateCartBar();

// ── Navigation ────────────────────────────
$$('.nav-item[data-view]').forEach(b =>
  b.addEventListener('click', () => switchView(b.dataset.view))
);
$$('.nav-item[data-panel]').forEach(b =>
  b.addEventListener('click', () => {
    switchView('staff');
    setTimeout(() => {
      const target = document.getElementById(b.dataset.panel);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  })
);
$$('.text-btn[data-view]').forEach(b =>
  b.addEventListener('click', () => switchView(b.dataset.view))
);
$$('.publish-card .text-btn').forEach(b =>
  b.addEventListener('click', () => switchView('guest'))
);

$('#open-guest').addEventListener('click', () => switchView('guest'));
$('#back-staff').addEventListener('click', () => switchView('staff'));

// ── Studio tabs ───────────────────────────
$$('.studio-tab').forEach(b =>
  b.addEventListener('click', () => switchStudioTab(b.dataset.studioTab))
);
$('#add-dish-top').addEventListener('click', () => {
  if (!adminUnlocked) { openAdmin(); return; }
  switchStudioTab('dishes');
  toast('Unlock admin controls to add dishes — PIN 2407 (demo)');
});

// ── Kitchen queue ─────────────────────────
$$('.seg').forEach(b =>
  b.addEventListener('click', () => {
    activeQueue = b.dataset.queue;
    $$('.seg').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    renderTickets();
  })
);

// ── Category tabs ─────────────────────────
$('#guest-menu').parentElement.addEventListener('click', e => {
  const cat = e.target.closest('.category');
  if (!cat) return;
  activeCategory = cat.dataset.category;
  $$('.category').forEach(x => {
    x.classList.remove('active');
    x.setAttribute('aria-selected','false');
  });
  cat.classList.add('active');
  cat.setAttribute('aria-selected','true');
  renderMenu();
});

// ── Party size ────────────────────────────
$('#party-minus').addEventListener('click', () => {
  partySize = Math.max(1, partySize - 1);
  $('#party-size').textContent = partySize;
  $('#party-size-label').textContent = partySize;
});
$('#party-plus').addEventListener('click', () => {
  partySize = Math.min(14, partySize + 1);
  $('#party-size').textContent = partySize;
  $('#party-size-label').textContent = partySize;
});

// ── Order mode & person ───────────────────
$$('.mode-btn').forEach(b =>
  b.addEventListener('click', () => {
    $$('.mode-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    orderMode = b.dataset.orderMode;
    toast(orderMode === 'takeaway'
      ? 'Takeaway mode — receipt shows collection order'
      : 'Dine-in mode — linked to Table 07');
  })
);
$$('.person-btn').forEach(b =>
  b.addEventListener('click', () => {
    $$('.person-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    activePerson = b.dataset.person;
    toast(`Cart now records items for guest ${activePerson}`);
  })
);

// ── Add to cart ───────────────────────────
$('#guest-menu').addEventListener('click', e => {
  const btn = e.target.closest('[data-add]');
  if (!btn || btn.disabled) return;
  const i = Number(btn.dataset.add);
  const m = menu[i];
  const price = offers.find(o => o.dishIndex === i)?.offerPrice ?? m[2];
  cartItems.push({ index: i, name: m[0], price });
  updateCartBar();
  // animate button
  btn.textContent = '✓';
  btn.style.background = 'var(--lime-2)';
  setTimeout(() => { btn.textContent = '+'; btn.style.background = ''; }, 900);
  toast(`${m[0]} added — KES ${price.toLocaleString()}`);
});

$('#view-cart').addEventListener('click', () => {
  toast('Cart ready · payment is server-verified — showing payment flow');
  setTimeout(showRatingPanel, 500); // demo: show rating after cart view
});

$('#poster-scroll').addEventListener('click', () => {
  $('.guest-intro').scrollIntoView({ behavior: 'smooth' });
});

// ── Availability toggles ──────────────────
$('#availability-list').addEventListener('click', e => {
  const btn = e.target.closest('[data-avail]');
  if (!btn) return;
  const i = Number(btn.dataset.avail);
  availability[i][3] = !availability[i][3];
  availability[i][4] = availability[i][3] ? '' : 'Sold out until 14:00';
  renderAvailability();
  renderMenu();
  toast(`${availability[i][0]} is now ${availability[i][3] ? 'available ✓' : 'unavailable'} — realtime update sent`);
});

// ── Studio dish table actions ─────────────
$('#dish-table').addEventListener('click', e => {
  const toggle = e.target.closest('[data-dish]');
  const edit   = e.target.closest('[data-edit]');
  if (toggle) {
    const i = Number(toggle.dataset.dish);
    menu[i][5] = !menu[i][5];
    renderDishes(); renderMenu();
    toast(`${menu[i][0]} is now ${menu[i][5] ? 'live on' : 'off'} the QR menu`);
  }
  if (edit) {
    toast(`Edit ${menu[Number(edit.dataset.edit)][0]} — image, price, category, modifiers`);
  }
});
$('#dish-search').addEventListener('input', renderDishes);
$('#station-filter').addEventListener('change', renderDishes);
$('#sort-dishes').addEventListener('click', () => toast('Sort: connect to Supabase order_by in production'));

// ── Categories ────────────────────────────
$('#add-category').addEventListener('click', () => {
  categories.push(['New category','Add a short description','0 dishes','◌']);
  renderCategories();
  toast('Category draft created — save to publish via Realtime');
});
$('#category-list').addEventListener('click', e => {
  if (e.target.closest('[data-cat]'))
    toast('Category editor — add sub-categories and reorder in Supabase');
});

// ── Media upload ──────────────────────────
$('#media-upload').addEventListener('change', e => {
  if (e.target.files.length)
    toast(`${e.target.files.length} image${e.target.files.length > 1 ? 's' : ''} queued for R2 upload`);
});

// ── Offer form (studio) ───────────────────
$('#add-offer')?.addEventListener('click', () => {
  addOffer($('#offer-dish-select').value, $('#offer-label').value.trim(), $('#offer-price').value);
  $('#offer-dish-select').value = '';
  $('#offer-label').value = '';
  $('#offer-price').value = '';
});
$('#offer-list').addEventListener('click', e => {
  const btn = e.target.closest('[data-remove-offer]');
  if (!btn) return;
  const idx = Number(btn.dataset.removeOffer);
  offers.splice(idx, 1);
  renderOffers('offer-list');
  renderOffers('admin-offer-list');
  renderDishes(); renderMenu();
  toast('Offer removed');
});

// ── Admin modal ───────────────────────────
$('#admin-controls').addEventListener('click', openAdmin);
$('#close-admin').addEventListener('click', () => {
  $('#admin-modal').classList.add('hidden');
});
$('#admin-modal').addEventListener('click', e => {
  if (e.target === $('#admin-modal')) $('#admin-modal').classList.add('hidden');
});
$('#venue-pin').addEventListener('keydown', e => {
  if (e.key === 'Enter') unlockAdmin();
});
$('#unlock-admin').addEventListener('click', unlockAdmin);

// ── Admin: add dish ───────────────────────
$('#dish-form').addEventListener('submit', e => {
  e.preventDefault();
  const name  = $('#dish-name').value.trim();
  const price = Number($('#dish-price').value);
  const cat   = $('#dish-category').value;
  const sta   = $('#dish-station').value;
  if (!name || !price) { toast('Name and price required', 'error'); return; }
  menu.push([name, 'New menu item', price, '🍽️', cat, true, sta, true, '', '']);
  renderDishes(); renderMenu(); renderMedia(); renderAdminDishes();
  populateOfferSelects();
  e.target.reset();
  toast(`${name} added — marked as NEW on guest menu`, 'success');
});

// ── Admin: price edit & delete ────────────
$('#admin-dish-list').addEventListener('click', e => {
  const edit = e.target.closest('[data-price-edit]');
  const del  = e.target.closest('[data-delete-dish]');
  if (edit) {
    const i = Number(edit.dataset.priceEdit);
    const next = prompt(`New KES price for ${menu[i][0]}:`, menu[i][2]);
    if (next && Number(next) > 0) {
      menu[i][2] = Number(next);
      renderDishes(); renderMenu(); renderAdminDishes();
      toast(`Price updated — KES ${Number(next).toLocaleString()}`, 'success');
    }
  }
  if (del) {
    const i = Number(del.dataset.deleteDish);
    if (confirm(`Delete "${menu[i][0]}"? This removes it from future guest orders.`)) {
      const name = menu[i][0];
      offers = offers.filter(o => o.dishIndex !== i).map(o => ({
        ...o, dishIndex: o.dishIndex > i ? o.dishIndex - 1 : o.dishIndex
      }));
      menu.splice(i, 1);
      renderDishes(); renderMenu(); renderMedia(); renderAdminDishes();
      populateOfferSelects();
      toast(`${name} deleted from the menu`);
    }
  }
});

// ── Admin: offers ─────────────────────────
$('#admin-add-offer')?.addEventListener('click', () => {
  addOffer($('#admin-offer-dish').value, $('#admin-offer-label').value.trim(), $('#admin-offer-price').value);
  $('#admin-offer-dish').value = '';
  $('#admin-offer-label').value = '';
  $('#admin-offer-price').value = '';
});
$('#admin-offer-list').addEventListener('click', e => {
  const btn = e.target.closest('[data-remove-offer]');
  if (!btn) return;
  const idx = Number(btn.dataset.removeOffer);
  offers.splice(idx, 1);
  renderOffers('offer-list');
  renderOffers('admin-offer-list');
  renderDishes(); renderMenu();
  toast('Offer removed');
});

// ── Policies ──────────────────────────────
$('#save-policies').addEventListener('click', () => {
  paymentTiming = $('#payment-timing').value;
  changeWindow  = Number($('#change-policy').value);
  $('#change-window').textContent = changeWindow
    ? `Changes allowed for ${changeWindow} minutes after ordering`
    : 'Changes are locked after submit';
  toast(`Policy saved: pay ${paymentTiming}, change window ${changeWindow}m`, 'success');
});

// ── Payment method selector ───────────────
$$('.pay-method-btn').forEach(b =>
  b.addEventListener('click', () => {
    $$('.pay-method-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    toast(`Payment method: ${b.dataset.method === 'mpesa' ? 'M-Pesa STK push' : 'Card / hosted checkout'}`);
  })
);
$('#sim-payment')?.addEventListener('click', simPayment);

// ── Rating ────────────────────────────────
$$('.star-btn').forEach(b =>
  b.addEventListener('click', () => setRating(Number(b.dataset.star)))
);
$('#submit-rating')?.addEventListener('click', () => {
  if (!currentRating) { toast('Please select a star rating', 'error'); return; }
  const comment = $('#rating-comment').value.trim();
  ratings.unshift({ stars: currentRating, comment, table: 'T07', time: new Date().toLocaleTimeString('en-KE',{hour:'2-digit',minute:'2-digit'}) });
  $('#rating-section').classList.add('hidden');
  currentRating = 0;
  toast(`Thank you! ${ratingLabels[currentRating] || 'Rating'} submitted — we appreciate your feedback ★`, 'success');
  toast(`★ Rating recorded — ${ratingLabels[ratings[0].stars]}`, 'success');
});

// ── Add table ─────────────────────────────
function addTable() {
  const n = String(tables.length + 1).padStart(2,'0');
  tables.push([n,'Available','available']);
  renderTables();
  toast(`Table ${n} added — generate its QR before placing it`);
}
$('#add-table').addEventListener('click', () => {
  if (!adminUnlocked) { openAdmin(); return; }
  addTable();
});
$('#add-table-admin')?.addEventListener('click', addTable);

// ── QR download ───────────────────────────
$('#download-qr')?.addEventListener('click', downloadQRFlyer);

// ── Theme toggle ──────────────────────────
$('#theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toast(document.body.classList.contains('dark') ? 'Dark theme on' : 'Light theme on');
});

// ── Payments admin shortcut ───────────────
$('#open-payments-admin')?.addEventListener('click', () => {
  if (!adminUnlocked) { openAdmin(); return; }
  toast('Payments view — connect to Supabase payment_audit_events in production');
});

// ── Realtime heartbeat simulation ─────────
setInterval(() => {
  const pill = $('.connection-pill');
  if (pill) {
    pill.innerHTML = '<span class="live-dot"></span>Updated just now';
    setTimeout(() => {
      pill.innerHTML = '<span class="live-dot"></span>Live demo data';
    }, 1600);
  }
}, 12000);
