import { defaultTraits } from "./hoc"
import g from "glamorous"
import components from "./component-configuration"
import { Flex, Box } from "./Grid"
import { compose, defaultProps } from "recompose"
import omit from "lodash/omit"

const findParentFor = siblings => node =>
  siblings.find(({ name }) => name === node.type)
const findParent = findParentFor(components)

const getMergedConfig = (node, siblings) => {
  if (!node.type) return { ...node, styles: [node.style] }
  const styles = [node.style]
  let mergedProps = node.props
  let type = node.type
  let target = findParent(node)
  while (target) {
    styles.unshift(target.style)
    mergedProps = { ...mergedProps, ...target.props }
    type = target.type
    target = target.type && findParent(target)
  }

  // always return the top level parents type
  return {
    ...node,
    props: mergedProps,
    type,
    styles,
  }
}

const toComponent = (generatedComponents, config, all) => {
  const {
    name: displayName,
    traits = defaultTraits,
    type,
    props,
    styles,
  } = getMergedConfig(config)

  const C = typeof type === "string" ? g[props.is || type] : g(type)

  if (!C) {
    throw new Error(`source component for ${displayName} not found`)
  }

  const G = C(...traits, ...styles)
  const Component =
    props && Object.keys(props).length ? defaultProps(omit(props, "is"))(G) : G

  return {
    ...generatedComponents,
    [displayName]: Component,
  }
}

const generated = components.reduce(toComponent, { Flex, Box })

module.exports = generated
