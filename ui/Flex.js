import { space, width, removeProps, responsiveStyle } from "styled-system"
import Box from "./Box"
import g from "glamorous"

const wrap = responsiveStyle("flexWrap", "wrap")
const direction = responsiveStyle("flexDirection", "direction")
const align = responsiveStyle("alignItems", "align")
const justify = responsiveStyle("justifyContent", "justify")
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
