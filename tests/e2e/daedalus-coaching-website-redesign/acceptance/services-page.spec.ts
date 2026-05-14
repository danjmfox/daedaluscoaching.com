/**
 * Services page — acceptance tests
 *
 * The services page communicates how the coach works. It uses @nuxt/content
 * to deliver copy from content/services.md via the usePageContent composable.
 *
 * All tests are skipped except the first. Enable one, implement, commit, repeat.
 */

import { test, expect } from "@playwright/test";

// Scenario 1 (enabled): page is reachable and carries a heading.
// Walking skeleton for the services page.
test("visitor reaches the services page and sees the page heading", async ({
  page,
}) => {
  const response = await page.goto("/services");

  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /404|not found/i }),
  ).not.toBeVisible();
});

// Scenario 2: page delivers content from the content file, not a blank page.
test.skip("visitor reads content about how the coach works on the services page", async ({
  page,
}) => {
  await page.goto("/services");

  // The composable delivers rendered prose from content/services.md.
  // The exact text is owned by the content file — assert prose is present.
  const prose = page.locator("main .prose");
  await expect(prose).toBeVisible();

  const text = await prose.textContent();
  expect(text?.trim().length).toBeGreaterThan(50);
});

// Scenario 3 (error path): navigating to an unknown services sub-path does not
// produce a server error.
test.skip("visitor navigating to an unknown services path sees a not-found response", async ({
  page,
}) => {
  const response = await page.goto("/services/does-not-exist");

  expect(response?.status()).not.toBe(500);
});
