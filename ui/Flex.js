import { space, width, responsiveStyle } from "styled-system"
import Box from "./Box"
import g from "glamorous"

export const wrap = responsiveStyle({
  cssProperty: "flexWrap",
  prop: "wrap",
})

export const direction = responsiveStyle({
  cssProperty: "flexDirection",
  prop: "direction",
})

export const align = responsiveStyle({
  cssProperty: "alignItems",
  prop: "align",
})

export const justify = responsiveStyle({
  cssProperty: "justifyContent",
  prop: "justify",
})

const column = props => (props.column ? { flexDirection: "column" } : null)

export default g(Box, { displayName: "Flex" })(
  ({ inline }) => ({
    display: inline ? "inline-flex" : "flex",
  }),
  wrap,
  column,
  direction,
  align,
  justify,
)
