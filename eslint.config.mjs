import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import i18nJson from "eslint-plugin-i18n-json";
import globals from "globals";

export default tseslint.config(
  {
    ignores: [
      "**/dist",
      "**/node_modules",
      "**/coverage",
      "**/.nx",
      "**/vite.config.ts.timestamp-*",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,

  {
    files: ["apps/stockwise-be/**/*.ts"],
    languageOptions: { globals: { ...globals.node, ...globals.jest } },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  {
    files: ["apps/stockwise-fe/**/*.{ts,tsx}"],
    languageOptions: { globals: { ...globals.browser } },
    plugins: { react, "react-hooks": reactHooks, "jsx-a11y": jsxA11y },
    settings: { react: { version: "detect" } },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      "react-hooks/exhaustive-deps": "off",
      "react/require-default-props": "off",
      "react/no-unused-prop-types": "off",
      "react/function-component-definition": [
        "warn",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "@typescript-eslint/no-empty-function": [
        "error",
        { allow: ["constructors"] },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["error", { caughtErrors: "none" }],
      "react-hooks/use-memo": "off",
    },
  },

  {
    files: ["apps/stockwise-fe/public/locales/**/*.json"],
    plugins: { "i18n-json": i18nJson },
    processor: i18nJson.processors[".json"],
    rules: {
      "i18n-json/valid-message-syntax": [2, { syntax: "icu" }],
      "i18n-json/valid-json": 2,
      "i18n-json/sorted-keys": [2, { order: "asc", indentSpaces: 2 }],
      "i18n-json/identical-keys": 0,
    },
  },

  // Config and tooling files are plain CJS/JS.
  {
    files: ["**/*.{js,cjs}"],
    languageOptions: { globals: { ...globals.node } },
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
);
