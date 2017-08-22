import Link from "next/link"
import { hoc } from "../styleHelpers"

// remove
export default hoc((props) =>
  <div className={props.className}>
    <Link {...props} />
  </div>,
)
