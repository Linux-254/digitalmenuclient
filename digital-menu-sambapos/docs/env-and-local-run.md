# Environment and local run

1. Copy `.env.example` to a local secret store; never commit `.env`.
2. Run the static prototype with `python3 -m http.server 3000 --bind 0.0.0.0` from the project root.
3. For production, use separate staging/production Worker secrets and Supabase projects. Public `PUBLIC_*` values may be bundled; all other values stay in Worker/Supabase secret stores.
4. Configure `PUBLIC_MENU_ORIGIN`, `SUPABASE_URL`, and Turnstile before enabling real session open or staff login.
5. Keep M-Pesa in Daraja sandbox until the venue confirms shortcode ownership and callback verification.
6. Run SambaPOS discovery on the venue PC before enabling a real connector.
