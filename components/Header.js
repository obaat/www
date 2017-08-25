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
  src.map(({ uid, first_publication_date, data: { title } }) => ({
    title: title[0].text,
    as: `/volunteering/${uid}`,
    href: `/volunteering?id=${uid}`,
  }))

const aboutItems = [
  { title: "Ugandian Team", href: "/team" },
  { title: "Trustees", href: "/trustees" },
  { title: "Financials", href: "/financials" },
  { title: "Partnerships", href: "/partners" },
  { title: "Contact Us", href: "/contact" },
]

const menuItems = [
  { title: "About Us", href: "/about", items: aboutItems },
  { title: "What We Do", href: "/whatwedo" },
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

const MenuItem = g(({ items, as, href, ...props }) => {
  const item = (
    <Link as={as} href={href}>
      <A {...props} />
    </Link>
  )
  return items && items.length
    ? <SecondaryMenu items={items}>
        {item}
      </SecondaryMenu>
    : item
})(space({ mr: 3, p: 1 }))

const SubMenuItem = g.div({
  marginTop: "15px",
  paddingTop: "15px",
  cursor: "pointer",
  borderTop: "1px solid #ccc",
})

const OverlayMenu = g.div(
  {
    backgroundColor: "#fff",
    color: "#000",
    position: "absolute",
    top: "-15px",
    left: "-5px",
    minWidth: "300px",
    borderTopRightRadius: "15px",
    borderBottomLeftRadius: "15px",
    boxShadow: "1px 1px 3px 0px rgba(0,0,0,0.2)",
  },
  space({
    p: 2,
  }),
)

const SecondaryMenu = withShowHideOnHover(
  g(({ children, show, items, className, onMouseOver, onMouseOut }) =>
    <div className={className}>
      {show &&
        <OverlayMenu onMouseOver={onMouseOver}>
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
  }),
)

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
            <Link href="/">
              <Logo mr={3} logo={scrolled ? "logo.png" : "logo_white.png"} />
            </Link>
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
