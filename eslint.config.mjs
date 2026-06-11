import js from "@eslint/js";

export default [
  {
    ignores: ["./public/app.js","server.js","./tests/server.test.js"],
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
