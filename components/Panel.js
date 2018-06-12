import React from "react"
import styled from "react-emotion"
import { Flex, Box, Subhead } from "../ui"
import { withRouter } from "react-static"
import { clickable } from "../styleHelpers"
import { withProps } from "recompose"

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
  },
  clickable,
)

const Image = styled(Box)(({ src }) => ({
  flex: 2,
  backgroundImage: src ? `url(${src})` : "none",
  backgroundSize: "cover",
  backgroundPosition: "center",
}))

const Header = withProps({
  p: 2,
})(
  styled(Subhead)(({ top, bottom }) => ({
    position: "absolute",
    top,
    bottom,
    left: 25,
  })),
)

const Body = withProps({
  px: 2,
  pt: 1,
})(
  styled(Box)({
    backgroundColor: "#000",
    height: "200px",
    color: "#efe",
  }),
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

Panel.Body = Body
Panel.Header = Header
Panel.Image = Image
export default withRouter(Panel)
