<<<<<<< HEAD
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
=======
# Digital Menu System — Architecture & Build Spec
**Target stack:** Supabase (Postgres + Realtime + Auth + Edge Functions) · Next.js PWA (guest) · Next.js console (staff) · Node bridge service (SambaPOS connector)
**POS:** SambaPOS V5 (GraphQL Integration API, LAN-local Message Server)
**Availability model:** Option 1 — availability lives in your own database, independent of SambaPOS stock. POS sync is one-directional (order → ticket) at this stage.

---

## 1. Guiding principles

- **Single source of truth for the live menu = Supabase.** SambaPOS never dictates what a guest sees; it only receives finished orders for billing.
- **Realtime over polling.** Supabase Realtime (Postgres change-data-capture over WebSockets) drives every live update — availability toggles, order status, table state. No custom SSE server needed; Supabase already gives you this.
- **POS integration is an adapter, not a dependency.** The app must run and be demoable end-to-end with a `MockConnector` before SambaPOS specifics are confirmed. Swapping in `SambaPosGraphQLConnector` later should touch one file.
- **Guests never get a Supabase service key.** All guest-facing access goes through Row Level Security with a scoped, short-lived token tied to a table session — never the anon key alone with open tables.
- **Offline-tolerant, not offline-first.** Kenyan venue wifi drops. Cache the menu client-side, queue guest actions locally, retry on reconnect. Don't over-engineer full offline order placement — just don't let a blip lose an order.

---

## 2. System architecture

```
┌─────────────────┐        ┌──────────────────────┐        ┌────────────────────┐
│  Guest PWA       │◄──────►│                        │        │                    │
│  (Next.js)       │  RT/   │      Supabase          │        │  SambaPOS (venue    │
├─────────────────┤  REST  │  - Postgres            │        │  LAN, Windows,      │
│  Staff Console   │◄──────►│  - Realtime            │        │  Message Server +   │
│  (Next.js)       │        │  - Auth                │        │  GraphQL API)        │
└─────────────────┘        │  - Edge Functions       │        └─────────▲──────────┘
                            │  - Row Level Security   │                  │
                            └───────────┬─────────────┘                  │ GraphQL
                                        │ service-role only               │ (LAN only)
                                        ▼                                 │
                              ┌──────────────────────┐                   │
                              │  POS Bridge Service    │───────────────────┘
                              │  (Node, runs on venue  │
                              │  LAN, next to SambaPOS)│
                              └──────────────────────┘
```

**Why the bridge runs on-site, not in the cloud:** SambaPOS's Message Server / GraphQL API is LAN-local by design (Windows app, local SQL Server backing store). Reaching it from a cloud function would mean port-forwarding a POS system to the public internet — don't do that. Instead, a small always-on Node process on the venue's own network holds the only connection to SambaPOS, and talks to Supabase over normal internet (outbound only, using a scoped service key).

### Cloudflare edge & media fit
Cloudflare provides the public edge layer (DNS, TLS, WAF, bot/rate protection, CDN caching, Workers for `/t/:qrToken` routing, and R2 for dish media). Supabase remains the system of record for venues, menus, table sessions, orders, payments, audit events, Auth, RLS, and Realtime.

---

## 3. Data flow — guest order lifecycle

1. Guest scans QR at table → lands on `/table/[qrToken]`.
2. Edge Function validates the QR token, opens (or resumes) a `table_sessions` row, issues a scoped session token (JWT custom claim `table_session_id`).
3. Guest sets/confirms party size → `table_sessions.party_size` updated.
4. Guest browses menu — data fetched once, then kept live via a Realtime subscription on `menu_items` (so an 86'd dish greys out mid-browse without a refresh).
5. Guest builds cart client-side, submits → creates `orders` + `order_items` rows scoped to their `table_session_id` (RLS enforces they can only write to their own session).
6. Staff console (waiter/kitchen/bar) receives the new order instantly via Realtime subscription on `orders`/`order_items` filtered by venue.
7. Kitchen/bar update `order_items.status` (preparing → ready → served) — guest's `order-status` screen reflects this live.
8. On session close/bill request, an Edge Function packages the session's orders and hands them to the **POS Bridge** (via a `pos_sync_log` row it's watching, or a lightweight queue table) to create the ticket in SambaPOS.

## 4. Data flow — availability toggle

1. Chef/bar taps a toggle in `AvailabilityToggleGrid` → mutation updates `menu_items.is_available` (+ optional `unavailable_until` for a timed relist, e.g. juice batch).
2. Write also inserts a row into `availability_events` (audit trail — useful later for "what runs out most" analytics).
3. Every guest session subscribed to `menu_items` gets the change pushed in well under a second. If the item is already in an open (not-yet-submitted) cart, the guest PWA reconciles it client-side and shows a toast.
4. Juice/batch items: `menu_items.batch_qty_remaining` decrements on each order; a Postgres trigger auto-sets `is_available = false` at zero, no manual chef action required for the "sold out mid-batch" case.

## 5. Data flow — POS handoff

1. Bridge service holds a persistent (or polling, if push isn't reliable on their SambaPOS version) subscription to a `pos_sync_log` queue table in Supabase, filtered to `status = 'pending'`.
2. For each pending row, the bridge calls `connector.createTicket(normalizedOrder)` — today `MockConnector` (logs + fakes success), later `SambaPosGraphQLConnector` (real GraphQL mutation against the venue's Message Server).
3. On success, bridge writes back `pos_ticket_ref` and `status = 'success'`; on failure, `status = 'failed'` + `error` — staff console can surface unsynced tickets so nothing silently fails to bill.
4. This queue table is the **only** thing the bridge touches with write access from the POS side — keeps the blast radius of a bridge bug small.

## 5b. Data flow — payment (M-Pesa STK push)

The core rule governing all of this: **the browser is never the authority on price or payment status.** Everything that determines "how much" and "did it actually get paid" happens server-side, in Edge Functions the guest device cannot influence beyond triggering them.

1. Guest taps **Pay** on the bill screen. The client sends only `order_id` — never an amount.
2. `initiate-mpesa-payment` Edge Function:
   - Verifies the caller's session JWT owns that `order_id` (same RLS-style ownership check as everywhere else).
   - **Computes the amount itself** by summing `order_items` server-side — the client-supplied figure, if any, is ignored entirely.
   - Checks for an existing `pending` payment on this order and refuses to create a second concurrent STK push (duplicate-payment protection).
   - Generates a unique `idempotency_key`, calls Daraja (Safaricom's M-Pesa API) to fire the STK push to the guest's phone, and creates a `payments` row with `status = 'pending'`.
   - Returns immediately — the push is asynchronous, so the response is just "prompt sent," not a result.
3. Guest enters their M-Pesa PIN on their own phone (outside your app entirely — this is the whole point of STK push, no card/PIN ever touches your system).
4. Safaricom calls `mpesa-callback` (a public but effectively unguessable Edge Function URL) with the result.
5. `mpesa-callback`:
   - Matches the callback's `checkout_request_id` to an existing `pending` payments row — **rejects anything that doesn't match a known pending record.**
   - Is **idempotent**: if this callback has already been processed (Safaricom retries these), it's a no-op, not a double-credit.
   - **Re-verifies the amount** in the callback against the server-computed order total before accepting success — a mismatch is treated as a failure requiring manual review, not silently accepted.
   - Updates `payments.status` to `success`/`failed`/`cancelled`, stores `mpesa_receipt_number`, and writes a `payment_audit_events` row.
   - Only on confirmed `success` does it flip the order to paid and enqueue the `pos_sync_log` row — SambaPOS only ever sees orders that are actually paid for.
6. Guest's payment screen is a Realtime subscription on their `payments` row (RLS-scoped, read-only) — "Check your phone" → live flips to confirmed/failed the instant the callback lands. No polling, no trusting a redirect.

---

## 8b. Payment security requirements (non-negotiable)

- **Server determines the amount, always.** `initiate-mpesa-payment` computes total from `order_items` in DB.
- **A redirect or client-side "success" state proves nothing.** Only verified `mpesa-callback` write moves payment to `success`.
- **Idempotency everywhere.** Both payment initiation and callback handling are protected against duplicate requests or processing.
- **Callback authenticity.** Unguessable path segment, matching against known pending `checkout_request_id`, re-verification of amounts.
- **Secrets never touch client.** Daraja credentials remain inside Supabase Edge Function environment secrets.
- **Rate limiting.** Cap STK push attempts per session per time window.
- **Minimize sensitive data at rest.** Store phone numbers masked; retain raw callback payloads for audit without displaying to guests.
- **Safe, generic error messages.** Never expose stack traces or raw Daraja errors.
- **Audit trail.** All status transitions write to `payment_audit_events`.
- **Refunds are manual for v1.** Staff-initiated and recorded as `payments.status = 'refunded'`.
- **Hosted checkout for cards.** If cards are added, use Pesapal/Flutterwave/DPO to avoid raw card data handling.

---

## 10. Open items before `SambaPosGraphQLConnector` can be written

1. Confirm SambaPOS version is V5.x (GraphQL API is V5-only).
2. Confirm Message Server API access is enabled on their install, and get (or generate) an access token + defined Application entry.
3. Run schema introspection against their live instance to confirm actual field/mutation names for ticket creation.
4. Confirm whether they track live inventory in SambaPOS at all — if not, `getMenuAvailability()` stays unimplemented and availability remains fully manual.

## 11. Open items before payments go live

1. Register Daraja app (Safaricom developer portal), get consumer key/secret and passkey for Lipa Na M-Pesa Online.
2. Confirm settlement account (till/paybill number) STK push should route to.
3. Decide v1 scope explicitly: single-payer-per-table vs split billing.
4. Decide whether tips are in v1 scope.
5. Confirm how `pos_sync_log` payloads should represent payment method/reference on the SambaPOS ticket.

>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
