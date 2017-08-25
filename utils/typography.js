import Typography from "typography"

const typography = new Typography({
  bodyFontFamily: ["interface", "sans-serif"],
  "h1,h2,h3,h4,h5,h6": {
    lineHeight: 1.2,
  },
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
