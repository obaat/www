import { space, width, removeProps, responsiveStyle } from "styled-system"
import hoc from "./hoc"
import g from "glamorous"

export const flex = responsiveStyle("flex")
export const align = responsiveStyle("textAlign", "align")
export const alignSelf = responsiveStyle("alignSelf")
export const grow = responsiveStyle("flexGrow", "grow")
export const order = responsiveStyle("order")

export default hoc()(
  g.div({ boxSizing: "border-box" }, align, alignSelf, grow, flex, order),
)
