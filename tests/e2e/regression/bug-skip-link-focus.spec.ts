/**
 * Regression: skip link moves keyboard focus to <main>, not just scrolls.
 *
 * Bug: #main targeted a <div> wrapper in app.vue with no tabindex.
 * Browsers scroll to a <div> but do not move keyboard focus — so keyboard
 * users activating the skip link were not actually placed in the main content.
 *
 * Fix: id="main" tabindex="-1" on the <main> element in each page.
 */

import { test, expect } from "@playwright/test";

for (const path of ["/", "/about", "/services", "/contact", "/privacy"]) {
  test(`skip link moves focus to <main> on ${path}`, async ({ page }) => {
    await page.goto(path);

    // Activate the skip link via keyboard (Tab then Enter)
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    // Focus must be on the <main> element itself, not just scrolled there
    const focusedTag = await page.evaluate(
      () => document.activeElement?.tagName.toLowerCase(),
    );
    expect(focusedTag).toBe("main");
  });
}
