# ADR-004: Contact Form Validation — Zod in Core, Netlify Forms as Adapter

status: Accepted
date: 2026-05-12
deciders: Daniel Osborne (owner/developer)
wave: DESIGN

---

## Context

The contact form is the single primary CTA across the site (H4 validated). It must:
- Validate input on the client (progressive enhancement) and on the server boundary
- Not expose a custom backend endpoint to the open internet unnecessarily
- Remain testable — validation logic must be exercisable without a browser or network

Zod is confirmed as the validation library (pre-decided in DISCOVER-SEED). The schema
`core/contact/contact-schema.ts` is the canonical location (confirmed by owner in session).

The DISCOVER wave established Netlify as the deployment platform. Netlify Forms provides
server-side form submission handling without a custom API endpoint — spam filtering,
email notification, and submission storage are included on the free tier.

## Decision

**Validation**: Zod schema in `core/contact/contact-schema.ts` is the single source of
truth for the contact form data contract. Both client-side validation (composable) and
any server-side validation (Nuxt server route if added) import and use this schema.
The schema is a pure function — no framework dependencies.

**Submission handling**: Netlify Forms for v1. The Vue contact form component submits
to Netlify's form endpoint. A thin Nuxt server route (`server/api/contact.post.ts`) may
proxy the submission for server-side Zod validation before forwarding to Netlify — this
prevents client-bypass of validation.

**Adapter boundary**: The submission mechanism (Netlify Forms, or a future email service
like Resend, or a CRM integration) is isolated behind a `SubmissionPort` in `core/contact/`.
The server route is the adapter implementing this port. Swapping from Netlify Forms to
Resend requires only a new adapter, not a schema change.

**Probe requirement (Earned Trust)**: The Netlify Forms adapter must include a startup
probe that verifies the form name attribute is correctly configured and Netlify's form
detection endpoint is reachable. Failure at startup logs a structured warning
(`contact.submission.adapter.unreachable`). Because Netlify Forms detection relies on
build-time HTML scanning, the probe validates the presence of the form `data-netlify`
attribute in the rendered HTML at deploy time (CI check), not at runtime.

## Alternatives Considered

### Option A: Netlify Forms only (no server route)
Form submits directly from browser to Netlify. Simplest. Rejected because: client-side
Zod validation can be bypassed by a direct POST; no structured error response for
JavaScript-enhanced UX; validation logic cannot be tested without a browser.

### Option B (chosen): Zod in core + Netlify Forms adapter via server route
See Decision. Adds one Nuxt server route but validation is testable, bypassable only
with deliberate effort, and the submission mechanism is replaceable.

### Option C: Custom email API (Resend, SendGrid)
Full control over email templating. Adds external service dependency, API key management,
GDPR data handling complexity. No evidence the templating capability is needed for a
solo practice contact form. Deferred; available as adapter swap if needed.

## Consequences

Positive:
- Zod schema is the canonical contract — no duplicate validation logic
- Server-side validation prevents client bypass
- Submission mechanism is swappable via adapter
- `core/contact/` is pure — Stryker mutation testing applies

Negative:
- One Nuxt server route to maintain (minor)
- Netlify Forms has submission limits on free tier (100 submissions/month) — not a
  concern for a low-traffic coaching site but documented

## External Integration Annotation

Netlify Forms is an external service (Netlify platform). No consumer-driven contract test
recommended at v1 scale (low traffic, free tier, no programmatic API contract to validate).
If submission volume grows or a programmatic webhook integration is added, revisit with
Pact-JS for the webhook contract.
