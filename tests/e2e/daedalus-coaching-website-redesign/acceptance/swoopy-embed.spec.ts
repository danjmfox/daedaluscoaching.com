/**
 * SwoopyEmbed component — acceptance tests
 *
 * SwoopyEmbed renders an <iframe> pointing to the Swoopy diagram tool.
 * The iframe src is same-origin via Netlify proxy (`/swoopy/`).
 * A `modelId` prop adds `?m=<modelId>` to the src for pre-built model deep-links.
 *
 * These tests drive the component through the page that embeds it — not the
 * component directly. The simplest host is a test fixture page; during DELIVER,
 * the implementer will embed SwoopyEmbed in a markdown page or a real page route.
 *
 * Current approach: test via the homepage if SwoopyEmbed is used there, or via
 * a dedicated `/swoopy-test` page scaffold. The tests below assume there will be
 * a page at `/` or another route that renders the component with known props.
 * Adjust the `goto` path once the component is placed in a real page.
 *
 * All tests are skipped except the first. Enable one, implement, commit, repeat.
 */

import { test, expect } from "@playwright/test";

// Scenario 1 (enabled): an embedded diagram iframe is present on the page
// that uses SwoopyEmbed with a modelId.
// The DELIVER implementer must pick a route that hosts SwoopyEmbed — update
// the goto path and model ID to match.
test("visitor on a page with a Swoopy embed sees a diagram iframe", async ({
  page,
}) => {
  // Update this path once SwoopyEmbed is placed in a real content page.
  await page.goto("/");

  const iframe = page.locator("iframe[src*='/swoopy/']");
  await expect(iframe).toBeVisible();
});

// Scenario 2: iframe src points to a specific model when modelId is provided.
test.skip(
  "the embedded diagram links to the specified model",
  async ({ page }) => {
    // Update this path to a page that renders <SwoopyEmbed modelId="leadership-loop" />.
    await page.goto("/");

    const iframe = page.locator("iframe");
    await expect(iframe).toHaveAttribute("src", /\/swoopy\/\?m=leadership-loop/);
  },
);

// Scenario 3: iframe src is the bare Swoopy root when no modelId is provided.
test.skip(
  "the embedded diagram shows the full Swoopy tool when no model is specified",
  async ({ page }) => {
    // Update this path to a page that renders <SwoopyEmbed /> with no modelId.
    await page.goto("/");

    const iframe = page.locator("iframe");
    const src = await iframe.getAttribute("src");
    // No query string — just the root path.
    expect(src).toBe("/swoopy/");
  },
);

// Scenario 4 (error path / edge): iframe has a meaningful title for screen
// readers — accessibility requirement, not just a technical detail.
test.skip(
  "the embedded diagram has an accessible title so screen reader users know what it shows",
  async ({ page }) => {
    await page.goto("/");

    const iframe = page.locator("iframe[src*='/swoopy/']");
    // Accessible title must describe the content, not be blank.
    const title = await iframe.getAttribute("title");
    expect(title).toBeTruthy();
    expect(title?.length).toBeGreaterThan(0);
  },
);

// Scenario 5 (error path): iframe src never points outside the site origin.
// Ensures the Netlify proxy is in use, not a hard-coded external URL.
test.skip(
  "the embedded diagram is served from the same site, not an external domain",
  async ({ page }) => {
    await page.goto("/");

    const iframe = page.locator("iframe[src*='/swoopy/']");
    const src = await iframe.getAttribute("src");

    // Must be a relative path or same-origin absolute — never an external host.
    expect(src).not.toMatch(/^https?:\/\//);
  },
);
