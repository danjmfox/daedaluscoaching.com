# Slice 01 — Deploy Swoopy to Netlify with custom subdomain

**Goal:** Swoopy app live at `https://swoopy.daedaluscoaching.com/` with SSL and auto-deploy from `main`.

## IN Scope

- Create Netlify site connected to Swoopy repo
- Configure build command and publish directory
- Enable auto-deploy from `main` branch
- Add `swoopy.daedaluscoaching.com` as custom domain
- Configure DNS record at registrar (`swoopy` subdomain → Netlify)
- SSL certificate provisioned

## OUT of Scope

- Updating `netlify.toml` on the main site (that's Slice 02)
- Any Swoopy app changes
- CI/CD for Swoopy (PR previews, etc.)

## Learning Hypothesis

Disproves: "Swoopy's Vite build config is incompatible with Netlify's build environment."
Confirms: Build succeeds, app is servable, custom domain + SSL work as expected.

## Acceptance Criteria

- Netlify site exists, build green, app accessible at `https://swoopy.daedaluscoaching.com/`
- SSL cert active (no certificate warning)
- Auto-deploy from `main` enabled and verified with a test push

## Dependencies

- Swoopy repo access (GitHub)
- Domain registrar access for `daedaluscoaching.com`
- Netlify account

## Effort Estimate

< 2 hours (largely manual UI steps in Netlify dashboard + DNS)

## Reference Class

Standard Netlify Vite deploy + custom domain setup. Well-documented, low risk.

## Pre-slice SPIKE

None required. Standard Netlify Vite deploy; risk is low.

## @infrastructure flag

YES — no user-visible change on the main site until Slice 02. This slice is a precursor commit.
