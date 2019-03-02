import { space, width, style } from "styled-system"
import hoc from "./hoc"
import styled from "@emotion/styled"

export const flex = style({
  prop: "flex",
})
export const align = style({
  cssProperty: "textAlign",
  prop: "align",
})
export const alignSelf = style({
  prop: "alignSelf",
})

export const grow = style({
  cssProperty: "flexGrow",
  prop: "grow",
})

export const order = style({
  prop: "order",
})

export default hoc()(
  styled.div({ boxSizing: "border-box" }, align, alignSelf, grow, flex, order),
)
