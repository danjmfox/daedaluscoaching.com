// @ts-check
import noUnsanitized from 'eslint-plugin-no-unsanitized'

// @nuxt/eslint integration (adds Nuxt-aware auto-import rules and Vue plugin)
// requires @nuxt/eslint registered in nuxt.config.ts — add in Sprint 1 with CSS work.
// For now: security plugin only, which is the critical gate.
export default [
  noUnsanitized.configs.recommended,
  {
    rules: {
      'no-unsanitized/method': 'error',
      'no-unsanitized/property': 'error',
    },
  },
]
