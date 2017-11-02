import React from "react"
import format from "date-fns/format"
import parse from "date-fns/parse"

const ourFormat = "MMMM YYYY"

export const HumanDate = ({ iso }) => {
  const dt = parse(iso)
  return <span>{format(dt, ourFormat)}</span>
}
