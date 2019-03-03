import { compose, withState, withHandlers } from "recompose"

export const withShowHideOnHover = compose(
  withState("show", "setShow", false),
  withHandlers(() => {
    return {
      onMouseOver: ({ setShow }) => e => {
        setShow(true)
      },
      onMouseOut: ({ setShow }) => e => {
        setShow(false)
      },
    }
  }),
)
