import React from "react"
import g from "glamorous"
import { Home, ArrowRight } from "./SvgIcons"
import { Flex, Box, H6, Text, Link } from "../ui"

const Crumb = g(Box)({})

const LinkCrumb = ({ href, ...props }) =>
  href ? (
    <Link to={href} palette="black">
      <Box bold={200} {...props} />
    </Link>
  ) : (
    <Box {...props} />
  )

const BreadCrumbs = ({ route }) => (
  <Flex inline mb={2} align="center">
    <LinkCrumb href="/">
      <Home palette="black" size={13} />
    </LinkCrumb>
    {route.map(({ title, href }, i) => [
      <Box px={1} key="arrow">
        <ArrowRight size={8} palette="black" />
      </Box>,
      <LinkCrumb href={href} key="path">
        <Text mb={0}>{title}</Text>
      </LinkCrumb>,
    ])}
  </Flex>
)

export default BreadCrumbs
