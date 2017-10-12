import React from "react"
import g from "glamorous"
import { Home, ArrowRight } from "./SvgIcons"
import { Flex, Box, H6, Text, Link } from "../ui"

const LinkCrumb = ({ to, children, ...props }) =>
  to ? (
    <Box bold={200} {...props}>
      <Link to={to} palette="black">
        {children}
      </Link>
    </Box>
  ) : (
    <Box {...props}>{children}</Box>
  )

const BreadCrumbs = ({ route }) => (
  <Flex inline mb={2} align="center">
    <LinkCrumb to="/">
      <Home palette="black" size={13} />
    </LinkCrumb>
    {route.map(({ title, href }, i) => [
      <Box px={1} key="arrow">
        <ArrowRight size={8} palette="black" />
      </Box>,
      <LinkCrumb to={href} key="path">
        <Text mb={0}>{title}</Text>
      </LinkCrumb>,
    ])}
  </Flex>
)

export default BreadCrumbs
