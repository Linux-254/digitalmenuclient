# Launch-readiness record

## Implemented in this pass
- Rebranded visible surfaces to **Testimony Cafeteria** with Kasarani context and Table 04 / Garden Terrace copy.
- Removed the hardcoded browser PIN; admin unlock now requires a server-issued admin session.
- Added environment contract for Supabase, Cloudflare/R2, Turnstile, Daraja, staff sessions and SambaPOS.
- Added RLS baseline and security/authorization rules; review against the final schema before applying.
- Added real Table 04 QR artwork and preserved the existing QR manager UI.
- Added SambaPOS version-neutral discovery boundary: no guessed latest/previous API calls.
- Preserved the 5-minute order-change default in the UI state.

## Still required before production
1. Attach the real Testimony menu seed, final price list, logo and schema files; do not invent prices.
2. Create Supabase staging, apply the clean migration, and run cross-venue RLS tests.
3. Implement server-side staff login with Argon2id/bcrypt, lockouts, session expiry and Turnstile.
4. Configure Cloudflare Workers, Access, WAF, rate limits, R2 and separate staging/production secrets.
5. Run SambaPOS discovery on the venue PC; only then replace the connector stub.
6. Configure Daraja sandbox and verify callback idempotency and amount matching before live credentials.
7. Run Playwright, Lighthouse mobile, backup/restore and two-phone QR tests.
