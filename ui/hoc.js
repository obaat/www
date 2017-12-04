import {
  space,
  color as ssColor,
  width,
  fontSize,
  responsiveStyle,
} from "styled-system"
import get from "lodash/get"
import isNil from "lodash/isNil"
import g from "glamorous"

export const clickable = ({ onClick }) =>
  onClick ? { cursor: "pointer" } : undefined
export const hide = ({ hide }) => hide && { display: "none" }
export const bold = ({ bold }) =>
  bold && { fontWeight: bold > 0 ? bold : "bold" }

const def = ["red", "yellow"]

const palette = ({ palette, theme, invert }) => {
  if (!palette) return
  const [color, backgroundColor] = get(
    theme,
    ["colors", invert ? `${palette}Invert` : palette],
    def,
  )
  return {
    color,
    backgroundColor,
  }
}

const display = props => {
  return responsiveStyle("display")(props)
}

const namedColor = ({ theme, invert, ...props }) => {
  if (props.color) {
    const palette = get(theme, [
      "colors",
      invert ? `${props.color}Invert` : props.color,
    ])
    if (palette && palette.length) {
      return ssColor({ ...props, color: palette[0] })
    }
  }
  return ssColor(props)
}

export const defaultTraits = [
  fontSize,
  bold,
  palette,
  namedColor,
  space,
  width,
  clickable,
  display,
]

export default (hocs = defaultTraits) => Component => g(Component)(...hocs)
