/**
 * TrustSignals component — acceptance tests
 *
 * Trust signals must appear on the homepage above the fold: B-Corp certification,
 * 1% for the Planet membership, and accreditations. These are the primary
 * client-evaluation signals for the coaching sector (DISCOVER validated).
 *
 * All tests are skipped except the first. Enable one, implement, commit, repeat.
 */

import { test, expect } from "@playwright/test";

// Scenario 1 (enabled): trust signals section is visible on the homepage.
// Walking skeleton — proves TrustSignals renders in the page.
test("visitor on the homepage sees the trust signals section", async ({
  page,
}) => {
  await page.goto("/");

  // The component must be present — role="region" or an accessible landmark.
  // Accept any text that signals the section exists; exact label TBD.
  await expect(
    page.getByText(/b.?corp|1%.*planet|accreditation/i),
  ).toBeVisible();
});

// Scenario 2: B-Corp certification is visible.
test.skip(
  "visitor on the homepage sees the B-Corp certification",
  async ({ page }) => {
    await page.goto("/");

    // B-Corp badge or text must be present above the fold.
    // Exact label/alt text to be confirmed once design tokens are set.
    await expect(page.getByText(/b.?corp/i)).toBeVisible();
  },
);

// Scenario 3: 1% for the Planet membership is visible.
test.skip(
  "visitor on the homepage sees the 1% for the Planet membership",
  async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText(/1%.*planet|one percent.*planet/i)).toBeVisible();
  },
);

// Scenario 4: accreditations section is present.
// Exact credential content is TBD — this is a placeholder for the
// DELIVER wave implementer to fill with the real credential text.
test.skip(
  "visitor on the homepage sees professional accreditations",
  async ({ page }) => {
    await page.goto("/");

    // Replace the text matcher below with the exact accreditation string
    // once the owner confirms which credentials to display.
    await expect(page.getByText(/accredited|certified|ICF|EMCC/i)).toBeVisible();
  },
);

// Scenario 5 (error path / edge): trust signals remain visible even when
// rendered without JavaScript (SSG — the page must not rely on JS to show
// above-the-fold credentials).
// Note: Playwright runs with JS enabled by default. This scenario documents
// the intent; a separate nuxt generate + static HTML grep is the authoritative
// check (CI gate 5).
test.skip(
  "trust signals are present in the statically generated HTML without JavaScript",
  async ({ page }) => {
    await page.goto("/");

    // If the component is SSR-rendered, the text is in the initial HTML payload.
    // A JS-disabled variant would require a separate Playwright project config.
    // This test confirms the text is present in the DOM on first load (not injected
    // after hydration delay).
    const bodyHTML = await page.content();
    expect(bodyHTML).toMatch(/b.?corp/i);
  },
);
