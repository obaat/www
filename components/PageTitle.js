import React from "react"
import g from "glamorous"
import { backgroundImageCover } from "../styleHelpers"
import { Flex } from "../ui"
import { menuHeightDocked } from "../utils/constants"

const Container = g(Flex)(
  {
    minHeight: "300px",
    backgroundColor: "#000",
    position: "relative",
  },
  backgroundImageCover,
).withProps({
  flex: 1,
  justify: "center",
  align: "center",
  direction: "column",
})

export default ({ children, image, ...props }) => {
  return (
    <div>
      <Container image={image} pt={menuHeightDocked}>
        {children}
      </Container>
    </div>
  )
}
