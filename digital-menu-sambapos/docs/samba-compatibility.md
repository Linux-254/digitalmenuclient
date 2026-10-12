# SambaPOS compatibility boundary

SambaPOS version is currently **unknown**. The bridge therefore supports a safe discovery-first flow:

1. Run the venue-owned discovery script on the SambaPOS PC and save a redacted `samba-discovery-report.json`.
2. Confirm whether the installation exposes Message Server, REST, or GraphQL and record the exact endpoint, auth scheme, ticket model, department names, and menu item identifiers.
3. Configure the bridge through environment variables on the venue PC only. Never publish port 9000 through Cloudflare or the public API.
4. Keep `MockConnector` enabled until discovery and a duplicate-ticket test pass.
5. Implement the real connector only from the report. No endpoint names or GraphQL mutations are guessed in this repository.

The interface is version-neutral: `healthCheck`, idempotent `createTicket`, bounded timeout, retry/backoff, dead-letter state, and reconciliation. This supports the current latest and the previous latest SambaPOS deployment without coupling the cloud app to either version.
