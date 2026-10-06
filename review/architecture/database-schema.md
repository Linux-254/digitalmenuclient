# Database Schema

Core tables: venues, staff, tables, table_sessions, categories, menu_items, availability_events, orders, order_items, pos_sync_log, pos_connector_config, payments, payment_audit_events. Use UUID keys, venue_id on tenant tables, timestamptz, numeric money, jsonb only for integration payloads, and indexes on venue_id, session_id, status, created_at. RLS scopes guests by `table_session_id` claim and staff by venue membership; bridge/config are service-role only. Never expose raw callback data.
