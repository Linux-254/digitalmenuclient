# Changelog — Shamba House Digital Menu & SambaPOS Bridge

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
