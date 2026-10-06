# TRD

Frontend: Next.js App Router guest PWA and staff console. Backend: Supabase Postgres, Auth, Realtime, Edge Functions, RLS. Bridge: outbound-only Node.js process on venue LAN using `POSConnector`; MockConnector first, SambaPOS connector stub pending live introspection. Edge: Cloudflare Worker QR/session routing, R2 optimized media, CDN, WAF/rate limits, Queues for retryable POS events. Currency KES; timezone Africa/Nairobi. Design constants come from `design/design-tokens.json`.
