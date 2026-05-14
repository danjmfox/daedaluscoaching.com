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
// Page now uses content blocks (useComposedPage) — each mode has its own block.
test("visitor reads content about how the coach works on the services page", async ({
  page,
}) => {
  await page.goto("/services");

  // Content blocks render section headings for each mode.
  await expect(
    page.getByRole("heading", { name: /with individuals/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /with teams/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /with organisations/i }),
  ).toBeVisible();
});

// Scenario 3 (error path): navigating to an unknown services sub-path does not
// produce a server error.
test("visitor navigating to an unknown services path sees a not-found response", async ({
  page,
}) => {
  const response = await page.goto("/services/does-not-exist");

  expect(response?.status()).not.toBe(500);
});
