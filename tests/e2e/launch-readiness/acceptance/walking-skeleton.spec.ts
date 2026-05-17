/**
 * launch-readiness — walking skeleton
 *
 * Proves the three launch-readiness surfaces are wired end-to-end:
 * a broken path recovers gracefully, the privacy page loads, and
 * the OG image meta tag is present. One scenario per story; one-at-a-time
 * TDD — enable the next test only after the previous is green.
 *
 * @walking_skeleton @real-io
 */

import { test, expect } from "@playwright/test";

// WS-01 (enabled): broken path shows branded error page. [S-LR-001]
test("visiting a non-existent path shows a branded error page", async ({
  page,
}) => {
  await page.goto("/this-page-does-not-exist");

  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /not found/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});

// WS-02: privacy page resolves and shows policy content. [S-LR-002]
test("visiting /privacy shows the privacy policy", async ({ page }) => {
  await page.goto("/privacy");

  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /privacy/i })).toBeVisible();
  await expect(page.getByText(/Daedalus Coaching Ltd is a/)).toBeVisible();
});

// WS-03: homepage has og:image meta tag. [S-LR-003]
test("homepage head contains an og:image meta tag", async ({ page }) => {
  await page.goto("/");

  const ogImage = page.locator('meta[property="og:image"]');
  await expect(ogImage).toHaveCount(1);
  const content = await ogImage.getAttribute("content");
  expect(content).toMatch(/og-card/);
});
