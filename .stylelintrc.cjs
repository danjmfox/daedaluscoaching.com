module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-recommended-vue"],
  plugins: ["stylelint-declaration-strict-value"],
  rules: {
    "import-notation": "string",
    // Allow BEM selector conventions (__element, --modifier)
    "selector-class-pattern": [
      "^[a-z][a-z0-9-]*(__[a-z0-9-]+)?(--[a-z0-9-]+)?$",
      { message: "Expected BEM-style class selector" },
    ],
    "scale-unlimited/declaration-strict-value": [
      [
        "font-family",
        "font-size",
        "font-weight",
        "line-height",
        "color",
        "background-color",
      ],
      {
        ignoreVariables: true,
        ignoreKeywords: {
          "font-weight": ["inherit", "normal", "bold"],
          "line-height": ["normal", "inherit"],
          "font-size": ["inherit"],
          "font-family": ["inherit"],
          color: ["inherit", "transparent", "currentColor"],
          "background-color": ["inherit", "transparent"],
        },
      },
    ],
  },
  ignoreFiles: ["assets/tokens.css", "node_modules/**", ".output/**"],
};
