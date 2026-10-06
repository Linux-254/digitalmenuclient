# Digital Menu SambaPOS — Build Review Dossier

Review bundle for the QR-first restaurant ordering prototype.

## Review order
1. `prompt/build-prompt.json`
2. `reference/`
3. `build-snapshot/`
4. `requirements/`
5. `architecture/`
6. `design/`, `motion/`, `flows/`
7. `TODO.md` and `changelog.md`

## Current stack
Prototype: static HTML/CSS/JS. Target: Next.js App Router, Supabase Postgres/Auth/Realtime/Edge Functions/RLS, on-prem Node POS bridge, Cloudflare DNS/WAF/Workers/R2/Queues/CDN, Tailwind/shadcn tokens, short Framer Motion/GSAP transitions.

## Guardrail
SambaPOS GraphQL stays stubbed until venue-specific V5 schema and credentials are verified. Payment success is server-only.

## Added launch-standard audit
`requirements/web-application-launch-quality-standard.md` contains the complete supplied 981-line quality standard. `review-checklist.md` maps its requirements to this project and separates documented items from production gates.

## Motion tutorial delivery
The supplied second motion tutorial is preserved in `reference/motion-tutorial.mp4`, with a contact sheet and transcript. Its composition and animation cues are translated into `motion/motion-spec.md`; the live web implementation is in `styles.css` as the mobile menu rail.
