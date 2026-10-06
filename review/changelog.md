# Changelog — Shamba House Digital Menu & SambaPOS Bridge

## [1.3.0] — 2026-10-06 (Session 4: Dedicated Guest Tableside Experience, Ordering Flow & Staff Management)

### Dedicated Guest Mode & Tableside Experience
- Separated guest dining interface (`.guest-mode` hides internal staff sidebar & profile).
- Dedicated Guest Header with `Fanfarrón` typography, `Table 04 · Terrace` selector, search box, cart trigger, and discreet `Staff OS` PIN unlock gate.
- Unified brand color coordination using deep forest emerald (`#0d382d`), warm gold (`#c89b3c`), soft cream (`#f8faf9`), and clean white cards.

### Menu Categorization & Full Drinks Catalog
- Horizontal category rail with real-time counters: `All`, `Starters`, `Grill & Steaks`, `Pizzas & Burgers`, `Pasta & Coastal`, `Juices & Drinks`, and `Desserts`.
- Beverage offerings: Cold-Pressed Mango Passion Cooler, Traditional Kenyan Dawa, Hibiscus Mint Cooler, Tamarind Sparkler, Tusker Apple Cider, and Nyeri Single-Origin AA Espresso.
- Full catalog synchronized across staff inventory and guest tableside catalog (18 total items).

### Minimalistic Responsive Dish Cards
- Replaced clunky serpentine ribbons with modern, minimalistic cards fitting smoothly on mobile screens (1-2 columns) and desktop (3-4 columns).
- Displays real food photography, dietary/discount tags, `Fanfarrón` titles, `Milano Perla` ingredient body copy, prep times, prices in KES, and quick `+ Add` button.

### Tableside Ordering Flow
- Dish Customization Modal (`#modal-dish-customization`) with spice levels, side selections, and special kitchen notes.
- Floating sticky bottom Order Pill (`#guest-order-pill`) displaying live item count, KES total, and "Review Order & Send" button.
- Cart & Table Checkout (`#modal-cart`) with itemized review, quantity adjusters, and table confirmation.
- Live Kitchen Order Tracker (`#modal-order-tracker`) with real-time pulsing status, 3-stage kitchen progress stepper, order ID `#SH-104`, itemized receipt summary, and "Call Waiter" action.

### Admin Staff Team Management
- Staff Roster Section (`#section-staff-team`) displaying active staff members, roles, assigned stations, and PINs.
- Add Staff Member Modal (`#modal-add-staff`) allowing admin to register new waiters, chefs, and bartenders (secured by venue PIN `2407`).
- Added "Staff Team" navigation item in the sidebar with live team count badge.

### Zero Emojis & Accessibility
- Audited and verified 0 emojis across `index.html`, `app.js`, and `styles.css` (100% SVG icons & clean typography).
- Custom fonts `Fanfarrón.otf` and `Milano Perla.otf` verified and served with HTTP 200 headers.

---

## [1.2.0] — 2026-10-06 (Session 3: Full Build Pass & Brand Integration)

### Brand & Custom Fonts
- Copied `Fanfarrón.otf` and `Milano Perla.otf` to `public/fonts/` and `fonts/`.
- Added `@font-face` declarations in `styles.css`.
- Fanfarrón now used for all display headings (menu poster, studio, admin modal, KPI numbers).
- Milano Perla used for guest poster body accent text.
- Inter loaded from Google Fonts for UI body text and metrics.

### CSS Design System (`styles.css`)
- Mobile-first design system with CSS custom properties.
- New dish highlight: `is-new` class with ring-pulse `highlight-new` keyframe animation.
- Offer badge: `has-offer` class with `data-offer` attr shows gold corner badge on guest card.
- Original price struck through when promotional offer is active.
- Menu grid: hero card layout, horizontal scroll rail on mobile viewports.
- Rating panel: 5-star interactive buttons with gold active state and feedback submission.
- Payment flow panel: M-Pesa / Card selection, status indicator with processing and success states.
- Premium motion: `orbit-float`, `dish-drift`, `slide-up`, `modal-in`, `new-badge-pop`, `pulse-badge`.
- Responsive across all viewports with `prefers-reduced-motion` compliance.

### Interactive Application (`index.html` & `app.js`)
- Menu data model expanded with 12 items including fresh juices (Mango madafu, Tamarind lemonade).
- Offers system: dynamic promotion engine, `addOffer()`, live calculation and badge display.
- Rating system: post-checkout rating modal with customer feedback capture into analytics.
- Cart & ordering: persistent cart drawer, item count, party size context, and price summation.
- Payment simulation: multi-stage simulation with masked phone numbers and strict security guards.
- Admin PIN Gate: unlocked with PIN `2407`, gates all availability toggles, dish creation, and promotions.
- Live Analytics: real-time dashboard of top-selling dishes, order counts, and ratings.
- Clock: live East Africa Time (`EAT`) updated dynamically in the sidebar.

### Table QR Flyer (`public/qr-flyer.html`)
- Standalone print-ready dark forest-green brand flyer.
- Fanfarrón display typography with decorative QR visual patterns.
- Table number badge, 4-step guest flow (Scan → Browse → Order → Pay), Wi-Fi credentials strip, and direct print trigger.

### Deployment & Routing (`manus-routes.json`)
- Static route mappings for Manus, Cloudflare Pages, and Vercel.

---

## [1.1.0] — 2026-10-06 (Session 2: Launch Standards & Checklist)
- Added Web Application Launch & Post-Launch Quality Standard.
- Added comprehensive `review-checklist.md`.
- Formulated zero-credit recovery protocols and agent resumption guidelines.

---

## [1.0.0] — 2026-10-06 (Session 1: Architecture & Foundations)
- QR-first guest PWA, staff console, and LAN-based SambaPOS connector architecture.
- Documented Supabase PostgreSQL schema, RLS policies, and edge functions.
- Monorepo scaffold in `digital-menu-sambapos/` with shared types and MockConnector.
