/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "core-is-pure",
      severity: "error",
      comment: "core/ must not import from composables/, pages/, vue, or nuxt",
      from: { path: "^core/" },
      to: {
        path: "^(composables|pages)/",
        pathNot: "",
      },
    },
    {
      name: "core-no-vue-nuxt",
      severity: "error",
      comment: "core/ must not import vue or nuxt packages",
      from: { path: "^core/" },
      to: {
        dependencyTypes: ["npm"],
        path: "^(vue|nuxt|@nuxt|@vue)",
      },
    },
  ],
  options: {
    doNotFollow: {
      path: "node_modules",
    },
    moduleSystems: ["es6", "cjs"],
    tsConfig: {
      fileName: "tsconfig.json",
    },
  },
};
