import { compose, withState, withHandlers } from "recompose"
import debounce from "lodash/debounce"

let count = 0
const inProgress = {}

export const withShowHideOnHover = compose(
  withState("show", "setShow", false),
  withHandlers(() => {
    const id = count++
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
