# Changelog

All notable changes to the **Shamba House Digital Menu & SambaPOS Bridge** project are documented here.

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
