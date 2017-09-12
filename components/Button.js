import React from "react"
import g from "glamorous"
import { Button } from "../ui"
import memoize from "lodash/memoize"

const IconLeft = g.i({
  paddingRight: "9px",
})

const IconRight = g.i({
  paddingLeft: "9px",
})

const createButton = memoize(source =>
  g(source, { displayName: "Button" })({
    cursor: "pointer",
  }),
)

export default ({
  children,
  context = "normal",
  icon,
  iconPosition = "left",
  as,
  ...passProps
}) => {
  const Component = createButton(as || Button)
  return (
    <Component palette={context} {...passProps}>
      {iconPosition === "left" &&
      icon && <IconLeft className={`fa fa-${icon}`} aria-hidden="true" />}
      {children}
      {iconPosition === "right" &&
      icon && <IconRight className={`fa fa-${icon}`} aria-hidden="true" />}
    </Component>
  )
}
