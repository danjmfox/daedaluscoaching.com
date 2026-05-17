/**
 * Contact page — acceptance tests
 *
 * The contact page exposes a single CTA: a contact form (name, email, message).
 * It must carry `data-netlify="true"` so Netlify Forms picks it up in the
 * generated HTML — CI gate 6 asserts this attribute independently, but the
 * acceptance test verifies it from the user-facing page.
 *
 * All tests are skipped except the first. Enable one, implement, commit, repeat.
 */

import { test, expect, type Page } from "@playwright/test";

// Waits for Vue hydration to complete before interacting with the form.
// Nuxt dev mode: SSR renders the form HTML, then Vue re-hydrates async.
// A fill landing before v-model attaches gets reset to "" when hydration runs.
// ContactForm.vue sets data-hydrated="true" in onMounted — that hook fires
// only after Vue has finished hydrating the component tree and v-model is live.
async function waitForForm(page: Page) {
  await page.locator('form[data-hydrated="true"]').waitFor();
}

// Scenario 1 (enabled): the contact form is reachable and all fields are present.
// Walking skeleton for the contact page.
test("visitor reaches the contact page and sees the enquiry form", async ({
  page,
}) => {
  await page.goto("/contact");

  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Message")).toBeVisible();
  await expect(
    page.getByRole("button", { name: /send|submit/i }),
  ).toBeVisible();
});

// Scenario 2: the form element carries the Netlify Forms marker attribute.
// Observable behaviour: the attribute must be present in the rendered HTML
// so Netlify detects the form at deploy time.
test("the contact form is marked for Netlify Forms processing", async ({
  page,
}) => {
  await page.goto("/contact");

  const form = page.locator("form");
  await expect(form).toHaveAttribute("data-netlify", "true");
});

// Scenario 3 (happy path): visitor fills in valid details and sees confirmation.
test("visitor submits a valid enquiry and receives a confirmation message", async ({
  page,
}) => {
  await page.goto("/contact");
  await waitForForm(page);

  await page.getByLabel("Name").fill("Alex Rivera");
  await page.getByLabel("Email").fill("alex@example.com");
  await page.getByLabel("Message").fill("I would like to discuss coaching.");
  await page.getByRole("button", { name: /send|submit/i }).click();

  await expect(
    page.getByText(/thank you|message sent|we.ll be in touch/i),
  ).toBeVisible();
});

// Scenario 4 (error path): visitor submits without filling any fields.
test("visitor submitting an empty form sees a required-field error", async ({
  page,
}) => {
  await page.goto("/contact");
  await waitForForm(page);

  await page.getByRole("button", { name: /send|submit/i }).click();

  // All three fields are required — at least one inline error must appear.
  await expect(
    page.getByText(/required|please enter|cannot be blank/i).first(),
  ).toBeVisible();
});

// Scenario 5 (error path): visitor enters a malformed email address.
test("visitor entering a malformed email address sees an email format error", async ({
  page,
}) => {
  await page.goto("/contact");
  await waitForForm(page);

  await page.getByLabel("Name").fill("Alex Rivera");
  await page.getByLabel("Email").fill("not-an-email");
  await page.getByLabel("Message").fill("Hello.");
  await page.getByRole("button", { name: /send|submit/i }).click();

  await expect(page.getByText(/valid email|email address/i)).toBeVisible();
});

// Scenario 6 (error path): visitor submits with name missing only.
test("visitor submitting without a name sees a name-required error", async ({
  page,
}) => {
  await page.goto("/contact");
  await waitForForm(page);

  await page.getByLabel("Email").fill("alex@example.com");
  await page.getByLabel("Message").fill("I would like to discuss coaching.");
  await page.getByRole("button", { name: /send|submit/i }).click();

  await expect(
    page.getByText(/name.*required|please enter.*name/i),
  ).toBeVisible();
});

// Scenario 7 (error path): visitor submits without a message.
test("visitor submitting without a message sees a message-required error", async ({
  page,
}) => {
  await page.goto("/contact");
  await waitForForm(page);

  await page.getByLabel("Name").fill("Alex Rivera");
  await page.getByLabel("Email").fill("alex@example.com");
  await page.getByRole("button", { name: /send|submit/i }).click();

  await expect(
    page.getByText(/message.*required|please enter.*message/i),
  ).toBeVisible();
});

// Scenario 8 (error path): field errors are announced accessibly.
// Screen reader users must receive inline error messages as role="alert" so
// assistive technology announces them without needing to re-read the form.
test("inline validation errors are communicated to visitors using assistive technology", async ({
  page,
}) => {
  await page.goto("/contact");
  await waitForForm(page);

  await page.getByRole("button", { name: /send|submit/i }).click();

  // role="alert" regions are announced immediately by screen readers.
  const alerts = page.getByRole("alert");
  await expect(alerts.first()).toBeVisible();
});

// Scenario 9 (edge): the send button is unavailable while the enquiry is being
// sent — prevents duplicate submissions during network latency.
test("the send button is unavailable while the enquiry is being sent", async ({
  page,
}) => {
  // Delay the Netlify Forms POST so the submitting state is observable.
  await page.route(
    (url) => url.pathname === "/contact",
    async (route) => {
      if (route.request().method() === "POST") {
        await new Promise((r) => setTimeout(r, 500));
        await route.fulfill({ status: 200, body: "" });
      } else {
        await route.continue();
      }
    },
  );

  await page.goto("/contact");
  await waitForForm(page);

  await page.getByLabel("Name").fill("Alex Rivera");
  await page.getByLabel("Email").fill("alex@example.com");
  await page.getByLabel("Message").fill("I would like to discuss coaching.");

  await page.getByRole("button", { name: /send|submit/i }).click();
  await expect(page.getByRole("button", { name: /sending/i })).toBeDisabled();
});

// Scenario 10 (regression): the JS-enhanced submission path must use Netlify
// Forms AJAX protocol — urlencoded POST with form-name — not a server route.
// /api/contact is a Nuxt server route that does not exist in the static build;
// calling it in production produces a 404.
test("JS-enhanced form submission uses Netlify Forms AJAX protocol, not /api/contact", async ({
  page,
}) => {
  let apiContactCalled = false;
  let netlifyFormsPost: { contentType: string; body: string } | null = null;

  await page.route(
    (url) => url.pathname === "/api/contact",
    async (route) => {
      apiContactCalled = true;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: '{"ok":true}',
      });
    },
  );

  await page.route(
    (url) => url.pathname === "/contact",
    async (route) => {
      if (route.request().method() === "POST") {
        netlifyFormsPost = {
          contentType: route.request().headers()["content-type"] ?? "",
          body: route.request().postData() ?? "",
        };
        await route.fulfill({ status: 200, body: "" });
      } else {
        await route.continue();
      }
    },
  );

  await page.goto("/contact");
  await waitForForm(page);

  await page.getByLabel("Name").fill("Alex Rivera");
  await page.getByLabel("Email").fill("alex@example.com");
  await page.getByLabel("Message").fill("I would like to discuss coaching.");
  await page.getByRole("button", { name: /send|submit/i }).click();

  await expect(
    page.getByText(/thank you|message sent|we.ll be in touch/i),
  ).toBeVisible();

  expect(apiContactCalled).toBe(false);
  expect(netlifyFormsPost).not.toBeNull();
  expect(netlifyFormsPost!.contentType).toContain(
    "application/x-www-form-urlencoded",
  );
  expect(netlifyFormsPost!.body).toContain("form-name=contact");
});
