import flowRight from "lodash/flowRight"
import withAnalytics from "./withAnalytics"
import withLayout from "./withLayout"
import withHeader from "./withHeader"

export const pageWithoutLayout = flowRight(withAnalytics)
const normal = flowRight(pageWithoutLayout, withLayout)
export const pageWithTitle = config =>
  flowRight(withAnalytics, withLayout, withHeader(config))
export default normal
