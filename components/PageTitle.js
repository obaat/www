import React from "react"
import styled from "react-emotion"
import Helmet from "react-helmet"
import { backgroundImageCover } from "../styleHelpers"
import { Flex } from "../ui"
import { menuHeightDocked } from "../utils/constants"
import withProps from "recompose/withProps"

const Container = withProps({
  flex: 1,
  justify: "center",
  align: "center",
  direction: "column",
})(
  styled(Flex)(
    {
      minHeight: "300px",
      backgroundColor: "#000",
      position: "relative",
    },
    backgroundImageCover,
  ),
)

export default ({ children, image, ...props }) => {
  return (
    <div>
      <Helmet
        meta={[
          { property: "og:image", content: image },
          // { property: "og:title", content: image },
        ]}
      />
      <Container image={image} pt={menuHeightDocked}>
        {children}
      </Container>
    </div>
  )
}
