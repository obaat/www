import React, { Component } from "react"
import g from "glamorous"
import Donate from "./Donate"
import { animation } from "polished"
import { css } from "glamor"
import { Flex, Box } from "../ui"
import { menuHeightDocked, menuHeightScrolled } from "../utils/constants"
import Menu, { MenuItem, SecondaryMenu } from "./Menu"
import { Link } from "react-static"
import LogoIcon from "../svg/logo.svg"
import withProps from "recompose/withProps"
import { Home } from "./SvgIcons"
import theme from "../theme"

const Logo = g(LogoIcon, { rootEl: "svg" })(({ docked }) => ({
  marginTop: docked && "60px",
  display: "block",
  // backgroundColor: docked && "#fff",
  transition: "height 0.15s, width 0.15s, margin-top 0.15s",
  "> g.one": {
    fill: docked ? "#fff" : "#263e50",
  },
  "> g.brick": {
    fill: "#eb5d3a",
  },
  "> g.at_a_time": {
    fill: docked ? "#fff" : "#263e50",
  },
})).withProps(({ docked }) => ({
  height: docked ? "75px" : "44px",
  width: docked ? "300px" : "170px",
}))

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
    zIndex: 999999,
  },
  scrolled,
)

const SWITCH_PIXELS = 70
export default class Header extends Component {
  constructor(props) {
    super(props)
    const src =
      document && (document.scrollingElement || document.documentElement)
    this.state = {
      scrolled: src && src.scrollTop > SWITCH_PIXELS,
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
    this.setIsScrolled()
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll = event => {
    this.setIsScrolled()
  }

  setIsScrolled = () => {
    if (!document) return
    const { scrollTop } = document.scrollingElement || document.documentElement
    if (scrollTop > SWITCH_PIXELS && !this.state.scrolled) {
      this.setState({ scrolled: true })
    } else if (scrollTop < SWITCH_PIXELS && this.state.scrolled) {
      this.setState({ scrolled: false })
    }
  }

  render() {
    const { fixed } = this.props
    const scrolled = this.state.scrolled || fixed
    return (
      <Container>
        <Fixed>
          <HeaderContainer inline wrap="wrap" w={1} px={3} scrolled={scrolled}>
            <Box>
              <Link to="/">
                <Logo docked={!scrolled} size={20} />
              </Link>
            </Box>
            <Menu volunteering={this.props.volunteering} scrolled={scrolled} />
            <Box
              grow={1}
              display={["none", "none", "block", "block"]}
              align="right"
            >
              <Donate amount={1500} scrolled={scrolled} />
            </Box>
          </HeaderContainer>
        </Fixed>
      </Container>
    )
  }
}
