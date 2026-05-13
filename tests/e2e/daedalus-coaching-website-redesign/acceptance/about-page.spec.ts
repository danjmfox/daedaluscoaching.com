/**
 * About page — acceptance tests
 *
 * The about page uses the composable content blocks pattern: about.md carries a
 * `blocks: string[]` frontmatter field; `useComposedPage('/pages/about')` resolves
 * those slugs into full block documents and renders their prose inline.
 *
 * All tests are skipped except the first. Enable one, implement, commit, repeat.
 */

import { test, expect } from "@playwright/test";

// Scenario 1 (enabled): page is reachable and shows the about heading.
// This is the walking skeleton for the about page — proves the route exists
// and @nuxt/content delivers content to the page.
// The heading text must be about-specific (not the 404 page heading).
test("visitor reaches the about page and sees the page heading", async ({
  page,
}) => {
  const response = await page.goto("/about");

  // Route must resolve — not a 404 redirect.
  expect(response?.status()).toBe(200);

  // Page must carry an h1 with about-page content (not a generic error heading).
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  // The heading must not be a Nuxt 404 heading.
  await expect(
    page.getByRole("heading", { name: /404|not found/i }),
  ).not.toBeVisible();
});

// Scenario 2: block prose — not just the heading, but the composed body copy
// from the blocks collection — appears on the page.
test("visitor reads the about page and sees the narrative prose from content blocks", async ({
  page,
}) => {
  await page.goto("/about");

  // The composable resolves block slugs and renders their body HTML.
  // Text comes from real block documents, not the page frontmatter.
  await expect(
    page.getByText("conditions for clearer thinking", { exact: false }),
  ).toBeVisible();
});

// Scenario 3: page renders multiple blocks in declared order.
test.skip("visitor sees all content blocks rendered in the order declared in the page frontmatter", async ({
  page,
}) => {
  await page.goto("/about");

  const bodyText = await page.locator("main").textContent();
  const introIndex = bodyText?.indexOf("intro") ?? -1;
  const approachIndex = bodyText?.indexOf("approach") ?? -1;

  expect(introIndex).toBeGreaterThan(-1);
  expect(approachIndex).toBeGreaterThan(-1);
  expect(introIndex).toBeLessThan(approachIndex);
});

// Scenario 4 (error path): navigating to a non-existent about sub-path shows
// the site's not-found response, not a blank page or server error.
test.skip("visitor navigating to an unknown about path sees a not-found response", async ({
  page,
}) => {
  const response = await page.goto("/about/does-not-exist");

  expect(response?.status()).not.toBe(500);
  // Nuxt SSG returns 404 for unmatched static paths.
  // The exact status depends on the Netlify 404 config — assert non-500 as
  // the observable behaviour; a stakeholder cares that the server does not crash.
  expect(response?.status()).toBe(404);
});
