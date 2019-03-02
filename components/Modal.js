import styled from "@emotion/styled"
import { space, width } from "styled-system"
import React, { Component } from "react"
import X from "./SvgIcons"
import { show, overlay } from "../styleHelpers"

const ModalIcon = styled(X)({
  background: "none",
  position: "absolute",
  right: 0,
  top: 0,
})

const ModalWrapper = styled.div(
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

const ModalBackground = styled.div(overlay(0), {
  backgroundColor: "rgba(0,0,0, 0.6)",
})

const ModalContent = styled.div(
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
          {canClose && (
            <Box m={2} onClick={this.props.onRequestClose}>
              <X size={24} />
            </Box>
          )}
          {this.props.children}
        </ModalContent>
      </ModalWrapper>
    )
  }
}
