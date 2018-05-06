import React from "react"
import g from "glamorous"
import { Flex, Box, Subhead, Text, Link, BackgroundImage } from "../ui"
import { Spring } from "react-spring"
import { withState } from "recompose"

const PanelContainer = g(Flex)(({ backgroundImage: src }) => ({
  borderRadius: 15,
  color: "#fff",
  backgroundColor: "#000",
  height: 300,
  backgroundImage: src ? `url(${src})` : "none",
  backgroundSize: "cover",
  backgroundPosition: "center",
}))

const Header = g(Subhead)({})

const Body = g(Text)({})

class Panel extends React.Component {
  render() {
    const { children, active, ...props } = this.props
    return (
      <PanelContainer px={3} py={0} {...props}>
        {children({ Header, Body })}
      </PanelContainer>
    )
  }
}

export default withState("active", "setActive", false)(Panel)
