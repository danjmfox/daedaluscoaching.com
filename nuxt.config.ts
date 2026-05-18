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
      // Override with NUXT_PUBLIC_COMPANY_NUMBER at build time
      companyNumber: "10892829",
      // Override with NUXT_PUBLIC_COMPANY_URL at build time
      companyUrl:
        "https://find-and-update.company-information.service.gov.uk/company/10892829",
      // Override with NUXT_PUBLIC_COACH_NAME at build time
      coachName: "Dan Fox",
      // Override with NUXT_PUBLIC_COACH_ROLE at build time
      coachRole: "Executive and Agile Coach",
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      titleTemplate: "%s | Daedalus Coaching",
      meta: [
        { property: "og:site_name", content: "Daedalus Coaching" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/images/og-card.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: "/images/og-card.png" },
      ],
      // Preload critical font files to reduce FOUT window.
      // Font filenames are stable (no hash) — see vite.build config below.
      link: [
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/_nuxt/fraunces-latin-wght-normal.woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/_nuxt/plus-jakarta-sans-latin-wght-normal.woff2",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          // Stable (non-hashed) filenames for WOFF2 fonts so preload hrefs don't
          // break on rebuild. Trade-off: bump @fontsource versions to bust cache.
          assetFileNames: (assetInfo) => {
            const name = assetInfo.names?.[0] ?? assetInfo.name ?? "";
            if (/\.woff2?$/.test(name)) {
              return "_nuxt/[name][extname]";
            }
            return "_nuxt/[name].[hash][extname]";
          },
        },
      },
    },
  },
});
