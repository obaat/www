import React from "react"
import g from "glamorous"
import hoc from "../ui/hoc"

const fa = {
  display: "inline-block",
  font: "normal normal normal 14px/1 FontAwesome",
  textRendering: "auto",
  WebkitFontSmoothing: "antialiased",
}

const Icon = hoc()(
  g.i(fa).withProps(props => ({
    className: `fa-${props.name}`,
    "aria-hidden": "true",
  })),
)

export default g(Icon)(fa)
