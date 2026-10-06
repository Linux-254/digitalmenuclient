# Menu Studio

The staff/admin menu studio is the operational content surface for dishes, drinks, categories, sub-categories, availability, pricing, station assignment, and media. Admins can create a dish, change an image, move an item between categories, mark it live/off menu, and publish through the normal Supabase mutation path.

The prototype includes three surfaces: Dishes (search, station filter, live/off menu), Categories (category and sub-category structure), and Media library (R2 upload affordance). In production, image uploads use signed R2 URLs and dish mutations use role-scoped Supabase functions/RLS. A publish event should write an audit record and allow Realtime guests to reconcile open carts when an item becomes unavailable.

The visual language borrows the supplied reference's editorial food-poster energy without copying its artwork: forest green field, cream display type, organic circles, rounded image windows, high-contrast dish names, and a vertical editorial rhythm. The QR guest flow adds carousel-like motion as a guide through the menu, not as an obstacle to ordering.
