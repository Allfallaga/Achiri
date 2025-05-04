import eslintPluginImport from "eslint-plugin-import";
import babelParser from "@babel/eslint-parser";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    files: ["**/*.js", "**/*.jsx"],
    ignores: ["**/README.md"],
    plugins: {
      import: eslintPluginImport,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
    },
    // ---> AJOUTE CETTE SECTION <---
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx"] // Ajoute d'autres extensions si nécessaire (.css, .scss, etc.)
        }
      }
    },
    // ---> FIN DE LA SECTION A AJOUTER <---
    rules: {
      "import/no-unresolved": "error",
      "import/order": [
        "warn",
        {
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always" // Changed from "never" to "always" based on previous warnings
        }
      ],
      "import/newline-after-import": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    },
  },
];