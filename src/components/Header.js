import React, {Component} from 'react'
import g from 'glamorous'
import { Button } from 'bloomer'
import { space, width, fontSize } from 'styled-system'
import {animation} from 'polished';
import {css} from "glamor";

const menuHeightDocked = "100px"
const menuHeightScrolled = "50px"

const menuScrolled = css.keyframes({
  from: { backgroundColor: "transparent", color: "#fff", height: menuHeightDocked },
  to: { backgroundColor: "#fff", color: "#000", height: menuHeightScrolled  },
})

const menuDocked = css.keyframes({
  from: { backgroundColor: "#fff", color: "#000", height: menuHeightScrolled },
  to: { backgroundColor: "transparent", color: "#fff", height: menuHeightDocked },
})

const menuItems = [
  {title: "About"},
  {title: "Projects"},
  {title: "More"},
  {title: "Yadda yadda"},
];

const Logo = g.div({
  backgroundImage: `url("http://placekitten.com/200/50")`,
  width: "200px",
  height: "50px",
}, space)

const MenuItem = g.div({
  textTransform: "uppercase",
},space);

const Donate = g((props) => (
  <div className={ props.className}>
    <Button isColor="danger">DONATE</Button>
  </div>
))({
  flex: 1,
  textAlign: "right",
})

const Container = g.div({})

const Fixed = g.div({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
});

const scrolled = ({scrolled}) => (
  scrolled
  ? {color: "#000", backgroundColor: "#fff", height: menuHeightScrolled, boxShadow: "0 2px 0 0 rgba(40,40,40, .2)", ...animation([menuScrolled, "0.2s"])}
  : {color: "#fff", backgroundColor: "transparent", height: menuHeightDocked, ...animation([menuDocked, "0.2s"])}
)

const HeaderContainer = g.div({
  display: "flex",
  flex: "0 0 100%",
  alignItems: "center",
}, scrolled, space);

export default class Header extends Component {

  state = {
    scrolled: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    const {scrollTop} = event.srcElement.body;
    this.setState({ scrolled: scrollTop > 100, });
  }

  render() {
    return (
      <Container>
        <Fixed>
          <HeaderContainer px={3} scrolled={ this.state.scrolled }>
            <Logo mr={3} />
            { menuItems.map(({title}) => (<MenuItem key={ title } mr={3}>{title}</MenuItem>)) }
            <Donate />
          </HeaderContainer>
        </Fixed>
      </Container>
    );
  }
}
