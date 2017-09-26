import React, { Component } from "react"
import g from "glamorous"
import Donate from "./Donate"
import { animation } from "polished"
import { css } from "glamor"
import Icon from "./Icon"
import { Flex, Box } from "../ui"
import { menuHeightDocked, menuHeightScrolled } from "../utils/constants"
import Menu, { MenuItem, SecondaryMenu } from "./Menu"
import Link from "next/link"
import LogoIcon from "../svg/logo.svg"
import withProps from "recompose/withProps"
import theme from "../theme"

const Logo = withProps({ height: "35px", width: "130px", cursor: "pointer" })(
  LogoIcon,
)

const dockedBackground =
  "linear-gradient(to bottom, rgba(0,0,0,0.5) 20%,rgba(0,0,0,0) 100%)"
const undockedColor = "#fff"

const menuScrolled = css.keyframes({
  from: {
    background: dockedBackground,
    color: "#fff",
    height: menuHeightDocked,
  },
  to: { background: undockedColor, color: "#000", height: menuHeightScrolled },
})

const menuDocked = css.keyframes({
  from: {
    backgroundColor: undockedColor,
    color: "#000",
    height: menuHeightScrolled,
  },
  to: {
    backgroundColor: dockedBackground,
    color: "#fff",
    height: menuHeightDocked,
  },
})

const Container = g.div({})

const Fixed = g.div({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
})

const scrolled = ({ scrolled }) =>
  scrolled
    ? {
        color: "#000",
        backgroundColor: undockedColor,
        height: menuHeightScrolled,
        boxShadow: "0 2px 0 0 rgba(40,40,40, .2)",
        ...animation([menuScrolled, "0.2s"]),
      }
    : {
        color: "#fff",
        background: dockedBackground,
        height: menuHeightDocked,
        ...animation([menuDocked, "0.2s"]),
      }

const HeaderContainer = g(Flex)(
  {
    alignItems: "center",
  },
  scrolled,
)

export default class Header extends Component {
  state = {
    scrolled: false,
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll = event => {
    const { scrollTop } = document.scrollingElement || event.srcElement.body
    this.setState({ scrolled: scrollTop > 100 })
  }

  render() {
    const { fixed } = this.props
    const scrolled = this.state.scrolled || fixed
    return (
      <Container>
        <Fixed>
          <HeaderContainer
            wrap="wrap"
            px={3}
            py={[2, 2, 2, 0]}
            scrolled={scrolled}
          >
            <Link href="/">
              <Logo fill={scrolled ? theme.colors.brick[0] : "#fff"} />
            </Link>
            <Menu volunteering={this.props.volunteering} />
            <Box grow={1} align="right">
              <Donate amount={1500} scrolled={scrolled} />
            </Box>
          </HeaderContainer>
        </Fixed>
      </Container>
    )
  }
}
