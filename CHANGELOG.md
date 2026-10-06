# Changelog

All notable changes to the **Shamba House Digital Menu & SambaPOS Bridge** project are documented here.

---

## [1.3.0] — 2026-10-06 (Session 4: Dedicated Guest Tableside Experience, Ordering Flow & Staff Management)

### Dedicated Guest Mode & Tableside Experience
- **Separated Guest Tableside Experience**: When in Guest Mode (`.guest-mode`), internal staff sidebar and controls are completely hidden. Guests enjoy an uncluttered, responsive dining interface.
- **Dedicated Guest Header**: Features brand badge with `Fanfarrón` typography, `Table 04 · Terrace` selector, instant menu/drink search box, cart count/total button, and discreet `Staff OS` PIN unlock gate.
- **Brand-Coordinated Design**: Unified the color palette between staff dashboard and guest menu using deep emerald green (`#0d382d`), gold (`#c89b3c`), soft cream (`#f8faf9`), and clean white cards.

### Comprehensive Menu Categorization & Full Drinks Catalog
- **Guest Category Navigation**: Horizontal scrollable category rail with real-time counts across `All`, `Starters`, `Grill & Steaks`, `Pizzas & Burgers`, `Pasta & Coastal`, `Juices & Drinks`, and `Desserts`.
- **Integrated Beverage Offerings**: Added cold-pressed juices (Passion Mango Cooler), Traditional Kenyan Dawa, Hibiscus Mint Cooler, Tamarind Sparkler, Tusker Apple Cider, and Nyeri Single-Origin AA Espresso.
- **Synchronized Catalog**: Unified 18 items across both staff inventory management and guest tableside catalog.

### Minimalistic Responsive Dish Cards
- **Screen-Optimized Layout**: Replaced clunky serpentine ribbons with modern, minimalistic cards that fit smoothly on mobile screens (1-2 columns) and desktop (3-4 columns).
- **Typography & Details**: Displays food photography, dietary/discount tags, `Fanfarrón` titles, `Milano Perla` ingredient body copy, prep times, prices in KES, and quick `+ Add` button.

### Complete Tableside Ordering Flow
- **Dish Customization Modal**: Allows guests to choose spice level (Mild, Medium, Hot), select preferred side (Fries, Rice, Ugali, Salad), and add special dietary notes.
- **Floating Sticky Order Pill**: Floats at screen bottom with item count and subtotal when cart has items, triggering "Review Order & Send".
- **Cart & Table Checkout**: Itemized order summary with quantity steppers, payment selection (M-Pesa STK or Pay at Table), and table confirmation.
- **Live Kitchen Order Tracker**: Modal featuring live pulsing status, 3-stage kitchen progress stepper (`Order Sent` -> `Preparing in Kitchen` -> `Ready for Serving`), order ID `#SH-104`, itemized receipt summary, and "Call Waiter" action.

### Admin Staff Team Management
- **Staff Roster Section**: Admin dashboard panel displaying active staff members, roles, assigned stations, and PINs.
- **Add Staff Member Modal**: Allows admin to register new waiters, chefs, and bartenders with name, role, station, phone, and 4-digit PIN (secured by venue PIN `2407`).
- **Sidebar Integration**: Added "Staff Team" navigation item with live team count badge.

### Zero Emojis & Accessibility
- Audited and verified 0 emojis across `index.html`, `app.js`, and `styles.css` (100% SVG icons & clean typography).
- Custom fonts `Fanfarrón.otf` and `Milano Perla.otf` verified and served with HTTP 200 headers.

---

## [1.2.0] — 2026-10-06 (Session 3: Full Build Pass & Brand Integration)

### Brand & Typography
- **Custom Fonts Added**:
  - `Fanfarrón.otf` integrated for display headings, hero banners, and KPI values.
  - `Milano Perla.otf` integrated for guest poster body accent and editorial highlights.
  - Google Font `Inter` integrated for crisp UI text and numerical values.
  - Font assets placed in `public/fonts/` and `@font-face` rules declared in `styles.css`.

### Visual Design & CSS Design System (`styles.css`)
- **Full Design System Rewrite**:
  - Implemented CSS custom properties tokens for colors, typography, elevations, and transitions.
  - Mobile-first responsive layout with breakpoints at `1100px`, `900px`, `760px`, and `480px`.
  - Added new-dish highlight pulse effect (`is-new` class with `highlight-new` keyframes).
  - Added offer ribbons and corner badges (`has-offer` class with `data-offer` badge) with struck-through original pricing.
  - Implemented high-contrast accessibility focus states and `prefers-reduced-motion` safety wrappers.
  - Dynamic micro-animations: `orbit-float`, `dish-drift`, `slide-up`, `modal-in`, `new-badge-pop`, and `pulse-badge`.

### Application Logic & Interactive Features (`app.js`)
- **Data Catalog**: Expanded menu to 12 curated dishes across Grill & Mains, Swahili Specialties, Fresh Juices, and Sides.
- **Admin Studio (PIN: `2407`)**:
  - Hardened PIN security gate.
  - Realtime dish availability toggling.
  - Dish creation modal with instant reactivity and new dish visual pulse.
  - Active offers & promotional discounts engine with live calculation.
  - Realtime analytics engine displaying top-selling dishes, order counts, and satisfaction ratings.
- **Cart & Order Flow**:
  - Dynamic cart drawer with party-size context, notes, and subtotal calculations.
  - Multi-stage payment simulation (M-Pesa STK push & Card) with masked sensitive customer details.
  - Post-order 5-star customer feedback and rating dialog.
- **Table QR Flyer**:
  - Built standalone `public/qr-flyer.html` formatted for on-table print stands with step-by-step guest instructions and direct print action.

### Deployment & Static Routing
- Created `manus-routes.json` mapping all static assets, fonts, routes, and `qr-flyer.html` for Manus, Cloudflare Pages, and Vercel hosting.
- Dev server verified locally via `npx serve . -p 3000 --single`.

---

## [1.1.0] — 2026-10-06 (Session 2: Launch Standards & Review Framework)
- Documented complete Web Application Launch & Post-Launch Quality Standard (`review/requirements/web-application-launch-quality-standard.md`).
- Established interactive pre-launch testing checklist (`review/review-checklist.md`).
- Formulated zero-credit recovery protocols and agent resumption guidelines.

---

## [1.0.0] — 2026-10-06 (Session 1: Architecture & Foundations)
- Established system architecture: QR-first guest PWA, staff console, and LAN-based SambaPOS connector.
- Documented Supabase PostgreSQL schema, RLS security policies, and edge functions.
- Scaffolded monorepo in `digital-menu-sambapos/` with shared types, POSConnector abstraction, and MockConnector.
- Defined brand guidelines, color palettes, and motion specifications.
