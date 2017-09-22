import flowRight from "lodash/flowRight"
import withAnalytics from "./withAnalytics"
import withLayout from "./withLayout"

export const pageWithoutLayout = flowRight(withAnalytics)
export default flowRight(pageWithoutLayout, withLayout)
