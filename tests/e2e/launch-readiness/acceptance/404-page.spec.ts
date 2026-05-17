/**
 * launch-readiness — S-LR-001: Custom 404 page
 *
 * @real-io S-LR-001
 */

import { test, expect } from "@playwright/test";

// Scenario 1: walking skeleton — covered in walking-skeleton.spec.ts

// Scenario 2: 404 page has the site navigation. [AC-LR-001-1]
test("404 page renders with site header and footer", async ({ page }) => {
  await page.goto("/does-not-exist");

  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await expect(page.locator("footer")).toBeVisible();
});

// Scenario 3: 404 page has a link back to the homepage. [AC-LR-001-2]
test("404 page offers a link back to the homepage", async ({ page }) => {
  await page.goto("/does-not-exist");

  const homeLink = page.getByRole("link", { name: "Back to home" });
  await expect(homeLink).toBeVisible();
  await homeLink.click();
  await expect(page).toHaveURL("/");
});

// Scenario 4: 404 page has the correct document title. [AC-LR-001-4]
test("404 page has the correct document title", async ({ page }) => {
  await page.goto("/does-not-exist");

  await expect(page).toHaveTitle(/Page not found/i);
});

// Scenario 5: deeply nested non-existent paths also 404 gracefully. [@error]
test("deeply nested non-existent path shows the error page", async ({
  page,
}) => {
  await page.goto("/services/not-a-real-sub-page/deep");

  await expect(page.getByRole("heading", { name: /not found/i })).toBeVisible();
});
