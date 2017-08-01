import React, { Component } from 'react'
import g from 'glamorous'
import Button from './Button'
import { space, width, fontSize } from 'styled-system'
import { animation } from 'polished'
import Link from 'gatsby-link'
import { css } from 'glamor'

const menuHeightDocked = '100px'
const menuHeightScrolled = '50px'

const menuScrolled = css.keyframes({
  from: {
    backgroundColor: 'transparent',
    color: '#fff',
    height: menuHeightDocked,
  },
  to: { backgroundColor: '#fff', color: '#000', height: menuHeightScrolled },
})

const menuDocked = css.keyframes({
  from: { backgroundColor: '#fff', color: '#000', height: menuHeightScrolled },
  to: {
    backgroundColor: 'transparent',
    color: '#fff',
    height: menuHeightDocked,
  },
})

const menuItems = [
  { title: 'About Us' },
  { title: 'What We Do' },
  { title: 'Volunteering' },
  { title: 'Say Hello' },
]

const Logo = g.div(
  {
    backgroundImage: `url("//placekitten.com/200/50")`,
    width: '200px',
    height: '50px',
  },
  space
)

const MenuItem = g(Link)(
  {
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: 'inherit',
    ':hover': {
      textDecoration: 'none',
      cursor: 'pointer',
      color: 'inherit',
    },
  },
  space
)

const Donate = g(props =>
  <div className={props.className}>
    <Button type="danger" icon="heart">
      DONATE
    </Button>
  </div>
)({
  flex: 1,
  fontWeight: 'bold',
  textAlign: 'right',
})

const Container = g.div({})

const Fixed = g.div({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
})

const scrolled = ({ scrolled }) =>
  scrolled
    ? {
        color: '#000',
        backgroundColor: '#fff',
        height: menuHeightScrolled,
        boxShadow: '0 2px 0 0 rgba(40,40,40, .2)',
        ...animation([menuScrolled, '0.2s']),
      }
    : {
        color: '#fff',
        backgroundColor: 'transparent',
        height: menuHeightDocked,
        ...animation([menuDocked, '0.2s']),
      }

const HeaderContainer = g.div(
  {
    fontWeight: 'bold',
    display: 'flex',
    flex: '0 0 100%',
    alignItems: 'center',
  },
  scrolled,
  space
)

export default class Header extends Component {
  state = {
    scrolled: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = event => {
    const { scrollTop } = event.srcElement.body
    this.setState({ scrolled: scrollTop > 100 })
  }

  render() {
    return (
      <Container>
        <Fixed>
          <HeaderContainer px={3} scrolled={this.state.scrolled}>
            <Logo mr={3} />
            {menuItems.map(({ title, to }) =>
              <MenuItem key={title} mr={3} p={1} to={to}>
                {title}
              </MenuItem>
            )}
            <Donate />
          </HeaderContainer>
        </Fixed>
      </Container>
    )
  }
}
