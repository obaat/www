import React from "react"
import g from "glamorous"
import Icon from "./Icon"
import { Button } from "../ui"
import memoize from "lodash/memoize"

const IconLeft = g(Icon)({
  paddingRight: "9px",
})

const IconRight = g(Icon)({
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
  iconSize = 1,
  as,
  ...passProps
}) => {
  const Component = createButton(as || Button)
  return (
    <Component palette={context} {...passProps}>
      {iconPosition === "left" &&
      icon && (
        <IconLeft f={iconSize} className={`fa fa-${icon}`} aria-hidden="true" />
      )}
      {children}
      {iconPosition === "right" &&
      icon && (
        <IconRight
          f={iconSize}
          className={`fa fa-${icon}`}
          aria-hidden="true"
        />
      )}
    </Component>
  )
}
