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

## 4. Current State & Implemented Features (Session 3 Complete)

1. **Guest Menu Experience**:
   - Filterable categories: All, Grill & Mains, Coastal & Swahili, Fresh Juices, Sides, Desserts.
   - Pinned / Hero dish highlighting and visual price formatting.
   - Realtime dish availability indicators (Available vs Sold Out).
   - "New Dish" badge popping animation and special offer discount corner ribbons (`has-offer`).
   - Party size selector and table context badge (default Table 4).

2. **Cart & Ordering**:
   - Slide-in responsive cart drawer with item count, notes, subtotal, and dynamic checkout.
   - Instant cart updates with badge pulse animations.

3. **Payment Flow Simulation (Safeguarded)**:
   - Method selection: M-Pesa STK Push and Card.
   - Multi-stage transaction state: Pending → Processing → Success with masked phone details.
   - *Security Rule*: In production, client code NEVER authoritatively confirms payment. Only the Supabase `mpesa-callback` Edge Function with service-role privileges marks an order as paid.

4. **Post-Order Rating Flow**:
   - Interactive 5-star rating widget with feedback comments and immediate capture into analytics.

5. **Staff / Admin Studio (PIN: `2407`)**:
   - PIN-protected security gate preventing unauthorized modifications.
   - New dish creation form with instant addition to menu and `is-new` highlight animation.
   - Live availability toggles (instant menu state updates).
   - Offers & Discounts manager: apply percentage/flat discounts to any dish with live struck-through prices.
   - Analytics view: Live breakdown of top sellers, total orders, revenue, and average guest satisfaction.

6. **Print-Ready QR Flyer (`public/qr-flyer.html`)**:
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
