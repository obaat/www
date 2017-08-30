import React, { Component } from "react"
import g from "glamorous"
import Donate from "./Donate"
import Link from "next/link"
import { animation } from "polished"
import { css } from "glamor"
import Modal from "./Modal"
import Icon from "./Icon"
import { Flex, Box } from "grid-styled"
import { withShowHideOnHover } from "../hoc"
import { space } from "../styleHelpers"
import { menuHeightDocked, menuHeightScrolled } from "../utils/constants"

const dockedBackground =
  "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%)"
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
]

const Logo = g.div(
  {
    backgroundSize: "cover",
    width: "105px",
    height: "40px",
  },
  ({ logo }) => ({
    backgroundImage: `url(/static/images/${logo})`,
  }),
  space,
)

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

const MenuItem = g(
  withShowHideOnHover(
    ({ items, as, onMouseOver, onMouseOut, show, href, ...props }) => {
      const item = (
        <Link as={as} href={href}>
          <A onMouseOver={onMouseOver} {...props} />
        </Link>
      )
      return items && items.length
        ? <SecondaryMenu items={items} show={show} onMouseOut={onMouseOut}>
            {item}
          </SecondaryMenu>
        : item
    },
  ),
)(
  {
    justify: "right",
    align: "right",
  },
  space({
    mr: 3,
  }),
)

const SubMenuItem = g.div({
  marginTop: "15px",
  paddingTop: "15px",
  cursor: "pointer",
  borderTop: "1px dotted #ccc",
})

const OverlayMenu = g.div(
  {
    backgroundColor: "#fff",
    color: "#000",
    position: "absolute",
    top: "-15px",
    left: "-15px",
    minWidth: "200px",
    borderTopRightRadius: "15px",
    borderBottomLeftRadius: "15px",
    border: "2px solid rgba(0,0,0,0.2)",
    // boxShadow: "1px 1px 3px 0px ",
  },
  space({
    p: 2,
  }),
)

const SecondaryMenu = g(({ show, children, onMouseOut, items, className }) =>
  <div className={className}>
    {show &&
      <OverlayMenu onMouseLeave={onMouseOut}>
        {children}
        {items.map(({ title, meta, ...props }) =>
          <SubMenuItem key={title}>
            <MenuItem {...props}>
              {title} {meta}
            </MenuItem>
          </SubMenuItem>,
        )}
      </OverlayMenu>}
    {children}
  </div>,
)({
  position: "relative",
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

const HeaderContainer = g.div(
  {
    display: "flex",
    flex: "0 0 100%",
    alignItems: "center",
  },
  scrolled,
  space,
)

const Wait = props =>
  <Flex justify="center" align="center">
    <Box width={100} px={2}>
      <Icon name="check" fontSize={36} palette="normal" />
    </Box>
    <Box flex={1}>
      <h3>Many Thanks!</h3>
      We've received your donation. It will appear on your statement as{" "}
      <code>{props.description}</code>.
    </Box>
  </Flex>

const Success = props =>
  <Flex justify="center" align="center">
    <Box width={100} px={2}>
      <Icon name="check" fontSize={36} palette="success" />
    </Box>
    <Box flex={1}>
      <h3>Many Thanks!</h3>
      We've received your donation. It will appear on your statement as{" "}
      <code>{props.description}</code>.
    </Box>
  </Flex>

const Failure = props =>
  <Flex justify="center" align="center">
    <Box width={100} px={2}>
      <Icon name="times" fontSize={36} palette="danger" />
    </Box>
    <Box flex={1}>
      <h3>Something's Wrong</h3>
      We had an issue processing your donation.
    </Box>
  </Flex>

export default class Header extends Component {
  state = {
    scrolled: false,
    showModal: null,
    componentProps: {},
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll = event => {
    const { scrollTop } = event.srcElement.body
    this.setState({ scrolled: scrollTop > 100 })
  }

  renderModal(content, canClose = true) {
    return (
      <Modal
        canClose={canClose}
        isOpen
        onRequestClose={() => this.setState({ showModal: null })}
      >
        {content}
      </Modal>
    )
  }

  renderWait = () => this.renderModal(<Wait />, false)
  renderComplete = props => this.renderModal(<Success {...props} />)
  renderFailure = props => this.renderModal(<Failure {...props} />)

  showModal = name => props =>
    this.setState({ showModal: name, componentProps: props })

  render() {
    const { showModal } = this.state
    const { fixed } = this.props
    const scrolled = this.state.scrolled || fixed
    const _menuItems = menuItems.map(
      i =>
        i.getChildren
          ? { ...i, items: (i.items || []).concat(i.getChildren(this.props)) }
          : i,
    )
    return (
      <Container>
        {showModal === "complete" && this.renderComplete()}
        {showModal === "failure" && this.renderFailure()}
        {showModal === "wait" && this.renderWait()}
        <Fixed>
          <HeaderContainer px={3} scrolled={scrolled}>
            <MenuItem key="logo" href="/">
              One Brick at a Time
            </MenuItem>
            {_menuItems.map(({ title, items, href, as }) =>
              <MenuItem key={title} href={href} as={as} items={items}>
                {title}
              </MenuItem>,
            )}
            <Donate
              amount={1500}
              scrolled={scrolled}
              onRequestCharge={this.showModal("wait")}
              onComplete={this.showModal("complete")}
              onFailure={this.showModal("failure")}
            />
          </HeaderContainer>
        </Fixed>
      </Container>
    )
  }
}
