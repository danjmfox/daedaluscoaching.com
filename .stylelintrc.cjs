module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-recommended-vue"],
  plugins: ["stylelint-declaration-strict-value"],
  rules: {
    "import-notation": "string",
    "scale-unlimited/declaration-strict-value": [
      ["font-family", "font-size", "font-weight", "line-height"],
      {
        ignoreVariables: true,
        ignoreKeywords: {
          "font-weight": ["inherit", "normal", "bold"],
          "line-height": ["normal", "inherit"],
          "font-size": ["inherit"],
          "font-family": ["inherit"],
        },
      },
    ],
  },
  ignoreFiles: ["assets/tokens.css", "node_modules/**", ".output/**"],
};
