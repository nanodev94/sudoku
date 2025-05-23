import { FlatCompat } from "@eslint/eslintrc"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "eslint-config-standard"
  ),
  // import sort
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "import/first": "error",
      "import/newline-after-import": ["error", { count: 1 }],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Packages `react` related packages come first.
            ["^react", "^next", "^@?\\w"],
            // Internal packages.
            ["^(@|components)(/.*|$)"],
            // Side effect imports.
            ["^\\u0000"],
            // Parent imports. Put `..` last.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last.
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports.
            ["^.+\\.?(css)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  // ESLint
  {
    name: "baseRules",
    rules: {
      "array-callback-return": ["error", { checkForEach: true }],
      "no-await-in-loop": "warn",
      "no-self-compare": "warn",
      "no-unmodified-loop-condition": "error",
      "no-use-before-define": "error",
      "default-case-last": "error",
      "default-param-last": "off",
      eqeqeq: ["error", "always"],
      "no-alert": "warn",
      "no-console": "warn",
      "no-else-return": "error",
      "no-lonely-if": "error",
      "no-multi-assign": "error",
      "no-param-reassign": "error",
      "no-unneeded-ternary": "warn",
      "no-useless-concat": "warn",
      "no-var": "error",
      "object-shorthand": "warn",
      "operator-assignment": "error",
      "prefer-const": "error",
      "prefer-template": "error",
      "require-await": "error",
      yoda: "error",
      "no-undef": "off",
    },
    // prettier
    eslintPluginPrettierRecommended,
  },
]

export default eslintConfig
