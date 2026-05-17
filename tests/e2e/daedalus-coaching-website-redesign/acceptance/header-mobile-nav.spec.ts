import { test, expect } from "@playwright/test";

// All tests resize the viewport to simulate mobile. Playwright's default
// project config uses Desktop Chrome — we override per-test with setViewportSize.

test("nav stacks to two rows at 390px viewport width", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const headerInner = page.locator(".header-inner");
  const flexDirection = await headerInner.evaluate(
    (el) => getComputedStyle(el).flexDirection,
  );

  expect(flexDirection).toBe("column");
});

test("no horizontal overflow at 360px viewport width", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto("/");

  const scrollWidth = await page.evaluate(
    () => document.documentElement.scrollWidth,
  );
  expect(scrollWidth).toBeLessThanOrEqual(360);
});

test("all four nav links are visible at 360px without zooming", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto("/");

  for (const label of ["About", "Services", "Systems", "Contact"]) {
    await expect(page.getByRole("link", { name: label })).toBeVisible();
  }
});

test("nav link tap targets are at least 44px tall at 390px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const navLinks = page.locator(".nav-link");
  const count = await navLinks.count();

  for (let i = 0; i < count; i++) {
    const box = await navLinks.nth(i).boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
});

test("desktop layout is unchanged at 1024px viewport width", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/");

  const headerInner = page.locator(".header-inner");
  const flexDirection = await headerInner.evaluate(
    (el) => getComputedStyle(el).flexDirection,
  );

  expect(flexDirection).toBe("row");
});

test("logo wordmark remains visible at 360px", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto("/");

  await expect(page.locator(".logo-wordmark")).toBeVisible();
});
