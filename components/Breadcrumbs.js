import React from "react"
import g from "glamorous"
import Icon from "../components/Icon"
import { Flex, Box } from "../ui"

const Bread = g(Box)({})

const Crumb = g.span({
  whiteSpace: "nowrap",
  color: "#aaa",
  display: "inline-block",
})

const BreadCrumbs = ({ route }) => (
  <Bread mb={1}>
    {route.map(({ title, href }, i) => (
      <span key={i}>
        <Crumb pr={1}>{title} </Crumb>
        {(route.length === 1 || route.length - 1 > i) && (
            <Icon pl={1} f={0} color="#000" name="angle-double-right" />
          )}{" "}
        {route.length === 1 && <Crumb pr={1}>/</Crumb>}
      </span>
    ))}
  </Bread>
)

export default BreadCrumbs
