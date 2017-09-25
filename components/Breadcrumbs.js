import React from "react"
import g from "glamorous"
import Icon from "../components/Icon"
import { Home2, ArrowRight } from "./SvgIcons"
import { Flex, Box, H6 } from "../ui"

const Bread = g(Flex)({})

const Crumb = g(Box)({
  whiteSpace: "nowrap",
  display: "inline-block",
})

const BreadCrumbs = ({ route }) => (
  <Bread mb={1} align="center">
    <Crumb pr={1}>
      <Home2 color="#000" size={15} />
    </Crumb>
    {route.map(({ title, href }, i) => (
      <span key={i}>
        <Crumb pr={1}>
          <ArrowRight size={12} color="#000" />
        </Crumb>
        <Crumb pr={1}>
          <H6 bold={i === route.length - 1 ? 700 : 300} mb={0}>
            {title}
          </H6>
        </Crumb>
      </span>
    ))}
  </Bread>
)

export default BreadCrumbs
