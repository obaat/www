import React, { Component } from "react"
import g from "glamorous"
import { css } from "glamor"
import {
  Link as RawLink,
  Fixed,
  Absolute,
  Flex,
  Text,
  H6,
  Box,
  Relative,
  Border,
} from "../ui"
import { space } from "../styleHelpers"
import { Set } from "react-powerplug"
import { Menu as MenuIcon, X } from "./SvgIcons"
import { Toggle } from "react-powerplug"

import enhanceWithClickOutside from "react-click-outside"

const toMenu = slug => src =>
  src.map(({ uid, data: { menu_item_title, title } }) => ({
    title: menu_item_title ? menu_item_title[0].text : title[0].text,
    href: `/${slug}/${uid}`,
  }))

const aboutItems = [
  { title: "Our Story", href: "/about" },
  { title: "Our Team", href: "/team" },
  { title: "Trustees", href: "/trustees" },
  { title: "Our Partners", href: "/partners" },
  { title: "Resources", href: "/resources" },
  { title: "Contact Us", href: "/contact" },
]

const whatItems = [
  { title: "Our Mission", href: "/mission" },
  { title: "Completed Projects", href: "/projects" },
  { title: "Upcoming Projects", href: "/projects/planned" },
]

const menuItems = [
  { title: "About Us", items: aboutItems },
  {
    title: "What We Do",
    items: whatItems,
    getChildren: props => toMenu("us")(props.whatwedo || []),
  },
  // { title: 'Projects', getChildren: props => toMenu(props.projects) },
  {
    title: "Volunteer With Us",
    items: [{ title: "General Information", href: "/volunteering" }],
    getChildren: props => toMenu("volunteering")(props.volunteering || []),
  },
  {
    title: "One Brick Supply",
    items: [
      { title: "Blog", href: "/blog" },
      { title: "Spread the Word", href: "/spreadtheword" },
    ],
  },
]

const Link = g(RawLink)(
  {
    textTransform: "uppercase",
    textDecoration: "none",
    color: "inherit",
    ":hover": {
      textDecoration: "none",
      cursor: "pointer",
      color: "inherit",
    },
    ":visited": {
      color: "inherit",
    },
  },
  space,
)

const LinkLike = Link.withComponent("div")

const MenuContainer = g(Box)({
  borderLeft: "1px solid transparent",
  borderRight: "1px solid transparent",
  borderTop: "1px solid transparent",
})

export const MenuItem = ({ items, onMouseOver, href, children, ...props }) => {
  const item = (
    <MenuContainer
      px={2}
      py={1}
      onTouchStart={onMouseOver}
      onMouseOver={onMouseOver}
      {...props}
    >
      {children}
    </MenuContainer>
  )

  return href ? <Link to={href}>{item}</Link> : <LinkLike>{item}</LinkLike>
}

const SelectedMenuItem = g(MenuItem)({
  borderLeft: "1px solid rgba(0,0,0,0.2)",
  borderRight: "1px solid rgba(0,0,0,0.2)",
  borderTop: "1px solid rgba(0,0,0,0.2)",
})

export const SubMenuItem = g(MenuItem)(({ last }) => ({
  cursor: "pointer",
  borderBottom: last ? "" : "1px dotted #ccc",
  ":hover": {
    backgroundColor: "#ccc",
  },
}))

export const OverlayMenu = g.div({
  backgroundColor: "#fff",
  color: "#000",
  position: "absolute",
  left: 0,
  top: "100%",
  minWidth: "270px",
  borderBottom: "1px solid rgba(0,0,0,0.2)",
  borderLeft: "1px solid rgba(0,0,0,0.2)",
  borderRight: "1px solid rgba(0,0,0,0.2)",
})

export const SecondaryMenu = enhanceWithClickOutside(
  class SecondaryMenu extends Component {
    handleClickOutside = () => {
      this.props.onMouseOut()
    }
    render() {
      const { children, onMouseOut, items, className } = this.props
      return (
        <Box>
          {children}
          <Relative>
            <OverlayMenu onMouseLeave={onMouseOut}>
              {items.map(({ title, meta, ...props }, i) => (
                <SubMenuItem
                  key={title}
                  {...props}
                  last={i === items.length - 1}
                >
                  {title} {meta}
                </SubMenuItem>
              ))}
            </OverlayMenu>
          </Relative>
        </Box>
      )
    }
  },
)

const MobileTitle = g(Box)({})

const MobileItem = g(Box)({})

const MobileMenu = ({ items, onClose }) => (
  <Fixed
    top
    right
    bottom
    palette="black"
    invert
    p={2}
    style={{ overflowX: "scroll" }}
  >
    <Absolute top right onClick={onClose} p={2}>
      <X size={24} />
    </Absolute>
    {items.map(i => (
      <Box key={i}>
        <Border bottom borderColor="gray7">
          <Box color="gray7" py={1}>
            {i.title}
          </Box>
        </Border>
        {i.items.map(i2 => (
          <Border bottom borderColor="gray5">
            <Link to={i2.href}>
              <MobileItem py={1}>{i2.title}</MobileItem>
            </Link>
          </Border>
        ))}
      </Box>
    ))}{" "}
  </Fixed>
)

const Menu = ({ hideMenu = false, ...props }) => {
  const _menuItems = menuItems.map(
    i =>
      i.getChildren
        ? { ...i, items: (i.items || []).concat(i.getChildren(props)) }
        : i,
  )
  if (hideMenu) {
    return null
  }
  return (
    <div>
      <Fixed
        display={["block", "block", "block", "none"]}
        top
        right
        px={2}
        py={1}
      >
        <Toggle initial={false}>
          {({ on, toggle }) => (
            <Box mt={1}>
              <MenuIcon
                size={24}
                palette={props.scrolled ? "black" : "blackInvert"}
                onClick={toggle}
              />
              {on && <MobileMenu items={_menuItems} onClose={toggle} />}
            </Box>
          )}
        </Toggle>
      </Fixed>
      <Box display={["none", "none", "none", "block"]}>
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
                    <SelectedMenuItem
                      key={title}
                      {...props}
                      color="#000"
                      bg="#fff"
                    >
                      <Text mb={0}>{title}</Text>
                    </SelectedMenuItem>
                  </SecondaryMenu>
                ) : (
                  <MenuItem
                    key={title}
                    onMouseOver={() => set("visibleMenu", title)}
                    {...props}
                  >
                    <Text mb={0}>{title}</Text>
                  </MenuItem>
                )
              })}
            </Flex>
          )}
        </Set>
      </Box>
    </div>
  )
}

export default Menu
