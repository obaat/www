import React from "react"
import g from "glamorous"
import cx from "classnames"
import { Button, ButtonCircle, ButtonOutline } from "../ui"
import memoize from "lodash/memoize"
import Link from "next/link"
import { nest } from "recompose"

const Icon = g.i({
  paddingRight: "9px",
})

const createButton = memoize(source =>
  g(source)({
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
