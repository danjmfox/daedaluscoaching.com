export default defineNuxtConfig({
  modules: ["@nuxt/content"],
  content: {},
  compatibilityDate: "2025-01-01",
  css: ["~/assets/main.css"],
  runtimeConfig: {
    public: {
      // Override with NUXT_PUBLIC_LINKEDIN_PERSONAL at build time
      linkedinPersonal: "https://www.linkedin.com/in/danjmfox/",
      // Override with NUXT_PUBLIC_LINKEDIN_COMPANY at build time
      linkedinCompany: "https://www.linkedin.com/company/13049181/",
      // Override with NUXT_PUBLIC_LOCATION at build time
      location: "Hampshire, UK — remote available",
    },
  },
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
