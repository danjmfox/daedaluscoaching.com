/**
 * SwoopyEmbed component — acceptance tests
 *
 * SwoopyEmbed renders an <iframe> pointing to the Swoopy diagram tool.
 * The iframe src is same-origin via Netlify proxy (`/swoopy/`).
 * A `modelId` prop adds `?m=<modelId>` to the src for pre-built model deep-links.
 *
 * Tests drive the component via the dedicated /systems page, which embeds
 * SwoopyEmbed without a modelId (free-play for workshop participants).
 * Scenario 2 (specific modelId) is skipped until a page with a named model exists.
 */

import { test, expect } from "@playwright/test";

// Scenario 1: the /systems page renders a Swoopy iframe.
test("visitor on a page with a Swoopy embed sees a diagram iframe", async ({
  page,
}) => {
  await page.goto("/systems");

  const iframe = page.locator("iframe[src*='/swoopy/']");
  await expect(iframe).toBeVisible();
});

// Scenario 2: iframe src points to a specific model when modelId is provided.
// Skipped until a content page embeds <SwoopyEmbed modelId="..." />.
test.skip("the embedded diagram links to the specified model", async ({
  page,
}) => {
  // Update this path to a page that renders <SwoopyEmbed modelId="leadership-loop" />.
  await page.goto("/systems");

  const iframe = page.locator("iframe");
  await expect(iframe).toHaveAttribute("src", /\/swoopy\/\?m=leadership-loop/);
});

// Scenario 3: iframe src is the bare Swoopy root when no modelId is provided.
test("the embedded diagram shows the full Swoopy tool when no model is specified", async ({
  page,
}) => {
  await page.goto("/systems");

  const iframe = page.locator("iframe[src*='/swoopy/']");
  const src = await iframe.getAttribute("src");
  expect(src).toBe("/swoopy/");
});

// Scenario 4: iframe has a meaningful title for screen readers.
test("the embedded diagram has an accessible title so screen reader users know what it shows", async ({
  page,
}) => {
  await page.goto("/systems");

  const iframe = page.locator("iframe[src*='/swoopy/']");
  const title = await iframe.getAttribute("title");
  expect(title).toBeTruthy();
  expect(title!.length).toBeGreaterThan(0);
});

// Scenario 5: iframe src is same-origin — never an external URL.
// Ensures the Netlify proxy is in use, not a hard-coded external domain.
test("the embedded diagram is served from the same site, not an external domain", async ({
  page,
}) => {
  await page.goto("/systems");

  const iframe = page.locator("iframe[src*='/swoopy/']");
  const src = await iframe.getAttribute("src");
  expect(src).not.toMatch(/^https?:\/\//);
});
