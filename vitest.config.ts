import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Exclude Playwright e2e tests — those run via pnpm playwright test
    exclude: ["tests/e2e/**", "node_modules/**", ".trunk/**"],
    passWithNoTests: true, // no unit tests yet — remove once first unit test is written
  },
});
