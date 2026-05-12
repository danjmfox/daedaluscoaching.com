// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import noUnsanitized from 'eslint-plugin-no-unsanitized'

export default withNuxt(
  // Catch v-html with unescaped variables — XSS vector in Vue templates.
  // @nuxt/content renders markdown to HTML; misuse of v-html elsewhere is the risk.
  noUnsanitized.configs.recommended,
  {
    rules: {
      // Enforce v-html is never used with a non-literal (catch dynamic HTML injection)
      'no-unsanitized/method': 'error',
      'no-unsanitized/property': 'error',
    },
  }
)
