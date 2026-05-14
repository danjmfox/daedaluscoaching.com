/**
 * Navigation — acceptance tests
 *
 * Every page in the site navigation must be reachable. The site has a single
 * navigation bar with links to About, Services, Systems, and Contact. The logo
 * links back to the homepage.
 *
 * These tests drive the site as a visitor would — through the browser navigation,
 * not by constructing URLs directly.
 *
 * All tests are skipped except the first. Enable one, implement, commit, repeat.
 */

import { test, expect } from "@playwright/test";

// Scenario 1 (enabled): all navigation links are present on the homepage.
// Walking skeleton — proves the nav is wired into the layout.
test("visitor on the homepage sees navigation links for all main sections", async ({
  page,
}) => {
  await page.goto("/");

  const nav = page.getByRole("navigation", { name: /main navigation/i });
  await expect(nav).toBeVisible();
  await expect(nav.getByRole("link", { name: "About" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Services" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Systems" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Contact" })).toBeVisible();
});

// Scenario 2: visitor can navigate to the about page from the homepage.
test.skip("visitor selects About and reaches the about page", async ({
  page,
}) => {
  await page.goto("/");

  await page
    .getByRole("navigation", { name: /main navigation/i })
    .getByRole("link", { name: "About" })
    .click();

  await expect(page).toHaveURL(/\/about/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

// Scenario 3: visitor can navigate to the services page.
test.skip("visitor selects Services and reaches the services page", async ({
  page,
}) => {
  await page.goto("/");

  await page
    .getByRole("navigation", { name: /main navigation/i })
    .getByRole("link", { name: "Services" })
    .click();

  await expect(page).toHaveURL(/\/services/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

// Scenario 4: visitor can navigate to the systems page.
test.skip("visitor selects Systems and reaches the systems page", async ({
  page,
}) => {
  await page.goto("/");

  await page
    .getByRole("navigation", { name: /main navigation/i })
    .getByRole("link", { name: "Systems" })
    .click();

  await expect(page).toHaveURL(/\/systems/);
  // Systems page hosts the Swoopy embed.
  await expect(page.locator("iframe[src*='/swoopy/']")).toBeVisible();
});

// Scenario 5: visitor can navigate to the contact page.
test.skip("visitor selects Contact and reaches the contact page", async ({
  page,
}) => {
  await page.goto("/");

  await page
    .getByRole("navigation", { name: /main navigation/i })
    .getByRole("link", { name: "Contact" })
    .click();

  await expect(page).toHaveURL(/\/contact/);
  await expect(page.getByLabel("Name")).toBeVisible();
});

// Scenario 6: logo returns visitor to the homepage from any page.
test.skip("visitor on the about page selects the logo and returns to the homepage", async ({
  page,
}) => {
  await page.goto("/about");

  await page.getByRole("link", { name: /daedalus coaching.*home/i }).click();

  await expect(page).toHaveURL("/");
  await expect(
    page.getByRole("heading", { name: /daedalus coaching/i }),
  ).toBeVisible();
});

// Scenario 7 (error path): navigating to an unknown path shows a not-found
// response, not a server error.
test.skip("visitor navigating to a page that does not exist sees a not-found response, not a server error", async ({
  page,
}) => {
  const response = await page.goto("/does-not-exist-xyz");

  // Nuxt SSG + Netlify returns 404 for unmatched paths.
  // The visitor must not see a 500 error — the site should not crash.
  expect(response?.status()).not.toBe(500);
  // A 404 with a friendly page is the correct observable outcome.
  expect(response?.status()).toBe(404);
});

// Scenario 8: homepage CTA link navigates to the contact form.
test.skip("visitor selects the homepage CTA and reaches the contact form", async ({
  page,
}) => {
  await page.goto("/");

  // The homepage has a single CTA: "Get in touch →"
  await page.getByRole("link", { name: /get in touch/i }).click();

  await expect(page).toHaveURL(/\/contact/);
  await expect(page.getByLabel("Name")).toBeVisible();
});
