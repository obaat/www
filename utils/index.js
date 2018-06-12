import { compose, mapProps } from "recompose"
import { omit } from "lodash/fp"

export const omitProps = compose(
  mapProps,
  omit,
)

export const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
)
