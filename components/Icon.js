import React from "react"
import g from "glamorous"

const fa = {
  display: "inline-block",
  font: "normal normal normal 14px/1 FontAwesome",
  fontSize: "inherit",
  textRendering: "auto",
  WebkitFontSmoothing: "antialiased",
}

const Icon = g.i(fa).withProps(props => ({
  className: `fa-${props.name}`,
  "aria-hidden": "true",
}))

export default g(Icon)(fa)
