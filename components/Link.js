import React from "react"
import Link from "next/link"

// remove
export default props =>
  <div className={props.className}>
    <Link {...props} />
  </div>
