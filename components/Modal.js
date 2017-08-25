import g from "glamorous"
import { space, width } from "styled-system"
import React, { Component } from "react"
import Icon from "./Icon"
import { show, overlay } from "../styleHelpers"

const ModalIcon = g(Icon)({
  background: "none",
  position: "absolute",
  right: 0,
  top: 0,
})

const ModalWrapper = g.div(
  overlay(0),
  {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "fixed",
    zIndex: 9999999,
    display: "flex",
  },
  show,
)

const ModalBackground = g.div(overlay(0), {
  backgroundColor: "rgba(0,0,0, 0.6)",
})

const ModalContent = g.div(
  {
    margin: "0 auto",
    maxHeight: "calc(100vh - 15px)",
    overflow: "auto",
    position: "relative",
    backgroundColor: "white",
    borderRadius: "5px",
  },
  space({ p: 2 }),
  width({ width: 1 / 2 }),
  width,
)

export default class Modal extends Component {
  render() {
    const { canClose } = this.props
    return (
      <ModalWrapper show={this.props.isOpen}>
        <ModalBackground onClick={this.props.onRequestClose} />
        <ModalContent>
          {canClose &&
            <ModalIcon
              name="close"
              m={2}
              onClick={this.props.onRequestClose}
            />}
          {this.props.children}
        </ModalContent>
      </ModalWrapper>
    )
  }
}
