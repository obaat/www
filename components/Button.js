import React from "react"
import g from "glamorous"
import Icon from "./Icon"
import { Flex, Box, Button, Relative, Absolute } from "../ui"
import memoize from "lodash/memoize"

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
      <Flex style={{ display: "inline-flex" }} align="center" justify="center">
        {icon && (
          <Box pt="2px" order={iconPosition === "right" ? 1 : 0}>
            <Icon
              pr={iconPosition === "left" ? 1 : 0}
              pl={iconPosition === "right" ? 1 : 0}
              f={iconSize}
              name={icon}
            />
          </Box>
        )}
        <Box pt="3px">{children}</Box>
      </Flex>
    </Component>
  )
}
