import React from "react"
import g from "glamorous"
import { Button } from "../ui"
import memoize from "lodash/memoize"

const Icon = g.i({
  paddingRight: "9px",
})

const createButton = memoize(source =>
  g(source, { displayName: "Button" })({
    cursor: "pointer",
  }),
)

export default ({ children, context = "normal", icon, as, ...passProps }) => {
  const Component = createButton(as || Button)
  return (
    <Component palette={context} {...passProps}>
      {icon && <Icon className={`fa fa-${icon}`} aria-hidden="true" />}
      {children}
    </Component>
  )
}
