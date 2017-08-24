import { space, width, removeProps, responsiveStyle } from "styled-system"
import hoc from "./hoc"
import g from "glamorous"

export const flex = responsiveStyle("flex")
export const order = responsiveStyle("order")

export default hoc()(g.div({ boxSizing: "border-box" }, flex, order))
