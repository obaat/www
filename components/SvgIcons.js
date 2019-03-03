import rawicons from "../svg"
import styled from "@emotion/styled"
import mapValues from "lodash/mapValues"
import { withProps, compose } from "recompose"
import keyBy from "lodash/keyBy"
import camelCase from "lodash/camelCase"
import upperFirst from "lodash/upperFirst"
import { withPalette } from "../ui/component-configuration"

const icons = keyBy(rawicons, v => {
  const [file] = v.filename.split(".")
  return upperFirst(camelCase(file))
})

module.exports = mapValues(icons, ({ exported: Icon }) =>
  compose(
    withProps(
      ({
        width,
        height,
        size = 24,
        viewBox = "0 0 24 24",
        color = "#fff",
      }) => ({
        viewBox,
        fill: color,
        width: width || size,
        height: height || size,
      }),
    ),
  )(
    styled(Icon, {
      rootEl: "svg",
      shouldForwardProp: prop => prop !== "invert",
    })(
      {
        display: "block",
      },
      withPalette(props => ({
        fill: props.foreground,
      })),
    ),
  ),
)
