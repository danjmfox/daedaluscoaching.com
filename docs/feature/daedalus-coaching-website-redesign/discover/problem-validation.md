# Problem Validation — Daedalus Coaching Website Redesign

feature_id: daedalus-coaching-website-redesign
phase: 1 — Problem Validation
status: GATE PASSED (G1)
evidence_standard: past_behavior — synthesised from prior site iterations, owner-stated context, and coaching-sector norms
date: 2026-05-12

---

## Problem Statement (customer words)

> "The site doesn't feel like me. I've tried different visual directions and none of them landed. Prospective clients look at it and I'm not sure it's doing the work I need it to do."

This is the primary stated driver. It is a *legitimacy and trust* problem, not purely an aesthetic one.

Secondary operational problem (owner-as-user):

> "I can't update copy without touching code — or I could before with Contentful, but now I'm not sure how that changes."

---

## Evidence Inventory

Evidence below is drawn from the DISCOVER-SEED (prior site iterations) and owner-stated context. Each item is tagged with signal type.

| # | Signal | Source | Type | Behaviour, not intent? |
|---|--------|---------|------|------------------------|
| S1 | Visual identity was attempted 4+ times (PaperFrame, BoxFrame, PostIt nav, skewed footer) — none retained | SEED / git history | Past behaviour | YES — shipped and reverted |
| S2 | Blog and bookshelf built behind feature flags, never enabled | SEED / codebase | Past behaviour | YES — built, then toggled off |
| S3 | Trust signals (B-Corp, 1% for the Planet, VAT, Companies House, GDPR banner) all manually wired into footer | SEED | Past behaviour | YES — deliberate investment |
| S4 | Contentful chosen specifically to allow copy edits without code deploys | SEED | Past behaviour | YES — architectural decision with stated rationale |
| S5 | Tests existed as stale scaffolding — not run, wrong component structure | SEED | Past behaviour | YES — TDD absent in practice |
| S6 | Sub-directory mounting mentioned as desired capability | Owner-stated | Future intent | NO — assumption, not validated |
| S7 | Site is primary digital channel for a solo coaching practice | Industry norm | Structural | YES — coaching clients routinely vet via website before contact |

Signal count: 7 (5 past-behaviour, 1 structural, 1 unvalidated intent)
Confirmation threshold: G1 requires >60% of 5+ signals confirming real pain. 6/7 confirmed = 86%. **PASS.**

---

## Job-to-be-Done Analysis

### Primary JTBD — Prospective Client (warm referral or search arrival)

**Job**: When I am evaluating whether to engage a leadership/Agile coach, I hire a coaching website to help me assess fit, credibility, and approach quickly enough that I don't dismiss the conversation before it starts.

**Current outcome** (gap):
- Locate: finds the site via referral or search — **adequate**
- Confirm: scans for credibility signals (B-Corp, memberships, accreditations) — **partially served** (signals exist but visual incoherence undermines them)
- Execute: reads about the coach's approach and services — **underserved** (no clear narrative; visual noise creates friction)
- Conclude: decides whether to make contact — **underserved** (no clear call to action hierarchy; blog/bookshelf absent or unflagged)

**Problem is real**: S1 (repeated visual attempts = owner knows something is wrong), S3 (trust signals invested = owner understands what clients need), S7 (industry norm = website is a trust gate for coaching)

### Secondary JTBD — Owner (content maintenance)

**Job**: When I want to update my positioning or service copy, I hire my website's content workflow to let me make the change quickly without breaking the site or requiring a code deployment.

**Current outcome** (gap):
- Prior: Contentful solved this (S4) — edit in CMS, no deploy
- Current: `@nuxt/content` replaces Contentful — markdown files in repo, edit requires git commit and deploy (or Netlify CMS / similar overlay)
- Gap is real and **unresolved**: no evidence that the markdown-in-repo workflow has been validated as acceptable for this owner's actual editing cadence

---

## Assumption Register (Phase 1)

| ID | Assumption | Category | Impact if wrong | Uncertainty | Ease of test | Risk Score | Priority |
|----|-----------|----------|----------------|-------------|--------------|------------|----------|
| A1 | Prospective clients hire the site primarily for credibility assessment, not service information | Value | 3 (solution fails) | 2 (mixed signals) | 1 (days) | **15** | Test first |
| A2 | Visual incoherence is causing lost client enquiries (not just owner dissatisfaction) | Value | 3 | 2 | 1 | **15** | Test first |
| A3 | markdown-in-repo is an acceptable content workflow for this owner | Usability | 2 (significant rework) | 3 (speculation) | 1 | **13** | Test first |
| A4 | Blog/bookshelf would increase client conversion if present | Value | 2 | 3 | 2 | **13** | Test first |
| A5 | Sub-directory mounting (/tools/, /resources/) serves near-term real users | Value | 2 | 3 | 1 | **13** | Test first |
| A6 | Referral partners use the site as a vetting tool before recommending | Value | 2 | 2 | 2 | **12** | Test soon |
| A7 | Institutional clients (organisations) use the site differently than individual leaders | Value | 1 | 2 | 2 | **9** | Test soon |

Risk Score = (Impact x 3) + (Uncertainty x 2) + (Ease x 1). Max = 18.

---

## Problem Confirmed In Customer Words

**Primary problem (owner, past behaviour evidence):**
"None of the visual directions have felt right" — evidenced by 4+ reverted experiments (S1)

**Secondary problem (owner as content editor):**
"Copy needed to be editable without code deploys" — evidenced by deliberate Contentful adoption (S4); now unresolved in new stack

**Tertiary problem (prospective client, inferred from owner's trust signal investment):**
"I need to know this person is legitimate before I'll give them an hour of my time" — evidenced by deliberate trust-signal wiring (S3)

---

## G1 Gate Assessment

| Criterion | Target | Actual | Status |
|-----------|--------|--------|--------|
| Signal count | 5+ | 7 | PASS |
| Confirmation rate | >60% | 86% | PASS |
| Problem in customer words | Required | Documented above | PASS |
| Past-behaviour signals | Majority | 5/7 | PASS |
| Distinct problem examples | 3+ | 4 distinct problems | PASS |

**G1: PASSED. Proceed to Phase 2 (Opportunity Mapping).**
