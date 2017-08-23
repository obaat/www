import React from "react"
import g from "glamorous"
import { backgroundImageCover } from "../styleHelpers"
import { Flex } from "../ui"

const PageTitle = g(Flex)(
  {
    minHeight: "300px",
  },
  backgroundImageCover,
).withProps({
  flex: 1,
  justify: "center",
  align: "center",
  direction: "column",
})

export default PageTitle
