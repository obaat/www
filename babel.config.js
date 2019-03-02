const env = require("./config")

module.exports = {
  presets: ["@babel/env", "@babel/preset-flow", "react-static/babel-preset.js"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    ["transform-define", env],
    // "macros",
    // "emotion",
    [
      "inline-react-svg",
      {
        svgo: {
          plugins: [
            {
              removeAttrs: {
                attrs: "(data-name)",
              },
            },
            {
              cleanupIDs: true,
            },
          ],
        },
      },
    ],
  ],
}
