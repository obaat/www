import React from "react"
import format from "date-fns/format"

const ourFormat = "MMMM YYYY"

export const HumanDate = ({ iso }) => {
  const dt = Date.parse(iso)
  return <span>{format(dt, ourFormat)}</span>
}
