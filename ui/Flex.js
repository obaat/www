import { style } from "styled-system"
import Box from "./Box"
import styled from "@emotion/styled"

export const wrap = style({
  cssProperty: "flexWrap",
  prop: "wrap",
})

export const direction = style({
  cssProperty: "flexDirection",
  prop: "direction",
})

export const align = style({
  cssProperty: "alignItems",
  prop: "align",
})

export const justify = style({
  cssProperty: "justifyContent",
  prop: "justify",
})

const column = props => (props.column ? { flexDirection: "column" } : null)

export default styled(Box, { displayName: "Flex" })(
  ({ inline }) => ({
    display: inline ? "inline-flex" : "flex",
  }),
  wrap,
  column,
  direction,
  align,
  justify,
)
