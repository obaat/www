import React, { Component } from "react"
import g from "glamorous"
import StripeCheckout from "react-stripe-checkout"
import { ButtonCircle } from "../ui"
import Button from "./Button"

// TODO: move to primitives + traits

export default g(
  class Donate extends Component {
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

    render() {
      const { className, amount, scrolled } = this.props
      return (
        <div className={className}>
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
              context="danger"
              invert={scrolled}
              icon="heart"
              py={1}
              as={ButtonCircle}
            >
              DONATE
            </Button>
          </StripeCheckout>
        </div>
      )
    }
  },
)({
  flex: 1,
  fontWeight: "bold",
  textAlign: "right",
})
