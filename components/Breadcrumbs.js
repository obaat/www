import React from "react"
import g from "glamorous"
import Icon from "../components/Icon"
import Link from "next/link"
import { Home, ArrowRight } from "./SvgIcons"
import { Flex, Box, H6, Text } from "../ui"

const Bread = g(Flex)({})

const A = g.a({
  cursor: "pointer",
  borderBottom: "2px solid transparent",
  ":hover": {
    borderBottom: "2px solid #000",
  },
})

const NotA = g.span({
  borderBottom: "2px solid transparent",
})

const Crumb = g(Box)({
  fontStyle: "italic",
})

const LinkCrumb = ({ href, ...props }) =>
  href ? (
    <Link href={href}>
      <A onClick={href}>
        <Crumb {...props} />
      </A>
    </Link>
  ) : (
    <NotA>
      <Crumb {...props} />
    </NotA>
  )

const BreadCrumbs = ({ route }) => (
  <Bread mb={2} align="center">
    <LinkCrumb href="/" mb="-4px">
      <Home2 color="#000" size={13} />
    </LinkCrumb>
    {route.map(({ title, href }, i) => [
      <Crumb px={1} key="arrow">
        <ArrowRight size={10} color="#000" />
      </Crumb>,
      <LinkCrumb href={href} key="path">
        <Text mb={0}>{title}</Text>
      </LinkCrumb>,
    ])}
  </Bread>
)

export default BreadCrumbs
