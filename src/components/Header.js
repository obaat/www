import React, { Component } from 'react'
import g from 'glamorous'
import Button from './Button'
import StripeCheckout from 'react-stripe-checkout';
import { space, width, fontSize } from 'styled-system'
import { animation } from 'polished'
import Link from 'gatsby-link'
import { css } from 'glamor'
import _ReactModal from 'react-modal';

const ReactModal = g(_ReactModal)({
  backgroundColor: "red",
});

const backdropStyle = {
  backgroundColor: "rgba(0,0,0,0.5)",
};

const modalStyle = {
  margin: "0 auto",
  maxWidth: "400px",
};

const ModalContainer = g.div({
  backgroundColor: '#fff',
});

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

const Small = g.span({ paddingRight: "15px", fontSize: ".8em", textDecoration: "underline dashed"})

const Donate = g(props =>
  <div className={props.className}>
    <StripeCheckout
      token={props.onToken}
      name="One Brick"
      description="Donate to One Brick at a Time"
      amount={ 1500 }
      panelLabel="Donate Now"
      currency="GBP"
      stripeKey="pk_test_mo8Ebe00P1A7xtRsUYBR0Mxq"
    >
      <Button type="submit" context="danger" icon="heart">
        DONATE
      </Button>
    </StripeCheckout>
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
    showModal: true,
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

  onToken = (token) => {
    fetch("https://zgpvitxqrb.execute-api.eu-west-1.amazonaws.com/dev/donation/charge", {
      method: 'POST',
      body: JSON.stringify({
        token,
        charge: {
          amount: 1500,
          currency: "GBP",
        },
      }),
    }).then(res => {
      res.json().then(data => {
        console.log(data);
      });
    });
  }

  renderModal() {
    return (
      <ReactModal
        isOpen={this.state.showModal}
        onRequestClose={ () => this.setState({showModal: false}) }
        style={{
          overlay: backdropStyle,
          content: modalStyle,
        }}
      >
        <ModalContainer>
          <h4>Text in a modal</h4>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
        </ModalContainer>
      </ReactModal>
    );
  }

  render() {
    return (
      <Container>
        { this.renderModal() }
        <Fixed>
          <HeaderContainer px={3} scrolled={this.state.scrolled}>
            <Logo mr={3} />
            {menuItems.map(({ title, to }) =>
              <MenuItem key={title} mr={3} p={1} to={to}>
                {title}
              </MenuItem>
            )}
            <Donate onToken={ this.onToken }/>
          </HeaderContainer>
        </Fixed>
      </Container>
    )
  }
}
