import React, { Component } from "react"
import g from "glamorous"
import Link from "next/link"
import { css } from "glamor"
import { Flex, Box, Relative, Link as UILink } from "../ui"
import { space } from "../styleHelpers"
import { Set } from "react-powerplug"

const toVolunteeringMenu = src =>
  src.map(({ uid, data: { title } }) => ({
    title: title[0].text,
    as: `/volunteering/${uid}`,
    href: `/volunteering?id=${uid}`,
  }))

const aboutItems = [
  { title: "Our Story", href: "/about" },
  { title: "Our Team", href: "/team" },
  { title: "Trustees", href: "/trustees" },
  { title: "Our Partners", href: "/partners" },
  // { title: "Financials", href: "/financials" },
  { title: "Contact Us", href: "/contact" },
]

const whatItems = [
  { title: "Our Projects", href: "/projects?status=complete" },
  { title: "Planned Projects", href: "/projects?status=planned" },
]

const menuItems = [
  { title: "About Us", items: aboutItems },
  { title: "What We Do", items: whatItems },
  // { title: 'Projects', getChildren: props => toMenu(props.projects) },
  // { title: 'Blog', getChildren: props => toMenu(props.blog) },
  {
    title: "Volunteer With Us",
    items: [{ title: "General Information", href: "/volunteering" }],
    getChildren: props => toVolunteeringMenu(props.volunteering),
  },
  {
    title: "Bursary",
    items: [{ title: "Sponsor a Child", href: "/sponsor" }],
  },
  {
    title: "One Brick Supply",
    items: [
      { title: "Shop", href: "/shop" },
      { title: "Spread the Word", href: "/spreadtheword" },
    ],
  },
]
const A = g.a(
  {
    textTransform: "uppercase",
    textDecoration: "none",
    color: "inherit",
    ":hover": {
      textDecoration: "none",
      cursor: "pointer",
      color: "inherit",
    },
  },
  space,
)

const MenuContainer = g(Box)({
  borderLeft: "1px solid transparent",
  borderRight: "1px solid transparent",
  borderTop: "1px solid transparent",
})

export const MenuItem = ({
  items,
  as,
  onMouseOver,
  href,
  children,
  ...props
}) => {
  const item = (
    <A>
      <MenuContainer px={2} py={1} onMouseOver={onMouseOver} {...props}>
        {children}
      </MenuContainer>
    </A>
  )

  return href ? (
    <Link as={as} href={href} prefetch>
      {item}
    </Link>
  ) : (
    item
  )
}

const SelectedMenuItem = g(MenuItem)({
  borderLeft: "1px solid rgba(0,0,0,0.2)",
  borderRight: "1px solid rgba(0,0,0,0.2)",
  borderTop: "1px solid rgba(0,0,0,0.2)",
})

export const SubMenuItem = g(MenuItem)(({ last }) => ({
  paddingTop: "15px",
  cursor: "pointer",
  borderBottom: last ? "" : "1px dotted #ccc",
  ":hover": {
    backgroundColor: "#ccc",
    borderBottomColor: "#000",
  },
}))

export const OverlayMenu = g.div({
  backgroundColor: "#fff",
  color: "#000",
  position: "absolute",
  left: 0,
  top: "100%",
  minWidth: "300px",
  borderBottom: "1px solid rgba(0,0,0,0.2)",
  borderLeft: "1px solid rgba(0,0,0,0.2)",
  borderRight: "1px solid rgba(0,0,0,0.2)",
  // boxShadow: "1px 1px 3px 0px ",
})

export const SecondaryMenu = ({ children, onMouseOut, items, className }) => (
  <Box>
    {children}
    <Relative>
      <OverlayMenu onMouseLeave={onMouseOut}>
        {items.map(({ title, meta, ...props }, i) => (
          <SubMenuItem key={title} {...props} last={i === items.length - 1}>
            {title} {meta}
          </SubMenuItem>
        ))}
      </OverlayMenu>
    </Relative>
  </Box>
)

export default props => {
  const _menuItems = menuItems.map(
    i =>
      i.getChildren
        ? { ...i, items: (i.items || []).concat(i.getChildren(props)) }
        : i,
  )
  return (
    <Set initial={{ visibleMenu: null }}>
      {({ set, get }) => (
        <Flex>
          {_menuItems.map(({ title, items, ...props }) => {
            return get("visibleMenu") === title && items && items.length ? (
              <SecondaryMenu
                key={title}
                items={items}
                onMouseOut={() => set("visibleMenu", null)}
                {...props}
              >
                <SelectedMenuItem key={title} {...props} color="#000" bg="#fff">
                  {title}
                </SelectedMenuItem>
              </SecondaryMenu>
            ) : (
              <MenuItem
                key={title}
                onMouseOver={() => set("visibleMenu", title)}
                {...props}
              >
                {title}
              </MenuItem>
            )
          })}
        </Flex>
      )}
    </Set>
  )
}
