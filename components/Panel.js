import React from "react"
import styled from "react-emotion"
import { Flex, Box, Subhead } from "../ui"
import { withRouter } from "react-static"
import { clickable } from "../styleHelpers"
import { withProps } from "recompose"

const Image = styled(Box)(({ src }) => ({
  flex: 2,
  backgroundImage: src ? `url(${src})` : "none",
  backgroundSize: "cover",
  backgroundPosition: "center",
  transition: "all 0.3s",
}))

const Header = withProps({
  p: 2,
})(
  styled(Subhead)(({ top, bottom }) => ({
    position: "absolute",
    top,
    bottom,
    left: 25,
    transition: "all 0.3s",
  })),
)

const Body = styled(Box)({
  backgroundColor: "#000",
  height: "200px",
  color: "#efe",
  zIndex: 1,
  transition: "all 0.3s",
})

const PanelContainer = styled(Flex)(
  {
    borderRadius: 12,
    color: "#fff",
    overflow: "hidden",
    textAlign: "left",
    backgroundColor: "#000",
    height: 300,
    position: "relative",
    flexDirection: "column",
    ":hover": {
      [Image]: {
        transform: "scale(1.05)",
      },
      [Body]: {
        transform: "translateY(10px)",
      },
    },
  },
  clickable,
)

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

Panel.Body = withProps({ px: 2, py: 2 })(Body)
Panel.Header = Header
Panel.Image = Image
export default withRouter(Panel)
