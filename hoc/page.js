import flowRight from "lodash/flowRight"
import withAnalytics from "./withAnalytics"
import withLayout from "./withLayout"
import withHeader from "./withHeader"

const normal = flowRight(withAnalytics, withLayout)
export const pageWithTitle = config => flowRight(normal, withHeader(config))
export default normal
