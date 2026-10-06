# Backend Architecture

QR → Cloudflare Worker `/t/:qrToken` → `open-table-session` Edge Function → scoped JWT → Supabase Realtime guest/staff surfaces → orders/order_items → `pos_sync_log` → outbound pos-bridge → SambaPOS. Keep Workers thin/stateless; Supabase owns relational state, auth, RLS, payments, audit, and realtime. R2 stores media by signed upload URL.
