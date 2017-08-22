import hoc from "./hoc"
import g from "glamorous"
import components from "./component-configuration"
import { Flex, Box } from "./Grid"
import { compose, defaultProps } from "recompose"
import { mapValues } from "lodash/fp"

const toComponent = (generatedComponents, config) => {
  const { name: displayName, overrideHocs, type, props, style } = config

  const C =
    generatedComponents[type] || typeof type !== "string"
      ? g(generatedComponents[type] || type, { displayName })
      : g[type]

  if (!C) {
    throw new Error(`source component for ${displayName} not found`)
  }

  const Component = compose(defaultProps(props), hoc(overrideHocs))(C(style))

  return {
    ...generatedComponents,
    [displayName]: Component,
  }
}

const generated = components.reduce(toComponent, { Flex, Box })

module.exports = generated
