export default defineNuxtConfig({
  modules: ["@nuxt/content"],
  content: {},
  compatibilityDate: "2025-01-01",
  css: ["~/assets/main.css"],
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      titleTemplate: "%s | Daedalus Coaching",
      meta: [
        { property: "og:site_name", content: "Daedalus Coaching" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    },
  },
});
