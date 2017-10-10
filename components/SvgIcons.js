import rawicons from "../svg"
import g from "glamorous"
import mapValues from "lodash/mapValues"
import withProps from "recompose/withProps"
import keyBy from "lodash/keyBy"
import camelCase from "lodash/camelCase"
import upperFirst from "lodash/upperFirst"
import { withPalette } from "../ui/component-configuration"

const icons = keyBy(rawicons, v => {
  const [file, ext] = v.filename.split(".")
  return upperFirst(camelCase(file))
})

module.exports = mapValues(icons, ({ exported: Icon }) =>
  g(Icon, {
    rootEl: "svg",
    filterProps: ["invert"],
  })(
    {
      display: "block",
    },
    withPalette(props => ({
      fill: props.foreground,
    })),
  ).withProps(
    ({ width, height, size = 24, viewBox = "0 0 24 24", color = "#fff" }) => ({
      viewBox,
      fill: color,
      width: width || size,
      height: height || size,
    }),
  ),
)
