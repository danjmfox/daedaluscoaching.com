/**
 * launch-readiness — S-LR-003: OG social card image
 *
 * @real-io S-LR-003
 */

import { test, expect } from "@playwright/test";

// Scenario 1: og:image present on homepage — covered in walking-skeleton.spec.ts

// Scenario 2: og:image dimensions meta tags are present. [AC-LR-003-4]
test("homepage head contains og:image width and height meta tags", async ({
  page,
}) => {
  await page.goto("/");

  const width = page.locator('meta[property="og:image:width"]');
  const height = page.locator('meta[property="og:image:height"]');

  await expect(width).toHaveAttribute("content", "1200");
  await expect(height).toHaveAttribute("content", "630");
});

// Scenario 3: twitter:image meta tag is present. [AC-LR-003-5]
test("homepage head contains a twitter:image meta tag", async ({ page }) => {
  await page.goto("/");

  const twitterImage = page.locator('meta[name="twitter:image"]');
  await expect(twitterImage).toHaveCount(1);
  const content = await twitterImage.getAttribute("content");
  expect(content).toMatch(/og-card/);
});

// Scenario 4: og:image is present on all key pages, not just homepage. [AC-LR-003-1]
for (const path of ["/", "/about", "/services", "/contact"]) {
  test(`${path} has og:image meta tag`, async ({ page }) => {
    await page.goto(path);

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveCount(1);
  });
}

// Scenario 5: OG image asset loads successfully (200). [AC-LR-003-2]
test("og-card.png asset exists and loads with a 200 status", async ({
  page,
}) => {
  const response = await page.goto("/images/og-card.png");

  expect(response?.status()).toBe(200);
  expect(response?.headers()["content-type"]).toMatch(/image/);
});
