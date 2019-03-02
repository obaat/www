import React from "react"
import styled from "@emotion/styled"
import { Flex, Box, Button, Relative, Absolute } from "../ui"
import * as SvgIcons from "./SvgIcons"
import memoize from "lodash/memoize"

const createButton = memoize(source =>
  styled(source, { displayName: "Button" })({
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
  let iconPart = null
  if (icon && SvgIcons[icon]) {
    const Component = SvgIcons[icon]
    iconPart = (
      <Component
        size={iconSize}
        palette={passProps.palette}
        invert={passProps.invert}
      />
    )
  }
  return (
    <Component palette={context} {...passProps}>
      <Flex align="center" justify="center">
        {icon && (
          <Box
            style={{ display: "inline-flex" }}
            order={iconPosition === "right" ? 1 : 0}
            pr={iconPosition === "left" ? 1 : 0}
            pl={iconPosition === "right" ? 1 : 0}
          >
            {iconPart}
          </Box>
        )}
        <Box>{children}</Box>
      </Flex>
    </Component>
  )
}
