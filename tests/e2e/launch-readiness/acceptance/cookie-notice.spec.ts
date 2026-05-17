/**
 * launch-readiness — S-LR-002: Cookie notice + privacy page
 *
 * Note: localStorage is cleared before each test via storageState / page.evaluate
 * so the notice always shows fresh.
 *
 * @real-io S-LR-002
 */

import { test, expect } from "@playwright/test";

// Clear localStorage before each test so the notice always appears fresh.
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

// Scenario 1: privacy page resolves — covered in walking-skeleton.spec.ts

// Scenario 2: cookie notice appears on first visit.
test("cookie notice is visible on first visit", async ({ page }) => {
  await expect(page.getByTestId("cookie-notice")).toBeVisible();
  await expect(page.getByTestId("cookie-notice")).toContainText(/no cookies/i);
});

// Scenario 3: cookie notice links to /privacy.
test("cookie notice contains a link to the privacy policy", async ({
  page,
}) => {
  const privacyLink = page
    .getByTestId("cookie-notice")
    .getByRole("link", { name: /privacy/i });
  await expect(privacyLink).toBeVisible();
  await expect(privacyLink).toHaveAttribute("href", "/privacy");
});

// Scenario 4: dismissing the notice hides it.
test("dismissing the cookie notice makes it disappear", async ({ page }) => {
  await page.getByTestId("cookie-notice-dismiss").click();
  await expect(page.getByTestId("cookie-notice")).not.toBeVisible();
});

// Scenario 5: dismissed notice does not reappear after reload.
test("cookie notice does not reappear after being dismissed and reloading", async ({
  page,
}) => {
  await page.getByTestId("cookie-notice-dismiss").click();
  await page.reload();

  await expect(page.getByTestId("cookie-notice")).not.toBeVisible();
});

// Scenario 6: dismissed notice does not reappear on navigation.
test("cookie notice stays dismissed when navigating between pages", async ({
  page,
}) => {
  await page.getByTestId("cookie-notice-dismiss").click();
  await page.goto("/about");

  await expect(page.getByTestId("cookie-notice")).not.toBeVisible();
});

// Scenario 7: privacy page has correct title.
test("privacy page has the correct document title", async ({ page }) => {
  await page.goto("/privacy");

  await expect(page).toHaveTitle(/Privacy Policy/i);
});

// Scenario 8: iubenda domains absent from CSP. [@error]
test("response headers do not contain iubenda domains in CSP", async ({
  page,
}) => {
  const response = await page.goto("/");
  const csp = response?.headers()["content-security-policy"] ?? "";

  expect(csp).not.toContain("iubenda.com");
});
