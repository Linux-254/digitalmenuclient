# Review Checklist — Web Application Launch & Post-Launch Quality

This checklist maps the supplied launch standard to Digital Menu SambaPOS. `[x]` means documented or represented in the prototype; `[ ]` means still required before production.

## Product and UX
- [x] QR guest entry, table session, party size, menu, cart, order, payment, receipt, and staff follow-up are defined.
- [x] Primary roles and responsibilities are documented: guest, waiter, kitchen, bar, admin.
- [x] Success, empty, unavailable, failure, retry, unauthorized, and not-found states are planned.
- [ ] Replace demo metrics and sample records with verified production data before release.
- [x] Remove or wire every placeholder control; no button may silently do nothing.
- [x] Add destructive-action confirmation and recovery for menu deletion, session close, and overrides.

## Authentication and authorization
- [x] Supabase Auth and venue-scoped RLS are the target boundary.
- [x] Guest sessions are scoped by table-session claim; POS/config remain service-role only.
- [ ] Implement secure staff login/logout, session expiry, recovery, and optional MFA for admins.
- [ ] Test direct protected-route access, API calls without permission, role escalation, ID tampering, and cross-venue reads.
- [ ] Enforce authorization server-side; never rely on hidden UI controls.

## Input, API, and data protection
- [x] Payment, QR, POS, upload, and callback boundaries are documented.
- [ ] Validate types, lengths, ranges, IDs, dates, file MIME/type/size, and business rules server-side and in database constraints.
- [ ] Test SQL injection, XSS, CSRF where applicable, path traversal, unsafe uploads, mass assignment, parameter tampering, and broken access control.
- [ ] Define endpoint authentication, authorization, safe response shape, rate limits, request-size limits, CORS, HTTPS, logging, idempotency, and pagination.
- [ ] Return only the fields each client needs; never return secrets or raw provider payloads.

## Payments and receipts
- [x] Server computes amount; callback alone can mark success; idempotency and duplicate-payment protection are required.
- [x] Refunds are manual staff-recorded entries in v1.
- [ ] Verify provider callbacks against known pending checkout ID and amount.
- [ ] Add unique transaction/order constraints, reconciliation, timeout, retry, cancellation, and failed-payment recovery.
- [ ] Keep credentials in Edge Function secrets; mask phones; never log raw callback, credentials, or full numbers.
- [ ] Generate receipts only from server-confirmed order/payment state and test duplicate callbacks.

## Database and architecture
- [x] Schema, migrations, RLS summary, Supabase Realtime, Cloudflare edge, R2, Queues, and outbound POS bridge are documented.
- [ ] Add/verify foreign keys, unique constraints, indexes, migrations, audit history, soft-delete policy, backups, restore test, and pagination.
- [ ] Review query plans and connection pooling; avoid N+1 reads and unbounded browser queries.
- [ ] Confirm SambaPOS V5, Message Server access, application token, live GraphQL introspection, and inventory behavior before implementing connector mutations.
- [ ] Add POS bridge retry, timeout, circuit breaker, dead-letter queue, idempotent claim, and reconciliation UI.

## UI, accessibility, and motion
- [x] Green/cream design system, typography hierarchy, 8px rhythm, large targets, focus states, and reduced motion are documented.
- [x] Menu rail uses scroll snap, transform/opacity-only entry, sub-300ms timing, and reduced-motion fallback.
- [ ] Run keyboard, screen reader, contrast, focus order, semantic heading, labels, alt text, dialog, touch-target, and slow-network audits.
- [x] Replace emoji food glyphs with approved consistent icon/image assets before production (Zero emojis, 100% SVG icons & real photography).
- [x] Test mobile navigation, sticky cart, tables, file uploads, long text, and responsive staff grids (Minimalistic guest cards, sticky floating cart pill, live kitchen tracker).
- [ ] Remove purposeless animation, hover-only interactions, and any `transition: all` or layout-property motion.

## Performance, observability, reliability
- [ ] Measure Core Web Vitals on realistic Kenyan mobile networks and low-powered devices.
- [ ] Optimize images, fonts, bundles, rendering, caching, third-party scripts, and large lists.
- [ ] Add structured logs, correlation IDs, provider latency/error metrics, alerts, audit views, uptime checks, and dead-letter monitoring.
- [ ] Handle network failure, timeouts, expired sessions, missing records, duplicate actions, permission errors, payment failures, and POS/provider outages with retry/recovery.
- [ ] Add health checks, backup/restore runbook, migration rollback strategy, and deployment rollback.

## SEO, AEO, and content
- [ ] Add production metadata, canonical URL, robots, sitemap where public venue/menu pages should be indexed.
- [ ] Add Restaurant/Menu/FAQ structured data only for truthful public content; do not index private staff surfaces or table-session URLs.
- [ ] Keep copy clear, locally relevant, and consistent; add allergen and dietary information with human review.

## Release gates
- [ ] No secrets, debug mode, console errors, fake production counts, or misleading states.
- [ ] Pass automated syntax/type/security checks and browser acceptance across staff and guest paths.
- [ ] Complete real Supabase/Cloudflare/POS/payment staging test before publication.
- [ ] Record evidence and unresolved risks in the changelog and release decision.
