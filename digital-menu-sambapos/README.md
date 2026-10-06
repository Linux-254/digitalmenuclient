# Digital Menu SambaPOS

A table-side digital ordering prototype for a Kenyan restaurant. The visual demo is served from the project root and demonstrates the guest ordering and staff console flows.

## Boundaries

- Supabase is the intended backend boundary for Postgres, Realtime, Auth, RLS, and Edge Functions.
- `menu_items.is_available` is the guest-facing availability source of truth.
- Payment amounts are server-computed; only the service-role callback function may mark a payment successful.
- POS integration uses `POSConnector`; only `MockConnector` is implemented for the demo.
- SambaPOS GraphQL remains a stub until venue-specific V5 introspection is available.
