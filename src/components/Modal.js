import g from 'glamorous'
import { space, width, fontSize } from 'styled-system'
import React, {Component} from 'react';

const Icon = g(({name, className, onClick}) => <i onClick={ onClick } className={`fa fa-${name} ${className}`} aria-hidden="true" />)({
  cursor: "pointer",
},space);

const ModalIcon = g(Icon)({
  background: "none",
  position: "absolute",
  right: 0,
  top: 0,
});

const hidden = ({isOpen}) => isOpen || ({ display: "none" });

const overlay = (offset = 0) => props => ({
  bottom: offset,
  left: offset,
  position: "absolute",
  right: offset,
  top: offset,
});

const ModalWrapper = g.div(overlay(0), {
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  position: "fixed",
  zIndex: 9999999,
  display: "flex",
}, hidden);

const ModalBackground = g.div(overlay(0), {
  backgroundColor: "rgba(0,0,0, 0.6)",
});

const ModalContent = g.div({
    margin: "0 auto",
    maxHeight: "calc(100vh - 15px)",
    overflow: "auto",
    position: "relative",
    backgroundColor: "white",
    borderRadius: "5px",
  },
  space({p: 2}),
  width({width: 1/2}),
  width
);

export default class Modal extends Component {
  render() {
    const {canClose} = this.props;
    return (
      <ModalWrapper isOpen={ this.props.isOpen}>
        <ModalBackground onClick={ this.props.onRequestClose } />
        <ModalContent>
          { canClose && <ModalIcon name="close" m={2} onClick={ this.props.onRequestClose } /> }
          { this.props.children }
        </ModalContent>
      </ModalWrapper>
    );
  }
}
