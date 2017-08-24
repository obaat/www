import chroma from "chroma-js"
import { mapValues } from "lodash/fp"
import reduce from "lodash/reduce"
const black = "#0a0a0a"
const white = "white"

const convert = mapValues(hsl => chroma.hsl(hsl).css())
const transparent = "transparent"

const palette = convert({
  black: [1, 0, 0.04],
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
  orange: [14, 100, 0.53],
  yellow: [48, 100, 0.67],
  green: [141, 71, 0.48],
  turquoise: [171, 100, 0.41],
  blue: [217, 71, 0.53],
  purple: [271, 100, 0.71],
  red: [348, 100, 0.61],
  brick: [10, 0.8, 0.44],
})

const colors = {
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

const invert = reduce(
  colors,
  (a, v, k) => ({ [`${k}Invert`]: v.slice().reverse(), ...a }),
  {},
)
const theme = {
  colors: { ...colors, ...invert },
  radius: 0,
}

export default theme
