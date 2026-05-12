// @ts-check
import noUnsanitized from "eslint-plugin-no-unsanitized";

// Restricted to .vue files: no-unsanitized guards against v-html XSS in templates.
// TypeScript files require @typescript-eslint/parser — added in Sprint 1 with
// @nuxt/eslint module registration in nuxt.config.ts.
export default [
  {
    ...noUnsanitized.configs.recommended,
    files: ["**/*.vue"],
  },
  {
    files: ["**/*.vue"],
    rules: {
      "no-unsanitized/method": "error",
      "no-unsanitized/property": "error",
    },
  },
];
