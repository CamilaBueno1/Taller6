const expoConfig = require("eslint-config-expo/flat");
const boundaries = require("eslint-plugin-boundaries");

module.exports = [
  ...expoConfig,
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    plugins: { boundaries },
    settings: {
      "boundaries/root-path": "src",
      "boundaries/elements": [
        { type: "app", pattern: "app" },
        { type: "pages", pattern: "pages/*", capture: ["slice"] },
        { type: "widgets", pattern: "widgets/*", capture: ["slice"] },
        { type: "features", pattern: "features/*", capture: ["slice"] },
        { type: "entities", pattern: "entities/*", capture: ["slice"] },
        { type: "shared", pattern: "shared" },
      ],
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      },
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            {
              from: { element: { type: "app" } },
              allow: {
                to: { element: { types: ["pages", "widgets", "features", "entities", "shared"] } },
              },
            },
            {
              from: { element: { type: "pages" } },
              allow: {
                to: { element: { types: ["widgets", "features", "entities", "shared"] } },
              },
            },
            {
              from: { element: { type: "widgets" } },
              allow: {
                to: { element: { types: ["features", "entities", "shared"] } },
              },
            },
            {
              from: { element: { type: "features" } },
              allow: { to: { element: { types: ["entities", "shared"] } } },
            },
            {
              from: { element: { type: "entities" } },
              allow: { to: { element: { type: "shared" } } },
            },
          ],
        },
      ],
      "boundaries/no-unknown-files": "error",
      "boundaries/no-unknown-dependencies": "error",
    },
  },
];
