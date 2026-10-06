# Agent Handoff & Continuity Guide — Shamba House Digital Menu

> **Notice for Incoming AI Agents & Engineers**:  
> This file is your single source of truth to seamlessly continue development without needing prior conversation transcripts. Read this first!

---

## 1. Project Overview & Identity
- **Project Name**: Shamba House Digital Menu & SambaPOS Bridge
- **Brand Identity**: *Shamba House* — an upscale Kenyan restaurant & grill celebrating coastal and heritage cuisine with modern hospitality.
- **Brand Colors**: Deep Forest Green (`#07382d`), Gold/Bronze Accents (`#d4af37`), Crisp Creams & Dark Surface Tones.
- **Custom Typography**:
  - **Display Headings**: `Fanfarrón` (`public/fonts/Fanfarrón.otf`)
  - **Poster & Editorial Accents**: `Milano Perla` (`public/fonts/Milano Perla.otf`)
  - **UI Body & Numbers**: Google Font `Inter`
- **Default Currency**: KES (Kenyan Shilling, e.g., `KES 1,450`)
- **Default Timezone**: Africa/Nairobi (`EAT`, UTC+3)

---

## 2. Admin Credentials & Keys (Demo Environment)
- **Staff / Admin PIN**: `2407`
- Entering `2407` unlocks the Admin Modal / Menu Studio for editing dish availability, adding new dishes, configuring special offers, and viewing live analytics.
- **Demo Mode**: All client-side actions are currently interactive, responsive, and maintain session state in memory/localStorage.

---

## 3. Directory Structure & Where Things Live

```
digitalmenuclient/
├── index.html                 # Main live PWA application (Guest ordering + Admin studio)
├── styles.css                 # Unified CSS design system (Tokens, micro-animations, mobile-first)
├── app.js                     # Core application logic (Menu catalog, cart, rating, offers, payments, PIN)
├── manus-routes.json          # Static deployment routing (Manus / Cloudflare / Vercel)
├── public/
│   ├── qr-flyer.html          # Standalone, print-ready Table QR Flyer with branding & instructions
│   └── fonts/                 # Custom brand font files (Fanfarrón.otf, Milano Perla.otf)
├── fonts/                     # Root font mirrors
├── review/                    # Complete design, architecture, requirements & prompt dossiers
│   ├── prompt/
│   │   ├── agent-handoff.md   # THIS HANDOFF DOCUMENT
│   │   └── build-prompt.json  # Machine-readable specifications & guidelines
│   ├── changelog.md           # Granular version history of all sessions
│   ├── build-snapshot/        # Latest verified code snapshots of index.html, styles.css, app.js
│   ├── architecture/          # Backend, Supabase, security & POS bridge architecture specs
│   ├── requirements/          # PRD, TRD, and Web App Launch Quality Standards
│   └── design/                # Tokens and brand specs
├── digital-menu-sambapos/     # Monorepo architecture for full Next.js + Supabase + POS Bridge
│   ├── apps/
│   │   ├── guest-pwa/         # Next.js guest ordering app
│   │   ├── staff-console/     # Kitchen/Bar/Admin staff console
│   │   └── pos-bridge/        # Node.js SambaPOS LAN connector
│   ├── packages/shared/       # Shared TypeScript schemas & POSConnector interface
│   └── supabase/              # Postgres migrations, RLS policies & Edge Functions
├── CHANGELOG.md               # Root changelog
└── TODO.md                    # Immediate task list and roadmap
```

---

## 4. Current State & Implemented Features (Session 4 Complete)

1. **Dedicated Guest Mode & Tableside Menu**:
   - Clean tableside experience (`.guest-mode` hides internal staff sidebar navigation and staff profile).
   - Dedicated Guest Header with `Fanfarrón` typography, `Table 04 · Terrace` selector, search box, cart trigger, and discreet `Staff OS` PIN unlock gate.
   - Unified brand color coordination using deep forest emerald (`#0d382d`), warm gold (`#c89b3c`), soft cream (`#f8faf9`), and clean white cards.

2. **Menu Categorization & Full Drinks Catalog**:
   - Horizontal category rail with real-time counters: `All`, `Starters`, `Grill & Steaks`, `Pizzas & Burgers`, `Pasta & Coastal`, `Juices & Drinks`, and `Desserts`.
   - Complete beverage menu: Cold-Pressed Mango Passion Cooler, Traditional Kenyan Dawa, Hibiscus Mint Cooler, Tamarind Sparkler, Tusker Apple Cider, and Nyeri Single-Origin AA Espresso.
   - 18 synchronized items across both staff inventory management and guest tableside catalog.

3. **Minimalistic Responsive Dish Cards**:
   - Minimalistic cards that fit comfortably on mobile (1-2 columns) and desktop (3-4 columns) without awkward horizontal cutoffs.
   - Displays real food photography, dietary/discount tags, `Fanfarrón` titles, `Milano Perla` ingredient body copy, prep times, prices in KES, and quick `+ Add` button.

4. **Complete Tableside Ordering Flow**:
   - Dish Customization Modal (`#modal-dish-customization`) with spice levels (Mild/Medium/Hot), side choices (Hand-cut Fries, Jasmine Rice, Ugali, Garden Salad), and kitchen notes.
   - Floating sticky bottom Order Pill (`#guest-order-pill`) displaying live item count, KES total, and "Review Order & Send" button.
   - Cart & Table Checkout (`#modal-cart`) with itemized review, quantity adjusters, and table confirmation.
   - Live Kitchen Order Tracker (`#modal-order-tracker`) with real-time pulsing status, 3-stage kitchen progress stepper (`Order Sent` -> `Preparing in Kitchen` -> `Ready for Serving`), order ID `#SH-104`, itemized receipt summary, and "Call Waiter" action.

5. **Admin Staff Team Management**:
   - Staff Roster Section (`#section-staff-team`) displaying active staff members, roles, assigned stations, and PINs.
   - Add Staff Member Modal (`#modal-add-staff`) allowing admin to register new waiters, chefs, and bartenders (secured by venue PIN `2407`).
   - "Staff Team" navigation item in the sidebar with live team count badge.

6. **Quality, Zero Emojis & Accessibility Compliance**:
   - Audited and verified 0 emojis across `index.html`, `app.js`, and `styles.css` (100% SVG icons & clean typography).
   - Custom fonts `Fanfarrón.otf` and `Milano Perla.otf` verified and served with HTTP 200 headers from `/public/fonts/`.

7. **Table QR Flyer (`public/qr-flyer.html`)**:
   - Styled dark-forest branded flyer with Fanfarrón typography, table badges, and 4-step guest flow.
   - Direct `window.print()` trigger for venue deployment.

---

## 5. How to Run and Test Locally

To run the application locally:
```powershell
# From root directory:
npx -y serve . -p 3000 --single
```
- Open `http://localhost:3000` in the browser for the Digital Menu.
- Open `http://localhost:3000/public/qr-flyer.html` (or click "Print QR Flyer" in Admin) for the Table QR flyer.
- Test Admin features: Click "Admin / Staff", enter PIN `2407`.

---

## 6. Git Branching Strategy & Workflow
- **`main`**: **Production Only**. Directly deployed to live production. No direct commits; only merged from `staging` after verification.
- **`staging`**: **Pre-Production / Staging**. Used for integration testing and pre-launch quality checks before promoting to `main`.
- **`dev`**: **Active Development Branch**. The primary integration branch where ongoing verified work converges.
- **`feature/<feature-name>`**: **Feature Branches**. Branch created per new feature (e.g., `feature/daraja-stk-push`, `feature/supabase-realtime`), branched off `dev` and merged back via PR/fast-forward.
- Currently checked out on: **`dev`**.

---

## 7. Architecture & POS Bridge Constraints

- **Single Source of Truth for Availability**: `menu_items.is_available` in the database.
- **POS Bridge Interface**: `POSConnector` abstract interface with `MockConnector` currently implemented. Real SambaPOS GraphQL connector is mapped in `packages/shared/src/types/pos-connector.ts`.
- **Payment Verification**: Webhook callbacks via Daraja API must land on Supabase edge functions, verify signature/checkout request ID, and write audit events before marking payment status.

---

## 7. Next Steps for Next Developer / Agent
1. **Next.js PWA Porting (Optional)**: If client requests moving from the lightweight single-file bundle to full monorepo Next.js, use the code in `digital-menu-sambapos/apps/guest-pwa`.
2. **Supabase Live Connection**: Add venue's Supabase credentials to `.env` and apply migrations from `digital-menu-sambapos/supabase/migrations/`.
3. **SambaPOS LAN Bridge**: Configure venue LAN SambaPOS IP and port in `digital-menu-sambapos/apps/pos-bridge/.env`.
