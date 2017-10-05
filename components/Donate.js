import React, { Component } from "react"
import StripeCheckout from "react-stripe-checkout"
import {
  ButtonCircle,
  ButtonCircleOutline,
  ButtonOutline,
  ButtonFilled,
} from "../ui"
import Modal from "./Modal"
import Button from "./Button"

// TODO: move to primitives + traits
const VIA_STRIPE = false

const Wait = props => (
  <Flex justify="center" align="center">
    <Box width={100} px={2}>
      <Icon name="check" fontSize={36} palette="normal" />
    </Box>
    <Box flex={1}>
      <h3>Many Thanks!</h3>
      We've received your donation. It will appear on your statement as{" "}
      <code>{props.description}</code>.
    </Box>
  </Flex>
)

const Success = props => (
  <Flex justify="center" align="center">
    <Box width={100} px={2}>
      <Icon name="check" fontSize={36} palette="success" />
    </Box>
    <Box flex={1}>
      <h3>Many Thanks!</h3>
      We've received your donation. It will appear on your statement as{" "}
      <code>{props.description}</code>.
    </Box>
  </Flex>
)

const Failure = props => (
  <Flex justify="center" align="center">
    <Box width={100} px={2}>
      <Icon name="times" fontSize={36} palette="danger" />
    </Box>
    <Box flex={1}>
      <h3>Something's Wrong</h3>
      We had an issue processing your donation.
    </Box>
  </Flex>
)
class StripeDonate extends Component {
  onToken = async token => {
    const { amount, onComplete, onRequestCharge, onFailure } = this.props

    onRequestCharge()
    try {
      const res = await fetch(
        "https://zgpvitxqrb.execute-api.eu-west-1.amazonaws.com/dev/donation/charge",
        {
          method: "POST",
          body: JSON.stringify({
            token,
            charge: {
              amount,
              currency: "GBP",
            },
          }),
        },
      )
      const data = await res.json()

      onComplete(data)
    } catch (e) {
      console.error(e)
      onFailure(e)
    }
  }

  renderWait = () => this.renderModal(<Wait />, false)
  renderComplete = props => this.renderModal(<Success {...props} />)
  renderFailure = props => this.renderModal(<Failure {...props} />)

  showModal = name => props =>
    this.setState({ showModal: name, componentProps: props })

  renderModal(content, canClose = true) {
    return (
      <Modal
        canClose={canClose}
        isOpen
        onRequestClose={() => this.setState({ showModal: null })}
      >
        {content}
      </Modal>
    )
  }

  render() {
    const { showModal } = this.state
    const { amount, scrolled } = this.props

    return (
      <StripeCheckout
        token={this.onToken}
        name="One Brick"
        description="Donate to One Brick at a Time"
        amount={amount}
        panelLabel="Donate Now"
        currency="GBP"
        stripeKey="pk_test_mo8Ebe00P1A7xtRsUYBR0Mxq"
      >
        <Button
          type="submit"
          context="brick"
          invert={scrolled}
          icon="heart"
          py={1}
          as={ButtonCircle}
        >
          DONATE
        </Button>
        {showModal === "complete" && this.renderComplete()}
        {showModal === "failure" && this.renderFailure()}
        {showModal === "wait" && this.renderWait()}
      </StripeCheckout>
    )
  }
}

const DonateJustGiving = ({ scrolled }) => (
  <a href="https://www.justgiving.com/onebrickatatime">
    <Button
      palette="base"
      icon="heart"
      iconSize={0}
      py={1}
      px={3}
      as={scrolled ? ButtonOutline : Button}
    >
      DONATE
    </Button>
  </a>
)

export default (VIA_STRIPE ? StripeDonate : DonateJustGiving)
