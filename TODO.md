# Digital Menu & SambaPOS Bridge — Status & Roadmap

## Completed Milestones
- [x] Brand typography integrated (`Fanfarrón.otf`, `Milano Perla.otf`, `Inter`).
- [x] Full mobile-first CSS design system with micro-animations & reduced-motion support.
- [x] Dedicated Guest Tableside OS: categories, filtering, availability states, customization modal, sticky order pill, and cart.
- [x] New dish highlighting (`is-new` animated pulse) and promotional offer badges (`has-offer`).
- [x] Authoritative Server-Side Pricing: Server validates and computes prices, preventing client-side price tampering.
- [x] Payment flow with Daraja M-Pesa STK Push simulation and card terminals with masked phone references (`07XX***456`).
- [x] Customer post-order 5-star rating collection and feedback capture modal.
- [x] Admin & Staff Console gated behind PIN `2407` with dish creation and availability toggles.
- [x] Staff team management with personal PINs and immutable admin login audit logs.
- [x] Floor map with multi-party table sessions, table merging with hover tooltips, and QR code downloads.
- [x] Standalone print-ready Table QR Flyer (`public/qr-flyer.html`) and 12-table QR tents modal.
- [x] POS sync diagnostic queue and SambaPOS hardware bridge logging.
- [x] Supabase Postgres schema migrations (`0001_init_schema.sql`, `0002_rls_policies.sql`, `0003_seed_demo_data.sql`).
- [x] Seed data synchronized with all 21 authentic dishes & drinks, exact KES pricing, and staff credentials.
- [x] Supabase Edge Functions implemented (`open-table-session`, `initiate-mpesa-payment`, `mpesa-callback`, `close-session`, `pos-webhook-receiver`).
- [x] Service Worker caching (`sw.js`) for network-resilient offline menu browsing.
- [x] 100% SVG icons throughout (0 emoji icons) complying with production launch quality standards.
- [x] Full button wiring and responsive touch targets (>= 44px) across mobile, tablet, and desktop.

## Operational Next Steps (On-Premise Deployment)
- [ ] Connect venue production Supabase URL & keys in `.env`.
- [ ] Connect production Safaricom Daraja STK Push credentials in `.env`.
- [ ] Pair on-premise SambaPOS LAN Bridge agent (`digital-menu-sambapos/apps/pos-bridge/`) to local POS machine IP.
