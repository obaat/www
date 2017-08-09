import React, { Component } from 'react'
import g from 'glamorous'
import Donate from './Donate'
import { space, width, fontSize } from 'styled-system'
import { animation } from 'polished'
import Link from 'gatsby-link'
import { css } from 'glamor'
import Modal from './Modal';
import Icon from './Icon';
import { Flex, Box } from 'grid-styled'
import logo_white from '../images/logo_white.png';
import logo_normal from '../images/logo.png';

const dockedBackground = "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%)";

const dockedColor = "rgba(255,255,255,0.4)";
const undockedColor = "#fff";

const menuHeightDocked = '100px'
const menuHeightScrolled = '50px'

const menuScrolled = css.keyframes({
  from: {
    background: dockedBackground,
    color: "#fff",
    height: menuHeightDocked,
  },
  to: { background: undockedColor, color: '#000', height: menuHeightScrolled },
})

const menuDocked = css.keyframes({
  from: { backgroundColor: undockedColor, color: '#000', height: menuHeightScrolled },
  to: {
    backgroundColor: dockedBackground,
    color: "#fff",
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
    backgroundSize: "cover",
    width: '105px',
    height: '40px',
  },
  ({logo}) => ({
    backgroundImage: `url(${logo})`,
  }),
  space,
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


const Container = g.div({ })

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
        backgroundColor: undockedColor,
        height: menuHeightScrolled,
        boxShadow: '0 2px 0 0 rgba(40,40,40, .2)',
        ...animation([menuScrolled, '0.2s']),
      }
    : {
        color: '#fff',
        background: dockedBackground,
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

const Wait = (props) => (
  <Flex justify="center" align="center">
    <Box width={100} px={2}>
      <Icon name="check" fontSize={ 36 } color="normal.0" />
    </Box>
    <Box flex={1}>
      <h3>Many Thanks!</h3>
      We've received your donation. It will appear on your statement as <code>{ props.description }</code>.
    </Box>
  </Flex>
);

const Success = (props) => (
  <Flex justify="center" align="center">
    <Box width={100} px={2}>
      <Icon name="check" fontSize={ 36 } color="success.0" />
    </Box>
    <Box flex={1}>
      <h3>Many Thanks!</h3>
      We've received your donation. It will appear on your statement as <code>{ props.description }</code>.
    </Box>
  </Flex>
);

const Failure = (props) => (
  <Flex justify="center" align="center">
    <Box width={100} px={2}>
      <Icon name="times" fontSize={ 36 } color="danger.0" />
    </Box>
    <Box flex={1}>
      <h3>Something's Wrong</h3>
      We had an issue processing your donation.
    </Box>
  </Flex>
);

export default class Header extends Component {
  state = {
    scrolled: false,
    showModal: null,
    componentProps: {},
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

  renderModal(content, canClose=true) {
    return (
      <Modal canClose={canClose} isOpen onRequestClose={ () => this.setState({showModal: null}) }>
        { content }
      </Modal>
    );
  }

  renderWait = () => this.renderModal(<Wait />, false)
  renderComplete = (props) => this.renderModal(<Success { ...props } />)
  renderFailure = (props) => this.renderModal(<Failure { ...props } />)

  showModal = name => props => this.setState({ showModal: name, componentProps: props })

  render() {
    const {showModal} = this.state;
    return (
      <Container>
        { showModal === 'complete' && this.renderComplete() }
        { showModal === 'failure' && this.renderFailure() }
        { showModal === 'wait' && this.renderWait() }
        <Fixed>
          <HeaderContainer px={3} scrolled={this.state.scrolled}>
            <Logo mr={3} logo={ this.state.scrolled ? logo_normal : logo_white } />
            {menuItems.map(({ title, to }) =>
              <MenuItem key={title} mr={3} p={1} to={to}>
                {title}
              </MenuItem>
            )}
            <Donate
              amount={ 1500 }
              onRequestCharge={ this.showModal('wait') }
              onComplete={ this.showModal('complete') }
              onFailure={ this.showModal('failure') }
            />
          </HeaderContainer>
        </Fixed>
      </Container>
    )
  }
}
