import React from "react"
import g from "glamorous"
import { Flex, Box, Subhead, Text, Link, BackgroundImage } from "../ui"
import { withRouter } from "react-static"
import { clickable } from "../styleHelpers"
import { withState } from "recompose"

const PanelContainer = g(Flex)(
  {
    borderRadius: 12,
    color: "#fff",
    overflow: "hidden",
    textAlign: "left",
    backgroundColor: "#000",
    height: 300,
    position: "relative",
    flexDirection: "column",
  },
  clickable,
)

const Image = g(Box)(({ src }) => ({
  flex: 2,
  backgroundImage: src ? `url(${src})` : "none",
  backgroundSize: "cover",
  backgroundPosition: "center",
}))

const Header = g(Subhead)(({ top, bottom }) => ({
  position: "absolute",
  top,
  bottom,
  left: 25,
})).withProps({
  p: 2,
})

const Body = g(Box)({
  backgroundColor: "#000",
  height: "200px",
  color: "#efe",
}).withProps({
  px: 2,
  pt: 1,
})

class Panel extends React.Component {
  handleClick = () => {
    this.props.history.push(this.props.to)
  }

  render() {
    const { children, active, to, ...props } = this.props
    return (
      <PanelContainer onClick={to ? this.handleClick : null} {...props}>
        {children}
      </PanelContainer>
    )
  }
}

Panel.Body = Body
Panel.Header = Header
Panel.Image = Image
export default withRouter(Panel)
