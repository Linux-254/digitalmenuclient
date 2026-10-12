# Security and authorization baseline

- Multi-tenant scope: every business row carries `venue_id`; RLS denies cross-venue reads and writes.
- Admin surface: Cloudflare Access plus a server-side staff session; no PIN, hash, token, or API key is shipped to the client.
- Staff PINs: Argon2id/bcrypt hash in a protected table, five-failure lockout for 15 minutes, idle timeout, and immutable login audit events.
- Roles: waiter/cashier/kitchen may operate service screens; manager may edit availability; admin alone may edit prices, delete menu records, change payment/order windows, merge tables, void locked items, or manage staff.
- Orders: server recomputes totals, idempotency keys prevent duplicates, customer edits are limited by `order_edit_window_seconds` (default 300), and locked/cooking items require staff/admin void reasons.
- Payments: only verified M-Pesa callback or staff-confirmed cash can mark success; callback amount and pending checkout are rechecked; raw callback payloads are not exposed.
- Media: validate MIME, extension, size and image dimensions; store only R2 object keys; private receipts/exports use short-lived signed URLs.
- POS: outbound-only bridge, least-privilege SambaPOS user, no public SambaPOS port, retry queue with dedupe key and dead-letter reconciliation.
