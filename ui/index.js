import { defaultTraits } from "./hoc"
import g from "glamorous"
import components from "./component-configuration"
import { Flex, Box } from "./Grid"
import { compose, defaultProps } from "recompose"
import { mapValues } from "lodash/fp"
import { upperFirst, pick } from "lodash"

const findParentFor = siblings => node =>
  siblings.find(({ name }) => name === node.type)

const getMergedConfig = (node, siblings) => {
  if (!node.type) return node
  const mergeTarget = [node]
  const styles = [node.style]
  const findParent = findParentFor(siblings)
  let target = findParent(node)
  while (target) {
    mergeTarget.unshift(pick(target, ["props", "type"]))
    styles.unshift(target.style)
    target = target.type && findParent(target)
  }

  // always return the top level parents type
  return Object.assign({}, ...mergeTarget, {
    type: mergeTarget[0].type,
    style: styles,
  })
}

const toComponent = (generatedComponents, config, all) => {
  const {
    name: displayName,
    traits = defaultTraits,
    type,
    props,
    style,
  } = getMergedConfig(config, components)

  const C =
    typeof type === "string"
      ? g(g[upperFirst(props.is || type)], { displayName, rootEl: type })
      : g(type)

  if (!C) {
    throw new Error(`source component for ${displayName} not found`)
  }

  const G = C(...traits, ...style)

  const Component =
    props && Object.keys(props).length ? defaultProps(props)(G) : G

  return {
    ...generatedComponents,
    [displayName]: Component,
  }
}

const generated = components.reduce(toComponent, { Flex, Box })

module.exports = generated
