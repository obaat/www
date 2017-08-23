import { space, width, removeProps, responsiveStyle } from "styled-system"
import Box from "./Box"
import g from "glamorous"

const wrap = responsiveStyle("flex-wrap", "wrap", "wrap")
const direction = responsiveStyle("flex-direction", "direction")
const align = responsiveStyle("align-items", "align")
const justify = responsiveStyle("justify-content", "justify")
const column = props => (props.column ? { flexDirection: "column" } : null)

export default g(Box, { displayName: "Flex" })(
  { display: "flex" },
  wrap,
  column,
  direction,
  align,
  justify,
)
