import Link from "next/link"

// remove
export default props =>
  <div className={props.className}>
    <Link {...props} />
  </div>
