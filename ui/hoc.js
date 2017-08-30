import { space, color, width, fontSize } from "styled-system"
import get from "lodash/get"
import g from "glamorous"

export const clickable = ({ onClick }) => onClick && { cursor: "pointer" }
export const hide = ({ hide }) => hide && { display: "none" }
export const bold = ({ bold }) =>
  bold && { fontWeight: bold > 0 ? bold : "bold" }

const def = ["purple", "orange"]

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

export const defaultTraits = [
  fontSize,
  bold,
  color,
  palette,
  space,
  width,
  clickable,
]

export default (hocs = defaultTraits) => Component => g(Component)(...hocs)
