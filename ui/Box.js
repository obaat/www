import { responsiveStyle } from "styled-system"
import hoc from "./hoc"
import styled from "@emotion/styled"

export const flex = responsiveStyle({
  prop: "flex",
})
export const align = responsiveStyle({
  cssProperty: "textAlign",
  prop: "align",
})
export const alignSelf = responsiveStyle({
  prop: "alignSelf",
})

export const grow = responsiveStyle({
  cssProperty: "flexGrow",
  prop: "grow",
})

export const order = responsiveStyle({
  prop: "order",
})

export default hoc()(
  styled.div({ boxSizing: "border-box" }, align, alignSelf, grow, flex, order),
)
