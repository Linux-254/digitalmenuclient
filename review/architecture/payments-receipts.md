# Payments & Receipts

Edge Function recomputes totals from order_items. Initiation rejects duplicate pending payments and stores idempotency key. Only verified, matching, idempotent M-Pesa callback can set success. Receipt is generated from server-confirmed order/payment data, includes venue, table/session, line items, KES total, method, masked reference, timestamp, and status. Card later uses hosted checkout; no card data stored.
