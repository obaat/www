import Typography from "typography"
import theme from "typography-theme-noriega"

const typography = new Typography({
  bodyFontFamily: ["interface", "sans-serif"],
  "h1,h2,h3,h4": {
    lineHeight: 1.2,
  },
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
