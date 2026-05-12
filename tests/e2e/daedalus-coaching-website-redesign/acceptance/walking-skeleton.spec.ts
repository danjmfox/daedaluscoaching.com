import { test, expect } from "@playwright/test";

test("visiting the homepage renders content from the markdown file", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Daedalus Coaching" }),
  ).toBeVisible();
  await expect(page.getByText("Leadership is complex.")).toBeVisible();
  await expect(
    page.getByText("I work with leaders who want to think more clearly"),
  ).toBeVisible();
});
