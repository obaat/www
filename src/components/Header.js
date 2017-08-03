import React, { Component } from 'react'
import g from 'glamorous'
import Donate from './Donate'
import { space, width, fontSize } from 'styled-system'
import { animation } from 'polished'
import Link from 'gatsby-link'
import { css } from 'glamor'
import _ReactModal from 'react-modal';
import Modal from './Modal';

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

const Wait = (props) => (
  <div>
    Wait
  </div>
);

const Success = (props) => (
  <div>
    Success
  </div>
);

const Failure = (props) => (
  <div>
    Failure
  </div>
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
            <Logo mr={3} />
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
