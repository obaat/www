import React from "react"
import g from "glamorous"
import Icon from "../components/Icon"
import Link from "next/link"
import { Home2, ArrowRight } from "./SvgIcons"
import { Flex, Box, H6 } from "../ui"

const Bread = g(Flex)({})

const A = g.a({
  cursor: "pointer",
  borderBottom: "2px solid transparent",
  ":hover": {
    borderBottom: "2px solid #000",
  },
})

const Crumb = g(Box)({})

const LinkCrumb = ({ href, ...props }) =>
  href ? (
    <Link href={href}>
      <A onClick={href}>
        <Crumb {...props} />
      </A>
    </Link>
  ) : (
    <Crumb {...props} />
  )

const BreadCrumbs = ({ route }) => (
  <Bread mb={1} align="center">
    <LinkCrumb href="/" mb="-4px">
      <Home2 color="#000" size={15} />
    </LinkCrumb>
    {route.map(({ title, href }, i) => [
      <Crumb px={1} key="arrow">
        <ArrowRight size={12} color="#000" />
      </Crumb>,
      <LinkCrumb href={href} key="path">
        <H6 bold={i === route.length - 1 ? 700 : 300} mb={0}>
          {title}
        </H6>
      </LinkCrumb>,
    ])}
  </Bread>
)

export default BreadCrumbs
