import flowRight from "lodash/flowRight"
import withLayout from "./withLayout"
import withHeader from "./withHeader"

const normal = flowRight(withLayout)
export const pageWithTitle = config =>
  flowRight(
    normal,
    withHeader(config),
  )
export default normal
