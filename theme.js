import palx from "palx"
import reduce from "lodash/reduce"
import hex2rgb from "hex2rgb"

const base = "#cf3415"
const black = "#0a0a0a"
const white = "white"

const palette = palx(base)
// const colors = mapValues(palette, p => [p[0], hello(p[0])])

const contrast = s => (hex2rgb(s).yiq === "black" ? black : white)

const colors = reduce(
  palette,
  (a, v, k) => {
    if (Array.isArray(v)) {
      const shades = v.reduce(
        (b, c, i) => ({ ...b, [k + (i > 0 ? i : "")]: [c, contrast(c)] }),
        {},
      )
      return { ...a, ...shades }
    } else {
      return { ...a, [k]: [v, contrast(v)] }
    }
  },
  {},
)

colors.primary = colors.base
colors.brick = colors.red8
colors.secondary = colors.green8
colors.tertiary = colors.blue8
colors.black = [black, white]

export const invert = reduce(
  colors,
  (a, v, k) => ({ [`${k}Invert`]: v.slice().reverse(), ...a }),
  {},
)

const theme = {
  colors: { ...colors, ...invert },
  font: {
    heading: "'Hind Vadodara', serif",
    body:
      "'Open Sans','San Francisco', 'Helvetica Neue', 'Lucida Grande', 'Segoe UI',Verdana,Arial,Helvetica,sans-serif",
  },

  radius: 2,
  breakpoints: ["575px", "768px", "992px", "1200px"],
  fontSizes: ["0.88em", "1em", "1.3em", "1.5em", "1.60em", "2em", "3em"],
}

export default theme
