/**
 * TrustSignals component — acceptance tests
 *
 * Trust signals appear on the homepage. Display is flag-driven in
 * core/trust-signals/config.ts. Credentials only show when enabled.
 *
 * Currently enabled: ICAgile Enterprise Coach (ICP-ENT)
 * Currently disabled (aspirational): B Corp, 1% for the Planet
 */

import { test, expect } from "@playwright/test";

// Scenario 1: trust signals section is present on the homepage.
test("visitor on the homepage sees the trust signals section", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("region", { name: "Certifications and credentials" }),
  ).toBeAttached();
});

// Scenario 2: ICAgile accreditation is visible.
test("visitor on the homepage sees the ICAgile accreditation", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByText("ICAgile Enterprise Coach (ICP-ENT)"),
  ).toBeVisible();
});

// Scenario 3 (guard): B-Corp certification is not shown when not yet earned.
test("B-Corp certification is not shown when not yet earned", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByText(/b.?corp/i)).not.toBeVisible();
});

// Scenario 4 (guard): 1% for the Planet is not shown when not yet earned.
test("1% for the Planet membership is not shown when not yet earned", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByText(/1%.*planet|one percent.*planet/i),
  ).not.toBeVisible();
});

// Scenario 5 (guard): credentials removed from config do not appear.
test("credentials not in the accreditations list do not appear on the homepage", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByText(/AWA Global|ORSC Foundation/i)).not.toBeVisible();
});

// Future: B-Corp certification is visible (unlock when earned — update config to true)
test.skip("visitor on the homepage sees the B-Corp certification", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByText(/b.?corp/i)).toBeVisible();
});

// Future: 1% for the Planet membership is visible (unlock when earned)
test.skip("visitor on the homepage sees the 1% for the Planet membership", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByText(/1%.*planet|one percent.*planet/i)).toBeVisible();
});
