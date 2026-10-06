# Digital Menu SambaPOS Architecture

## Recommended platform split

Use Cloudflare as the public edge layer, not as a replacement for the transactional database. Cloudflare should provide DNS, TLS, WAF, bot/rate protection, CDN caching, Workers for QR/session routing, R2 for dish media, and Queues for resilient POS handoff. Supabase remains the system of record for venues, menus, table sessions, orders, payments, audit events, Auth, RLS, and Realtime.

```text
QR scan → Cloudflare Worker /t/:qrToken → Supabase open-table-session
                                      ↓ scoped guest session
Guest PWA ← Supabase Realtime ← orders / menu_items / payments
                                      ↓ pos_sync_log
On-premise pos-bridge → outbound Supabase → SambaPOS Message Server / POS API
```

## QR-first guest flow

Each table has an unguessable `qr_token`. The QR opens a Worker route such as `/t/<token>`. The Worker validates the token format and forwards the browser to the guest menu route; it must not expose service-role credentials. `open-table-session` creates a scoped session/JWT containing the table-session claim. The guest can only read/write the rows permitted by RLS for that session.

The guest menu subscribes to `menu_items`, order status, and the current payment row through Supabase Realtime. The client may optimistically update cart UI, but the server computes totals from `order_items` and the client never sets payment status.

## Menu content and media

Staff/admin changes are written to Supabase. Dish images are uploaded to Cloudflare R2 through a signed upload URL; a Worker or image-transform route produces responsive WebP derivatives and a cacheable public media path. Store only the R2 object key and metadata in `menu_items.image_url`/a media table. Never send raw image binaries through the guest app or POS bridge.

## POS integration

`pos-bridge` is the only process that talks to SambaPOS. It watches `pos_sync_log` for `pending`, claims a row idempotently, calls the selected `POSConnector`, then writes `success` or `failed` plus a safe ticket reference. Use `MockConnector` for demo and integration tests. Implement `SambaPosGraphQLConnector` only after confirming SambaPOS V5, Message Server API access, application token, and live schema introspection. Do not fabricate GraphQL mutations.

For a production connector, use an outbound-only LAN connection, short request timeouts, exponential retry with jitter, a bounded queue, a circuit breaker after repeated failures, and a dead-letter/reconciliation view in the staff console. No inbound SambaPOS route should be exposed publicly.

## Payments

`initiate-mpesa-payment` accepts only `order_id` and session context. It recomputes the amount, rejects a second concurrent pending payment, rate-limits by session, and stores only masked phone data where possible. Daraja calls and credentials live inside Supabase Edge Functions. The callback uses an unguessable path segment, matches a known pending checkout request, re-verifies amount, is idempotent, and writes `payment_audit_events` for every transition. Refunds are manual staff-recorded entries in v1.

## Cloudflare fit

Cloudflare is especially useful here because QR traffic is public and bursty, dish media is cacheable, and the venue benefits from WAF/rate limits around session/payment initiation. Keep Supabase Realtime/Auth and payment state in Supabase because those are relational, audited, and security-sensitive. Cloudflare Worker code should remain thin and stateless.
