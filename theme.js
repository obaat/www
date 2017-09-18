import chroma from "chroma-js"
import { mapValues } from "lodash/fp"
import reduce from "lodash/reduce"
const black = "#0a0a0a"
const white = "white"

const convert = mapValues(hsl => chroma.hsl(hsl).css())
const transparent = "transparent"

const palette = convert({
  black: [1, 0, 0.24],
  blackBis: [0, 0, 0.07],
  blackTer: [0, 0, 0.14],
  greyDarker: [0, 0, 0.21],
  greyDark: [0, 0, 0.29],
  grey: [0, 0, 0.48],
  greyLight: [0, 0, 0.71],
  greyLighter: [0, 0, 0.86],
  whiteTer: [0, 0, 0.96],
  whiteBis: [0, 0, 0.98],
  white: [0, 0, 100],
  orange: [14, 1, 0.53],
  yellow: [48, 1, 0.67],
  green: [141, 0.71, 0.48],
  turquoise: [171, 100, 0.41],
  blue: [200, 1, 0.4],
  purple: [271, 1, 0.71],
  red: [348, 1, 0.61],
  brick: [10, 0.8, 0.44],
})

export const colors = {
  black: [palette.black, palette.white],
  blue: [palette.blue, palette.white],
  normal: [palette.greyDark, palette.white],

  primary: [palette.orange, palette.white],
  info: [palette.blue, palette.white],
  success: [palette.green, palette.white],
  warning: [palette.yellow, palette.white],
  danger: [palette.red, palette.white],
  greyLighter: [palette.greyLighter, palette.black],
  brick: [palette.brick, palette.white],
}

export const invert = reduce(
  colors,
  (a, v, k) => ({ [`${k}Invert`]: v.slice().reverse(), ...a }),
  {},
)
const theme = {
  colors: { ...colors, ...invert },
  font: "'Josefin Sans', sans-serif",
  radius: 0,
  fontSizes: ["1em", "1.2em", "1.3em", "1.4em", "1.50em", "1.70em", "3em"],
}

export default theme
